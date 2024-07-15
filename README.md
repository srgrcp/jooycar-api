# Jooycar Assessment

## Frontend Stack

- Vue.js
- Nuxt
- Tailwind CSS
- Typescript
- mapbox-gl
- Varnish

## Backend Stack

- Node.js
- Typescript
- Express
- class-validator
- class-transformer
- Typegoose
- MongoDB
- Jest

## Requirements

- Docker
- Docker Compose
- Git
- Make

## Instructions

### Clone repositories

```bash
git clone git@github.com:srgrcp/jooycar-web.git
git clone git@github.com:srgrcp/jooycar-api.git
```

### Build frontend image

```bash
cd jooycar-web
make docker-build
```

### Build backend image and run services with docker compose

```bash
cd ../jooycar-api
make docker-up
```

### Open browser

- Open [http://localhost:8080](http://localhost:8080) (Varnish cached frontend app)
- Open [http://localhost:3000](http://localhost:3000) (Nuxt app)

### API Endpoints

#### POST [http://localhost:4000/api/trips](http://localhost:4000/api/trips)

<details>
  <summary><i>Body</i></summary>

```json
{
  "readings": [
    {
      "time": 1642500462000,
      "speed": 9,
      "speedLimit": 38,
      "location": {
        "lat": -33.580158,
        "lon": -70.567227
      }
    },
    {
      "time": 1642500466000,
      "speed": 26,
      "speedLimit": 38,
      "location": {
        "lat": -33.58013,
        "lon": -70.566995
      }
    },
    {
      "time": 1642500470000,
      "speed": 28,
      "speedLimit": 38,
      "location": {
        "lat": -33.580117,
        "lon": -70.566633
      }
    },
    {
      "time": 1642500474000,
      "speed": 13,
      "speedLimit": 38,
      "location": {
        "lat": -33.580078,
        "lon": -70.566408
      }
    },
    {
      "time": 1642500478000,
      "speed": 18,
      "speedLimit": 38,
      "location": {
        "lat": -33.580005,
        "lon": -70.566498
      }
    },
    {
      "time": 1642500482000,
      "speed": 32,
      "speedLimit": 38,
      "location": {
        "lat": -33.58002,
        "lon": -70.566837
      }
    },
    {
      "time": 1642500486000,
      "speed": 38,
      "speedLimit": 38,
      "location": {
        "lat": -33.580038,
        "lon": -70.567265
      }
    },
    {
      "time": 1642500490000,
      "speed": 38,
      "speedLimit": 38,
      "location": {
        "lat": -33.580043,
        "lon": -70.56773
      }
    },
    {
      "time": 1642500494000,
      "speed": 35,
      "speedLimit": 38,
      "location": {
        "lat": -33.580048,
        "lon": -70.56817
      }
    },
    {
      "time": 1642500498000,
      "speed": 20,
      "speedLimit": 38,
      "location": {
        "lat": -33.580053,
        "lon": -70.568502
      }
    }
  ]
}
```

</details>

#### GET [http://localhost:4000/api/trips](http://localhost:4000/api/trips)

##### Query params

- `startGte` (number)
- `startLte` (number)
- `distanceGte` (number)
- `limit` (number)
- `offset` (number)

### Stop services

```bash
# from jooycar-api directory
make docker-down
```

### Run tests (backend only)

- Install dependencies `npm install`
- Run tests `npm run test`
