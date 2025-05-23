import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, Text, TextInput, TouchableOpacity,
  SafeAreaView, StatusBar, ScrollView, KeyboardAvoidingView,
  Platform, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const OneRequests = ({ navigation, route }) => {
  const supplierId = route.params?.supplierId || '';
  const [supplier, setSupplier] = useState(null);
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (supplierId) {
      fetchOrders();
      fetchSupplier();
    }
  }, [supplierId]);

  const fetchSupplier = async () => {
    try {
      const res = await axios.get(`https://backend-production-f1ac.up.railway.app/api/supplier/${supplierId}`);
      setSupplier(res.data);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Supplier not found');
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`https://backend-production-f1ac.up.railway.app/api/teaPacketFertilizer/supplier/${supplierId}`);
      setOrders(res.data);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to load orders');
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  const handleDelivered = () => {
    Alert.alert('Success', 'Delivery confirmed!');
    navigation.goBack();
  };

  const filteredOrders = orders.filter(order =>
    order.ProductID?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.ProductName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidView}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={goBack} style={styles.backButton}>
              <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
            <TextInput
              style={styles.searchBar}
              placeholder="Search..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </ScrollView>

        <ScrollView style={styles.content}>
          {supplier && (
            <View style={styles.supplierInfoSection}>
              <Text style={styles.label}>Supplier ID: {supplier.S_RegisterID}</Text>
              <Text style={styles.nameLabel}>Name: {supplier.S_FullName}</Text>
            </View>
          )}

          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, styles.idCell]}>ID</Text>
              <Text style={[styles.tableHeaderCell, styles.requestsCell]}>Requests</Text>
              <Text style={[styles.tableHeaderCell, styles.quantityCell]}>Quantity</Text>
            </View>

            {filteredOrders.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.idCell]}>{item.ProductID}</Text>
                <View style={styles.requestDetailCell}>
                  <Text style={styles.requestText}>{item.ProductName || 'N/A'}</Text>
                  <Text style={styles.requestDetail}>LKR: {item.TotalAmount?.toFixed(2)}</Text>
                  <Text style={styles.requestDetail}>{item.Qty} bags</Text>
                </View>
                <Text style={[styles.tableCell, styles.quantityCell]}>{item.Qty}</Text>
              </View>
            ))}
          </View>

          <View style={styles.buttonSection}>
            <TouchableOpacity
              style={styles.deliveredButton}
              onPress={handleDelivered}
            >
              <Text style={styles.buttonText}>Delivered</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e8f8e8' },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 15, paddingVertical: 15,
    backgroundColor: '#f19c9c',
  },
  backButton: { marginRight: 10 },
  scrollContainer: { flexGrow: 1, paddingBottom: 20 },
  searchBar: {
    width: '75%', paddingVertical: 6, paddingHorizontal: 12,
    backgroundColor: '#fff', borderRadius: 20,
    fontSize: 16, borderWidth: 1, borderColor: '#ccc',
  },
  content: { flex: 1, padding: 20, marginTop: 10 },
  supplierInfoSection: {
    backgroundColor: '#d6f0e0', borderRadius: 10,
    padding: 15, marginBottom: 20,
  },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  nameLabel: { fontSize: 16, marginBottom: 5 },
  tableContainer: {
    marginBottom: 20, borderWidth: 1,
    borderColor: '#ccc', borderRadius: 5,
  },
  tableHeader: {
    flexDirection: 'row', borderBottomWidth: 1,
    borderBottomColor: '#ccc', backgroundColor: '#f5f5f5',
    paddingVertical: 10,
  },
  tableHeaderCell: {
    textAlign: 'center', fontWeight: 'bold',
    fontSize: 14,
  },
  tableRow: {
    flexDirection: 'row', borderBottomWidth: 1,
    borderBottomColor: '#ccc', paddingVertical: 10,
  },
  tableCell: {
    textAlign: 'center', fontSize: 14,
    justifyContent: 'center', alignItems: 'center',
    paddingVertical: 5,
  },
  idCell: { flex: 1 },
  requestsCell: { flex: 3 },
  quantityCell: { flex: 1 },
  requestDetailCell: {
    flex: 3, justifyContent: 'center', paddingLeft: 10,
  },
  requestText: { fontSize: 14, fontWeight: '500' },
  requestDetail: { fontSize: 12, color: '#666' },
  buttonSection: {
    marginVertical: 20, paddingBottom: 40,
  },
  deliveredButton: {
    backgroundColor: '#f19c9c', borderRadius: 10,
    padding: 15, alignItems: 'center',
  },
  buttonText: {
    color: '#000', fontWeight: 'bold', fontSize: 16,
  },
});

export default OneRequests;
