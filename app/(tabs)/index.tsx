import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Image } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useLikedStore } from "../../store/useLikedStore";

export default function HomeScreen() {
  const likedTutorials = useLikedStore((state) => state.likedTutorials);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F4E8" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Top Header Row */}
        <View style={styles.topHeaderRow}>
          <Text style={styles.appName}>ROBOLEARN</Text>
          <TouchableOpacity style={styles.menuIconButton} activeOpacity={0.8}>
            <Ionicons name="options" size={22} color="#000000" />
          </TouchableOpacity>
        </View>

        {/* Neo-brutalist Hero Banner */}
        <View style={styles.heroBannerBox}>
          <View style={styles.heroContentContainer}>
            <View style={styles.heroTextSection}>
              <Text style={styles.heroTitleText}>Build & Program</Text>
              <Text style={styles.heroDescriptionText}>
                Master real-world microcontrollers, sensors, and kinematics layouts from scratch.
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
            <Text style={styles.startLearningButtonText}>LAUNCH TRACKS</Text>
            <Ionicons name="flash" size={16} color="#000000" style={{ marginLeft: 6 }} />
          </TouchableOpacity>
        </View>

        {/* Quick Insights Stats Grid */}
        <Text style={styles.sectionTitle}>Overview</Text>
        <View style={styles.statsGrid}>
          <View style={[styles.statItemCard, { backgroundColor: "#CDE7FF" }]}>
            <Text style={styles.statNumber}>6</Text>
            <Text style={styles.statLabel}>Tracks</Text>
          </View>
          <View style={[styles.statItemCard, { backgroundColor: "#FFF4B8" }]}>
            <Text style={styles.statNumber}>6</Text>
            <Text style={styles.statLabel}>Files</Text>
          </View>
          <View style={[styles.statItemCard, { backgroundColor: "#E8D5FF" }]}>
            <Text style={styles.statNumber}>{likedTutorials.length}</Text>
            <Text style={styles.statLabel}>Saved</Text>
          </View>
        </View>

      

        {/* Section Header: Saved Bookmarks */}
        <View style={styles.headerRow}>
          <Text style={styles.sectionTitle}>Bookmarks</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{likedTutorials.length}</Text>
          </View>
        </View>

        {likedTutorials.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons name="heart-outline" size={32} color="#000000" />
            <Text style={styles.emptyTitle}>No Bookmarks Saved</Text>
            <Text style={styles.emptySubtitle}>Tap the heart icon on any tutorial track to store it here.</Text>
          </View>
        ) : (
          likedTutorials.map((tutorial) => (
            <TouchableOpacity key={tutorial.id} style={styles.card} activeOpacity={0.8}>
              <View style={styles.iconContainer}>
                <Ionicons name="book-outline" size={18} color="#000000" />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{tutorial.title}</Text>
                <Text style={styles.cardSubtitle}>{tutorial.level} Track</Text>
              </View>

              <Ionicons name="heart" size={24} color="#FF8B94" />
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
    backgroundColor: "#F8F4E8", // Matches clean baseline cream canvas
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 100,
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
    backgroundColor: "#FFFFFF",
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2.5,
    borderColor: "#000000",
  },
  heroBannerBox: {
    backgroundColor: "#FFB7B2", 
    borderRadius: 16,
    padding: 20,
    marginBottom: 28,
    borderWidth: 2.5,
    borderColor: "#000000",
    shadowColor: "#000000",
    shadowOpacity: 1,
    shadowRadius: 0,
    shadowOffset: { width: 4, height: 4 },
  },
  heroContentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  heroTextSection: {
    flex: 1,
    paddingRight: 10,
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
    fontWeight: "700",
  },
  heroAssetImage: {
    width: 75,
    height: 75,
  },
  startLearningButton: {
    backgroundColor: "#BFFCC6", 
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2.5,
    borderColor: "#000000",
    shadowColor: "#000000",
    shadowOpacity: 1,
    shadowRadius: 0,
    shadowOffset: { width: 3, height: 3 },
  },
  startLearningButtonText: {
    color: "#000000",
    fontWeight: "900",
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#000000",
    marginBottom: 14,
    marginTop: 6,
  },
  statsGrid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 28,
  },
  statItemCard: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 2.5,
    borderColor: "#000000",
    shadowColor: "#000000",
    shadowOpacity: 1,
    shadowRadius: 0,
    shadowOffset: { width: 3, height: 3 },
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "900",
    color: "#000000",
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#000000",
    marginTop: 2,
  },
  challengeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 2.5,
    borderColor: "#000000",
    padding: 16,
    marginBottom: 28,
    shadowColor: "#000000",
    shadowOpacity: 1,
    shadowRadius: 0,
    shadowOffset: { width: 4, height: 4 },
  },
  challengeHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  tagBadge: {
    backgroundColor: "#FFD8C2",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: "#000000",
  },
  tagText: {
    fontSize: 10,
    fontWeight: "900",
    color: "#000000",
  },
  xpText: {
    fontSize: 12,
    fontWeight: "900",
    color: "#666666",
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#000000",
    marginBottom: 4,
  },
  challengeBody: {
    fontSize: 13,
    fontWeight: "600",
    color: "#555555",
    lineHeight: 18,
    marginBottom: 14,
  },
  challengeActionBtn: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#D8FFD6",
    borderWidth: 2,
    borderColor: "#000000",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  challengeActionText: {
    fontSize: 12,
    fontWeight: "900",
    color: "#000000",
    marginRight: 6,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  countBadge: {
    backgroundColor: "#EBE6D8",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#000000",
    marginLeft: 8,
  },
  countText: {
    color: "#000000",
    fontWeight: "900",
    fontSize: 12,
  },
  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    borderWidth: 2.5,
    borderColor: "#000000",
  },
  emptyTitle: {
    color: "#000000",
    fontSize: 15,
    fontWeight: "900",
    marginTop: 10,
  },
  emptySubtitle: {
    color: "#666666",
    textAlign: "center",
    marginTop: 4,
    fontSize: 12,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 2.5,
    borderColor: "#000000",
    shadowColor: "#000000",
    shadowOpacity: 1,
    shadowRadius: 0,
    shadowOffset: { width: 4, height: 4 },
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#FFD6E7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
    borderWidth: 2,
    borderColor: "#000000",
  },
  cardTitle: {
    color: "#000000",
    fontSize: 15,
    fontWeight: "900",
  },
  cardSubtitle: {
    color: "#666666",
    marginTop: 2,
    fontSize: 12,
    fontWeight: "700",
  },
});