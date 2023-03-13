import { ApiResponseEntity, Link } from './apiResponse';

export type ImageRequest = {
  name: string;
  description?: string;
  base64Image: string;
};

interface Image extends ApiResponseEntity {
  id: number;
  name: string;
  description: string;
  url: string;
  _links: {
    self: Link;
  };
}

export default Image;
