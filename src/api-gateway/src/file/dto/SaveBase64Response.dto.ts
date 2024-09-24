export class SaveBase64Response {
  constructor(success: boolean, url?: string) {
    this.success = success;
    if (url) this.url = url;
  }
  success: boolean;
  url?: string = null;
}
