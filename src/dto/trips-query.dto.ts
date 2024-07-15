import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class TripsQueryDTO {
  @IsNumber()
  @IsOptional()
  @Transform(value => parseFloat(value.value))
  startGte?: number;

  @IsNumber()
  @IsOptional()
  @Transform(value => parseFloat(value.value))
  startLte?: number;

  @IsNumber()
  @IsOptional()
  @Transform(value => parseFloat(value.value))
  distanceGte?: number = 0.05;

  @IsNumber()
  @IsOptional()
  @Transform(value => parseFloat(value.value))
  limit?: number = 20;

  @IsNumber()
  @IsOptional()
  @Transform(value => parseFloat(value.value))
  offset?: number = 0;
}
