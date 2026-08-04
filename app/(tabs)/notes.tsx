import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";

// Shared Google Drive Link for demo
const DEMO_DRIVE_LINK =
  "https://drive.google.com/file/d/1n46zKhdWahmQ0FvEBZApWc9vN_zqujTU/view?usp=drive_link";

interface NoteFolder {
  id: string;
  title: string;
  course: string;
  itemCountText: string;
  subText?: string;
  iconName: keyof typeof Ionicons.glyphMap;
  tabColor: string;
  iconBgColor: string;
  isNew?: boolean;
  driveUrl: string;
}

const noteFolders: NoteFolder[] = [
  {
    id: "f1",
    title: "Robotics Fundamentals",
    course: "Introduction to Robotics",
    itemCountText: "1 PDF note",
    iconName: "hardware-chip-outline",
    tabColor: "#9E9E9E",
    iconBgColor: "#CCCCCC",
    driveUrl: DEMO_DRIVE_LINK,
  },
  {
    id: "f2",
    title: "Arduino Quick Guides",
    course: "Arduino Programming",
    itemCountText: "3 PDF notes",
    iconName: "flash-outline",
    tabColor: "#32CD32",
    iconBgColor: "#4EFE50",
    driveUrl: DEMO_DRIVE_LINK,
  },
  {
    id: "f3",
    title: "Sensors & Motors",
    course: "Robotics Hardware",
    itemCountText: "5 PDF notes",
    subText: "2 sub-folders",
    iconName: "book-outline",
    tabColor: "#FFE58F",
    iconBgColor: "#FFD666",
    driveUrl: DEMO_DRIVE_LINK,
  },
  {
    id: "f4",
    title: "Kinematics & Motion",
    course: "Advanced Robotics",
    itemCountText: "2 PDF notes",
    iconName: "planet-outline",
    tabColor: "#A0E040",
    iconBgColor: "#B9F442",
    driveUrl: DEMO_DRIVE_LINK,
  },
  {
    id: "f5",
    title: "Microcontrollers Exam",
    course: "Embedded Systems",
    itemCountText: "4 PDF notes",
    iconName: "pulse-outline",
    tabColor: "#FF4D8D",
    iconBgColor: "#FF659D",
    driveUrl: DEMO_DRIVE_LINK,
  },
  {
    id: "f6",
    title: "Cheat Sheets & Pinouts",
    course: "Reference Guide",
    itemCountText: "6 PDF notes",
    isNew: true,
    iconName: "heart-outline",
    tabColor: "#7C4DFF",
    iconBgColor: "#9162FF",
    driveUrl: DEMO_DRIVE_LINK,
  },
];

