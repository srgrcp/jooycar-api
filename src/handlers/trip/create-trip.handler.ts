import { getBounds } from 'geolib';
import { ReadingListDTO } from '../../dto/reading-list.dto';
import { Trip, TripModel } from '../../models/trip';
import { calculateDurationDistance } from '../../utils/calculate-duration-distance';
import { reverseGeocode } from '../../utils/mapbox/reverse-geocode';
import { ReadingDTO } from '../../dto/reading.dto';
import { plainToInstance } from 'class-transformer';

const getStartEnd = async (readings: ReadingDTO[]) => {
  const startReading = readings[0];
  const endReading = readings[readings.length - 1];

  const [startAddress, endAddress] = await Promise.all([
    reverseGeocode({
      lat: startReading.location.lat,
      lon: startReading.location.lon,
    }),
    reverseGeocode({
      lat: endReading.location.lat,
      lon: endReading.location.lon,
    }),
  ]);

  return {
    start: {
      address: startAddress,
      lat: startReading.location.lat,
      lon: startReading.location.lon,
      time: startReading.time,
    },
    end: {
      address: endAddress,
      lat: endReading.location.lat,
      lon: endReading.location.lon,
      time: endReading.time,
    },
  };
};

const getBoundingBox = (readings: ReadingDTO[]) => {
  const bounds = getBounds(
    readings.map(reading => ({
      latitude: reading.location.lat,
      longitude: reading.location.lon,
    })),
  );

  return [
    { lat: bounds.minLat, lon: bounds.minLng },
    { lat: bounds.minLat, lon: bounds.maxLng },
    { lat: bounds.maxLat, lon: bounds.maxLng },
    { lat: bounds.maxLat, lon: bounds.minLng },
  ];
};

const createTrip = async (readingList: ReadingListDTO) => {
  const { readings } = readingList;

  readings.sort((a, b) => a.time - b.time);

  const { start, end } = await getStartEnd(readings);

  const { distance, duration, overspeedsCount } =
    calculateDurationDistance(readings);

  const boundingBox = getBoundingBox(readings);

  const trip = new TripModel({
    start,
    end,
    distance,
    duration,
    overspeedsCount,
    boundingBox,
  });

  return trip;
};

export const createTripHandler = async (readingList: ReadingListDTO) => {
  const trip = await createTrip(readingList);

  await trip.save();

  const tripObject = trip.toObject();
  return plainToInstance(Trip, tripObject);
};
