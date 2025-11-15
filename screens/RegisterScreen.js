// screens/RegisterScreen.js
import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,
  KeyboardAvoidingView, Platform, ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RegisterScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!fullName || !email || !password || password.length < 6) {
      Alert.alert("Error", "Lengkapi data. Password min 6 karakter.");
      return;
    }

    try {
      const usersData = await AsyncStorage.getItem("users");
      const users = usersData ? JSON.parse(usersData) : [
        {
          fullName: "Admin",
          email: "admin@gmail.com",
          password: "12345",
          title: " ",
          role: "Administrator"
        }
      ];

      if (users.find(u => u.email === email)) {
        Alert.alert("Error", "Email sudah terdaftar!");
        return;
      }

      const newUser = { fullName, email, password, title: " ", role: "User" };
      users.push(newUser);
      await AsyncStorage.setItem("users", JSON.stringify(users));

      Alert.alert("Sukses", "Akun berhasil dibuat! Silakan login.");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Error", "Gagal daftar akun");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Daftar Akun</Text>

        <TextInput
          placeholder="Nama Lengkap"
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
        />

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

        <TouchableOpacity onPress={handleRegister} style={styles.button}>
          <Text style={styles.buttonText}>Daftar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.link}
        >
          <Text style={styles.linkText}>Sudah punya akun? Login</Text>
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