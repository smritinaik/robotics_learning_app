import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const quizzes = [
  { id: 1, title: "React Native Basics", questions: 15, level: "Beginner" },
  { id: 2, title: "Expo Router", questions: 10, level: "Intermediate" },
  { id: 3, title: "TypeScript", questions: 20, level: "Beginner" },
];

export default function QuizScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4EAD4" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Pastel Light Blue Neo-Brutalist Hero Card Box */}
        <View style={styles.hero}>
          <View style={styles.heroIconContainer}>
            <Ionicons name="bulb" size={30} color="#000000" />
          </View>
          <Text style={styles.heroTitle}>Ready to Test Yourself?</Text>
          <Text style={styles.heroSubtitle}>
            Complete quizzes after every tutorial and track your learning progress.
          </Text>
        </View>
      
        <Text style={styles.sectionTitle}>Available Quizzes</Text>

        {quizzes.map((quiz) => (
          <TouchableOpacity key={quiz.id} style={styles.card} activeOpacity={0.8}>
            <View style={styles.iconBox}>
              <Ionicons name="help-circle" size={22} color="#000000" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{quiz.title}</Text>
              <Text style={styles.cardSubtitle}>{quiz.questions} Questions • {quiz.level}</Text>
            </View>

            <View style={styles.arrowContainer}>
              <Ionicons name="chevron-forward" size={18} color="#000000" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4EAD4",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 130,
  },
  hero: {
    backgroundColor: "#A8E6CF", // Pastel Light Mint panel style base
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    marginBottom: 32,
    borderWidth: 2.5,
    borderColor: "#000000",
    shadowColor: "#000000",
    shadowOpacity: 1,
    shadowRadius: 0,
    shadowOffset: { width: 5, height: 5 },
  },
  heroIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
    borderWidth: 2,
    borderColor: "#000000",
  },
  heroTitle: {
    color: "#000000",
    fontSize: 22,
    fontWeight: "900",
    textAlign: "center",
  },
  heroSubtitle: {
    color: "#000000",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 20,
    fontSize: 13,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#000000",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#E8AEB7", // Soft pastel pink base profile
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
  iconBox: {
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
  cardTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#000000",
  },
  cardSubtitle: {
    color: "#000000",
    marginTop: 4,
    fontSize: 13,
    fontWeight: "600",
  },
  arrowContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#000000",
  },
});