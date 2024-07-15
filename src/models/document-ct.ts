import { Exclude, Expose, Transform } from 'class-transformer';

export class Document {
  @Expose()
  @Transform(value => value.obj._id?.toString())
  public id: string;

  @Exclude()
  public _id: string;

  @Exclude()
  public __v: number;
}
