import { ApplicationEvent } from "./event";
import { VehicleAction, Vehicle } from "./vehicle";

/**
 * I created this to put them into a common entity (Vehicle) handling service
 * And to be able to count the number of times that I called each method
 * I call my methods createOne, updateOne and deleteOne because we are
 * into the services of vehicles and by "One", I refer to the current context
 * of vehicles
 *
 * @class Vehicle handling class
 */
export class VehicleService {
  /**
   * Inserts a vehicle into the database
   * We don't need an instance of the class, so we can put it at static
   *
   * @param {Vehicle} data the vehicle data into the event
   * @param {Vehicle[]} vehicles the vehicles database
   *
   * @returns {Vehicle[]} the updated vehicle database
   */
  static createOne(data: Vehicle, vehicles: Vehicle[]): Vehicle[] {
    // We copy the array here to not have to mutate the argument
    const vehiclesToRet: Vehicle[] = [...vehicles];

    vehiclesToRet.push(data);
    return vehiclesToRet;
  }

  /**
   * Updates a vehicle into the database if it exists
   * We don't need an instance of the class, so we can put it at static
   *
   * @param {Vehicle} data the vehicle data into the event
   * @param {Vehicle[]} vehicles the vehicles database
   *
   * @returns {Vehicle[]} the updated vehicle database
   */
  static updateOne(data: Vehicle, vehicles: Vehicle[]): Vehicle[] {
    // We copy the array here to not have to mutate the argument
    const vehiclesToRet: Vehicle[] = [...vehicles];

    // We search and update the data for an item if it exists
    const itemIndex = vehiclesToRet.findIndex(
      (vehicle) => vehicle.registrationNumber === data.registrationNumber
    );
    if (itemIndex !== -1) {
      vehiclesToRet[itemIndex] = data;
    }

    return vehiclesToRet;
  }

  /**
   * Deletes a vehicle into the database if it exists
   * We don't need an instance of the class, so we can put it at static
   *
   * @param {Vehicle} data the vehicle data into the event
   * @param {Vehicle[]} vehicles the vehicles database
   *
   * @returns {Vehicle[]} the updated vehicle database
   */
  static deleteOne(data: Vehicle, vehicles: Vehicle[]): Vehicle[] {
    // We copy the array here to not have to mutate the argument
    const vehiclesToRet: Vehicle[] = [...vehicles];

    // We search and delete the item if it exists
    const itemIndex = vehiclesToRet.findIndex(
      (vehicle) => vehicle.registrationNumber === data.registrationNumber
    );
    if (itemIndex !== -1) {
      vehiclesToRet.splice(itemIndex, 1);
    }

    return vehiclesToRet;
  }

  /**
   * write an event reducer taking a list of events and returning the proper list of vehicles
   * Refactor as much as needed/wanted
   * Using a memory store in an array
   * You can increase the complexity as long as the base test pass, add test as needed.
   */

  /**
   * Executes the given vehicle actions
   * We don't need an instance of the class, so we can put it at static
   *
   * @param {ApplicationEvent<VehicleAction, Vehicle>[]} events
   *
   * @returns {Vehicle[]}
   */
  static reducer(
    events: ApplicationEvent<VehicleAction, Vehicle>[]
  ): Vehicle[] {
    let vehicles = [];

    // Because of all the needed data being into the event.data, we don't need to pass all the event.
    // If we needed to pass for example the creation date (which can be now() or event.createdAt), we
    // would need to pass the whole event
    events.forEach((event: ApplicationEvent<VehicleAction, Vehicle>) => {
      switch (event.action) {
        case VehicleAction.CREATE:
          vehicles = VehicleService.createOne(event.data, vehicles);
          break;
        case VehicleAction.UPDATE:
          vehicles = VehicleService.updateOne(event.data, vehicles);
          break;
        case VehicleAction.DELETE:
          // We could also only use the registrationNumber for the deletion function because we only it to delete
          vehicles = VehicleService.deleteOne(event.data, vehicles);
          break;
      }
    });

    return vehicles;
  }
}
