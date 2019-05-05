const loadGoogleMapsApi = require('load-google-maps-api');
const historical = require('../historical_fires.json');

class Map {

  static loadGoogleMapsApi() {
    return loadGoogleMapsApi({ key: process.env.GOOGLEMAPS_KEY });
  }

  static createMap(googleMaps, mapElement) {
    const map = new googleMaps.Map(mapElement, {
      center: { lat: 53.7267, lng: -119.6476 },
      zoom: 7
    });
    historical
      .map(({ lat, lon }) => {
      const latLng = new google.maps.LatLng(lat, lon);
      new google.maps.Marker({
        position: latLng,
        map: map
      });
    })
  }
}

export { Map };
