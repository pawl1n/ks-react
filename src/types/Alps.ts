export enum Type {
  SEMANTIC = "SEMANTIC",
  SAFE = "SAFE",
}

export default interface Alps {
  alps: {
    version: number;
    descriptor: Descriptor[];
  };
}

interface Descriptor {
  id: string;
  href?: string;
  descriptor: Column[];
}

export interface Column {
  name: string;
  type: Type;
  rt?: string;
}
