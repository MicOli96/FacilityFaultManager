// Fikaklockan – räknar ut hur länge det är kvar till nästa fika.
// Ingen API behövs, bara klockan i telefonen.

const FIKA_TIMES = [
  { hour: 9, minute: 30 },
  { hour: 14, minute: 30 },
];

// Hur länge en fika varar, i minuter
const FIKA_LENGTH = 20;

export function getFikaText(now: Date, isDayOff: boolean): string {
  if (isDayOff) {
    return "Ledig dag – fika hemma i dag!";
  }

  // Räknar allt i minuter sedan midnatt, så blir det lätt att jämföra
  const nowInMinutes = now.getHours() * 60 + now.getMinutes();

  for (const fika of FIKA_TIMES) {
    const fikaStart = fika.hour * 60 + fika.minute;

    if (nowInMinutes >= fikaStart && nowInMinutes < fikaStart + FIKA_LENGTH) {
      return "Det är fika just nu!";
    }

    if (nowInMinutes < fikaStart) {
      return "Nästa fika om " + formatMinutes(fikaStart - nowInMinutes);
    }
  }

  return "Dagens fikor är slut – nya bullar i morgon!";
}

// 80 → "1 h 20 min", 15 → "15 min"
function formatMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;

  if (hours === 0) {
    return `${rest} min`;
  }

  return `${hours} h ${rest} min`;
}
