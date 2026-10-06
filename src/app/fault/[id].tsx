import { useFaults } from "@/context/FaultContext";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function FaultDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { faults } = useFaults();

  const fault = faults.find((f) => f.id === id);

  if (!fault) {
    return (
      <View style={s.root}>
        <Text style={s.value}>Felanmälan hittades inte</Text>
      </View>
    );
  }

  return (
    <View style={s.root}>
      <Text style={s.heading}>{fault.title}</Text>

      <Text style={s.label}>Kategori</Text>
      <Text style={s.value}>{fault.category}</Text>

      <Text style={s.label}>Plats</Text>
      <Text style={s.value}>{fault.location}</Text>

      <Text style={s.label}>Datum</Text>
      <Text style={s.value}>
        {new Date(fault.createdAt).toLocaleDateString("sv-SE")}
      </Text>

      <Text style={s.label}>Beskrivning</Text>
      <Text style={s.value}>{fault.description}</Text>

      {fault.imageUri && (
        <>
          <Text style={s.label}>Bild</Text>
          <Image source={fault.imageUri} style={s.image}></Image>
        </>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    padding: 12,
    gap: 4,
    backgroundColor: "#FFF",
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#767070",
    marginTop: 8,
  },
  value: {
    fontSize: 16,
  },
  image: {
    borderRadius: 8,
    height: 400,
    width: "auto",
  },
});
