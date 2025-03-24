import React, { useLayoutEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../app/App";

// Define NavigationProp before using it
// type HomeScreenNavigationProp  = StackNavigationProp<RootStackParamList, "HomeScreen">;
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "HomeScreen">;

export default function HomeScreen() {
    {/* disable the ugly header */}
    // const navigation = useNavigation();
    const navigation = useNavigation<HomeScreenNavigationProp>();

    useLayoutEffect(() => {
      navigation.setOptions({ headerShown: false }); 
    }, [navigation]);

  return (
    <View style={styles.container}>
        {/* View 1 for the first half */}
      <View style={styles.topHalf}>
        <Image source={require("../assets/images/barangay-voice.png")} style={styles.logo} />
      </View>

    {/* second half */}
      <View style={styles.bottomHalf}>
        <Text style={styles.heading}>Ka-sangga mo sa Telepono!</Text>

        <Text style={styles.description}>
          Stay informed, file requests, and access essential services from your barangay at your fingertips. 
          The Barangay Voice app brings governance closer to you—efficient, transparent, and citizen-focused.
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("LandingPage")}>
          <Text style={styles.buttonText}>GET STARTED</Text>
        </TouchableOpacity>

        <Text style={styles.loginText}>Already have an account?</Text>
      </View>
    </View>
  );
}

// basically puro internal sheets tas ganun naka
// obj form sya 
const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  topHalf: {
    flex: 1, 
    backgroundColor: "#A7D477", 
    alignItems: "center",
    justifyContent: "center",
  },
  bottomHalf: {
    flex: 1, 
    backgroundColor: "#FFFFFF",
    padding: 20,
    alignItems: "center",
  },
  logo: {
    width: 350,
    height: 350,
    resizeMode: "contain",
  },
  heading: {
    fontSize: 30,
    fontFamily: "Poppins-Regular",
    fontWeight: "900",
    color: "#D5305A",
    textAlign: "center",
    marginVertical: 10,
    textShadowColor: "#A7D477",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  description: {
    fontSize: 15,
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
    paddingHorizontal: 20,
    fontStyle: "italic",
  },
  button: {
    backgroundColor: "#D5305A",
    paddingVertical: 9,
    paddingHorizontal: 80,
    borderRadius: 30,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 30,
    fontFamily: "Anton-Regular",
    textAlign: "center",
  },
  loginText: {
    marginTop: 10,
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    color: "#555",
    textDecorationLine: "underline",
  },
});
