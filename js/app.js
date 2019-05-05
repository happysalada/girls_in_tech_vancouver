import { Map } from './map';

const getUrlParameter = (name) => {
  const results = new RegExp('[\\?&]' + name + '=([^&#?]*)').exec(window.location.href);
  if (results == null) { return null; }
  else { return results[1] || 0; }
}

document.addEventListener("DOMContentLoaded", function () {
  let mapElement = document.getElementById('map');

  const day = getUrlParameter("day");
  const month = getUrlParameter("month");
  Map.loadGoogleMapsApi()
    .then((googleMaps) => Map.createMap(googleMaps, mapElement, { day, month }));

});
