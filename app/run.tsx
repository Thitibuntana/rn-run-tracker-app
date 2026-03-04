import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const running = require("@/assets/images/running.png");

export default function Index() {
  return (
    <View style={styles.container}>
      <Image style={styles.imageLogo} source={running} />
      <Text style={styles.title}>Run</Text>
      <TouchableOpacity style={styles.btn} onPress={() => router.push("/add")}>
        <Ionicons name="add" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  imageLogo: { width: 200, height: 200 },
  btn: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    bottom: 50,
    right: 50,
    elevation: 2,
  },
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
