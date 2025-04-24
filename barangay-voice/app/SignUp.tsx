import React, { useEffect, useState } from "react";
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
  Alert,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { registerUser } from "../scripts/account-actions";
console.log(typeof registerUser); // This should log 'function'

SplashScreen.preventAutoHideAsync();

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  const handleRegister = async () => {

    if (!firstName || !lastName || !email || !phoneNumber || !password || !confirmPassword) {
      alert("Please fill out all required fields.");
      return;
    }
    
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const result = await registerUser({
      email,
      password,
      firstName,
      middleName,
      lastName,
      phoneNumber,
    });

    if (result.error) {
      alert("Registration Failed");
    } else {
      alert("Registration successful! Check your email for the OTP.");
      router.push("/SignUpOTP");
    }
  };

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
          <View style={styles.fieldContainer}>
            <Text style={styles.reminder}>Please fill out the form. Fields with * are optional.</Text>

            <Text style={styles.label}>First Name</Text>
            <TextInput style={styles.input} placeholder="First Name" value={firstName} onChangeText={setFirstName} />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Middle Name *</Text>
            <TextInput style={styles.input} placeholder="Middle Name" value={middleName} onChangeText={setMiddleName} />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput style={styles.input} placeholder="Last Name" value={lastName} onChangeText={setLastName} />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput style={styles.input} placeholder="Phone Number" keyboardType="phone-pad" value={phoneNumber} onChangeText={setPhoneNumber} />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword((prev) => !prev)}
              >
                <FontAwesome
                  name={showPassword ? "eye" : "eye-slash"}
                  size={24}
                  color="#D5305A"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowConfirmPassword((prev) => !prev)}
              >
                <FontAwesome
                  name={showConfirmPassword ? "eye" : "eye-slash"}
                  size={24}
                  color="#D5305A"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.passwordPolicyContainer}>
            <Text style={styles.policyTitle}>Password Policies:</Text>
            <Text style={styles.policyItem}>• Must have at least 8 characters</Text>
            <Text style={styles.policyItem}>• Must include at least one uppercase letter (A-Z)</Text>
            <Text style={styles.policyItem}>• Must include at least one lowercase letter (a-z)</Text>
            <Text style={styles.policyItem}>• Must include at least one number (0-9)</Text>
            <Text style={styles.policyItem}>• Must include at least one special character (!@#$%^&* etc.)</Text>
          </View>

          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
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
  fieldContainer: {
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: "#D5305A",
  },
  reminder: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
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
    marginBottom: 20,
  },
  passwordInputContainer: {
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -12 }],
    color: "#D5305A",
  },
});
