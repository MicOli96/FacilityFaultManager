import { FaultProvider } from "@/context/FaultContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <FaultProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Felanmälningar" }} />
        <Stack.Screen name="fault-form" options={{ title: "Ny felanmälan" }} />
        <Stack.Screen name="fault/[id]" options={{ title: "Felanmälan" }} />
      </Stack>
    </FaultProvider>
  );
}
