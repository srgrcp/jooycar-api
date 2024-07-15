import { plainToInstance } from 'class-transformer';
import { ReadingListDTO } from './reading-list.dto';
import { validateSync } from 'class-validator';

describe('ReadingListDto', () => {
  it('should fail if array length is less than 5', () => {
    const readingsPojo = {
      readings: [
        {
          time: 1642500462000,
          speed: 9,
          speedLimit: 38,
          location: {
            lat: -33.580158,
            lon: -70.567227,
          },
        },
        {
          time: 1642500466000,
          speed: 26,
          speedLimit: 38,
          location: {
            lat: -33.58013,
            lon: -70.566995,
          },
        },
        {
          time: 1642500470000,
          speed: 28,
          speedLimit: 38,
          location: {
            lat: -33.580117,
            lon: -70.566633,
          },
        },
      ],
    };
    const readingsInstance = plainToInstance(ReadingListDTO, readingsPojo);

    const errors = validateSync(readingsInstance);

    expect(errors).toHaveLength(1);
  });

  it('should pass if array length is 5', () => {
    const readingsPojo = {
      readings: [
        {
          time: 1642500462000,
          speed: 9,
          speedLimit: 38,
          location: {
            lat: -33.580158,
            lon: -70.567227,
          },
        },
        {
          time: 1642500466000,
          speed: 26,
          speedLimit: 38,
          location: {
            lat: -33.58013,
            lon: -70.566995,
          },
        },
        {
          time: 1642500470000,
          speed: 28,
          speedLimit: 38,
          location: {
            lat: -33.580117,
            lon: -70.566633,
          },
        },
        {
          time: 1642500474000,
          speed: 30,
          speedLimit: 38,
          location: {
            lat: -33.580095,
            lon: -70.566372,
          },
        },
        {
          time: 1642500478000,
          speed: 32,
          speedLimit: 38,
          location: {
            lat: -33.58007,
            lon: -70.56612,
          },
        },
      ],
    };
    const readingsInstance = plainToInstance(ReadingListDTO, readingsPojo);

    const errors = validateSync(readingsInstance);

    expect(errors).toHaveLength(0);
  });
});
