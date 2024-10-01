import { forwardRef, Inject, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import axios from 'axios';
import { resolve4 } from 'dns';
import { FlattenMaps, Types } from 'mongoose';
import { CompanyService } from '../company/company.service';
import { InvoiceService } from 'src/invoices/invoice.service';
import { error } from 'console';
import { Invoice } from 'src/invoices/entities/invoice.entity';

@Injectable()
export class PayfastService {
  private sandboxMode;
  private pfHost;
  private payfastPassphrase;
  private invoice: FlattenMaps<Invoice> & { _id: Types.ObjectId };
  constructor(
    @Inject(forwardRef(() => CompanyService))
    private readonly companyService: CompanyService,

    @Inject(forwardRef(() => InvoiceService))
    private readonly invoiceService: InvoiceService,
  ) {
    this.sandboxMode = true;
    this.pfHost = this.sandboxMode ? 'sandbox.payfast.co.za' : 'www.payfast.co.za';
    this.payfastPassphrase = 'your_payfast_passphrase';
  }

  async handNotification(pfData: any, req: any, res: any) {
    //Setting the data
    console.log(res)
    await this.setData(new Types.ObjectId(pfData.m_payment_id));
    console.log('Data set');

    // Step 2: Strip slashes from data
    for (const key in pfData) {
      pfData[key] = pfData[key].replace(/\\'/g, "'");
    }

    console.log('Data stripped');

    // Step 3: Recreate the signature string, excluding the signature itself
    let pfParamString = '';
    Object.keys(pfData).forEach((key) => {
      if (key !== 'signature') {
        pfParamString += `${key}=${encodeURIComponent(pfData[key])}&`;
      }
    });
    pfParamString = pfParamString.slice(0, -1); // Remove the last "&"

    console.log('Signature string recreated:', pfParamString);

    // Step 4: Verify the signature
    const isValidSignature = this.verifySignature(pfData, pfParamString);
    if (!isValidSignature) {
      console.error('Invalid signature');
      return;
    }

    console.log('Signature verified');

    // Step 5: Validate IP address
    const isValidIP = await this.verifyValidIP(req);
    if (!isValidIP) {
      console.error('Invalid IP');
      return;
    }

    console.log('IP verified');

    // Step 6: Check that the payment amount matches
    const isValidAmount = this.verifyPaymentAmount(parseFloat(pfData.amount_gross));
    if (!isValidAmount) {
      console.error('Payment amount mismatch');
      return;
    }

    console.log('Payment amount verified');

    // Step 7: Perform server confirmation with PayFast
    const isServerValid = await this.verifyServerConfirmation(pfParamString);
    if (!isServerValid) {
      console.error('Server confirmation failed');
      return;
    }

    console.log('Server confirmation successful');

    if (pfData.payment_status === 'COMPLETE') {
      await this.updateInvoice();
    }

    console.log('Invoice updated');

    // All checks passed - Process payment (update your database, etc.)
    console.log('Payment successful and verified:', pfData);
  }

  async setData(invoiceId: Types.ObjectId) {
    const invoice = await this.invoiceService.findById(invoiceId);
    if (!invoice) {
      throw error('Invoice not found');
    }
    console.log('Invoice found:', invoice);
    this.invoice = invoice;
    console.log('Checkpoint 1')

    const company = await this.companyService.getCompanyById(invoice.companyId);
    console.log('Checkpoint 2')
    if (company._id.toString() !== '66cdad718554b49834a56eed') {
      this.sandboxMode = false;
      this.pfHost = this.sandboxMode ? 'sandbox.payfast.co.za' : 'www.payfast.co.za';
    }
    console.log('Checkpoint 3')
    if (company.accountDetails.passPhrase) {
      this.payfastPassphrase = company.accountDetails.passPhrase;
    } else {
      this.payfastPassphrase = '';
    }
    console.log('Checkpoint 4')
  }

  // Step 4: Verify the signature
  verifySignature(pfData: any, pfParamString: string): boolean {
    let signatureString = pfParamString;
    if (this.payfastPassphrase) {
      signatureString += `&passphrase=${encodeURIComponent(this.payfastPassphrase)}`;
    }
    const expectedSignature = crypto.createHash('md5').update(signatureString).digest('hex');
    return pfData.signature === expectedSignature;
  }

  // Step 5: Verify PayFast IP address
  async verifyValidIP(req: any): Promise<boolean> {
    const validHosts = ['www.payfast.co.za', 'sandbox.payfast.co.za', 'w1w.payfast.co.za', 'w2w.payfast.co.za'];
    let validIps: string[] = [];

    for (const hostname of validHosts) {
      const ips = await this.resolveDNS(hostname);
      validIps = [...validIps, ...ips];
    }

    const uniqueIps = Array.from(new Set(validIps));
    const requestIP = req.ip || req.connection.remoteAddress;

    return uniqueIps.includes(requestIP);
  }

  // Resolve DNS for PayFast domains
  private resolveDNS(hostname: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      resolve4(hostname, (err, addresses) => {
        if (err) return reject(err);
        resolve(addresses);
      });
    });
  }

  // Step 6: Verify the payment amount
  verifyPaymentAmount(receivedAmount: number): boolean {
    const expectedAmount = this.invoice.total;
    return Math.abs(expectedAmount - receivedAmount) <= 0.01;
  }

  // Step 7: Confirm with PayFast server
  async verifyServerConfirmation(pfParamString: string): Promise<boolean> {
    try {
      const url = `https://${this.pfHost}/eng/query/validate`;
      const response = await axios.post(url, pfParamString, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      return response.data === 'VALID';
    } catch (error) {
      console.error('Server confirmation failed:', error);
      return false;
    }
  }

  async updateInvoice() {
    await this.invoiceService.update(this.invoice._id, { paid: true, receiptOfPaymentDate: new Date() });
  }
}
