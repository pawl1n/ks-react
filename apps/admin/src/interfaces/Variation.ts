import { ApiResponseEntity, Link } from './apiResponse';

export type VariationRequest = {
  name: string;
};

export interface VariationOption extends ApiResponseEntity {
  variationId: number;
  value: string;
  _links: {
    self: Link;
  };
}

export type VariationOptionRequest = {
  value: string;
};

export type VariationOptionRequestParams = {
  variation: Variation;
  option: VariationOptionRequest;
};

interface Variation extends ApiResponseEntity {
  id: number;
  name: string;
  _links: {
    self: Link;
    options: Link;
  };
}

export default Variation;
