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
        {/* Top Header Section */}
        <View style={styles.topHeaderRow}>
          <View style={styles.userSection}>
            <View style={styles.logoBorder}>
              <Image
                source={require("../../assets/images/logo.png")}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>
            <View>
              <View style={styles.welcomeRow}>
                <Text style={styles.welcomeText}>WELCOME BACK</Text>
                <View style={styles.statusDot} />
              </View>
              <Text style={styles.appName}>Qurious Mind</Text>
            </View>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.menuIconButton} activeOpacity={0.8}>
              <Ionicons name="notifications-outline" size={20} color="#000000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Neo-brutalist Hero Banner */}
        <View style={styles.heroBannerBox}>
          <View style={styles.heroContentContainer}>
            <View style={styles.heroTextSection}>
              <View style={styles.tagBadge}>
                <Ionicons name="sparkles" size={12} color="#000" style={{ marginRight: 4 }} />
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
            <Ionicons
              name="flash"
              size={16}
              color="#000000"
              style={{ marginLeft: 6 }}
            />
          </TouchableOpacity>
        </View>

        {/* Quick Hub Navigation Cards */}
        <Text style={styles.sectionTitle}>Quick Hub</Text>
        <View style={styles.quickHubGrid}>
          <TouchableOpacity
            style={[styles.hubCard, { backgroundColor: "#CDE7FF" }]}
            activeOpacity={0.85}
            onPress={() => router.push("/learning")}
          >
            <View style={styles.hubIconBox}>
              <Ionicons name="book" size={20} color="#000" />
            </View>
            <Text style={styles.hubTitle}>Tracks</Text>
            <Text style={styles.hubSubText}>Browse Lessons</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.hubCard, { backgroundColor: "#FFF4B8" }]}
            activeOpacity={0.85}
            onPress={() => router.push("/notes")}
          >
            <View style={styles.hubIconBox}>
              <Ionicons name="document-text" size={20} color="#000" />
            </View>
            <Text style={styles.hubTitle}>Notes</Text>
            <Text style={styles.hubSubText}>Drive Resources</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.hubCard, { backgroundColor: "#E8D5FF" }]}
            activeOpacity={0.85}
            onPress={() => router.push("/quiz")}
          >
            <View style={styles.hubIconBox}>
              <Ionicons name="bulb" size={20} color="#000" />
            </View>
            <Text style={styles.hubTitle}>Quizzes</Text>
            <Text style={styles.hubSubText}>Test Skills</Text>
          </TouchableOpacity>
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
              Tap the heart icon on any tutorial track in the learning tab to save
              it here.
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
    paddingBottom: 130,
  },
  topHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logoBorder: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 2.5,
    borderColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    shadowColor: "#000000",
    shadowOpacity: 1,
    shadowRadius: 0,
    shadowOffset: { width: 2.5, height: 2.5 },
  },
  logoImage: {
    width: 32,
    height: 32,
  },
  welcomeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  welcomeText: {
    fontSize: 10,
    fontWeight: "900",
    color: "#666666",
    letterSpacing: 0.5,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#32CD32",
  },
  appName: {
    fontSize: 22,
    fontWeight: "900",
    color: "#000000",
    letterSpacing: -0.5,
    marginTop: -2,
  },
  headerActions: {
    flexDirection: "row",
    gap: 8,
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
    shadowOffset: { width: 3, height: 3 },
  },
  heroBannerBox: {
    backgroundColor: "#FFE5D9",
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
    flexDirection: "row",
    alignItems: "center",
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
    width: 110,
    height: 110,
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
    shadowOffset: { width: 3, height: 3 },
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
    marginBottom: 14,
  },
  quickHubGrid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 28,
  },
  hubCard: {
    flex: 1,
    padding: 12,
    borderRadius: 16,
    borderWidth: 2.5,
    borderColor: "#000000",
    shadowColor: "#000000",
    shadowOpacity: 1,
    shadowRadius: 0,
    shadowOffset: { width: 3, height: 3 },
  },
  hubIconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  hubTitle: {
    fontSize: 14,
    fontWeight: "900",
    color: "#000000",
  },
  hubSubText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#444444",
    marginTop: 2,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  countBadge: {
    backgroundColor: "#FFF4B8",
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
    shadowOffset: { width: 3.5, height: 3.5 },
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