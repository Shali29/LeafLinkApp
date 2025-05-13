import React, { useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView, Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const FertilizerRequest = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [supplier, setSupplier] = useState(null);
  const [supplierId, setSupplierId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = await AsyncStorage.getItem('supplierId');
        if (!id) return;

        setSupplierId(id);

        const [productRes, supplierRes] = await Promise.all([
          axios.get("https://backend-production-f1ac.up.railway.app/api/product/all"),
          axios.get(`https://backend-production-f1ac.up.railway.app/api/supplier/${id}`)
        ]);

        setProducts(productRes.data);
        setSupplier(supplierRes.data);
      } catch (error) {
        console.error('Failed to load data:', error);
        Alert.alert('Error', 'Could not load products or supplier info.');
      }
    };

    fetchData();
  }, []);

  const incrementQuantity = (id) => {
    setQuantities(prev => ({
      ...prev,
      [id]: (prev[id] || 1) + 1
    }));
  };

  const decrementQuantity = (id) => {
    setQuantities(prev => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1
    }));
  };

  const addItem = (item) => {
    const qty = quantities[item.ProductID] || 1;

    if (selectedItems.find(i => i.fertilizerId === item.ProductID)) {
      Alert.alert("Already Added", "This item is already in the order list.");
      return;
    }

    const itemData = {
      fertilizerId: item.ProductID,
      quantity: qty,
      price: item.Rate_per_Bag
    };

    setSelectedItems(prev => [...prev, itemData]);
  };

  const removeItem = (id) => {
    const filtered = selectedItems.filter(item => item.fertilizerId !== id);
    setSelectedItems(filtered);
  };

  const calculateTotalPayment = () => {
    return selectedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleSubmit = async () => {
  if (!supplierId) {
    Alert.alert('Missing Supplier', 'Supplier ID is not set.');
    return;
  }

  if (selectedItems.length === 0) {
    Alert.alert("Empty Order", "Please add at least one item to submit.");
    return;
  }

  const payload = selectedItems.map(item => ({
    S_RegisterID: supplierId,
    ProductID: item.fertilizerId,
    Qty: item.quantity,
    Order_Status: 'Pending',
    Total_Items: item.quantity,
    Total_TeaPackets: 0,
    Total_OtherItems: item.quantity
  }));

  try {
    await axios.post(
      "https://backend-production-f1ac.up.railway.app/api/teaPacketFertilizer/createBulk",
      payload
    );
    Alert.alert("Success", "Order submitted successfully.");
    setSelectedItems([]);
    setQuantities({});
  } catch (error) {
    console.error("Submission failed:", error);
    Alert.alert("Error", "Failed to submit order.");
  }
};


  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.userInfoContainer}>
          <Ionicons name="person" size={24} color="#6B7280" />
          <Text style={styles.greeting}>Hi, {supplier?.S_FullName || "Mr. Supplier"}!</Text>
        </View>
      </View>

      {/* Supplier Info */}
      <View style={styles.supplierInfoContainer}>
        <Text style={styles.supplierInfo}>Supplier ID: <Text style={styles.supplierInfoValue}>{supplier?.S_RegisterID || "..."}</Text></Text>
        <Text style={styles.supplierInfo}>Date: <Text style={styles.supplierInfoValue}>{new Date().toDateString()}</Text></Text>
      </View>

      {/* Fertilizer Badge */}
      <View style={styles.sectionHeader}>
        <View style={styles.fertilizerBadge}>
          <Text style={styles.fertilizerBadgeText}>Fertilizer</Text>
        </View>
        <Text style={styles.selectionTitle}>Selection</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Product List */}
        {products.map(product => (
          <View style={styles.fertilizerItem} key={product.ProductID}>
            <View style={styles.fertilizerInfo}>
              <Text style={styles.fertilizerName}>{product.ProductName || '[Unnamed]'}</Text>
              <Text style={styles.fertilizerPrice}>LKR {product.Rate_per_Bag}</Text>
              <Text style={styles.fertilizerWeight}>25kg</Text>
            </View>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => decrementQuantity(product.ProductID)}
              >
                <Text style={styles.quantityButtonText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantities[product.ProductID] || 1}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => incrementQuantity(product.ProductID)}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => addItem(product)}
            >
              <Text style={styles.addButtonText}>ADD</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Added Items Section */}
        {selectedItems.length > 0 && (
          <View style={styles.selectedItemsSection}>
            <Text style={styles.selectedHeader}>Added Items</Text>
            {selectedItems.map((item, index) => {
              const product = products.find(p => p.ProductID === item.fertilizerId);
              return (
                <View style={styles.selectedItem} key={index}>
                  <Text style={styles.selectedText}>
                    {product?.ProductName || item.fertilizerId} × {item.quantity}
                  </Text>
                  <Text style={styles.selectedPrice}>Rs. {item.price * item.quantity}</Text>
                  <TouchableOpacity onPress={() => removeItem(item.fertilizerId)}>
                    <Ionicons name="close-circle-outline" size={20} color="red" />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        )}

        {/* Total Payment */}
        <View style={styles.totalPaymentContainer}>
          <Text style={styles.totalPaymentText}>
            Total Payment Due: <Text style={styles.totalPaymentValue}>Rs. {calculateTotalPayment().toLocaleString()}/=</Text>
          </Text>
        </View>

        {/* Submit Button */}
        <View style={styles.submitContainer}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e6f7ee' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 15 },
  backButton: { marginRight: 10 },
  userInfoContainer: { flexDirection: 'row', alignItems: 'center' },
  greeting: { fontSize: 18, fontWeight: 'bold', marginLeft: 10 },
  supplierInfoContainer: {
    backgroundColor: '#AFDFBF', margin: 15, borderRadius: 10, padding: 10
  },
  supplierInfo: { fontSize: 14, color: '#333' },
  supplierInfoValue: { fontWeight: 'bold' },
  sectionHeader: { paddingHorizontal: 15, padding: 16 },
  fertilizerBadge: {
    backgroundColor: '#f39c12', alignSelf: 'center',
    paddingHorizontal: 142, paddingVertical: 8, borderRadius: 8,
    marginBottom: 15,
  },
  fertilizerBadgeText: { fontSize: 16, fontWeight: 'bold' },
  selectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  content: { flex: 1, paddingHorizontal: 15 },
  fertilizerItem: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: 'white', borderRadius: 8, padding: 15, marginBottom: 10
  },
  fertilizerInfo: { flex: 1 },
  fertilizerName: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  fertilizerPrice: { fontSize: 14 },
  fertilizerWeight: { fontSize: 14, color: '#777' },
  quantityContainer: { flexDirection: 'row', alignItems: 'center' },
  quantityButton: {
    width: 30, height: 30, justifyContent: 'center',
    alignItems: 'center', backgroundColor: '#f0f0f0', borderRadius: 5
  },
  quantityButtonText: { fontSize: 18, fontWeight: 'bold' },
  quantityText: { fontSize: 16, marginHorizontal: 10, textAlign: 'center' },
  addButton: {
    backgroundColor: '#e0e0e0', paddingVertical: 5,
    paddingHorizontal: 10, borderRadius: 5
  },
  addButtonText: { fontWeight: 'bold' },
  totalPaymentContainer: { padding: 15, marginTop: 10, marginBottom: 20 },
  totalPaymentText: { fontSize: 16, textAlign: 'center' },
  totalPaymentValue: { fontWeight: 'bold', fontSize: 18 },
  submitContainer: { alignItems: 'center' },
  submitButton: {
    backgroundColor: '#5ED9A4', paddingVertical: 12,
    paddingHorizontal: 32, borderRadius: 8
  },
  submitButtonText: { fontSize: 16, fontWeight: 'bold', color: 'black' },

  // 🆕 Styles for Added Items
  selectedItemsSection: {
    marginTop: 20,
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 8
  },
  selectedHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10
  },
  selectedItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  selectedText: {
    fontSize: 14,
    flex: 1
  },
  selectedPrice: {
    fontWeight: 'bold',
    marginRight: 10
  }
});

export default FertilizerRequest;
