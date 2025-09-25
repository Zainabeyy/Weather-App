function cToF(celsius: number) {
  return (celsius * 9) / 5 + 32;
}

function kmhToMph(kmh: number) {
  return kmh / 1.609;
}

function mmToInch(mm: number) {
  return mm / 25.4;
}

export {cToF, kmhToMph, mmToInch};
