import { supabase } from "@/services/supabase";
import { RunType } from "@/types/runtype";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Run() {
  const { uid } = useLocalSearchParams();
  const [RunData, setRunData] = useState<RunType[]>([]);

  const fetchRuns = async () => {
    if (!uid) return;

    const { data, error } = await supabase
      .from("runs")
      .select("*")
      .eq("user_id", uid);

    if (!error) {
      setRunData(data as RunType[]);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (uid) {
        fetchRuns();
      }
    }, [uid]),
  );

  const handleAddRun = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      router.push({
        pathname: "/add",
        params: { uid: user.id },
      });
    }
  };

  const renderItem = ({ item }: { item: RunType }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/${item.id}`)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.image_url }} style={styles.cardImage} />

      <View style={styles.cardContent}>
        <Text style={styles.locationText}>{item.location}</Text>

        <Text style={styles.dateText}>
          {(() => {
            const date = new Date(item.run_date);
            const buddhistYear = "พ.ศ. " + (date.getFullYear() + 543);
            return (
              new Intl.DateTimeFormat("th-TH", {
                month: "long",
                day: "numeric",
              }).format(date) +
              " " +
              buddhistYear
            );
          })()}
        </Text>
      </View>

      <View style={styles.rightSection}>
        <Text style={styles.distanceText}>{item.distance} km</Text>
        <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Ionicons name="walk" size={70} color="#00ff62" />
        <Text style={styles.title}>Run Tracker</Text>
      </View>

      <FlatList
        data={RunData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />

      <TouchableOpacity style={styles.floatingBtn} onPress={handleAddRun}>
        <Ionicons name="add" size={30} color="#000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 25,
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 25,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ffffff",
    marginTop: 10,
  },

  list: {
    paddingBottom: 120,
  },

  floatingBtn: {
    backgroundColor: "#00ff62",
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 40,
    right: 30,
    elevation: 8,
  },

  card: {
    backgroundColor: "#1e293b",
    borderRadius: 18,
    padding: 15,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },

  cardImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: 15,
  },

  cardContent: {
    flex: 1,
  },

  locationText: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "600",
    marginBottom: 4,
  },

  dateText: {
    fontSize: 14,
    color: "#94a3b8",
  },

  rightSection: {
    alignItems: "flex-end",
    gap: 6,
  },

  distanceText: {
    fontSize: 16,
    color: "#00ff62",
    fontWeight: "600",
  },
});
