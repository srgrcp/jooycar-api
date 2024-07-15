import { plainToInstance } from 'class-transformer';
import { TripsQueryDTO } from '../../dto/trips-query.dto';
import { Trip, TripModel } from '../../models/trip';
import { FilterQuery } from 'mongoose';

export const getTripsHandler = async (tripsQuery: TripsQueryDTO) => {
  const filterQuery: FilterQuery<Trip> = {};

  if (tripsQuery.startGte) {
    filterQuery['start.time'] = {
      $gte: tripsQuery.startGte,
    };
  }

  if (tripsQuery.startLte) {
    filterQuery['start.time'] = {
      ...filterQuery['start.time'],
      $lte: tripsQuery.startLte,
    };
  }

  if (tripsQuery.distanceGte) {
    filterQuery.distance = {
      $gte: tripsQuery.distanceGte,
    };
  }

  const trips = await TripModel.find(filterQuery)
    .limit(tripsQuery.limit)
    .skip(tripsQuery.offset)
    .lean()
    .exec();

  const total = await TripModel.countDocuments(filterQuery);

  return {
    data: plainToInstance(Trip, trips),
    total,
  };
};
