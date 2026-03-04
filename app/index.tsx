import { router } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

const running = require("@/assets/images/running.png");

export default function Index() {
  useEffect(() => {
    setTimeout(() => {
      router.push("/run");
    }, 3000);
  });

  return (
    <View>
      <Image source={running} />
      <Text style={styles.title}>Run Tracker</Text>
      <Text style={styles.subtitle}>Stay in shape with Run Tracker!</Text>
      <ActivityIndicator size="large" color="blue" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  imageLogo: { width: 200, height: 200 },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Kanit_700Bold",
    color: "black",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Kanit_400Regular",
    color: "black",
    marginTop: 20,
  },
});
