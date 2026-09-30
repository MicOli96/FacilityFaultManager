import { mockedFaults } from "@/data/mockedFaults";
import { Link } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const fault = mockedFaults;
  return (
    <View style={s.root}>
      <Text style={s.list}>Felanmälningar</Text>
      <FlatList
        data={mockedFaults}
        renderItem={({ item }) => (
          <View>
            <Text style={s.list}>
              {item.title} - {item.category}
            </Text>
          </View>
        )}
      ></FlatList>

      <View style={s.footer}>
        <Link href={"/fault-form"} style={s.link}>
          Ny felanmälan
        </Link>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    padding: 12,
    gap: 8,
  },
  footer: {
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 2,
    backgroundColor: "#FFF",
    borderRadius: 50,
  },
  link: {
    fontSize: 24,
    fontWeight: "800",
  },
  list: {
    fontSize: 20,
    fontWeight: "600",
  },
});
