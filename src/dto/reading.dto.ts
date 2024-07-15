import { Type } from 'class-transformer';
import { IsNumber, ValidateNested } from 'class-validator';

export class LocationDTO {
  @IsNumber()
  lat: number;

  @IsNumber()
  lon: number;
}

export class ReadingDTO {
  @IsNumber()
  time: number;

  @ValidateNested()
  @Type(() => LocationDTO)
  location: LocationDTO;

  @IsNumber()
  speed: number;

  @IsNumber()
  speedLimit: number;
}
