import { plainToInstance } from 'class-transformer';
import { Trip, TripModel } from '../../models/trip';

export const getTripByIdHandler = async (tripId: string) => {
  const trip = await TripModel.findById(tripId).lean().exec();

  return plainToInstance(Trip, trip);
};
