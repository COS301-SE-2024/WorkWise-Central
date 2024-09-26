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

  async setData(invoiceId: Types.ObjectId) {
    const invoice = await this.invoiceService.findById(invoiceId);
    if (!invoice) {
      throw error('Invoice not found');
    }
    this.invoice = invoice;

    const company = await this.companyService.getCompanyById(invoice.companyId);
    if (company._id.toString() !== '66cdad718554b49834a56eed') {
      this.sandboxMode = false;
      this.pfHost = this.sandboxMode ? 'sandbox.payfast.co.za' : 'www.payfast.co.za';
    }
    if (company.accountDetails.passPhrase) {
      this.payfastPassphrase = company.accountDetails.passPhrase;
    } else {
      this.payfastPassphrase = '';
    }
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
