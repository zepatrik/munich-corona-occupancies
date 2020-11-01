# Munich Corona Occupancies

This repository can be used as a JSON API to get the current and historical occupancy
data for various free time activity places in and around Munich.
For a full list of locations, use the [location index](./data/locations.json).

# API Endpoints

Note that all dates and timestamps are in CET, the local time for Munich.

## Location Index

To get all information about the locations, use the location index endpoint.

```
GET https://raw.githubusercontent.com/zepatrik/munich-corona-occupancies/main/data/locations.json
```

Example response:

```
TODO https://github.com/zepatrik/munich-corona-occupancies/issues/18
```

## Occupancy per Location and Date

```
GET https://raw.githubusercontent.com/zepatrik/munich-corona-occupancies/main/data/<location-id>/<year>-<month>-<day>.json
```

Example response:

```json
[
  {
    "count": 14,
    "maximum": 160,
    "percent": 9,
    "queue": 0,
    "timestamp": "2020-10-25T01:49:06.000Z"
  },
  {}
]
```

The location ID can be fetched from the [location index](#location-index)
