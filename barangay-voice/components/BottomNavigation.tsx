import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function BottomNavigation() {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Ionicons name="home" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="notifications" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="megaphone" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="briefcase" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="person" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  container: {
    flexDirection: "row" as "row",
    justifyContent: "space-around" as "space-around",
    backgroundColor: "#D5305A",
    paddingVertical: 10,
  },
};
