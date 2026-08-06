import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";

type TabIconProps = {
  focused: boolean;
  icon: keyof typeof Ionicons.glyphMap;
};

function TabIcon({ focused, icon }: TabIconProps) {
  return (
    <View style={[styles.iconBox, focused && styles.activeIconBox]}>
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
            <TabIcon focused={focused} icon={focused ? "home" : "home-outline"} />
          ),
        }}
      />

      <Tabs.Screen
        name="learning"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={focused ? "book" : "book-outline"} />
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
            />
          ),
        }}
      />

      <Tabs.Screen
        name="quiz"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={focused ? "bulb" : "bulb-outline"} />
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

    height: 64,

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

  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  activeIconBox: {
    backgroundColor: "#D8C8FF",
    borderWidth: 2,
    borderColor: "#000",
  },
});