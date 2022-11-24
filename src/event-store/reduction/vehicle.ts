export interface Vehicle {
  registrationNumber?: string;
  productionYear?: number;
  priceInCents?: number;
}

export enum VehicleAction {
  CREATE,
  UPDATE,
  DELETE,
}
