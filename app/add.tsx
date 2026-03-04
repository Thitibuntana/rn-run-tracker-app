import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Add() {
  const [location, setLocation] = useState("");
  const [distance, setDistance] = useState("");
  const [time, setTime] = useState("");
  const [image, setImage] = useState(null);
  const [base64Image, setBase64Image] = useState(null);

  useEffect(() => {}, [location]);
  useEffect(() => {}, [distance]);
  useEffect(() => {}, [time]);
  useEffect(() => {}, [image]);
  useEffect(() => {}, [base64Image]);

  const handleImageSelection = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setBase64Image(result.assets[0].base64);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.title}>Running Track</Text>

        <TextInput
          style={styles.input}
          placeholder="Add Location"
          value={location}
          onChangeText={setLocation}
        />

        <Text style={styles.title}>Distance (KM.)</Text>

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Add Distance"
          value={distance}
          onChangeText={setDistance}
        />

        <Text style={styles.title}>Time</Text>

        <View style={styles.timeRow}>
          <TouchableOpacity
            style={[styles.btnTime, time === "Morning" && styles.selected]}
            onPress={() => setTime("Morning")}
          >
            <Text style={styles.timeText}>Morning</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btnTime, time === "Afternoon" && styles.selected]}
            onPress={() => setTime("Afternoon")}
          >
            <Text style={styles.timeText}>Afternoon</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btnTime, time === "Evening" && styles.selected]}
            onPress={() => setTime("Evening")}
          >
            <Text style={styles.timeText}>Evening</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Location</Text>

        <TouchableOpacity
          style={styles.takePhotoBtn}
          onPress={handleImageSelection}
        >
          <Ionicons name="camera" size={24} color="white" />
        </TouchableOpacity>

        {image && <Image source={{ uri: image }} style={styles.preview} />}

        <TouchableOpacity style={styles.publishBtn}>
          <Text style={styles.publishText}>Publish</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flex: 1 },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  timeRow: {
    flexDirection: "row",
    marginVertical: 10,
  },
  btnTime: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selected: {
    backgroundColor: "green",
  },
  timeText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 250,
  },
  takePhotoBtn: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 50,
    marginVertical: 15,
  },
  preview: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  publishBtn: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 10,
  },
  publishText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
