import { supabase } from "@/services/supabase";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Rundetail() {
  const { id } = useLocalSearchParams();
  const [location, setLocation] = useState("");
  const [distance, setDistance] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRun = async () => {
    const { data } = await supabase
      .from("runs")
      .select("*")
      .eq("id", id)
      .single();

    if (data) {
      setLocation(data.location);
      setDistance(data.distance);
      setImage(data.image);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchRun();
  }, []);

  const handleUpdate = async () => {
    const { error } = await supabase
      .from("runs")
      .update({ location, distance })
      .eq("id", id);

    if (error) {
      Alert.alert("Update failed");
      return;
    }

    router.back();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00ff62" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Ionicons name="walk" size={60} color="#00ff62" />
        <Text style={styles.title}>Edit Run</Text>
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

        {image && <Image source={{ uri: image }} style={styles.image} />}

        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.updateText}>Update Run</Text>
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
  loadingContainer: {
    flex: 1,
    backgroundColor: "#0f172a",
    alignItems: "center",
    justifyContent: "center",
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
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
  },
  updateButton: {
    backgroundColor: "#00ff62",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  updateText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
});
