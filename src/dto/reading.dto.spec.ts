import { plainToInstance } from 'class-transformer';
import { ReadingDTO } from './reading.dto';
import { validateSync } from 'class-validator';

describe('ReadingDto', () => {
  it('should fail if expected number is a string', () => {
    const readingPojo = {
      time: 1642500462000,
      speed: 9,
      speedLimit: '38',
      location: {
        lat: -33.580158,
        lon: -70.567227,
      },
    };
    const readingInstance = plainToInstance(ReadingDTO, readingPojo);

    const errors = validateSync(readingInstance);

    expect(errors).toHaveLength(1);
  });

  it('should fail if there is a missing required field', () => {
    const readingPojo = {
      time: 1642500462000,
      speed: 9,
      speedLimit: 38,
      location: {
        lon: -70.567227,
      },
    };
    const readingInstance = plainToInstance(ReadingDTO, readingPojo);

    const errors = validateSync(readingInstance);

    expect(errors).toHaveLength(1);
  });

  it('should pass if all fields are valid', () => {
    const readingPojo = {
      time: 1642500462000,
      speed: 9,
      speedLimit: 38,
      location: {
        lat: -33.580158,
        lon: -70.567227,
      },
    };
    const readingInstance = plainToInstance(ReadingDTO, readingPojo);

    const errors = validateSync(readingInstance);

    expect(errors).toHaveLength(0);
  });
});