export default function NotesScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpenDriveLink = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "Cannot open this Drive link.");
      }
    } catch {
      Alert.alert(
        "Error",
        "An unexpected error occurred while opening the file."
      );
    }
  };

  // Real-time functional search filter (checks folder title and course name)
  const filteredFolders = noteFolders.filter(
    (folder) =>
      folder.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      folder.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F4E8" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Top Header Buttons
        <View style={styles.topHeaderRow}>
          <TouchableOpacity style={styles.headerIconButton} activeOpacity={0.8}>
            <Ionicons name="settings-outline" size={20} color="#000" />
          </TouchableOpacity>

          <View style={styles.rightHeaderActions}>
            <TouchableOpacity style={styles.headerIconButton} activeOpacity={0.8}>
              <Ionicons name="folder-open-outline" size={20} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerIconButton}
              activeOpacity={0.8}
              onPress={() => setSearchQuery("")}
            >
              <Ionicons name="refresh-outline" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </View> */}

        {/* Hero Header Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.heroTitle}>Notes</Text>
          <Text style={styles.heroTitle}>Find anytime.</Text>
        </View>

        {/* Functional Search Bar Section */}
        <View style={styles.searchBarRow}>
          <View style={styles.inputBox}>
            <Text style={styles.hashSymbol}>#</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Search notes or courses..."
              placeholderTextColor="#777"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCorrect={false}
              clearButtonMode="while-editing"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity
                onPress={() => setSearchQuery("")}
                activeOpacity={0.6}
                style={{ padding: 4 }}
              >
                <Ionicons name="close-circle" size={18} color="#000" />
              </TouchableOpacity>
            )}
          </View>

          {/* Replaced Plus Icon with Search Icon Button */}
          <TouchableOpacity
            style={styles.searchActionButton}
            activeOpacity={0.8}
            onPress={() => {
              // Pressing search triggers focus effect or keeps current query active
            }}
          >
            <Ionicons name="search" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Section Title */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeading}>picked for you</Text>
          <View style={styles.countChip}>
            <Text style={styles.countChipText}>
              {filteredFolders.length} / {noteFolders.length}
            </Text>
          </View>
        </View>

        {/* Folder Grid or Empty State */}
        {filteredFolders.length === 0 ? (
          <View style={styles.emptyStateBox}>
            <Ionicons name="search-outline" size={36} color="#000" />
            <Text style={styles.emptyStateTitle}>No notes found</Text>
            <Text style={styles.emptyStateSub}>
              Try searching for a different keyword or course name.
            </Text>
          </View>
        ) : (
          <View style={styles.folderGrid}>
            {filteredFolders.map((folder) => (
              <TouchableOpacity
                key={folder.id}
                style={styles.folderCardWrapper}
                activeOpacity={0.88}
                onPress={() => handleOpenDriveLink(folder.driveUrl)}
              >
                {/* Folder Top Tab Handle */}
                <View
                  style={[
                    styles.folderTabHandle,
                    { backgroundColor: folder.tabColor },
                  ]}
                />

                {/* Folder Body */}
                <View style={styles.folderBody}>
                  {/* Header Row inside folder */}
                  <View style={styles.folderHeaderInner}>
                    <View
                      style={[
                        styles.folderIconBadge,
                        { backgroundColor: folder.iconBgColor },
                      ]}
                    >
                      <Ionicons name={folder.iconName} size={22} color="#000" />
                    </View>

                    <View style={{ alignItems: "flex-end" }}>
                      <Text style={styles.itemCountText}>
                        {folder.itemCountText}
                      </Text>
                      {folder.subText ? (
                        <Text style={styles.subText}>{folder.subText}</Text>
                      ) : null}
                      {folder.isNew ? (
                        <View style={styles.newBadge}>
                          <Text style={styles.newBadgeText}>NEW</Text>
                        </View>
                      ) : null}
                    </View>
                  </View>

                  {/* Folder Title */}
                  <Text style={styles.folderTitleText} numberOfLines={2}>
                    {folder.title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
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
    marginBottom: 20,
  },
  rightHeaderActions: {
    flexDirection: "row",
    gap: 10,
  },
  headerIconButton: {
    backgroundColor: "#FFFFFF",
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2.5,
    borderColor: "#000000",
    shadowColor: "#000000",
    shadowOpacity: 1,
    shadowRadius: 0,
    shadowOffset: { width: 3, height: 3 },
  },
  titleContainer: {
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: "900",
    color: "#000000",
    lineHeight: 36,
    letterSpacing: -0.5,
  },
  searchBarRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
  },
  inputBox: {
    flex: 1,
    height: 54,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 2.5,
    borderColor: "#000000",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    shadowColor: "#000000",
    shadowOpacity: 1,
    shadowRadius: 0,
    shadowOffset: { width: 3.5, height: 3.5 },
  },
  hashSymbol: {
    fontSize: 18,
    fontWeight: "900",
    color: "#000000",
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    color: "#000000",
  },
  searchActionButton: {
    width: 54,
    height: 54,
    backgroundColor: "#FFD666",
    borderRadius: 14,
    borderWidth: 2.5,
    borderColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOpacity: 1,
    shadowRadius: 0,
    shadowOffset: { width: 3.5, height: 3.5 },
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: "900",
    color: "#000000",
  },
  countChip: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#000000",
  },
  countChipText: {
    fontSize: 11,
    fontWeight: "900",
    color: "#000000",
  },
  emptyStateBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 2.5,
    borderColor: "#000000",
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    shadowColor: "#000000",
    shadowOpacity: 1,
    shadowRadius: 0,
    shadowOffset: { width: 4, height: 4 },
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#000000",
    marginTop: 8,
  },
  emptyStateSub: {
    fontSize: 12,
    fontWeight: "700",
    color: "#666666",
    textAlign: "center",
    marginTop: 4,
  },
  folderGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 20,
  },
  folderCardWrapper: {
    width: "48%",
    position: "relative",
  },
  folderTabHandle: {
    width: 60,
    height: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderWidth: 2.5,
    borderBottomWidth: 0,
    borderColor: "#000000",
    marginLeft: 12,
  },
  folderBody: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderTopLeftRadius: 0,
    borderWidth: 2.5,
    borderColor: "#000000",
    padding: 12,
    minHeight: 120,
    justifyContent: "space-between",
    shadowColor: "#000000",
    shadowOpacity: 1,
    shadowRadius: 0,
    shadowOffset: { width: 4, height: 4 },
  },
  folderHeaderInner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  folderIconBadge: {
    width: 44,
    height: 44,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  itemCountText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#333333",
  },
  subText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#666666",
    marginTop: 2,
  },
  newBadge: {
    backgroundColor: "#FF4D8D",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 4,
  },
  newBadgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "900",
  },
  folderTitleText: {
    fontSize: 14,
    fontWeight: "900",
    color: "#000000",
    lineHeight: 18,
  },
});