import { Controller, Post, Req, Res } from '@nestjs/common';
import { PayfastService } from './payfast.service';
import { ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';

// const className = 'Payfast';

@ApiTags('Payfast')
@Controller('payfast')
export class PayfastController {
  constructor(private readonly payfastService: PayfastService) {}

  @Post('notify')
  async handleNotification(@Req() req: any, @Res() res: any) {
    const pfData = req.body;

    // Step 1: Return HTTP 200 OK to PayFast immediately
    res.status(200).send('OK');

    //Setting the data
    await this.payfastService.setData(new Types.ObjectId(pfData.m_payment_id));

    // Step 2: Strip slashes from data
    for (const key in pfData) {
      pfData[key] = pfData[key].replace(/\\'/g, "'");
    }

    // Step 3: Recreate the signature string, excluding the signature itself
    let pfParamString = '';
    Object.keys(pfData).forEach((key) => {
      if (key !== 'signature') {
        pfParamString += `${key}=${encodeURIComponent(pfData[key])}&`;
      }
    });
    pfParamString = pfParamString.slice(0, -1); // Remove the last "&"

    // Step 4: Verify the signature
    const isValidSignature = this.payfastService.verifySignature(pfData, pfParamString);
    if (!isValidSignature) {
      console.error('Invalid signature');
      return;
    }

    // Step 5: Validate IP address
    const isValidIP = await this.payfastService.verifyValidIP(req);
    if (!isValidIP) {
      console.error('Invalid IP');
      return;
    }

    // Step 6: Check that the payment amount matches
    const isValidAmount = this.payfastService.verifyPaymentAmount(parseFloat(pfData.amount_gross));
    if (!isValidAmount) {
      console.error('Payment amount mismatch');
      return;
    }

    // Step 7: Perform server confirmation with PayFast
    const isServerValid = await this.payfastService.verifyServerConfirmation(pfParamString);
    if (!isServerValid) {
      console.error('Server confirmation failed');
      return;
    }

    if (pfData.payment_status === 'COMPLETE') {
      await this.payfastService.updateInvoice();
    }

    // All checks passed - Process payment (update your database, etc.)
    console.log('Payment successful and verified:', pfData);
  }
}
