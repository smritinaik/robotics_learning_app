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
      <Ionicons name={icon} size={26} color="#000" />
      <Text style={styles.activeLabel}>{label}</Text>
    </View>
  ) : (
    <View style={styles.inactiveCircle}>
      <Ionicons name={icon} size={26} color="#000" />
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
              label="Learning"
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
    left: 20,
    right: 20,
    bottom: 24,

    height: 78,

    backgroundColor: "#fff",

    borderRadius: 24,

    borderWidth: 2,
    borderColor: "#000",
    borderTopWidth: 2,

    elevation: 0,

    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 0,
    shadowOffset: {
      width: 5,
      height: 5,
    },

    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  activePill: {
    height: 50,

    minWidth: 88,
    paddingHorizontal: 10,

    borderRadius: 16,

    backgroundColor: "#D8C8FF",

    borderWidth: 2,
    borderColor: "#000",

    flexDirection: "row",

    justifyContent: "center",
    alignItems: "center",
  },

  activeLabel: {
    marginLeft: 4,

    fontSize: 14,

    fontWeight: "900",

    color: "#000",
  },

  inactiveCircle: {
    width: 50,
    height: 50,

    borderRadius: 16,

    justifyContent: "center",
    alignItems: "center",
  },
});