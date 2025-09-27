function cToF(celsius: number) {
  return (celsius * 9) / 5 + 32;
}

function kmhToMph(kmh: number) {
  return kmh / 1.609;
}

function mmToInch(mm: number) {
  return mm / 25.4;
}

const mToKm = (m: number) => m / 1000;
const mToMiles = (m: number) => m / 1609;
const hPaToInHg = (hPa: number) => hPa * 0.02953;

export { cToF, kmhToMph, mmToInch, mToKm, mToMiles, hPaToInHg };
