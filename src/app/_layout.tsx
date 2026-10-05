import { FaultProvider } from "@/context/FaultContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <FaultProvider>
      <Stack />
    </FaultProvider>
  );
}
