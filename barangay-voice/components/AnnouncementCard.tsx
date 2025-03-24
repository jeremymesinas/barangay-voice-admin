import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface AnnouncementProps {
  title: string;
  description: string;
}

export default function AnnouncementCard({ title, description }: AnnouncementProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    borderLeftWidth: 5,
    borderColor: "#D5305A",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  description: {
    fontSize: 12,
    color: "#333",
  },
});
