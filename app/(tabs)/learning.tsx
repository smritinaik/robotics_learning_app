import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLikedStore } from "../../store/useLikedStore";

const tutorials = [
  {
    id: 1,
    title: "Introduction to Robotics",
    videos: 8,
    level: "Beginner",
  },
  {
    id: 2,
    title: "Arduino Programming",
    videos: 14,
    level: "Beginner",
  },
  {
    id: 3,
    title: "Sensors & Actuators",
    videos: 10,
    level: "Intermediate",
  },
  {
    id: 4,
    title: "Motor Driver & DC Motors",
    videos: 9,
    level: "Intermediate",
  },
  {
    id: 5,
    title: "Bluetooth Robot Car",
    videos: 12,
    level: "Advanced",
  },
  {
    id: 6,
    title: "Line Follower Robot",
    videos: 11,
    level: "Advanced",
  },
];

const resources = [
  {
    id: 1,
    title: "Introduction to Robotics Notes",
    type: "PDF",
  },
  {
    id: 2,
    title: "Arduino Programming Guide",
    type: "PDF",
  },
  {
    id: 3,
    title: "Sensors & Components PPT",
    type: "PPT",
  },
  {
    id: 4,
    title: "Motor Driver Wiring Diagram",
    type: "PDF",
  },
  {
    id: 5,
    title: "Bluetooth Robot Project PPT",
    type: "PPT",
  },
  {
    id: 6,
    title: "Line Follower Robot Handbook",
    type: "PDF",
  },
];
export default function LearningScreen() {
  const [selected, setSelected] = useState<"tutorials" | "resources">("tutorials");
  const likedTutorials = useLikedStore((state) => state.likedTutorials);
  const toggleLike = useLikedStore((state) => state.toggleLike);

  const isLiked = (id: number) => likedTutorials.some((item) => item.id === id);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4EAD4" />

      {/* Chunky Separated Toggle Buttons */}
      <View style={styles.toggleRowContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, selected === "tutorials" ? styles.activeButton : styles.inactiveButton]}
          onPress={() => setSelected("tutorials")}
          activeOpacity={0.9}
        >
          <Text style={styles.toggleText}>Tutorials</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toggleButton, selected === "resources" ? styles.activeButton : styles.inactiveButton]}
          onPress={() => setSelected("resources")}
          activeOpacity={0.9}
        >
          <Text style={styles.toggleText}>Resources</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 130 }}>
        {selected === "tutorials" ? (
          tutorials.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.iconContainer}>
                <Ionicons name="play" size={20} color="#000000" />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>{item.videos} Videos • {item.level}</Text>
              </View>

              <TouchableOpacity onPress={() => toggleLike(item)} activeOpacity={0.7}>
                <Ionicons
                  name={isLiked(item.id) ? "heart" : "heart-outline"}
                  size={24}
                  color={isLiked(item.id) ? "#FF9AA2" : "#000000"}
                />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          resources.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.resourceIconContainer}>
                <Ionicons name={item.type === "PDF" ? "document-text" : "document"} size={20} color="#000000" />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>{item.type}</Text>
              </View>

              <TouchableOpacity activeOpacity={0.7} style={styles.downloadButton}>
                <Ionicons name="download-outline" size={18} color="#000000" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4EAD4",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  toggleRowContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2.5,
    borderColor: "#000000",
  },
  activeButton: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOpacity: 1,
    shadowRadius: 0,
    shadowOffset: { width: 3, height: 3 },
  },
  inactiveButton: {
    backgroundColor: "#E8DCB8",
  },
  toggleText: {
    fontSize: 15,
    fontWeight: "900",
    color: "#000000",
  },
  card: {
    backgroundColor: "#FFC6FF", // Pastel Purple panel variant
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#000000",
    shadowColor: "#000000",
    shadowOpacity: 1,
    shadowRadius: 0,
    shadowOffset: { width: 4, height: 4 },
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
    borderWidth: 1.5,
    borderColor: "#000000",
  },
  resourceIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#BFFCC6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
    borderWidth: 1.5,
    borderColor: "#000000",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#000000",
  },
  cardSubtitle: {
    marginTop: 4,
    color: "#000000",
    fontSize: 13,
    fontWeight: "600",
  },
  downloadButton: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#000000",
  },
});