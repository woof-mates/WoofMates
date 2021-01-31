// generates random integer between 0 and max (not inclusive)
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getRandomIntBetween(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

// gets distance between 2 sets of latitude/longitude
function getDistance (lat1, lon1, lat2, lon2) {
  const earthRadiusMiles = 3959; // earth radius in miles https://en.wikipedia.org/wiki/Earth_radius
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  lat1 = toRad(lat1);
  lat2 = toRad(lat2);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceMiles = earthRadiusMiles * c;
  return distanceMiles;
}

// Converts numeric degrees to radians
function toRad(value) {
  return value * Math.PI / 180;
}

module.exports = { getRandomInt, getDistance, getRandomIntBetween };
