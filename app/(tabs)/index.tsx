import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");
const GRID_SIZE = 32;
const numCols = Math.ceil(width / GRID_SIZE);
const numRows = Math.ceil(height / GRID_SIZE);

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF5EE" />

      {/* Full Screen Neo-Brutalist Square Grid Background */}
      <View style={styles.gridOverlay} pointerEvents="none">
        {Array.from({ length: numRows }).map((_, rowIndex) => (
          <View key={`row-${rowIndex}`} style={styles.gridRow}>
            {Array.from({ length: numCols }).map((_, colIndex) => (
              <View key={`cell-${rowIndex}-${colIndex}`} style={styles.gridCell} />
            ))}
          </View>
        ))}
      </View>

      {/* Background Doodles & Grids */}
      <View style={styles.bgDecorations} pointerEvents="none">
        <View style={styles.topDotGrid}>
          {[...Array(24)].map((_, i) => (
            <View key={`top-${i}`} style={styles.dot} />
          ))}
        </View>

        <View style={styles.leftDotGrid}>
          {[...Array(16)].map((_, i) => (
            <View key={`left-${i}`} style={styles.dot} />
          ))}
        </View>

        <Text style={[styles.crosshair, { top: 70, right: 30 }]}>+</Text>
        <Text style={[styles.crosshair, { top: 280, left: 24 }]}>+</Text>

        <View style={styles.decorBlockBlack} />
        <View style={styles.decorBlockGreen} />
      </View>

      <View style={styles.mainContent}>
        {/* Top Header Logo */}
        <View style={styles.headerRow}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        {/* Headline Section - Scaled Up with High-Impact Typography */}
        <View style={styles.headlineContainer}>
          <View style={styles.headlineRow}>
            <Text style={styles.headlineTextRegular}>Nurturing </Text>
            <View style={styles.highlightSelectionBox}>
              <Text style={styles.highlightText}>Urge</Text>
            </View>
          </View>

          <View style={styles.headlineRow}>
            <Text style={styles.headlineTextRegular}>to </Text>
            <View style={styles.highlightSelectionBox}>
              <Text style={styles.highlightText}>Create</Text>
            </View>
          </View>
        </View>

        {/* Robot Illustration Space - Maximized Size */}
        <View style={styles.robotImageWrapper}>
          <Image
            source={require("../../assets/images/homeimg.png")}
            style={styles.robotAsset}
            resizeMode="contain"
          />
        </View>

        {/* Rounded Pill Neo-Brutalist CTA Button - Lifted Upward */}
        <View style={styles.bottomSection}>
          <View style={styles.pillButtonShadowWrapper}>
            <TouchableOpacity
              style={styles.pillGetStartedButton}
              activeOpacity={0.88}
              onPress={() => router.push("/learning")}
            >
              <Text style={styles.pillButtonText}>GET STARTED</Text>
            </TouchableOpacity>
          </View>

          {/* Subtext Link */}
          <TouchableOpacity 
            activeOpacity={0.7}
            onPress={() => router.push("/learning")}
            style={styles.subtextContainer}
          >
            <Text style={styles.orSignUpText}></Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF5EE",
    position: "relative",
  },

  /* Square Grid Background Pattern */
  gridOverlay: {
    position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
    zIndex: 0,
    opacity: 0.12,
  },
  gridRow: {
    flexDirection: "row",
  },
  gridCell: {
    width: GRID_SIZE,
    height: GRID_SIZE,
    borderWidth: 0.5,
    borderColor: "#000000",
  },

  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 36,
    paddingBottom: 20, // Reduced padding to shift elements up
    justifyContent: "space-between",
    zIndex: 2,
  },

  /* Header Logo */
  headerRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 4,
  },
  logoImage: {
    width: 48,
    height: 48,
  },

  /* Figma Selection Highlight Headline Style - Enlarged Typography */
  headlineContainer: {
    marginTop: 2,
    alignItems: "flex-start",
  },
  headlineRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  headlineTextRegular: {
    fontSize: 44, // Increased size
    fontWeight: "900",
    color: "#0F172A",
    letterSpacing: -1.5,
    lineHeight: 52,
    fontFamily: Platform.OS === "ios" ? "Avenir-Black" : "sans-serif-black",
  },
  highlightSelectionBox: {
    backgroundColor: "#CCFFD8",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 4,
  },
  highlightText: {
    fontSize: 44, // Increased size
    fontWeight: "900",
    color: "#0F172A",
    letterSpacing: -1.5,
    lineHeight: 52,
    fontFamily: Platform.OS === "ios" ? "Avenir-Black" : "sans-serif-black",
  },

  /* Robot Illustration - Takes Max Screen Real Estate */
  robotImageWrapper: {
    flex: 1.2, // Increased flex weight to enlarge illustration area
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 3,
  },
  robotAsset: {
    width: "110%", // Expanded bounds for larger asset presence
    height: "110%",
  },

  /* Background Elements */
  bgDecorations: {
    position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
    zIndex: 1,
  },
  topDotGrid: {
    position: "absolute",
    top: 50,
    right: 20,
    width: 60,
    height: 80,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    opacity: 0.35,
  },
  leftDotGrid: {
    position: "absolute",
    top: 320,
    left: 16,
    width: 45,
    height: 60,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    opacity: 0.3,
  },
  dot: {
    width: 3.5,
    height: 3.5,
    borderRadius: 2,
    backgroundColor: "#000000",
  },
  crosshair: {
    position: "absolute",
    fontSize: 22,
    fontWeight: "900",
    color: "#000000",
    opacity: 0.25,
  },
  decorBlockBlack: {
    position: "absolute",
    bottom: 180,
    left: 36,
    width: 22,
    height: 22,
    backgroundColor: "#000000",
  },
  decorBlockGreen: {
    position: "absolute",
    bottom: 170,
    left: 48,
    width: 22,
    height: 22,
    backgroundColor: "#00FF66",
    borderWidth: 2,
    borderColor: "#000000",
  },

  /* Pill Neo-Brutalist Button */
/* Pill Neo-Brutalist Button */
  bottomSection: {
    width: "100%",
    alignItems: "center",
    marginBottom: 90, // Increased padding to clear bottom nav tab
  },
  pillButtonShadowWrapper: {
    backgroundColor: "#000000",
    width: "100%",
    height: 58,
    borderRadius: 29,
  },
  pillGetStartedButton: {
    backgroundColor: "#A3F3B6",
    borderWidth: 2.5,
    borderColor: "#000000",
    height: 58,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -4,
    marginLeft: -4,
  },
  pillButtonText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#000000",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  subtextContainer: {
    marginTop: 4,
    paddingVertical: 4,
  },
  orSignUpText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#000000",
    letterSpacing: 0.8,
  },
});