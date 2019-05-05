const loadGoogleMapsApi = require('load-google-maps-api');
const historical = require('../historical_fires.json');
const fireRisk = require('../fire_in_danger_scribe.json');

class Map {

  static loadGoogleMapsApi() {
    return loadGoogleMapsApi({ key: process.env.GOOGLEMAPS_KEY, libraries: ['visualization'] });
  }

  static createMap(googleMaps, mapElement) {
    const map = new googleMaps.Map(mapElement, {
      center: { lat: 53.7267, lng: -119.6476 },
      zoom: 7
    });
    const heatmapData = [];
    for (let i = 0; i < fireRisk.features.length; i++) {
      const coords = fireRisk.features[i].geometry.coordinates;
      const latLng = new googleMaps.LatLng(coords[1], coords[0]);
      heatmapData.push(latLng);
    }
    new googleMaps.visualization.HeatmapLayer({
      data: heatmapData,
      dissipating: false,
      map: map
    });
    // historical
    //   .map(({ lat, lon }) => {
    //     const latLng = new google.maps.LatLng(lat, lon);
    //     new google.maps.Marker({
    //       position: latLng,
    //       map: map
    //     });
    //   })
  }
}

export { Map };
