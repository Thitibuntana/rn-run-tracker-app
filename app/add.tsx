import { supabase } from "@/services/supabase";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Add() {
  const { uid } = useLocalSearchParams();
  const timeOptions = ["เช้า", "เย็น"];
  const [selectedtimeOptions, setSelectedtimeOptions] = useState<string | null>(
    null,
  );
  const [location, setLocation] = useState("");
  const [distance, setDistance] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);

  const handleopenCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Camera permission required");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setBase64Image(result.assets[0].base64 || null);
    }
  };

  const handleSave = async () => {
    try {
      let imageUrl = null;

      if (image && base64Image) {
        const fileName = `run_${Date.now()}.jpg`;
        const byteCharacters = atob(base64Image);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);

        const { error: uploadError } = await supabase.storage
          .from("runimages")
          .upload(fileName, byteArray, {
            contentType: "image/jpeg",
          });

        if (!uploadError) {
          const { data } = supabase.storage
            .from("runimages")
            .getPublicUrl(fileName);
          imageUrl = data.publicUrl;
        }
      }

      const { error } = await supabase.from("runs").insert({
        location,
        distance,
        time: selectedtimeOptions,
        image: imageUrl,
        uid,
      });

      if (error) throw error;

      router.back();
    } catch (error) {
      Alert.alert("Error saving run");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Ionicons name="walk" size={60} color="#00ff62" />
        <Text style={styles.title}>Add Run</Text>
      </View>

      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Location"
          placeholderTextColor="#94a3b8"
          value={location}
          onChangeText={setLocation}
        />

        <TextInput
          style={styles.input}
          placeholder="Distance"
          placeholderTextColor="#94a3b8"
          value={distance}
          onChangeText={setDistance}
        />

        <View style={styles.timeContainer}>
          {timeOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.timeButton,
                selectedtimeOptions === option && styles.timeButtonActive,
              ]}
              onPress={() => setSelectedtimeOptions(option)}
            >
              <Text
                style={[
                  styles.timeText,
                  selectedtimeOptions === option && styles.timeTextActive,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.cameraButton}
          onPress={handleopenCamera}
        >
          <Ionicons name="camera" size={20} color="#000" />
          <Text style={styles.cameraText}>Take Photo</Text>
        </TouchableOpacity>

        {image && <Image source={{ uri: image }} style={styles.image} />}

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Save Run</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#0f172a",
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ffffff",
    marginTop: 10,
  },
  card: {
    width: "100%",
    backgroundColor: "#1e293b",
    borderRadius: 18,
    padding: 25,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  input: {
    backgroundColor: "#0f172a",
    color: "#ffffff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  timeButton: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: "center",
  },
  timeButtonActive: {
    backgroundColor: "#00ff62",
  },
  timeText: {
    color: "#94a3b8",
  },
  timeTextActive: {
    color: "#000",
    fontWeight: "600",
  },
  cameraButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#00ff62",
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  cameraText: {
    fontWeight: "600",
    color: "#000",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#00ff62",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  saveText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
});
