import { Request, Response } from 'express';
import { ValidateBody } from '../utils/validate-body';
import { ReadingListDTO } from '../dto/reading-list.dto';
import { createTripHandler } from '../handlers/trip/create-trip.handler';
import { getTripsHandler } from '../handlers/trip/get-trips.handler';
import { ValidateQuery } from '../utils/validate-query';
import { TripsQueryDTO } from '../dto/trips-query.dto';
import { getTripByIdHandler } from '../handlers/trip/get-trip-by-id.handler';

export class TripController {
  public static async getTripById(req: Request, res: Response) {
    const tripId = req.params.tripId;

    res.send(await getTripByIdHandler(tripId));
  }

  @ValidateQuery(TripsQueryDTO)
  public static async getTrips(req: Request, res: Response) {
    const tripsQuery = req.query as TripsQueryDTO;

    res.send(await getTripsHandler(tripsQuery));
  }

  @ValidateBody(ReadingListDTO)
  public static async createTrip(req: Request, res: Response) {
    const ReadingList = req.body as ReadingListDTO;

    res.send(await createTripHandler(ReadingList));
  }
}
