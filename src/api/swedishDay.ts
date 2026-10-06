// Hämtar information om dagens datum från Svenska dagar-API:t (ingen API-nyckel behövs)
const DAY_URL = "https://sholiday.faboul.se/dagar/v2.1/";

export interface SwedishDay {
  weekday: string;
  week: string;
  isDayOff: boolean;
}

export async function getToday(): Promise<SwedishDay> {
  const today = new Date();
  const year = today.getFullYear();
  // padStart gör att t.ex. 6 blir "06", som API:t vill ha
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const res = await fetch(`${DAY_URL}${year}/${month}/${day}`);

  // fetch ger bara fel om servern inte går att nå alls.
  // Svarar servern med t.ex. 404 eller 500 måste vi själva kolla det.
  if (!res.ok) {
    throw new Error("Dagen kunde inte hämtas: " + res.status);
  }

  const data = await res.json();
  const todayData = data.dagar[0];

  return {
    weekday: todayData.veckodag,
    week: todayData.vecka,
    // Namnet har mellanslag, så det måste skrivas med hakparenteser i stället för punkt
    isDayOff: todayData["arbetsfri dag"] === "Ja",
  };
}
