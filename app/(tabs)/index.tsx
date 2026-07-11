import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Image } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useLikedStore } from "../../store/useLikedStore";

export default function HomeScreen() {
  const likedTutorials = useLikedStore((state) => state.likedTutorials);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4EAD4" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Top Header Row */}
        <View style={styles.topHeaderRow}>
          <Text style={styles.appName}>DEVLEARN</Text>
          <TouchableOpacity style={styles.menuIconButton} activeOpacity={0.8}>
            <Ionicons name="menu" size={24} color="#000000" />
          </TouchableOpacity>
        </View>

        {/* Pastel Coral Pop Hero Box */}
        <View style={styles.heroBannerBox}>
          <View style={styles.heroContentContainer}>
            <View style={styles.heroTextSection}>
              <Text style={styles.heroTitleText}>Master Your Skills</Text>
              <Text style={styles.heroDescriptionText}>
                Dive into comprehensive tech tracks curated for modern mobile developers.
              </Text>
            </View>
            <Image 
              source={require("../../assets/images/homeimg.jpg")} 
              style={styles.heroAssetImage}
              resizeMode="contain"
            />
          </View>

          <TouchableOpacity
            style={styles.startLearningButton}
            activeOpacity={0.9}
            onPress={() => router.push("/learning")}
          >
            <Text style={styles.startLearningButtonText}>START LEARNING</Text>
          </TouchableOpacity>
        </View>

        {/* Section Header */}
        <View style={styles.headerRow}>
          <Text style={styles.sectionTitle}>Saved Tutorials</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{likedTutorials.length}</Text>
          </View>
        </View>

        {likedTutorials.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons name="heart-outline" size={38} color="#000000" />
            <Text style={styles.emptyTitle}>No Saved Tutorials</Text>
            <Text style={styles.emptySubtitle}>Like tutorials to access them quickly here.</Text>
          </View>
        ) : (
          likedTutorials.map((tutorial) => (
            <TouchableOpacity key={tutorial.id} style={styles.card} activeOpacity={0.8}>
              <View style={styles.iconContainer}>
                <Ionicons name="play" size={18} color="#000000" />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{tutorial.title}</Text>
                <Text style={styles.cardSubtitle}>{tutorial.videos} Videos • {tutorial.level}</Text>
              </View>

              <Ionicons name="heart" size={24} color="#FF9AA2" />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4EAD4", // Soft Warm Cream Canvas backdrop
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 130,
  },
  topHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  appName: {
    fontSize: 26,
    fontWeight: "900",
    color: "#000000",
    letterSpacing: -0.5,
  },
  menuIconButton: {
    backgroundColor: "#D6C7FF",
    width: 46,
    height: 46,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#000000",
  },
  heroBannerBox: {
    backgroundColor: "#FFB7B2", // Soft pastel pink/coral panel
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    borderWidth: 2.5,
    borderColor: "#000000",
    shadowColor: "#000000",
    shadowOpacity: 1,
    shadowRadius: 0,
    shadowOffset: { width: 5, height: 5 },
  },
  heroContentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  heroTextSection: {
    flex: 1,
    paddingRight: 12,
  },
  heroTitleText: {
    fontSize: 22,
    fontWeight: "900",
    color: "#000000",
    marginBottom: 6,
  },
  heroDescriptionText: {
    fontSize: 13,
    color: "#000000",
    lineHeight: 18,
    fontWeight: "600",
  },
  heroAssetImage: {
    width: 80,
    height: 80,
  },
  startLearningButton: {
    backgroundColor: "#BFFCC6", // Crisp pastel mint green active plate
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#000000",
  },
  startLearningButtonText: {
    color: "#000000",
    fontWeight: "900",
    fontSize: 15,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#000000",
    marginRight: 8,
  },
  countBadge: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#000000",
  },
  countText: {
    color: "#000000",
    fontWeight: "900",
    fontSize: 12,
  },
  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#000000",
  },
  emptyTitle: {
    color: "#000000",
    fontSize: 17,
    fontWeight: "900",
    marginTop: 14,
  },
  emptySubtitle: {
    color: "#000000",
    textAlign: "center",
    marginTop: 6,
    fontSize: 13,
    fontWeight: "500",
  },
  card: {
    backgroundColor: "#FFFFFF",
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
    backgroundColor: "#FFB7B2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
    borderWidth: 1.5,
    borderColor: "#000000",
  },
  cardTitle: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "900",
  },
  cardSubtitle: {
    color: "#000000",
    marginTop: 4,
    fontSize: 12,
    fontWeight: "600",
  },
});