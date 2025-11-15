// screens/OrderScreen.js
import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const dummyOrders = [
  { id: "1", product: "Laptop ASUS ROG", price: "Rp 15.000.000", status: "Dikirim" },
  { id: "2", product: "Mouse Logitech", price: "Rp 350.000", status: "Selesai" },
  { id: "3", product: "Keyboard Mechanical", price: "Rp 1.200.000", status: "Diproses" },
  { id: "4", product: "Monitor 27\"", price: "Rp 3.500.000", status: "Dikirim" },
  { id: "5", product: "Headset Gaming", price: "Rp 750.000", status: "Selesai" },
];

export default function OrderScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.product}>{item.product}</Text>
      <Text style={styles.price}>{item.price}</Text>
      <View style={styles.statusWrapper}>
        <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
          {item.status}
        </Text>
      </View>
    </View>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Selesai": return "#00AA13";
      case "Dikirim": return "#FF9500";
      case "Diproses": return "#007AFF";
      default: return "#888";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar Pesanan</Text>
      <FlatList
        data={dummyOrders}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f4f8", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: "#333", textAlign: "center", marginBottom: 20 },
  card: { backgroundColor: "#fff", padding: 16, borderRadius: 12, marginBottom: 12, elevation: 2 },
  product: { fontSize: 16, fontWeight: "bold", color: "#333" },
  price: { fontSize: 15, color: "#00AA13", marginVertical: 4 },
  statusWrapper: { alignSelf: "flex-start", backgroundColor: "#f0f0f0", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, marginTop: 6 },
  status: { fontSize: 12, fontWeight: "bold" },
});