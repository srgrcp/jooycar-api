import express from 'express';
import { TripController } from '../controllers/trip.controllet';

const tripRouter = express.Router();

tripRouter.get('/:tripId', TripController.getTripById);
tripRouter.get('/', TripController.getTrips);
tripRouter.post('/', TripController.createTrip);

export default tripRouter;
export const tripPath = 'trips';
