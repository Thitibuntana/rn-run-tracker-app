import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function Index() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/login");
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Ionicons name="walk" size={180} color="#4dff88" />
      <Text style={styles.title}>Run Tracker</Text>
      <Text style={styles.subtitle}>Stay in shape with Run Tracker!</Text>
      <ActivityIndicator size="large" color="#ffffff" style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b3d91",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#ffffff",
    marginTop: 10,
  },
  loader: {
    marginTop: 30,
  },
});
