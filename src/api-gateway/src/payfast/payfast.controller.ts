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
    console.log('In the payfast notify endpoint');
    const pfData = req.body;
    console.log('pfData:', pfData);

    // Step 1: Return HTTP 200 OK to PayFast immediately
    res.status(200).send('OK');
    console.log('Sent 200 OK');

    await this.payfastService.handNotification(pfData, req, res);

    // //Setting the data
    // await this.payfastService.setData(new Types.ObjectId(pfData.m_payment_id));
    // console.log('Data set');
    //
    // // Step 2: Strip slashes from data
    // for (const key in pfData) {
    //   pfData[key] = pfData[key].replace(/\\'/g, "'");
    // }
    //
    // console.log('Data stripped');
    //
    // // Step 3: Recreate the signature string, excluding the signature itself
    // let pfParamString = '';
    // Object.keys(pfData).forEach((key) => {
    //   if (key !== 'signature') {
    //     pfParamString += `${key}=${encodeURIComponent(pfData[key])}&`;
    //   }
    // });
    // pfParamString = pfParamString.slice(0, -1); // Remove the last "&"
    //
    // console.log('Signature string recreated:', pfParamString);
    //
    // // Step 4: Verify the signature
    // const isValidSignature = this.payfastService.verifySignature(pfData, pfParamString);
    // if (!isValidSignature) {
    //   console.error('Invalid signature');
    //   return;
    // }
    //
    // console.log('Signature verified');
    //
    // // Step 5: Validate IP address
    // const isValidIP = await this.payfastService.verifyValidIP(req);
    // if (!isValidIP) {
    //   console.error('Invalid IP');
    //   return;
    // }
    //
    // console.log('IP verified');
    //
    // // Step 6: Check that the payment amount matches
    // const isValidAmount = this.payfastService.verifyPaymentAmount(parseFloat(pfData.amount_gross));
    // if (!isValidAmount) {
    //   console.error('Payment amount mismatch');
    //   return;
    // }
    //
    // console.log('Payment amount verified');
    //
    // // Step 7: Perform server confirmation with PayFast
    // const isServerValid = await this.payfastService.verifyServerConfirmation(pfParamString);
    // if (!isServerValid) {
    //   console.error('Server confirmation failed');
    //   return;
    // }
    //
    // console.log('Server confirmation successful');
    //
    // if (pfData.payment_status === 'COMPLETE') {
    //   await this.payfastService.updateInvoice();
    // }
    //
    // console.log('Invoice updated');
    //
    // // All checks passed - Process payment (update your database, etc.)
    // console.log('Payment successful and verified:', pfData);
  }
}
