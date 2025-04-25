import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";

export default function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  const getColor = (route: string) => {
    return pathname === route ? "#E4F1AC" : "#fff";
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push("/LandingPage")}>
        <Ionicons name="home" size={24} color={getColor("/LandingPage")} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/Report")}>
        <Ionicons name="notifications" size={24} color={getColor("/Report")} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/emergency")}>
        <Ionicons name="megaphone" size={24} color={getColor("/emergency")} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="person" size={24} color={getColor("/Notifications")}/>
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