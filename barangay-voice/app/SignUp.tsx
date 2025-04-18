import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useRouter } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function SignUp() {
  const [fontsLoaded] = useFonts({
    "Anton-Regular": require("../assets/fonts/Anton.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins.ttf"),
  });

  const router = useRouter();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <ActivityIndicator
        size="large"
        color="#0000ff"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/images/barangay-voice.png")}
            style={styles.logo}
          />
        </View>

        <View style={styles.form}>
          <TextInput style={styles.input} placeholder="First Name" />
          <TextInput style={styles.input} placeholder="Last Name" />
          <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
          <TextInput style={styles.input} placeholder="Phone Number" keyboardType="phone-pad" />
          <TextInput style={styles.input} placeholder="Password" secureTextEntry />
          <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry />

          <View style={styles.passwordPolicyContainer}>
            <Text style={styles.policyTitle}>Password Policies:</Text>
            <Text style={styles.policyItem}>• Must have at least 8 characters</Text>
            <Text style={styles.policyItem}>• Must include at least one uppercase letter (A-Z)</Text>
            <Text style={styles.policyItem}>• Must include at least one lowercase letter (a-z)</Text>
            <Text style={styles.policyItem}>• Must include at least one number (0-9)</Text>
            <Text style={styles.policyItem}>• Must include at least one special character (!@#$%^&* etc.)</Text>
          </View>

          <TouchableOpacity style={styles.registerButton} onPress={() => router.push("/SignUpOTP")}>
            <Text style={styles.registerButtonText}>REGISTER</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/LogIn")}>
            <Text style={styles.loginText}>Already have an account?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  scrollContainer: {
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  logoContainer: {
    width: "100%",
    backgroundColor: "#A7D477",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: "contain",
  },
  form: {
    width: "90%",
    gap: 15,
    marginTop: 20,
  },
  input: {
    borderWidth: 5,
    borderColor: "#F72C5B",
    borderRadius: 25,
    padding: 12,
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    backgroundColor: "#fff",
  },  
  passwordPolicyContainer: {
    backgroundColor: "#E4F1AC",
    borderRadius: 8,
    padding: 15,
    marginTop: 10,
  },
  policyTitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  policyItem: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    marginBottom: 3,
  },
  registerButton: {
    backgroundColor: "#D5305A",
    paddingVertical: 9,
    paddingHorizontal: 80,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
  },
  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 30,
    fontFamily: "Anton-Regular",
    textAlign: "center",
  },
  loginText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#000",
    textAlign: "center",
    textDecorationLine: "underline",
    marginTop: 10,
  },
});
