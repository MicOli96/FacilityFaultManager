import { useFaults } from "@/context/FaultContext";
import { categories, Category } from "@/data/categories";
import { Fault } from "@/types/fault";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function FaultForm() {
  const [title, setTitle] = useState("");
  const [descr, setDescr] = useState("");
  const [location, setLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [image, setImage] = useState<string | undefined>();

  const { addFault } = useFaults();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      quality: 0.7,
    });

    if (result.canceled) return;

    setImage(result.assets[0].uri);
  };

  function handleSave() {
    // trim() gör att "   " räknas som tomt
    if (
      !title.trim() ||
      !descr.trim() ||
      !location.trim() ||
      !selectedCategory
    ) {
      Alert.alert(
        "Fyll i alla fält",
        "Titel, beskrivning, plats och kategori måste fyllas i.",
      );
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }

    const newFault: Fault = {
      id: Date.now().toString(),
      title: title.trim(),
      description: descr.trim(),
      location: location.trim(),
      category: selectedCategory,
      createdAt: new Date().toISOString(),
      imageUri: image,
    };

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    addFault(newFault);
    router.back();
  }

  return (
    <ScrollView style={s.root} contentContainerStyle={s.scroll}>
      <Text style={s.label}>Titel</Text>
      <TextInput
        style={s.input}
        placeholder="Trasig lampa..."
        placeholderTextColor={"gray"}
        value={title}
        onChangeText={setTitle}
      ></TextInput>
      <Text style={s.label}>Beskrivning</Text>
      <TextInput
        style={[s.input, s.inputMultiline]}
        multiline={true}
        placeholder="..."
        placeholderTextColor={"gray"}
        value={descr}
        onChangeText={setDescr}
      ></TextInput>
      <Text style={s.label}>Plats</Text>
      <TextInput
        style={s.input}
        placeholder="Adress"
        placeholderTextColor={"gray"}
        value={location}
        onChangeText={setLocation}
      ></TextInput>

      <Text style={s.label}>Kategori</Text>
      <View style={s.categoryList}>
        {categories.map((category) => (
          <Pressable
            key={category}
            style={[s.chip, category === selectedCategory && s.chipSelected]}
            onPress={() => {
              setSelectedCategory(category);
              Haptics.selectionAsync();
            }}
          >
            <Text style={category === selectedCategory && s.chipTextSelected}>
              {category}
            </Text>
          </Pressable>
        ))}
      </View>

      <Button title="Lägg till bild" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={s.image} />}

      <View>
        <Button title="Spara" onPress={handleSave} />
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  scroll: {
    padding: 12,
    gap: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#767070",
    borderRadius: 8,
    padding: 10,
  },
  inputMultiline: {
    height: 100,
    textAlignVertical: "top",
  },
  categoryList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: "#767070",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  chipSelected: {
    backgroundColor: "#208AEF",
    borderColor: "#208AEF",
  },
  chipTextSelected: {
    color: "#FFF",
  },
  image: {
    borderRadius: 8,
    height: 400,
    width: "auto",
  },
});
