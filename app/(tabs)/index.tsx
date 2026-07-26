import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useLikedStore } from "../../store/useLikedStore";

export default function HomeScreen() {
  const likedTutorials = useLikedStore((state) => state.likedTutorials);
  const toggleLike = useLikedStore((state) => state.toggleLike);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F4E8" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Top Header Row */}
        <View style={styles.topHeaderRow}>
          <View>
            <Text style={styles.appName}>ROBOLEARN</Text>
            <Text style={styles.appSubHeader}>Interactive Engineering</Text>
          </View>
          <TouchableOpacity style={styles.menuIconButton} activeOpacity={0.8}>
            <Ionicons name="options-outline" size={20} color="#000000" />
          </TouchableOpacity>
        </View>

        {/* Neo-brutalist Hero Banner */}
        <View style={styles.heroBannerBox}>
          <View style={styles.heroContentContainer}>
            <View style={styles.heroTextSection}>
              <View style={styles.tagBadge}>
                <Text style={styles.tagText}>FEATURED TRACK</Text>
              </View>
              <Text style={styles.heroTitleText}>Build & Program</Text>
              <Text style={styles.heroDescriptionText}>
                Master microcontrollers, sensors, and kinematics from scratch.
              </Text>
            </View>
            <Image
              source={require("../../assets/images/homeimg.png")}
              style={styles.heroAssetImage}
              resizeMode="contain"
            />
          </View>

          <TouchableOpacity
            style={styles.startLearningButton}
            activeOpacity={0.85}
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
            <View style={styles.emptyIconCircle}>
              <Ionicons name="heart-outline" size={28} color="#000000" />
            </View>
            <Text style={styles.emptyTitle}>No Bookmarks Saved</Text>
            <Text style={styles.emptySubtitle}>
              Tap the heart icon on any tutorial track in the learning tab to save it here.
            </Text>
          </View>
        ) : (
          likedTutorials.map((tutorial) => (
            <TouchableOpacity
              key={tutorial.id}
              style={styles.card}
              activeOpacity={0.85}
              onPress={() => router.push("/learning")}
            >
              <View style={styles.iconContainer}>
                <Ionicons name="book-outline" size={20} color="#000000" />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{tutorial.title}</Text>
                <Text style={styles.cardSubtitle}>{tutorial.level} Track</Text>
              </View>

              <TouchableOpacity
                style={{ padding: 4 }}
                onPress={() => toggleLike(tutorial)}
                activeOpacity={0.7}
              >
                <Ionicons name="heart" size={24} color="#FF8B94" />
              </TouchableOpacity>
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
    backgroundColor: "#F8F4E8",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 54,
    paddingBottom: 120,
  },
  topHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  appName: {
    fontSize: 28,
    fontWeight: "900",
    color: "#000000",
    letterSpacing: -0.5,
  },
  appSubHeader: {
    fontSize: 12,
    fontWeight: "700",
    color: "#666666",
    marginTop: -2,
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
    shadowColor: "#000000",
    shadowOpacity: 1,
    shadowRadius: 0,
    shadowOffset: { width: 2, height: 2 },
  },
  heroBannerBox: {
    backgroundColor: "#FFE5D9", // Updated to a lighter, softer pastel peach
    borderRadius: 20,
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
    marginBottom: 16,
  },
  heroTextSection: {
    flex: 1,
    paddingRight: 8,
  },
  tagBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: "#000000",
    marginBottom: 8,
  },
  tagText: {
    fontSize: 10,
    fontWeight: "900",
    color: "#000000",
    letterSpacing: 0.5,
  },
  heroTitleText: {
    fontSize: 22,
    fontWeight: "900",
    color: "#000000",
    marginBottom: 6,
    lineHeight: 26,
  },
  heroDescriptionText: {
    fontSize: 13,
    color: "#333333",
    lineHeight: 18,
    fontWeight: "700",
  },
  heroAssetImage: {
    width: 110,  // Increased width
    height: 110, // Increased height
    borderRadius: 12,
    marginRight: -6,
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
    shadowOffset: { width: 2.5, height: 2.5 },
  },
  startLearningButtonText: {
    color: "#000000",
    fontWeight: "900",
    fontSize: 14,
    letterSpacing: 0.5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#000000",
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 28,
  },
  statItemCard: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 2.5,
    borderColor: "#000000",
    shadowColor: "#000000",
    shadowOpacity: 1,
    shadowRadius: 0,
    shadowOffset: { width: 3, height: 3 },
  },
  statNumber: {
    fontSize: 22,
    fontWeight: "900",
    color: "#000000",
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "800",
    color: "#222222",
    marginTop: 2,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
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
    borderRadius: 18,
    padding: 24,
    alignItems: "center",
    borderWidth: 2.5,
    borderColor: "#000000",
    shadowColor: "#000000",
    shadowOpacity: 1,
    shadowRadius: 0,
    shadowOffset: { width: 3, height: 3 },
  },
  emptyIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#FFD6E7",
    borderWidth: 2,
    borderColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  emptyTitle: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "900",
  },
  emptySubtitle: {
    color: "#666666",
    textAlign: "center",
    marginTop: 4,
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    borderWidth: 2.5,
    borderColor: "#000000",
    shadowColor: "#000000",
    shadowOpacity: 1,
    shadowRadius: 0,
    shadowOffset: { width: 3.5, height: 3.5 },
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#FFD6E7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
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