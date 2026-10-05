import { useFaults } from "@/context/FaultContext";
import { Link } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const { faults } = useFaults();

  return (
    <View style={s.root}>
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
              <Text style={s.itemText}>
                {item.title} - {item.category}
              </Text>
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
    borderWidth: 1,
    borderColor: "#767070",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#FFF",
  },
  itemText: {
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 2,
    padding: 12,
    backgroundColor: "#FFF",
    borderRadius: 50,
  },
  link: {
    fontSize: 24,
    fontWeight: "800",
  },
});
