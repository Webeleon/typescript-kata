import { VechicleAction, Vehicle } from "./vehicle";
import { ApplicationEvent } from "./event";
import { reducer } from "./reducer";

describe("Vehicle reducer", () => {
  describe("create vehicles", () => {
    it("create a vehicle", () => {
      const events: ApplicationEvent<VechicleAction, Vehicle>[] = [
        {
          version: 1,
          createdAt: new Date(),
          action: VechicleAction.CREATE,
          data: {
            registrationNumber: "aa123aa",
            priceInCents: 1000000,
          },
        },
      ];

      const vehicles = reducer(events);
      expect(vehicles).toStrictEqual([
        {
          registrationNumber: "aa123aa",
          priceInCents: 1000000,
        },
      ]);
    });
    it("create two vehicle", () => {
      const events: ApplicationEvent<VechicleAction, Vehicle>[] = [
        {
          version: 1,
          createdAt: new Date(),
          action: VechicleAction.CREATE,
          data: {
            registrationNumber: "aa123aa",
            priceInCents: 1000000,
          },
        },
        {
          version: 1,
          createdAt: new Date(),
          action: VechicleAction.CREATE,
          data: {
            registrationNumber: "zz999zz",
          },
        },
      ];

      const vehicles = reducer(events);
      expect(vehicles).toStrictEqual([
        {
          registrationNumber: "aa123aa",
          priceInCents: 1000000,
        },
        {
          registrationNumber: "zz999zz",
        },
      ]);
    });
  });
  describe("update vehicles", () => {
    it("update a vehicle", () => {
      const events: ApplicationEvent<VechicleAction, Vehicle>[] = [
        {
          version: 1,
          createdAt: new Date(),
          action: VechicleAction.CREATE,
          data: {
            registrationNumber: "aa123aa",
            priceInCents: 1000000,
          },
        },
        {
          version: 2,
          createdAt: new Date(),
          action: VechicleAction.UPDATE,
          data: {
            registrationNumber: "aa123aa",
            priceInCents: 2000000,
          },
        },
      ];

      const vehicles = reducer(events);
      expect(vehicles).toStrictEqual([
        {
          registrationNumber: "aa123aa",
          priceInCents: 2000000,
        },
      ]);
    });
    it("update a vehicle with two vehicle stored", () => {
      const events: ApplicationEvent<VechicleAction, Vehicle>[] = [
        {
          version: 1,
          createdAt: new Date(),
          action: VechicleAction.CREATE,
          data: {
            registrationNumber: "aa123aa",
            priceInCents: 1000000,
          },
        },
        {
          version: 1,
          createdAt: new Date(),
          action: VechicleAction.CREATE,
          data: {
            registrationNumber: "zz999zz",
          },
        },
        {
          version: 2,
          createdAt: new Date(),
          action: VechicleAction.UPDATE,
          data: {
            registrationNumber: "aa123aa",
            priceInCents: 2000000,
          },
        },
      ];

      const vehicles = reducer(events);
      expect(vehicles).toStrictEqual([
        {
          registrationNumber: "aa123aa",
          priceInCents: 2000000,
        },
        {
          registrationNumber: "zz999zz",
        },
      ]);
    });
  });

  describe("delete vehicles", () => {
    it("delete a vehicle", () => {
      const events: ApplicationEvent<VechicleAction, Vehicle>[] = [
        {
          version: 1,
          createdAt: new Date(),
          action: VechicleAction.CREATE,
          data: {
            registrationNumber: "aa123aa",
            priceInCents: 1000000,
          },
        },
        {
          version: 2,
          createdAt: new Date(),
          action: VechicleAction.DELETE,
          data: {
            registrationNumber: "aa123aa",
            priceInCents: 1000000,
          },
        },
      ];

      const vehicles = reducer(events);
      expect(vehicles).toStrictEqual([]);
    });
    it("delete a vehicle with two vehicle stored", () => {
      const events: ApplicationEvent<VechicleAction, Vehicle>[] = [
        {
          version: 1,
          createdAt: new Date(),
          action: VechicleAction.CREATE,
          data: {
            registrationNumber: "aa123aa",
            priceInCents: 1000000,
          },
        },
        {
          version: 1,
          createdAt: new Date(),
          action: VechicleAction.CREATE,
          data: {
            registrationNumber: "zz999zz",
          },
        },
        {
          version: 2,
          createdAt: new Date(),
          action: VechicleAction.DELETE,
          data: {
            registrationNumber: "aa123aa",
            priceInCents: 1000000,
          },
        },
      ];

      const vehicles = reducer(events);
      expect(vehicles).toStrictEqual([
        {
          registrationNumber: "zz999zz",
        },
      ]);
    });
  });
});
