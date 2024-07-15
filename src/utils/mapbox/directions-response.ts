export interface DirectionsResponse {
  routes: Route[];
  code: string;
}

export interface Route {
  duration: number;
  distance: number;
}
