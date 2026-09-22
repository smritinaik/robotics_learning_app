import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

type Quiz = {
  id: number;
  title: string;
  questions: number;
  level: string;
  color: string;
  url: string;
};

const quizzes: Quiz[] = [
  {
    id: 1,
    title: "Robotics Construction",
    questions: 10,
    level: "Beginner",
    color: "#FFE66D",
    url: "https://www.quriousmind.co.in/quizzes/robotics-construction/",
  },
  {
    id: 2,
    title: "Block Programming",
    questions: 15,
    level: "Intermediate",
    color: "#B8F2E6",
    url: "https://www.quriousmind.co.in/quizzes/robotics-block-programming-quiz/",
  },
  {
    id: 3,
    title: "Arduino & Electronics",
    questions: 12,
    level: "Advanced",
    color: "#F8C8DC",
    url: "https://www.quriousmind.co.in/quizzes/robotics-arduino-electronics-quiz/",
  },
];

const rotations = ["-2deg", "2deg", "-1deg"];

export default function QuizScreen() {
  // Handler to launch specific quiz link
  const handleStartQuiz = async (url: string) => {
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await WebBrowser.openBrowserAsync(url);
      } else {
        await Linking.openURL(url);
      }
    } catch {
      Alert.alert("Error", "Could not open the quiz link.");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5ECD7" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.heading}>Quiz Board</Text>

        <Text style={styles.subHeading}>
          Pick a sticky note and test your robotics knowledge.
        </Text>

        {quizzes.map((quiz, index) => (
          <TouchableOpacity
            key={quiz.id}
            activeOpacity={0.85}
            onPress={() => handleStartQuiz(quiz.url)}
            style={[
              styles.note,
              {
                backgroundColor: quiz.color,
                transform: [{ rotate: rotations[index] }],
              },
            ]}
          >
            <View style={styles.pin} />

            <Text style={styles.noteTitle}>{quiz.title}</Text>

            <View style={styles.infoRow}>
              <Ionicons name="help-circle" size={18} color="#000" />
              <Text style={styles.infoText}>{quiz.questions} Questions</Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="star" size={18} color="#000" />
              <Text style={styles.infoText}>{quiz.level}</Text>
            </View>

            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={() => handleStartQuiz(quiz.url)}
            >
              <Text style={styles.buttonText}>Start Quiz</Text>

              <Ionicons name="arrow-forward" size={18} color="#000" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}

        <View style={{ height: 120 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5ECD7",
  },

  scrollContent: {
    padding: 20,
    paddingTop: 60,
  },

  heading: {
    fontSize: 32,
    fontWeight: "900",
    color: "#000",
  },

  subHeading: {
    marginTop: 8,
    marginBottom: 30,
    fontSize: 15,
    color: "#444",
    lineHeight: 22,
  },

  note: {
    borderRadius: 18,
    padding: 22,
    marginBottom: 28,

    borderWidth: 2,
    borderColor: "#000",

    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 0,
    shadowOffset: {
      width: 5,
      height: 5,
    },
  },

  pin: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FF4D4D",

    borderWidth: 2,
    borderColor: "#000",

    alignSelf: "center",
    marginBottom: 18,
  },

  noteTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#000",
    marginBottom: 18,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  infoText: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: "700",
    color: "#000",
  },

  button: {
    marginTop: 22,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#FFF",

    borderWidth: 2,
    borderColor: "#000",

    borderRadius: 14,

    paddingVertical: 12,

    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 0,
    shadowOffset: {
      width: 2,
      height: 2,
    },
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#000",
    marginRight: 8,
  },
});