import { ArrayMinSize, ValidateNested } from 'class-validator';
import { ReadingDTO } from './reading.dto';
import { Type } from 'class-transformer';

export class ReadingListDTO {
  @Type(() => ReadingDTO)
  @ValidateNested({ each: true })
  @ArrayMinSize(5)
  readings: ReadingDTO[];
}
