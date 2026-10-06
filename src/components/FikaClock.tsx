import { getToday, SwedishDay } from "@/api/swedishDay";
import { getFikaText } from "@/utils/fika";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function FikaClock() {
  const [day, setDay] = useState<SwedishDay>();
  const [dayError, setDayError] = useState(false);
  const [now, setNow] = useState(new Date());

  // Hämtar dagens veckodag och vecka en gång när rutan visas
  useEffect(() => {
    async function fetchDay() {
      try {
        const data = await getToday();
        setDay(data);
      } catch {
        setDayError(true);
      }
    }

    fetchDay();
  }, []);

  // Uppdaterar klockan varje minut så att nedräkningen stämmer
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60 * 1000);

    // Stänger av timern när rutan försvinner, annars fortsätter den i bakgrunden
    return () => clearInterval(timer);
  }, []);

  // Har API:t inte svarat räknas lördag (6) och söndag (0) som lediga
  const isDayOff = day
    ? day.isDayOff
    : now.getDay() === 0 || now.getDay() === 6;

  return (
    <View style={s.box}>
      {day && (
        <Text style={s.day}>
          {day.weekday}, vecka {day.week}
        </Text>
      )}
      {!day && !dayError && <Text style={s.day}>Hämtar dagens datum...</Text>}
      {dayError && <Text style={s.day}>Datumet kunde inte hämtas</Text>}

      <Text style={s.fika}>☕ {getFikaText(now, isDayOff)}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  box: {
    padding: 12,
    gap: 4,
    borderRadius: 8,
    backgroundColor: "#FFF4E5",
  },
  day: {
    fontSize: 14,
    fontWeight: "600",
    color: "#767070",
  },
  fika: {
    fontSize: 18,
    fontWeight: "700",
  },
});
