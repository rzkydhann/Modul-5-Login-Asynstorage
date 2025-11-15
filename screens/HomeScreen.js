// screens/HomeScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = (width - 60) / 2;

const PRODUCTS = [
  { id: 1, name: "ASUS ROG Strix G15", price: "Rp 25.999.000", image: "https://images.unsplash.com/photo-1587829741303-dc3dc5e51eee?w=200&h=200&fit=crop" },
  { id: 2, name: "Razer DeathAdder V2", price: "Rp 1.299.000", image: "https://images.unsplash.com/photo-1610945262587-9d3d4626571c?w=200&h=200&fit=crop" },
  { id: 3, name: "Corsair K95 RGB", price: "Rp 3.499.000", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&h=200&fit=crop" },
  { id: 4, name: "HyperX Cloud Alpha", price: "Rp 1.799.000", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop" },
];

export default function HomeScreen({ setIsLoggedIn }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const load = async () => {
      const value = await AsyncStorage.getItem("user");
      if (value) setUser(JSON.parse(value));
    };
    load();
  }, []);

  const handleLogout = () => {
    Alert.alert("Logout", "Apakah Anda yakin?", [
      { text: "Batal", style: "cancel" },
      {
        text: "Logout",
        onPress: async () => {
          await AsyncStorage.removeItem("user");
          setIsLoggedIn(false);
        },
      },
    ]);
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Produk Gaming</Text>
      <FlatList
        data={PRODUCTS}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.grid}
      />
      <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  welcome: { fontSize: 20, color: "#333", textAlign: "center" },
  username: { fontSize: 22, fontWeight: "bold", color: "#00AA13", textAlign: "center", marginBottom: 15 },
  sectionTitle: { fontSize: 22, fontWeight: "bold", color: "#333", marginBottom: 15, textAlign: "center" },
  grid: { paddingBottom: 20 },
  productCard: {
    width: ITEM_WIDTH,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 10,
    margin: 6,
    alignItems: "center",
    elevation: 2,
  },
  productImage: { width: 100, height: 100, borderRadius: 8 },
  productName: { fontSize: 13, fontWeight: "bold", color: "#333", textAlign: "center", marginTop: 5 },
  productPrice: { fontSize: 14, color: "#00AA13", fontWeight: "bold" },
  logoutBtn: {
    backgroundColor: "#FF3333",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  logoutText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});