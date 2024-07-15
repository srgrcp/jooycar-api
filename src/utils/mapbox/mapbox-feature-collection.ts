import { Feature, GeoJsonProperties, Geometry } from 'geojson';

export interface MapboxFeatureCollection<
  G extends Geometry | null = Geometry,
  P = GeoJsonProperties,
> {
  type: 'FeatureCollection';
  features: Array<MapboxFeature<G, P>>;
}

export interface MapboxFeature<
  G extends Geometry | null = Geometry,
  P = { [name: string]: any },
> extends Feature<G, P> {
  place_name: string;
}
