export class CustomResponse {
  data: any;
  code: number;
  message: string;

  constructor(data: any, code: number, message: string) {
    this.data = data;
    this.code = code;
    this.message = message;
  }
}
