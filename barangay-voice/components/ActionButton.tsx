import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface ActionButtonProps {
  title: string;
  color: string;
  onPress: () => void;
}

export default function ActionButton({ title, color, onPress }: ActionButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#D5305A",
  },
});
