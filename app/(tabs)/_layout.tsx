import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";

type TabIconProps = {
  focused: boolean;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
};

function TabIcon({ focused, icon, label }: TabIconProps) {
  return focused ? (
    <View style={styles.activePill}>
      <Ionicons name={icon} size={22} color="#000" />
      <Text style={styles.activeLabel}>{label}</Text>
    </View>
  ) : (
    <View style={styles.inactiveCircle}>
      <Ionicons name={icon} size={22} color="#000" />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={focused ? "home" : "home-outline"}
              label="Home"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="learning"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={focused ? "book" : "book-outline"}
              label="Learn"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="notes"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={focused ? "document-text" : "document-text-outline"}
              label="Notes"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="quiz"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={focused ? "bulb" : "bulb-outline"}
              label="Quiz"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="calc"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={focused ? "calculator" : "calculator-outline"}
              label="Calc"
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 24,

    height: 74,

    backgroundColor: "#fff",

    borderRadius: 24,

    borderWidth: 2.5,
    borderColor: "#000",

    elevation: 0,

    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 0,
    shadowOffset: {
      width: 4,
      height: 4,
    },

    paddingHorizontal: 6,
    paddingVertical: 8,
  },

  activePill: {
    height: 46,

    paddingHorizontal: 8,

    borderRadius: 14,

    backgroundColor: "#D8C8FF",

    borderWidth: 2,
    borderColor: "#000",

    flexDirection: "row",

    justifyContent: "center",
    alignItems: "center",
  },

  activeLabel: {
    marginLeft: 4,

    fontSize: 12,

    fontWeight: "900",

    color: "#000",
  },

  inactiveCircle: {
    width: 42,
    height: 42,

    borderRadius: 14,

    justifyContent: "center",
    alignItems: "center",
  },
});