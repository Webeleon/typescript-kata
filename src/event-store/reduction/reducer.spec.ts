import { VehicleAction, Vehicle } from "./vehicle";
import { ApplicationEvent } from "./event";
import { VehicleService } from "./reducer";

describe("Vehicle reducer", () => {
  describe("createOne", () => {
    it("exists and is a function", () => {
      expect(VehicleService.createOne).toBeInstanceOf(Function);
    });

    it("creates a vehicle", () => {
      const vehicleToCreate: Vehicle = {
        registrationNumber: "aa123aa",
        priceInCents: 1000000,
      };

      expect(VehicleService.createOne(vehicleToCreate, [])).toStrictEqual([
        vehicleToCreate,
      ]);
    });

    it("creates two vehicles", () => {
      let vehicles: Vehicle[] = [];
      const vehicleToCreate1: Vehicle = {
        registrationNumber: "aa123aa",
        priceInCents: 1000000,
      };
      const vehicleToCreate2: Vehicle = {
        registrationNumber: "zz999zz",
      };
      vehicles = VehicleService.createOne(vehicleToCreate1, vehicles);
      vehicles = VehicleService.createOne(vehicleToCreate2, vehicles);

      expect(vehicles).toStrictEqual([vehicleToCreate1, vehicleToCreate2]);
    });
  });

  describe("updateOne", () => {
    it("exists and is a function", () => {
      expect(VehicleService.updateOne).toBeInstanceOf(Function);
    });

    it("updates a vehicle", () => {
      // We don't need to use another function to create vehicles here
      // We can directly initialize the state of the vehicles array
      const vehicles = [
        {
          registrationNumber: "aa123aa",
          priceInCents: 2000000,
        },
      ];

      const res = VehicleService.updateOne(
        {
          registrationNumber: "aa123aa",
          priceInCents: 100000,
        },
        vehicles
      );

      expect(res).toStrictEqual([
        {
          registrationNumber: "aa123aa",
          priceInCents: 100000,
        },
      ]);
    });

    it("updates a vehicle with two vehicles stored", () => {
      // We don't need to use another function to create vehicles here
      // We can directly initialize the state of the vehicles array
      const vehicles = [
        {
          registrationNumber: "aa123aa",
          priceInCents: 1000000,
        },
        {
          registrationNumber: "zz999zz",
        },
      ];

      const res = VehicleService.updateOne(
        {
          registrationNumber: "aa123aa",
          priceInCents: 2000000,
        },
        vehicles
      );

      expect(res).toStrictEqual([
        {
          registrationNumber: "aa123aa",
          priceInCents: 2000000,
        },
        {
          registrationNumber: "zz999zz",
        },
      ]);
    });

    it("updates a vehicle by adding a field", () => {
      const vehicles = [
        {
          registrationNumber: "aa123aa",
        },
      ];

      const res = VehicleService.updateOne(
        {
          registrationNumber: "aa123aa",
          priceInCents: 2000000,
        },
        vehicles
      );

      expect(res).toStrictEqual([
        {
          registrationNumber: "aa123aa",
          priceInCents: 2000000,
        },
      ]);
    });

    it("tries to update a non existing vehicle and don't do it", () => {
      const vehicles = [
        {
          registrationNumber: "aa123aa",
          priceInCents: 2000000,
        },
      ];

      const res = VehicleService.updateOne(
        {
          registrationNumber: "test",
          priceInCents: 2000000,
        },
        vehicles
      );

      expect(res).toStrictEqual([
        {
          registrationNumber: "aa123aa",
          priceInCents: 2000000,
        },
      ]);
    });
  });

  describe("deleteOne", () => {
    it("exists and is a function", () => {
      expect(VehicleService.deleteOne).toBeInstanceOf(Function);
    });

    it("deletes a vehicle", () => {
      const vehicles = [
        {
          registrationNumber: "aa123aa",
          priceInCents: 2000000,
        },
      ];

      const res = VehicleService.deleteOne(
        {
          registrationNumber: "aa123aa",
          priceInCents: 2000000,
        },
        vehicles
      );

      expect(res).toStrictEqual([]);
    });

    it("deletes a vehicle with two vehicle stored", () => {
      const vehicles = [
        {
          registrationNumber: "aa123aa",
          priceInCents: 2000000,
        },
        {
          registrationNumber: "zz999zz",
        },
      ];

      const res = VehicleService.deleteOne(
        {
          registrationNumber: "aa123aa",
          priceInCents: 2000000,
        },
        vehicles
      );

      expect(res).toStrictEqual([
        {
          registrationNumber: "zz999zz",
        },
      ]);
    });

    it("tries to delete a non existant vehicle but don't do it", () => {
      const vehicles = [
        {
          registrationNumber: "aa123aa",
          priceInCents: 2000000,
        },
        {
          registrationNumber: "zz999zz",
        },
      ];

      const res = VehicleService.deleteOne(
        {
          registrationNumber: "test",
          priceInCents: 2000000,
        },
        vehicles
      );

      expect(res).toStrictEqual([
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

  describe("reducer", () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("exists and is a function", () => {
      expect(VehicleService.reducer).toBeInstanceOf(Function);
    });

    it("does one event", () => {
      const events = [
        {
          version: 1,
          createdAt: new Date(),
          action: VehicleAction.CREATE,
          data: {
            registrationNumber: "aa123aa",
            priceInCents: 1000000,
          },
        },
      ];

      const createOneSpy = jest.spyOn(VehicleService, "createOne");

      const res = VehicleService.reducer(events);

      // We can check the values here, but it's not useful, because we already check them
      // into the mutation methods
      expect(res).toStrictEqual([
        {
          registrationNumber: "aa123aa",
          priceInCents: 1000000,
        },
      ]);

      // The important part here is when we check the business part of the tested method, so
      // how many times the called methods have been called
      // I also could check if deleteOne and updateOne are called 0 times, but by the context
      // we can only check this one
      expect(createOneSpy).toBeCalledTimes(1);
    });

    it("handles multiple events", () => {
      const events = [
        {
          // Creation of vehicle 1
          version: 1,
          createdAt: new Date(),
          action: VehicleAction.CREATE,
          data: {
            registrationNumber: "rnb1",
            priceInCents: 1000000,
          },
        },
        {
          // Creation of vehicle 2
          version: 1,
          createdAt: new Date(),
          action: VehicleAction.CREATE,
          data: {
            registrationNumber: "rnb2",
            priceInCents: 1000000,
          },
        },
        {
          // Mutation of vehicle 1
          version: 1,
          createdAt: new Date(),
          action: VehicleAction.UPDATE,
          data: {
            registrationNumber: "rnb1",
            priceInCents: 500000,
          },
        },
        {
          // Deletion of vehicle 2
          version: 1,
          createdAt: new Date(),
          action: VehicleAction.DELETE,
          data: {
            registrationNumber: "rnb2",
            priceInCents: 1000000,
          },
        },
      ];

      const createOneSpy = jest.spyOn(VehicleService, "createOne");
      const updateOneSpy = jest.spyOn(VehicleService, "updateOne");
      const deleteOneSpy = jest.spyOn(VehicleService, "deleteOne");

      const res = VehicleService.reducer(events);

      // We should only have the first vehicule which is mutated
      expect(res).toStrictEqual([
        {
          registrationNumber: "rnb1",
          priceInCents: 500000,
        },
      ]);

      expect(createOneSpy).toBeCalledTimes(2);
      expect(updateOneSpy).toBeCalledTimes(1);
      expect(deleteOneSpy).toBeCalledTimes(1);
    });
  });
});
