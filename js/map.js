const loadGoogleMapsApi = require('load-google-maps-api');
const historical = require('../historical_fires.json');

const utcDate = (str) => (new Date(str.replace(' ', 'T') + 'Z'))
class Map {

  static loadGoogleMapsApi() {
    return loadGoogleMapsApi({ key: process.env.GOOGLEMAPS_KEY, libraries: ['visualization'] });
  }

  static createMap(googleMaps, mapElement, {month: filterMonth, day: filterDay}) {
    const map = new googleMaps.Map(mapElement, {
      center: { lat: 43.7267, lng: -109.6476 },
      zoom: 3
    });
    // const heatmapData = [];
    // for (let i = 100; i < 200; i++) {
    //   const coords = fireRisk.features[i].geometry.coordinates;
    //   const latLng = new googleMaps.LatLng(coords[1], coords[0]);
    //   heatmapData.push(latLng);
    // }

    const color = (fwi) => {
      if(fwi<5) return 'blue'
      if(fwi<10) return 'green'
      if(fwi<20) return 'yellow'
      if(fwi<30) return 'orange'
      return 'red'
    }

    historical
      .filter(({rep_date}) => {
        const repdate = utcDate(rep_date)
        const day = repdate.getDate();
        const month = repdate.getMonth() + 1;
        return filterMonth && month == filterMonth && day == filterDay
      })
      .map(({ lat, lon, estarea, fwi}) => {
        new google.maps.Marker({
          position: new googleMaps.LatLng(lat ,lon),
          map: map,
          icon: {
            path: googleMaps.SymbolPath.CIRCLE,
            fillColor: color(fwi),
            fillOpacity: .2,
            scale: estarea / 7,
            strokeColor: 'white',
            strokeWeight: .5
          }
        });
      })

  }
}

export { Map };
