// screens/LoginScreen.js
import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,
  KeyboardAvoidingView, Platform, ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation, setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const usersData = await AsyncStorage.getItem("users");
      const users = usersData ? JSON.parse(usersData) : [];

      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        await AsyncStorage.setItem("user", JSON.stringify(user));
        setIsLoggedIn(true);
      } else {
        Alert.alert("Login Gagal", "Email atau password salah!");
      }
    } catch (error) {
      Alert.alert("Error", "Gagal login");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />

        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Masuk</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => navigation.navigate("Register")}
          style={styles.link}
        >
          <Text style={styles.linkText}>Belum punya akun? Daftar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffffff" },
  scroll: { flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", color: "#000000ff", marginBottom: 30 },
  input: {
    backgroundColor: "#ffffffff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#000000ff",
    fontSize: 16,
    color: "#000000ff",
    width: "100%",
  },
  button: {
    backgroundColor: "#60c378ff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
  buttonText: { color: "#000", fontWeight: "bold", fontSize: 16 },
  link: { marginTop: 20 },
  linkText: { color: "#223c29ff", fontSize: 16 },
});