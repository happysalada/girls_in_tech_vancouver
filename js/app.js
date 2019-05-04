import { Map } from './map';

document.addEventListener("DOMContentLoaded", function() {
  let mapElement = document.getElementById('map');

  Map.loadGoogleMapsApi().then(function(googleMaps) {
    Map.createMap(googleMaps, mapElement);
  });

});
