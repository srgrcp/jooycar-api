import { plainToInstance } from 'class-transformer';
import { TripsQueryDTO } from './trips-query.dto';
import { validateSync } from 'class-validator';

describe('TripsQueryDto', () => {
  it('should pass if all fields are valid', () => {
    const queryParams = {
      startGte: '0',
      startLte: '0',
      distanceGte: '0',
      limit: '0',
      offset: '0',
    };
    const tripsQueryDto = plainToInstance(TripsQueryDTO, queryParams);

    const errors = validateSync(tripsQueryDto);

    expect(errors).toHaveLength(0);
    expect(typeof tripsQueryDto.distanceGte).toBe('number');
  });

  it('should generate default values if empty object is provided and pass', () => {
    const tripsQueryDto = plainToInstance(TripsQueryDTO, {});

    const errors = validateSync(tripsQueryDto);

    expect(errors).toHaveLength(0);
    expect(tripsQueryDto.distanceGte).toBe(0.05);
    expect(tripsQueryDto.limit).toBe(20);
    expect(tripsQueryDto.offset).toBe(0);
  });

  it('should fail if startGte is not a number', () => {
    const tripsQueryDto = plainToInstance(TripsQueryDTO, { startGte: 'a' });

    const errors = validateSync(tripsQueryDto);

    expect(errors).toHaveLength(1);
    expect(
      errors[0].constraints.isNumber.startsWith('startGte must be a number'),
    ).toBe(true);
  });
});
