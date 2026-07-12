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
    modulesCount: 3,
    icon: "🤖",
    accentColor: "#CDE7FF",
  },
  {
    id: 2,
    title: "Arduino Programming",
    videos: 14,
    level: "Beginner",
    modulesCount: 3,
    icon: "⚡",
    accentColor: "#FFF4B8",
  },
  {
    id: 3,
    title: "Sensors & Actuators",
    videos: 10,
    level: "Intermediate",
    modulesCount: 3,
    icon: "📡",
    accentColor: "#D8FFD6",
  },
  {
    id: 4,
    title: "Motor Drivers",
    videos: 9,
    level: "Intermediate",
    modulesCount: 3,
    icon: "🔧",
    accentColor: "#FFD8C2",
  },
  {
    id: 5,
    title: "Bluetooth Robot",
    videos: 12,
    level: "Advanced",
    modulesCount: 3,
    icon: "🚗",
    accentColor: "#E8D5FF",
  },
  {
    id: 6,
    title: "Line Follower Robot",
    videos: 11,
    level: "Advanced",
    modulesCount: 3,
    icon: "📍",
    accentColor: "#FFD6E7",
  }
];

const resourcesData = [
  {
    courseName: "Introduction to Robotics",
    files: [
      { id: "r1", title: "Robotics Notes.pdf", type: "PDF" },
      { id: "r2", title: "Robotics PPT.ppt", type: "PPT" }
    ]
  },
  {
    courseName: "Arduino Programming",
    files: [
      { id: "r3", title: "Arduino Notes.pdf", type: "PDF" },
      { id: "r4", title: "Cheat Sheet.pdf", type: "PDF" }
    ]
  },
  {
    courseName: "Sensors & Actuators",
    files: [
      { id: "r5", title: "Wiring Diagram.pdf", type: "PDF" },
      { id: "r6", title: "Sensor Datasheet.pdf", type: "PDF" }
    ]
  }
];

export default function LearningScreen() {
  const [selectedTab, setSelectedTab] = useState<"tutorials" | "resources">("tutorials");

  const likedTutorials = useLikedStore((state) => state.likedTutorials);
  const toggleLike = useLikedStore((state) => state.toggleLike);

  const isLiked = (id: number) => likedTutorials.some((item) => item.id === id);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F4E8" />

      {/* Centered Styled Inline Segmented Pill Layout */}
      <View style={styles.toggleRowContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, selectedTab === "tutorials" ? styles.activeButton : styles.inactiveButton]}
          onPress={() => setSelectedTab("tutorials")}
          activeOpacity={0.9}
        >
          <Text style={[styles.toggleText, selectedTab === "tutorials" && styles.activeToggleText]}>Tutorials</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toggleButton, selectedTab === "resources" ? styles.activeButton : styles.inactiveButton]}
          onPress={() => setSelectedTab("resources")}
          activeOpacity={0.9}
        >
          <Text style={[styles.toggleText, selectedTab === "resources" && styles.activeToggleText]}>Resources</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 130 }}>
        {selectedTab === "tutorials" ? (
          tutorials.map((item) => (
            // Changed from TouchableOpacity to a static View to disable clicking behaviors completely
            <View key={item.id} style={styles.notebookCard}>
              <View style={[styles.pastelIconContainer, { backgroundColor: item.accentColor }]}>
                <Text style={styles.pastelEmoji}>{item.icon}</Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>{item.level} • {item.modulesCount} Modules</Text>
              </View>

              <TouchableOpacity 
                onPress={() => toggleLike({ id: item.id, title: item.title, videos: item.videos, level: item.level })} 
                activeOpacity={0.7}
                style={{ padding: 4 }}
              >
                <Ionicons
                  name={isLiked(item.id) ? "heart" : "heart-outline"}
                  size={24}
                  color={isLiked(item.id) ? "#FF8B94" : "#000000"}
                />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          resourcesData.map((section, sIdx) => (
            <View key={sIdx} style={styles.resourceSectionWrapper}>
              <View style={styles.resourceHeaderRow}>
                <Ionicons name="folder-open" size={20} color="#000000" style={{ marginRight: 8 }} />
                <Text style={styles.resourceSectionTitle}>{section.courseName}</Text>
              </View>
              
              <View style={styles.resourceGroupCard}>
                {section.files.map((file, fIdx) => (
                  <View key={file.id}>
                    <View style={styles.resourceFileItemRow}>
                      <View style={styles.fileDetailsRow}>
                        <Ionicons 
                          name={file.type === "PDF" ? "document-text" : "stats-chart"} 
                          size={18} 
                          color="#000000" 
                          style={{ marginRight: 10 }}
                        />
                        <Text style={styles.fileNameText}>{file.title}</Text>
                      </View>
                      
                      <TouchableOpacity activeOpacity={0.7} style={styles.downloadActionBox}>
                        <Text style={styles.downloadActionText}>Download</Text>
                      </TouchableOpacity>
                    </View>
                    {fIdx < section.files.length - 1 && <View style={styles.itemDivider} />}
                  </View>
                ))}
              </View>
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
    backgroundColor: "#F8F4E8", 
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  mainScreenTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#000000",
    marginBottom: 20,
  },
  toggleRowContainer: {
    flexDirection: "row",
    backgroundColor: "#EBE6D8", 
    borderRadius: 16,
    padding: 6,
    borderWidth: 2,
    borderColor: "#000000",
    marginBottom: 24,
    alignSelf: "center", // Perfectly centers the toggle element horizontally
    width: "100%",
    maxWidth: 280,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  activeButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#000000",
    shadowColor: "#000000",
    shadowOpacity: 1,
    shadowRadius: 0,
    shadowOffset: { width: 2, height: 2 },
  },
  inactiveButton: {
    backgroundColor: "transparent",
  },
  toggleText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#555555",
  },
  activeToggleText: {
    fontWeight: "900",
    color: "#000000",
  },
  notebookCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    borderWidth: 2.5,
    borderColor: "#000000",
    shadowColor: "#000000",
    shadowOpacity: 1,
    shadowRadius: 0,
    shadowOffset: { width: 4, height: 4 },
  },
  pastelIconContainer: {
    width: 46,
    height: 46,
    borderRadius: 23, 
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
    borderWidth: 2,
    borderColor: "#000000",
  },
  pastelEmoji: {
    fontSize: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#000000",
  },
  cardSubtitle: {
    marginTop: 4,
    color: "#666666",
    fontSize: 13,
    fontWeight: "700",
  },
  resourceSectionWrapper: {
    marginBottom: 24,
  },
  resourceHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingLeft: 4,
  },
  resourceSectionTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#000000",
  },
  resourceGroupCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 2.5,
    borderColor: "#000000",
    paddingHorizontal: 16,
    shadowColor: "#000000",
    shadowOpacity: 1,
    shadowRadius: 0,
    shadowOffset: { width: 3, height: 3 },
  },
  resourceFileItemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
  },
  fileDetailsRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  fileNameText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#000000",
  },
  downloadActionBox: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#000000",
    borderRadius: 8,
  },
  downloadActionText: {
    fontSize: 12,
    fontWeight: "900",
    color: "#000000",
  },
  itemDivider: {
    height: 1.5,
    backgroundColor: "#000000",
    marginVertical: 2,
  }
});