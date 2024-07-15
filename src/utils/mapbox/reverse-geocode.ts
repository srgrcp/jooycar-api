import axios from 'axios';
import { Point } from 'geojson';
import { MapboxFeatureCollection } from './mapbox-feature-collection';

export const reverseGeocode = async ({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}) => {
  const response = await axios
    .get<
      MapboxFeatureCollection<Point>
    >(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?access_token=${process.env.MAPBOX_ACCESS_TOKEN}`)
    .then(res => res.data);

  return response?.features[0]?.place_name;
};
