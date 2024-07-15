import { getModelForClass, Prop } from '@typegoose/typegoose';
import { Document as DocumentCT } from './document-ct';
import { Expose, Type } from 'class-transformer';

export class TripStep extends DocumentCT {
  @Prop({ type: Number, required: true, index: true })
  @Expose()
  time: number;

  @Prop({ type: Number, required: true })
  @Expose()
  lat: number;

  @Prop({ type: Number, required: true })
  @Expose()
  lon: number;

  @Prop({ type: String, required: true })
  @Expose()
  address: string;
}

export class LatLon extends DocumentCT {
  @Prop({ type: Number, required: true })
  @Expose()
  lat: number;

  @Prop({ type: Number, required: true })
  @Expose()
  lon: number;
}

export class Trip extends DocumentCT {
  @Prop({ required: true })
  @Type(() => TripStep)
  start: TripStep;

  @Prop({ required: true })
  @Type(() => TripStep)
  end: TripStep;

  @Prop({ type: Number, required: true, index: true })
  @Expose()
  distance: number;

  @Prop({ type: Number, required: true })
  @Expose()
  duration: number;

  @Prop({ type: Number, required: true })
  @Expose()
  overspeedsCount: number;

  @Prop({ required: true })
  @Type(() => LatLon)
  boundingBox: LatLon[];
}

export const TripModel = getModelForClass(Trip);
