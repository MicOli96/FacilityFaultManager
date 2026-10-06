import FikaClock from "@/components/FikaClock";
import { useFaults } from "@/context/FaultContext";
import { Link } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const { faults } = useFaults();

  return (
    <View style={s.root}>
      <FikaClock />
      <FlatList
        style={s.list}
        contentContainerStyle={s.listContent}
        data={faults}
        renderItem={({ item }) => (
          <Link
            href={{ pathname: "/fault/[id]", params: { id: item.id } }}
            asChild
          >
            <Pressable style={s.item}>
              <Text style={s.itemText}>{item.title}</Text>
              <View style={s.badge}>
                <Text style={s.badgeText}>{item.category}</Text>
              </View>
            </Pressable>
          </Link>
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
    flex: 1,
    padding: 12,
    gap: 8,
  },
  list: {
    flex: 1,
  },
  listContent: {
    gap: 8,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#767070",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#FFF",
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "#E6F1FD",
  },
  badgeText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1565C0",
  },
  // View:n är själva "knappen" – mörkblå bakgrund och rundade hörn
  footer: {
    borderRadius: 12,
    backgroundColor: "#1565C0",
    overflow: "hidden",
  },
  // Länktexten fyller hela View:n, så hela knappen går att trycka på
  link: {
    paddingVertical: 16,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "800",
    color: "#FFF",
  },
});
