export class Email {
  private _sender: string;
  private _recipient: string;
  private _subject: string;
  private _body: string;

  constructor(
    sender: string = `WorkWise Admin <practicalsix@gmail.com>`,
    recipient: string = 'dokuzuku@gmail.com',
    subject: string = `How to Send Emails with Nodemailer`,
    body: string = `Welcome to workwise https://tuksui.sharpsoftwaresolutions.net/`,
  ) {
    this._sender = sender;
    this._recipient = recipient;
    this._subject = subject;
    this._body = body;
  }

  get sender(): string {
    return this._sender;
  }

  get recipient(): string {
    return this._recipient;
  }

  get subject(): string {
    return this._subject;
  }

  get body(): string {
    return this._body;
  }

  set sender(sender: string) {
    this._sender = sender;
  }

  set recipient(recipient: string) {
    this._recipient = recipient;
  }

  set subject(subject: string) {
    this._subject = subject;
  }

  set body(body: string) {
    this._body = body;
  }
}

/*export class WorkWiseEmail {
  constructor(to: string, subject: string, text: string) {
    this.to = to;
    this.subject = subject;
    this.text = text;
  }
  from: string = `WorkWise Admin <practicalsix@gmail.com>`;
  to: string = 'dokuzuku@gmail.com';
  subject: string = `How to Send Emails with Nodemailer`;
  text: string = `Welcome to workwise`;
}*/
