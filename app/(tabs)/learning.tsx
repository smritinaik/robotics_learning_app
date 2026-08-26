import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { useLikedStore } from "../../store/useLikedStore";

// --- Types ---
type CategoryType = "construction" | "programming";
type SubCategoryType = "L1" | "L2" | "L3" | "extra";

interface TutorialItem {
  id: string;
  title: string;
  videoUrl: string;
  category: CategoryType;
  level: SubCategoryType;
  accentColor: string;
  icon: string;
}

// --- Video Data Set ---
const TUTORIALS_DATA: TutorialItem[] = [
  // ==========================================
  // CONSTRUCTION - L1
  // ==========================================
  { id: "c1-1", title: "Introduction to robotics", videoUrl: "https://youtu.be/vwD-w1VOKt4?feature=shared", category: "construction", level: "L1", accentColor: "#CDE7FF", icon: "🤖" },
  { id: "c1-2", title: "Introduction to Qurio spark", videoUrl: "https://youtu.be/A3RjIC-Wul4?feature=shared", category: "construction", level: "L1", accentColor: "#CDE7FF", icon: "⚡" },
  { id: "c1-3", title: "How to connect motors", videoUrl: "https://youtu.be/26_9YtqmHLI?feature=shared", category: "construction", level: "L1", accentColor: "#CDE7FF", icon: "⚙️" },
  { id: "c1-4", title: "How to connect remote", videoUrl: "https://youtu.be/jkJVGO8qRpw?feature=shared", category: "construction", level: "L1", accentColor: "#CDE7FF", icon: "🎮" },
  { id: "c1-5", title: "Construction of Robuggi", videoUrl: "https://youtu.be/eapPxLmqFbg?feature=shared", category: "construction", level: "L1", accentColor: "#CDE7FF", icon: "🏎️" },
  { id: "c1-6", title: "Windmill part1", videoUrl: "https://youtu.be/AWe_Wq3cG3Q?feature=shared", category: "construction", level: "L1", accentColor: "#CDE7FF", icon: "🌪️" },
  { id: "c1-7", title: "Windmill part2", videoUrl: "https://youtu.be/6fprNETYVRo?feature=shared", category: "construction", level: "L1", accentColor: "#CDE7FF", icon: "🌪️" },
  { id: "c1-8", title: "Mechanical in robotics", videoUrl: "https://youtu.be/uQIuloVQs-k?feature=shared", category: "construction", level: "L1", accentColor: "#CDE7FF", icon: "🔧" },
  { id: "c1-9", title: "Construction of Bullock cart", videoUrl: "https://youtu.be/IngghsiGIpc?feature=shared", category: "construction", level: "L1", accentColor: "#CDE7FF", icon: "🐂" },
  { id: "c1-10", title: "Oscillatory motion", videoUrl: "https://youtu.be/8QFq6aAbfJY?feature=shared", category: "construction", level: "L1", accentColor: "#CDE7FF", icon: "🔄" },
  { id: "c1-11", title: "Construction of Swing", videoUrl: "https://youtu.be/gXUUJ0gj9Bk?feature=shared", category: "construction", level: "L1", accentColor: "#CDE7FF", icon: "🎪" },
  { id: "c1-12", title: "Construction of sea saw", videoUrl: "https://youtu.be/DhrCQBQ3lsc?feature=shared", category: "construction", level: "L1", accentColor: "#CDE7FF", icon: "🎢" },
  { id: "c1-13", title: "Construction of Massager", videoUrl: "https://youtu.be/a_xEzejcMyw?feature=shared", category: "construction", level: "L1", accentColor: "#CDE7FF", icon: "💆" },
  { id: "c1-14", title: "Construction of mery go round", videoUrl: "https://youtu.be/SBBWJXlAUbU?feature=shared", category: "construction", level: "L1", accentColor: "#CDE7FF", icon: "🎠" },
  { id: "c1-15", title: "Construction of Aeroplane", videoUrl: "https://youtu.be/1EJpwufjGd8?feature=shared", category: "construction", level: "L1", accentColor: "#CDE7FF", icon: "✈️" },
  { id: "c1-16", title: "Construction of free fall", videoUrl: "https://youtu.be/jrgoD4my7uw?feature=shared", category: "construction", level: "L1", accentColor: "#CDE7FF", icon: "🎢" },
  { id: "c1-17", title: "Construction of article robo", videoUrl: "https://youtu.be/J9lnRQTFIR8?feature=shared", category: "construction", level: "L1", accentColor: "#CDE7FF", icon: "🦾" },

  // ==========================================
  // CONSTRUCTION - L2
  // ==========================================
  { id: "c2-1", title: "Intro to qurio spark", videoUrl: "https://youtu.be/A3RjIC-Wul4?feature=shared", category: "construction", level: "L2", accentColor: "#FFF4B8", icon: "⚡" },
  { id: "c2-2", title: "How to connect motors", videoUrl: "https://youtu.be/26_9YtqmHLI?feature=shared", category: "construction", level: "L2", accentColor: "#FFF4B8", icon: "⚙️" },
  { id: "c2-3", title: "How to connect remote", videoUrl: "https://youtu.be/jkJVGO8qRpw?feature=shared", category: "construction", level: "L2", accentColor: "#FFF4B8", icon: "🎮" },
  { id: "c2-4", title: "Construction F1 car", videoUrl: "https://youtu.be/AAx7zU1zSQk?feature=shared", category: "construction", level: "L2", accentColor: "#FFF4B8", icon: "🏎️" },
  { id: "c2-5", title: "Construction Single motor vehicle", videoUrl: "https://youtu.be/gzk13lKGcNA?feature=shared", category: "construction", level: "L2", accentColor: "#FFF4B8", icon: "🚗" },
  { id: "c2-6", title: "Perform experiments circumference", videoUrl: "https://youtu.be/2XzqAPr77eY?feature=shared", category: "construction", level: "L2", accentColor: "#FFF4B8", icon: "📏" },
  { id: "c2-7", title: "Experiment RPM", videoUrl: "https://youtu.be/-8yiubk-aYQ?feature=shared", category: "construction", level: "L2", accentColor: "#FFF4B8", icon: "⏲️" },
  { id: "c2-8", title: "Oscillatory motion", videoUrl: "https://youtu.be/8QFq6aAbfJY?feature=shared", category: "construction", level: "L2", accentColor: "#FFF4B8", icon: "🔄" },
  { id: "c2-9", title: "Violin Player", videoUrl: "https://youtu.be/-o5pIhY73yk?feature=shared", category: "construction", level: "L2", accentColor: "#FFF4B8", icon: "🎻" },
  { id: "c2-10", title: "Drummer", videoUrl: "https://youtu.be/rCyooTaCr5s?feature=shared", category: "construction", level: "L2", accentColor: "#FFF4B8", icon: "🥁" },
  { id: "c2-11", title: "Design methodology", videoUrl: "https://youtu.be/1KhWzi3D6tQ?feature=shared", category: "construction", level: "L2", accentColor: "#FFF4B8", icon: "📐" },
  { id: "c2-12", title: "Construction of Crane", videoUrl: "https://youtu.be/7uPT8Epu7VE?feature=shared", category: "construction", level: "L2", accentColor: "#FFF4B8", icon: "🏗️" },
  { id: "c2-13", title: "Automatic door", videoUrl: "https://youtu.be/GbqkjyEOpdE?feature=shared", category: "construction", level: "L2", accentColor: "#FFF4B8", icon: "🚪" },
  { id: "c2-14", title: "Peacock", videoUrl: "https://youtu.be/jmuij9st8ZU?feature=shared", category: "construction", level: "L2", accentColor: "#FFF4B8", icon: "🦚" },
  { id: "c2-15", title: "Electrical robotics", videoUrl: "https://youtu.be/kJnNN3z-bpM?feature=shared", category: "construction", level: "L2", accentColor: "#FFF4B8", icon: "🔌" },

  // ==========================================
  // CONSTRUCTION - EXTRA
  // ==========================================
  { id: "cx-1", title: "How to connect motors", videoUrl: "https://youtu.be/26_9YtqmHLI?feature=shared", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "⚙️" },
  { id: "cx-2", title: "How to connect remote", videoUrl: "https://youtu.be/jkJVGO8qRpw?feature=shared", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "🎮" },
  { id: "cx-3", title: "Qurio Mini boy jumping on trampoline", videoUrl: "https://youtu.be/nLU0Fk9CXJ4?feature=shared", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "🤸" },
  { id: "cx-4", title: "Qurio Mini Girl on tree", videoUrl: "https://youtu.be/RUNeCHixpLk?feature=shared", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "🌳" },
  { id: "cx-5", title: "Sea saw qurio Mini", videoUrl: "https://youtu.be/7N9IJ-1S9O8?feature=shared", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "🎢" },
  { id: "cx-6", title: "Vertical merry go round Qurio mini", videoUrl: "https://youtu.be/R7Rv2XS2bRY?feature=shared", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "🎡" },
  { id: "cx-7", title: "Qurio mini Windmill", videoUrl: "https://youtu.be/yf6NLOAqCRo?feature=shared", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "🌪️" },
  { id: "cx-8", title: "Qurio Reach Cruncher", videoUrl: "https://youtu.be/npWQOJPC1NY?feature=shared", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "💪" },
  { id: "cx-9", title: "Qurio Reach Massager", videoUrl: "https://youtu.be/aCQqPWJjjHY?feature=shared", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "💆" },
  { id: "cx-10", title: "Reach merry go round", videoUrl: "https://youtu.be/cmxwR0HpFiU?feature=shared", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "🎠" },
  { id: "cx-11", title: "Reach Robotics buggy", videoUrl: "https://youtu.be/eapPxLmqFbg?feature=shared", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "🏎️" },
  { id: "cx-12", title: "Reach voilin Player", videoUrl: "https://youtu.be/ssxR19c64oA?feature=shared", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "🎻" },
  { id: "cx-13", title: "Reach Swing", videoUrl: "https://youtu.be/gXUUJ0gj9Bk?feature=shared", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "🎪" },
  { id: "cx-14", title: "Reach sea saw", videoUrl: "https://youtu.be/DhrCQBQ3lsc?feature=shared", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "🎢" },
  { id: "cx-15", title: "Reach free fall", videoUrl: "https://youtu.be/jrgoD4my7uw?feature=shared", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "🎢" },
  { id: "cx-16", title: "Reach Bullock cart", videoUrl: "https://youtu.be/IngghsiGIpc?feature=shared", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "🐂" },
  { id: "cx-17", title: "Qurio Reach Windmill", videoUrl: "https://youtu.be/AWe_Wq3cG3Q?feature=shared", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "🌪️" },
  { id: "cx-18", title: "Spark Crane", videoUrl: "https://youtu.be/88IsgA20SVg?feature=shared", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "🏗️" },
  { id: "cx-19", title: "Drummer", videoUrl: "https://youtu.be/X646AgIFcAI?feature=shared", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "🥁" },
  { id: "cx-20", title: "Aeroplane", videoUrl: "https://youtu.be/1EJpwufjGd8?feature=shared", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "✈️" },
  { id: "cx-21", title: "Robotics cat", videoUrl: "https://youtu.be/vH6SpNdcglY?feature=shared", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "🐱" },
  { id: "cx-22", title: "Construction F1 car", videoUrl: "https://youtu.be/AAx7zU1zSQk?feature=shared", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "🏎️" },
  { id: "cx-23", title: "Arti robo", videoUrl: "https://youtu.be/J9lnRQTFIR8?feature=shared", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "🦾" },
  { id: "cx-24", title: "Construction Peacock", videoUrl: "https://youtu.be/jmuij9st8ZU?feature=shared", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "🦚" },
  { id: "cx-25", title: "Padestrisl fan", videoUrl: "https://youtu.be/S3eWHVMwU_A?feature=shared", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "💨" },
  { id: "cx-26", title: "Automatic door", videoUrl: "https://youtu.be/GbqkjyEOpdE?feature=shared", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "🚪" },
  { id: "cx-27", title: "Two seat vehicle", videoUrl: "https://youtu.be/GG6LcmJMLgI?si=rEAtSOpHIzVIfHiI", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "🚙" },
  { id: "cx-28", title: "Lift", videoUrl: "https://youtu.be/hDy0coQUhwU?si=sFlfpCnnodxXCaMd", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "🛗" },
  { id: "cx-29", title: "Jumping minion", videoUrl: "https://youtu.be/iiZ04_KwVQg?si=tpp1tRztf7JorqZh", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "🍌" },
  { id: "cx-30", title: "Vintage car", videoUrl: "https://youtu.be/XfA66Diecpo?si=mbf2hrxbLWvKURYX", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "🚘" },
  { id: "cx-31", title: "Rotating dolls", videoUrl: "https://youtu.be/ci-qZG1pt6U?si=GMAcgwr2Ev6jcgdm", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "💃" },
  { id: "cx-32", title: "Chapati maker", videoUrl: "https://youtu.be/m91Q1APgSF0?feature=shared", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "🫓" },
  { id: "cx-33", title: "Cooking robot", videoUrl: "https://youtu.be/87PCwrxpbzA?feature=shared", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "🍳" },
  { id: "cx-34", title: "Stand mixer", videoUrl: "https://youtu.be/P3Mh97yDLhw?feature=shared", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "🥣" },
  { id: "cx-35", title: "Dumbbells", videoUrl: "https://youtu.be/2CLkv_NSrP8?feature=shared", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "🏋️" },
  { id: "cx-36", title: "Bird", videoUrl: "https://youtu.be/5bCanSGzf_M?feature=shared", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "🐦" },
  { id: "cx-37", title: "Helicopter", videoUrl: "https://youtu.be/H-MQJpDjEZc?feature=shared", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "🚁" },
  { id: "cx-38", title: "Triangular car", videoUrl: "https://youtu.be/rS3GPSV5vF4?feature=shared", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "📐" },
  { id: "cx-39", title: "Robbit", videoUrl: "https://youtu.be/cEnKZwMZ8e8?feature=shared", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "🐇" },
  { id: "cx-40", title: "Gunman", videoUrl: "https://youtu.be/6okkmYyP-B4?feature=shared", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "🎯" },
  { id: "cx-41", title: "Digger", videoUrl: "https://youtu.be/okBnU3e91oQ?feature=shared", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "🚜" },
  { id: "cx-42", title: "Load shifted", videoUrl: "https://youtu.be/HdIIIM8vEXM?feature=shared", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "📦" },
  { id: "cx-43", title: "Earth mower", videoUrl: "https://youtu.be/Fv5t-47po6k?feature=shared", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "🚜" },
  { id: "cx-44", title: "Garbage truck", videoUrl: "https://youtu.be/Nh_IhGxUlWw?feature=shared", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "🚛" },
  { id: "cx-45", title: "Ocean scene", videoUrl: "https://youtu.be/UKpAWF0ilpY?si=ozAZbe3skraPAJhL", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "🌊" },
  { id: "cx-46", title: "Buran mat bolo", videoUrl: "https://youtu.be/43M7AjRPK7c?feature=shared", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "🙊" },
  { id: "cx-47", title: "Bura mat suno", videoUrl: "https://youtu.be/f1cdivgdmfE?feature=shared", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "🙉" },
  { id: "cx-48", title: "Dog in kennel", videoUrl: "https://youtu.be/bX_cS8cibyo?feature=shared", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "🐶" },
  { id: "cx-49", title: "Save earth", videoUrl: "https://youtu.be/h6c2mk5XBS8?feature=shared", category: "construction", level: "extra", accentColor: "#FFD8C2", icon: "🌍" },

  // ==========================================
  // PROGRAMMING - L1
  // ==========================================
  { id: "p1-1", title: "Get started with programming", videoUrl: "https://youtu.be/GKs3Sjd_Ruw?feature=shared", category: "programming", level: "L1", accentColor: "#D8FFD6", icon: "💻" },
  { id: "p1-2", title: "Over view of mBlock", videoUrl: "https://youtu.be/zsS3tN9p0_8?feature=shared", category: "programming", level: "L1", accentColor: "#D8FFD6", icon: "🧩" },
  { id: "p1-3", title: "Instalation of mBlock", videoUrl: "https://youtu.be/6Iu9w7sJBxo?feature=shared", category: "programming", level: "L1", accentColor: "#D8FFD6", icon: "📥" },
  { id: "p1-4", title: "Introduction to mBlock", videoUrl: "https://youtu.be/7tK4-_xCFNk?feature=shared", category: "programming", level: "L1", accentColor: "#D8FFD6", icon: "📖" },
  { id: "p1-5", title: "Adding mBlock extension", videoUrl: "https://youtu.be/yURb_AgQql4?feature=shared", category: "programming", level: "L1", accentColor: "#D8FFD6", icon: "🔌" },
  { id: "p1-6", title: "Create and upload program", videoUrl: "https://youtu.be/m27amjZ6lZk?feature=shared", category: "programming", level: "L1", accentColor: "#D8FFD6", icon: "⬆️" },
  { id: "p1-7", title: "Intro to Qurio fire shield", videoUrl: "https://youtu.be/GAFMiULjifE?si=Jw-tdc2ajV8ws77f", category: "programming", level: "L1", accentColor: "#D8FFD6", icon: "🛡️" },
  { id: "p1-8", title: "Qurio fire connection", videoUrl: "https://youtu.be/p7YbWHe1kUw?feature=shared", category: "programming", level: "L1", accentColor: "#D8FFD6", icon: "🔥" },
  { id: "p1-9", title: "Programming a Windmill", videoUrl: "https://youtu.be/_vcZHNpMoPE?feature=shared", category: "programming", level: "L1", accentColor: "#D8FFD6", icon: "🌪️" },
  { id: "p1-10", title: "Assemble Windmill with gears", videoUrl: "https://youtu.be/uxyw3bnzs8M?feature=shared", category: "programming", level: "L1", accentColor: "#D8FFD6", icon: "⚙️" },
  { id: "p1-11", title: "Single motor block of Qurio fire", videoUrl: "https://youtu.be/PtkPCIlPdfs?feature=shared", category: "programming", level: "L1", accentColor: "#D8FFD6", icon: "🧱" },
  { id: "p1-12", title: "Rotate the windmill clockwise", videoUrl: "https://youtu.be/9lMlfBbNu5k?feature=shared", category: "programming", level: "L1", accentColor: "#D8FFD6", icon: "🔃" },
  { id: "p1-13", title: "Clockwise anticlockwise", videoUrl: "https://youtu.be/suStayU3oZs?feature=shared", category: "programming", level: "L1", accentColor: "#D8FFD6", icon: "🔄" },
  { id: "p1-14", title: "Windmill varient speed", videoUrl: "https://youtu.be/r6813js-i24?feature=shared", category: "programming", level: "L1", accentColor: "#D8FFD6", icon: "⚡" },
  { id: "p1-15", title: "Windmill multiple rotations", videoUrl: "https://youtu.be/pr-SxeNChMA?feature=shared", category: "programming", level: "L1", accentColor: "#D8FFD6", icon: "🌀" },
  { id: "p1-16", title: "Assemble vehicle platform", videoUrl: "https://youtu.be/Vw9INidvzb0?si=F6tjAz7MF5nxq05s", category: "programming", level: "L1", accentColor: "#D8FFD6", icon: "🚗" },
  { id: "p1-17", title: "Move vehicle A to B and Stop", videoUrl: "https://youtu.be/d2_eRaJ8HmY?feature=shared", category: "programming", level: "L1", accentColor: "#D8FFD6", icon: "🛑" },
  { id: "p1-18", title: "Move vehicle A to B then B to A", videoUrl: "https://youtu.be/Mha9qRxOSGY?feature=shared", category: "programming", level: "L1", accentColor: "#D8FFD6", icon: "↔️" },
  { id: "p1-19", title: "Program to hard turn", videoUrl: "https://youtu.be/ZFbOermL3GI?feature=shared", category: "programming", level: "L1", accentColor: "#D8FFD6", icon: "↩️" },
  { id: "p1-20", title: "Draw square", videoUrl: "https://youtu.be/DldnUiB1XA4?feature=shared", category: "programming", level: "L1", accentColor: "#D8FFD6", icon: "⏹️" },
  { id: "p1-21", title: "Draw square with repeat loop", videoUrl: "https://youtu.be/gnGfWSOZXfQ?feature=shared", category: "programming", level: "L1", accentColor: "#D8FFD6", icon: "🔁" },
  { id: "p1-22", title: "Draw rectangle", videoUrl: "https://youtu.be/PWLKUp9ZRv8?feature=shared", category: "programming", level: "L1", accentColor: "#D8FFD6", icon: "▭" },
  { id: "p1-23", title: "Draw staircase", videoUrl: "https://youtu.be/Rlvd4a2--zY?feature=shared", category: "programming", level: "L1", accentColor: "#D8FFD6", icon: "🪜" },
  { id: "p1-24", title: "Draw square wave", videoUrl: "https://youtu.be/8xuM_Rwi3vQ?feature=shared", category: "programming", level: "L1", accentColor: "#D8FFD6", icon: "📈" },
  { id: "p1-25", title: "Draw red cross symbol", videoUrl: "https://youtu.be/cG37b-dUpsU?feature=shared", category: "programming", level: "L1", accentColor: "#D8FFD6", icon: "➕" },
  { id: "p1-26", title: "Draw circle", videoUrl: "https://youtu.be/ys2D-5dVUBs?feature=shared", category: "programming", level: "L1", accentColor: "#D8FFD6", icon: "⚪" },
  { id: "p1-27", title: "Draw infinity loop", videoUrl: "https://youtu.be/AGIRhbz0DGE?feature=shared", category: "programming", level: "L1", accentColor: "#D8FFD6", icon: "♾️" },
  { id: "p1-28", title: "Draw sine wave", videoUrl: "https://youtu.be/AGIRhbz0DGE?feature=shared", category: "programming", level: "L1", accentColor: "#D8FFD6", icon: "🌊" },
  { id: "p1-29", title: "Construction of robocat", videoUrl: "https://youtu.be/vH6SpNdcglY?feature=shared", category: "programming", level: "L1", accentColor: "#D8FFD6", icon: "🐱" },
  { id: "p1-30", title: "Robocat program 1", videoUrl: "https://youtu.be/-cEm-9NWaJE?feature=shared", category: "programming", level: "L1", accentColor: "#D8FFD6", icon: "🐱" },
  { id: "p1-31", title: "Robocat program 2", videoUrl: "https://youtu.be/iXiJtthrNJ8?feature=shared", category: "programming", level: "L1", accentColor: "#D8FFD6", icon: "🐱" },
  { id: "p1-32", title: "Led programming basics", videoUrl: "https://youtu.be/hbHvdaVr6uA?feature=share", category: "programming", level: "L1", accentColor: "#D8FFD6", icon: "💡" },
  { id: "p1-33", title: "Led switch on off program", videoUrl: "https://youtu.be/gGq21OiOwcs?feature=shared", category: "programming", level: "L1", accentColor: "#D8FFD6", icon: "💡" },

  // ==========================================
  // PROGRAMMING - L2
  // ==========================================
  { id: "p2-1", title: "Get started with programming", videoUrl: "https://youtu.be/GKs3Sjd_Ruw?feature=shared", category: "programming", level: "L2", accentColor: "#E8D5FF", icon: "💻" },
  { id: "p2-2", title: "Over view of mBlock", videoUrl: "https://youtu.be/zsS3tN9p0_8?feature=shared", category: "programming", level: "L2", accentColor: "#E8D5FF", icon: "🧩" },
  { id: "p2-3", title: "Instalation of mBlock", videoUrl: "https://youtu.be/6Iu9w7sJBxo?feature=shared", category: "programming", level: "L2", accentColor: "#E8D5FF", icon: "📥" },
  { id: "p2-4", title: "Introduction to mBlock", videoUrl: "https://youtu.be/7tK4-_xCFNk?feature=shared", category: "programming", level: "L2", accentColor: "#E8D5FF", icon: "📖" },
  { id: "p2-5", title: "Adding mBlock extension", videoUrl: "https://youtu.be/yURb_AgQql4?feature=shared", category: "programming", level: "L2", accentColor: "#E8D5FF", icon: "🔌" },
  { id: "p2-6", title: "Create and upload program", videoUrl: "https://youtu.be/m27amjZ6lZk?feature=shared", category: "programming", level: "L2", accentColor: "#E8D5FF", icon: "⬆️" },
  { id: "p2-7", title: "Intro to Qurio fire shield", videoUrl: "https://youtu.be/GAFMiULjifE?si=Jw-tdc2ajV8ws77f", category: "programming", level: "L2", accentColor: "#E8D5FF", icon: "🛡️" },
  { id: "p2-8", title: "Assemble vehicle platform", videoUrl: "https://youtu.be/Vw9INidvzb0?si=F6tjAz7MF5nxq05s", category: "programming", level: "L2", accentColor: "#E8D5FF", icon: "🚗" },
  { id: "p2-9", title: "Vehicle forward and stop", videoUrl: "https://youtu.be/8mOjr_5Okak?si=qQ8MAGzUgcH8C892", category: "programming", level: "L2", accentColor: "#E8D5FF", icon: "🛑" },
  { id: "p2-10", title: "Dragging problem solution", videoUrl: "https://youtu.be/_qXPwy2fho4?si=0lDPhqTfB9tWCkq0", category: "programming", level: "L2", accentColor: "#E8D5FF", icon: "🛠️" },
  { id: "p2-11", title: "Forward reverse stop", videoUrl: "https://youtu.be/3WKPGa-AK7U?si=JRN-RE3w1qb3vqwZ", category: "programming", level: "L2", accentColor: "#E8D5FF", icon: "↕️" },
  { id: "p2-12", title: "Forward and turn", videoUrl: "https://youtu.be/3bfFsTMUYls?si=o-bUZaZiaCdIcLox", category: "programming", level: "L2", accentColor: "#E8D5FF", icon: "↪️" },
  { id: "p2-13", title: "Draw square", videoUrl: "https://youtu.be/NPcckJst7Vc?si=tyGR7F0wRTVUvNkl", category: "programming", level: "L2", accentColor: "#E8D5FF", icon: "⏹️" },
  { id: "p2-14", title: "Motor program using arduino & driver", videoUrl: "https://youtu.be/UMwzTNdanno?feature=shared", category: "programming", level: "L2", accentColor: "#E8D5FF", icon: "⚙️" },
  { id: "p2-15", title: "Program vehicle using arduino block (Pt 1)", videoUrl: "https://youtu.be/fzb2wOz4-to?feature=shared", category: "programming", level: "L2", accentColor: "#E8D5FF", icon: "🤖" },
  { id: "p2-16", title: "Program vehicle using arduino block (Pt 2)", videoUrl: "https://youtu.be/St8dp97uwrI?feature=shared", category: "programming", level: "L2", accentColor: "#E8D5FF", icon: "🤖" },
  { id: "p2-17", title: "Modular programming create own block", videoUrl: "https://youtu.be/z33UCg0A8MM?feature=shared", category: "programming", level: "L2", accentColor: "#E8D5FF", icon: "📦" },
  { id: "p2-18", title: "Modular programming Block with arguments", videoUrl: "https://youtu.be/86DxHJgqiEE?feature=shared", category: "programming", level: "L2", accentColor: "#E8D5FF", icon: "🏷️" },
  { id: "p2-19", title: "Modular programming Own block for vehicle", videoUrl: "https://youtu.be/Nkso6lv1efU?feature=shared", category: "programming", level: "L2", accentColor: "#E8D5FF", icon: "🚙" },
  { id: "p2-20", title: "Draw circle and sine wave", videoUrl: "https://youtu.be/IypECpFzaWk?feature=shared", category: "programming", level: "L2", accentColor: "#E8D5FF", icon: "🌊" },
  { id: "p2-21", title: "Draw square in square", videoUrl: "https://youtu.be/UjMsfHJ0Gqg?feature=shared", category: "programming", level: "L2", accentColor: "#E8D5FF", icon: "🔳" },
  { id: "p2-22", title: "Variable Introduction", videoUrl: "https://youtu.be/AkEflyNHUdE?feature=shared", category: "programming", level: "L2", accentColor: "#E8D5FF", icon: "📊" },
  { id: "p2-23", title: "Draw spiral", videoUrl: "https://youtu.be/BhohhlESpHI?feature=shared", category: "programming", level: "L2", accentColor: "#E8D5FF", icon: "🌀" },
  { id: "p2-24", title: "Input programming basics", videoUrl: "https://youtu.be/tVVjPNunFjw?feature=shared", category: "programming", level: "L2", accentColor: "#E8D5FF", icon: "📥" },
  { id: "p2-25", title: "Input programming using arduino block", videoUrl: "https://youtu.be/nw-h-Kg-R3M?feature=shared", category: "programming", level: "L2", accentColor: "#E8D5FF", icon: "🕹️" },
  { id: "p2-26", title: "Voltage divider circuit", videoUrl: "https://youtu.be/t9podEd6lFQ?feature=shared", category: "programming", level: "L2", accentColor: "#E8D5FF", icon: "⚡" },
  { id: "p2-27", title: "Build Voltage divider circuit", videoUrl: "https://youtu.be/mYsujDT1-8Q?feature=shared", category: "programming", level: "L2", accentColor: "#E8D5FF", icon: "🔋" },
  { id: "p2-28", title: "Serial monitor", videoUrl: "https://youtu.be/xsZHjbC0vCc?feature=shared", category: "programming", level: "L2", accentColor: "#E8D5FF", icon: "🖥️" },
  { id: "p2-29", title: "Conditional programming", videoUrl: "https://youtu.be/DJ7uCfK1t_E?feature=shared", category: "programming", level: "L2", accentColor: "#E8D5FF", icon: "🔀" },
  { id: "p2-30", title: "Tips on Input devices", videoUrl: "https://youtu.be/Khy1aBHs_bQ?feature=shared", category: "programming", level: "L2", accentColor: "#E8D5FF", icon: "💡" },
  { id: "p2-31", title: "Control brightness of LED", videoUrl: "https://youtu.be/tCEUlbL7OH8?feature=shared", category: "programming", level: "L2", accentColor: "#E8D5FF", icon: "🔆" },
  { id: "p2-32", title: "LED ON OFF using analog values", videoUrl: "https://youtu.be/QDvcfO48WJM?feature=shared", category: "programming", level: "L2", accentColor: "#E8D5FF", icon: "🎛️" },
  { id: "p2-33", title: "Robocat", videoUrl: "https://youtu.be/vH6SpNdcglY?feature=shared", category: "programming", level: "L2", accentColor: "#E8D5FF", icon: "🐱" },
  { id: "p2-34", title: "Sensors basics", videoUrl: "https://youtu.be/Dqvy2f5LPEM?si=GSJPvAd3yNyAI9aw", category: "programming", level: "L2", accentColor: "#E8D5FF", icon: "📡" },
  { id: "p2-35", title: "Using light sensor", videoUrl: "https://youtu.be/unNUa2OaVSM?feature=shared", category: "programming", level: "L2", accentColor: "#E8D5FF", icon: "☀️" },
  { id: "p2-36", title: "Using IR sensor", videoUrl: "https://youtu.be/lPtu_XtZsEI?feature=shared", category: "programming", level: "L2", accentColor: "#E8D5FF", icon: "🔴" },
  { id: "p2-37", title: "Using light and IR sensor together", videoUrl: "https://youtu.be/XT6ryaZ0ArE?feature=shared", category: "programming", level: "L2", accentColor: "#E8D5FF", icon: "🛰️" },
  { id: "p2-38", title: "Bluetooth programming", videoUrl: "https://youtu.be/79LkqAgx28I?feature=shared", category: "programming", level: "L2", accentColor: "#E8D5FF", icon: "📶" },
  { id: "p2-39", title: "Bluetooth controlled LED", videoUrl: "https://youtu.be/PZetyojxcsE?feature=shared", category: "programming", level: "L2", accentColor: "#E8D5FF", icon: "📲" },
  { id: "p2-40", title: "Bluetooth controlled vehicle", videoUrl: "https://youtu.be/UfoPMgG93n0?feature=shared", category: "programming", level: "L2", accentColor: "#E8D5FF", icon: "🚘" },

  // ==========================================
  // PROGRAMMING - L3
  // ==========================================
  { id: "p3-1", title: "Introduction to Arduino", videoUrl: "https://youtu.be/HQu4QWyyHn0?si=8NNYB064YXZDOo_V", category: "programming", level: "L3", accentColor: "#FFD6E7", icon: "♾️" },
  { id: "p3-2", title: "Qurio fire shield with arduino connection", videoUrl: "https://youtu.be/GAFMiULjifE?si=uRScqXyRiWz1S1RZ", category: "programming", level: "L3", accentColor: "#FFD6E7", icon: "🛡️" },
  { id: "p3-3", title: "Introduction to Arduino IDE", videoUrl: "https://youtu.be/iDRtHYtDGd8?si=5rJoAVm42j3HUm5x", category: "programming", level: "L3", accentColor: "#FFD6E7", icon: "💻" },
  { id: "p3-4", title: "Introduction to Arduino programming", videoUrl: "https://youtu.be/FQdniLSX_ts?si=7eg0wpO1uLFejG6I", category: "programming", level: "L3", accentColor: "#FFD6E7", icon: "📝" },
  { id: "p3-5", title: "Intro to arduino library", videoUrl: "https://youtu.be/XA4ZjEfkROM?si=hAtJnjL9-p5vKB_D", category: "programming", level: "L3", accentColor: "#FFD6E7", icon: "📚" },
  { id: "p3-6", title: "Using arduino library", videoUrl: "https://youtu.be/BTzVNcUMNjc?si=IyyJ7vz5jFgJDJgL", category: "programming", level: "L3", accentColor: "#FFD6E7", icon: "📖" },
  { id: "p3-7", title: "Content of arduino library", videoUrl: "https://youtu.be/32gcVWAWrXw?si=YJPXx3ugViWWJUO_", category: "programming", level: "L3", accentColor: "#FFD6E7", icon: "📦" },
  { id: "p3-8", title: "Vehicle Assemble platform", videoUrl: "https://youtu.be/Vw9INidvzb0?si=mYJKzPZd92oFwyrM", category: "programming", level: "L3", accentColor: "#FFD6E7", icon: "🚗" },
  { id: "p3-9", title: "Vehicle Forward and stop", videoUrl: "https://youtu.be/BCwvf4euGxM?si=v-ga_qp4VEc-Ku9x", category: "programming", level: "L3", accentColor: "#FFD6E7", icon: "🛑" },
  { id: "p3-10", title: "Vehicle Forward stop reverse", videoUrl: "https://youtu.be/wB-3aHk06VM?si=XR1swITC9TMLm0bR", category: "programming", level: "L3", accentColor: "#FFD6E7", icon: "↕️" },
  { id: "p3-11", title: "Qurious fire connection", videoUrl: "https://youtu.be/p7YbWHe1kUw?feature=shared", category: "programming", level: "L3", accentColor: "#FFD6E7", icon: "🔥" },
  { id: "p3-12", title: "Debugging in arduino", videoUrl: "https://youtu.be/CvQZW1RNuZ8?si=OK401SpkXB1DNN8X", category: "programming", level: "L3", accentColor: "#FFD6E7", icon: "🐛" },
  { id: "p3-13", title: "Arduino command", videoUrl: "https://youtu.be/eDwl5Wxx-l8?si=HLt8O6v-9FMRZSfu", category: "programming", level: "L3", accentColor: "#FFD6E7", icon: "⌨️" },
  { id: "p3-14", title: "Switch on off using arduino command", videoUrl: "https://youtu.be/lMoSd9iPji8?si=JeIxzIGTjPru62cM", category: "programming", level: "L3", accentColor: "#FFD6E7", icon: "🔌" },
  { id: "p3-15", title: "Motor program using arduino command", videoUrl: "https://youtu.be/2aAwz2uz3_o?si=CO8Q_d6omo0aG3SD", category: "programming", level: "L3", accentColor: "#FFD6E7", icon: "⚙️" },
  { id: "p3-16", title: "Vehicle Forward turn stop", videoUrl: "https://youtu.be/GukUuCZVRyA?si=qI0-uggfO0cILy4l", category: "programming", level: "L3", accentColor: "#FFD6E7", icon: "↪️" },
  { id: "p3-17", title: "Draw square", videoUrl: "https://youtu.be/yF95L66SB8k?si=tMRVDBMMJR2dgsDD", category: "programming", level: "L3", accentColor: "#FFD6E7", icon: "⏹️" },
  { id: "p3-18", title: "Move in square fashion", videoUrl: "https://youtu.be/lVbPDpaCDY4?si=xPJWxt1xr8P906e9", category: "programming", level: "L3", accentColor: "#FFD6E7", icon: "🔲" },
  { id: "p3-19", title: "Move in rectangle fashion", videoUrl: "https://youtu.be/teswtEu-7Ho?si=PSpdYpqQKlJxhmZy", category: "programming", level: "L3", accentColor: "#FFD6E7", icon: "▭" },
  { id: "p3-20", title: "Move in staircase fashion", videoUrl: "https://youtu.be/IR1TGUS5OiU?si=7KIo5rKCxU4zul6_", category: "programming", level: "L3", accentColor: "#FFD6E7", icon: "🪜" },
  { id: "p3-21", title: "Move in square pattern", videoUrl: "https://youtu.be/IR1TGUS5OiU?si=qR1ausHFXQrVjxfS", category: "programming", level: "L3", accentColor: "#FFD6E7", icon: "🔳" },
  { id: "p3-22", title: "Move in increasing square pattern", videoUrl: "https://youtu.be/hmLOxSKxvi8?si=BsvZdFdqE9h4niv3", category: "programming", level: "L3", accentColor: "#FFD6E7", icon: "📐" },
  { id: "p3-23", title: "LED concept and setup", videoUrl: "https://youtu.be/gTwJnnOBuAc?si=fF8eeW9W2jnts905", category: "programming", level: "L3", accentColor: "#FFD6E7", icon: "💡" },
  { id: "p3-24", title: "LED switch on off", videoUrl: "https://youtu.be/2wu5sPB-_UQ?si=Q3xRhv_UeQJvym0v", category: "programming", level: "L3", accentColor: "#FFD6E7", icon: "💡" },
  { id: "p3-25", title: "LED fade", videoUrl: "https://youtu.be/2wu5sPB-_UQ?si=UjTAYYsDvtkhD4Xa", category: "programming", level: "L3", accentColor: "#FFD6E7", icon: "🌟" },
  { id: "p3-26", title: "Modular programming", videoUrl: "https://youtu.be/ZnF3ZCUUkQc?si=SvDj1N5olLQFb4dQ", category: "programming", level: "L3", accentColor: "#FFD6E7", icon: "🧩" },
  { id: "p3-27", title: "Create function module", videoUrl: "https://youtu.be/r-jxSTZFDW4?si=ghnKOAg1BSTCk8Rv", category: "programming", level: "L3", accentColor: "#FFD6E7", icon: "📦" },
  { id: "p3-28", title: "Serial monitor", videoUrl: "https://youtu.be/MeAZW_fDK18?si=PQyeRrGKWTCI37np", category: "programming", level: "L3", accentColor: "#FFD6E7", icon: "🖥️" },
  { id: "p3-29", title: "Serial monitor display 1 to 10", videoUrl: "https://youtu.be/8EMS8pNNcF8?si=IzfNkiaQoxoQnlJG", category: "programming", level: "L3", accentColor: "#FFD6E7", icon: "🔢" },
  { id: "p3-30", title: "Display square numbers 1 to 10", videoUrl: "https://youtu.be/8EMS8pNNcF8?si=wGEK7VDX4Ek_dA5-", category: "programming", level: "L3", accentColor: "#FFD6E7", icon: "🔢" },
  { id: "p3-31", title: "Sensor basics", videoUrl: "https://youtu.be/Dqvy2f5LPEM?si=IAi_QurfqkOGRNAQ", category: "programming", level: "L3", accentColor: "#FFD6E7", icon: "📡" },
  { id: "p3-32", title: "Sensor program structure", videoUrl: "https://youtu.be/kaeCY-KoiGI?si=NmMq8y4IL7Sj5YAB", category: "programming", level: "L3", accentColor: "#FFD6E7", icon: "🏗️" },
  { id: "p3-33", title: "Sensor calibration", videoUrl: "https://youtu.be/0w-o1O4e3cA?si=3TTGL3SE0Xubg5CV", category: "programming", level: "L3", accentColor: "#FFD6E7", icon: "🎯" },
  { id: "p3-34", title: "Sensor program", videoUrl: "https://youtu.be/PhPwtuzTIgA?si=cj82v5YLPD9zA1rU", category: "programming", level: "L3", accentColor: "#FFD6E7", icon: "💻" },
  { id: "p3-35", title: "Thin line follower", videoUrl: "https://youtu.be/qsK2RTzp4FU?si=FW9YHau23tTJlff3", category: "programming", level: "L3", accentColor: "#FFD6E7", icon: "📍" },
  { id: "p3-36", title: "Thick line follower", videoUrl: "https://youtu.be/pCwiu0QXBhc?si=G9OXmr3p9681dpu3", category: "programming", level: "L3", accentColor: "#FFD6E7", icon: "📍" },
  { id: "p3-37", title: "Light follower", videoUrl: "https://youtu.be/5DW4wlKDgks?si=CUMJuw_TvN8nfReE", category: "programming", level: "L3", accentColor: "#FFD6E7", icon: "💡" },
  { id: "p3-38", title: "US sensor", videoUrl: "https://youtu.be/bJ26KHq5EtU?si=nQPRORPP9NY3ZRfy", category: "programming", level: "L3", accentColor: "#FFD6E7", icon: "🦇" },
  { id: "p3-39", title: "Obstacles avoider", videoUrl: "https://youtu.be/buoPQi5IX-I?si=WIPiaXw-JwCXxu2r", category: "programming", level: "L3", accentColor: "#FFD6E7", icon: "🛑" },
  { id: "p3-40", title: "Edge avoider", videoUrl: "https://youtu.be/nVtlRbwJznQ?si=Z2eJjJicGiIYfGyT", category: "programming", level: "L3", accentColor: "#FFD6E7", icon: "⚠️" },
  { id: "p3-41", title: "Bluetooth programming concepts", videoUrl: "https://youtu.be/MoPStdhv6WM?si=uBvaYMSDSpZYEU85", category: "programming", level: "L3", accentColor: "#FFD6E7", icon: "📶" },
  { id: "p3-42", title: "Bluetooth program structure", videoUrl: "https://youtu.be/f4Q1XbJnNoc?si=HKMPgUlMOsqSG8ys", category: "programming", level: "L3", accentColor: "#FFD6E7", icon: "🏗️" },
  { id: "p3-43", title: "Bluetooth controlled vehicle", videoUrl: "https://youtu.be/rGbszWk8qpE?si=QIMlQyyUhAlqOQn2", category: "programming", level: "L3", accentColor: "#FFD6E7", icon: "🏎️" },
];

