import { ReadingDTO } from '../dto/reading.dto';
import { getDistance, convertDistance } from 'geolib';

export const calculateDurationDistance = (readings: ReadingDTO[]) => {
  let totalDistance = 0;
  let totalDuration = 0;
  let overspeedsCount = 0;

  for (let i = 0; i < readings.length - 1; i++) {
    const start = readings[i];
    const end = readings[i + 1];

    const distance = convertDistance(
      getDistance(
        { latitude: start.location.lat, longitude: start.location.lon },
        { latitude: end.location.lat, longitude: end.location.lon },
      ),
      'km',
    );

    const duration = Math.abs(end.time - start.time);

    const speed = distance / (duration / 3600);

    totalDistance += distance;
    totalDuration += duration;
    if (speed > start.speedLimit) {
      overspeedsCount++;
    }
  }

  return {
    distance: totalDistance,
    duration: totalDuration,
    overspeedsCount,
  };
};
