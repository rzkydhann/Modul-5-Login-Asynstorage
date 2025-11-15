// screens/ProfileScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen({ setIsLoggedIn }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const value = await AsyncStorage.getItem("user");
    if (value) {
      const parsed = JSON.parse(value);
      setUser({
        email: parsed.email,
        fullName: parsed.fullName,
        title: parsed.title || " ",
        role: parsed.role || "User",
        joinDate: "15 November 2025",
      });
    }
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Apakah Anda yakin ingin keluar?", [
      { text: "Batal", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem("user");
          setIsLoggedIn(false);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {user?.fullName?.charAt(0) || "A"}
        </Text>
      </View>

      <Text style={styles.fullName}>{user?.fullName || "User"}</Text>
      <Text style={styles.title}>{user?.title}</Text>

      <View style={styles.infoCard}>
        <Text style={styles.infoLabel}>Email</Text>
        <Text style={styles.infoValue}>{user?.email}</Text>

        <View style={styles.divider} />

        <Text style={styles.infoLabel}>Role</Text>
        <Text style={styles.infoValue}>{user?.role}</Text>

        <View style={styles.divider} />

        <Text style={styles.infoLabel}>Bergabung Sejak</Text>
        <Text style={styles.infoValue}>{user?.joinDate}</Text>
      </View>

      <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
    alignItems: "center",
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#00AA13",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  avatarText: {
    fontSize: 40,
    color: "#fff",
    fontWeight: "bold",
  },
  fullName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginTop: 15,
    textAlign: "center",
  },
  title: {
    fontSize: 16,
    color: "#00AA13",
    fontWeight: "600",
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    marginBottom: 30,
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 10,
  },
  logoutBtn: {
    backgroundColor: "#FF3333",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});