export default function LearningScreen() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("construction");

  const likedTutorials = useLikedStore((state) => state.likedTutorials);
  const toggleLike = useLikedStore((state) => state.toggleLike);

  const isLiked = (id: string) => likedTutorials.some((item: { id: string }) => item.id === id);

  // Open Link Safely
  const handleOpenVideo = async (url: string) => {
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        await WebBrowser.openBrowserAsync(url);
      }
    } catch {
      Alert.alert("Error", "Could not open video link.");
    }
  };

  // Filtered List: Direct category lookup so no items/levels are missed
  const filteredTutorials = useMemo(() => {
    return TUTORIALS_DATA.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F4E8" />

      {/* Primary Category Switcher (CONSTRUCTION / PROGRAMMING) */}
      <View style={styles.toggleRowContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            selectedCategory === "construction" ? styles.activeButton : styles.inactiveButton,
          ]}
          onPress={() => setSelectedCategory("construction")}
          activeOpacity={0.9}
        >
          <Text
            style={[
              styles.toggleText,
              selectedCategory === "construction" && styles.activeToggleText,
            ]}
          >
            Construction
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toggleButton,
            selectedCategory === "programming" ? styles.activeButton : styles.inactiveButton,
          ]}
          onPress={() => setSelectedCategory("programming")}
          activeOpacity={0.9}
        >
          <Text
            style={[
              styles.toggleText,
              selectedCategory === "programming" && styles.activeToggleText,
            ]}
          >
            Programming
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tutorial List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 130 }}
      >
        {filteredTutorials.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.notebookCard}
            activeOpacity={0.85}
            onPress={() => handleOpenVideo(item.videoUrl)}
          >
            <View
              style={[
                styles.pastelIconContainer,
                { backgroundColor: item.accentColor },
              ]}
            >
              <Text style={styles.pastelEmoji}>{item.icon}</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSubtitle}>
                {item.category.toUpperCase()} • {item.level === "extra" ? "Extras" : item.level}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() =>
                toggleLike({
                  id: item.id,
                  title: item.title,
                  videoUrl: item.videoUrl,
                })
              }
              activeOpacity={0.7}
              style={{ padding: 4 }}
            >
              <Ionicons
                name={isLiked(item.id) ? "heart" : "heart-outline"}
                size={24}
                color={isLiked(item.id) ? "#FF8B94" : "#000000"}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
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
  toggleRowContainer: {
    flexDirection: "row",
    backgroundColor: "#EBE6D8",
    borderRadius: 16,
    padding: 6,
    borderWidth: 2.5,
    borderColor: "#000000",
    marginBottom: 20,
    alignSelf: "center",
    width: "100%",
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
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
    fontSize: 15,
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
    marginBottom: 16,
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
    fontSize: 15,
    fontWeight: "900",
    color: "#000000",
  },
  cardSubtitle: {
    marginTop: 4,
    color: "#666666",
    fontSize: 12,
    fontWeight: "700",
  },
});