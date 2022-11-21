export interface Vehicle {
  registrationNumber?: string;
  productionYear?: number;
  priceInCents?: number;
}

export enum VechicleAction {
  CREATE,
  UPDATE,
  DELETE,
}
