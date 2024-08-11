export class BooleanResponseDto {
  data: boolean;
}

type ImageUrl = {
  url: string;
};

export class FileResponseDto {
  constructor(data: ImageUrl) {
    this.data = data;
  }
  data: ImageUrl;
}
