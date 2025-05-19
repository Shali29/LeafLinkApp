import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, View, Text, SafeAreaView, TextInput, 
  TouchableOpacity, FlatList, StatusBar, Alert, Modal, ScrollView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

export default function Requests({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [allRequests, setAllRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Function to fetch orders
  const fetchRequests = async () => {
    try {
      const res = await axios.get('https://backend-production-f1ac.up.railway.app/api/teaPacketFertilizer/all');
      setAllRequests(res.data);
      setFilteredRequests(res.data.filter(item => item.Order_Status !== 'Delivered')); // Hide delivered items initially
    } catch (err) {
      console.error('Fetch error:', err);
      Alert.alert('Error', 'Failed to fetch order data');
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    // Search functionality
    if (searchQuery.trim() === '') {
      setFilteredRequests(allRequests.filter(item => item.Order_Status !== 'Delivered'));
    } else {
      const filtered = allRequests.filter(order =>
        order.S_RegisterID.toLowerCase().includes(searchQuery.toLowerCase()) && order.Order_Status !== 'Delivered'
      );
      setFilteredRequests(filtered);
    }
  }, [searchQuery, allRequests]);

  // Function to update status to Delivered
  const updateStatusToDelivered = async (orderID) => {
    try {
      await axios.put(`https://backend-production-f1ac.up.railway.app/api/teaPacketFertilizer/updateStatus/${orderID}`, {
        status: 'Delivered',
      });
      fetchRequests();  // Re-fetch to update the list
      Alert.alert("Success", "Order marked as Delivered.");
    } catch (err) {
      console.error('Error updating status:', err);
      Alert.alert('Error', 'Failed to update order status');
    }
  };

  // Function to open modal
  const openModal = (item) => {
    setSelectedRequest(item);
    setModalVisible(true);
  };

  // Function to close modal
  const closeModal = () => {
    setModalVisible(false);
    setSelectedRequest(null);
  };

  // Function to render orders by Supplier
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.requestItem} onPress={() => openModal(item)}>
      <View style={styles.idColumn}>
        <Text style={styles.idText}>{item.S_RegisterID}</Text>
      </View>
      <View style={styles.nameColumn}>
        <Text style={styles.nameText}>{item.ProductName}</Text>
      </View>
      <View style={styles.quantityColumn}>
        <Text style={styles.quantityText}>{item.Qty}</Text>
      </View>
    </TouchableOpacity>
  );

  // Function to calculate total quantity and orders for each product (only for "Pending" orders)
  const getProductStats = (productName) => {
    let totalOrders = 0;
    let totalQuantity = 0;
    
    allRequests.forEach(item => {
      if (item.ProductName === productName && item.Order_Status !== 'Delivered') {  // Only count Pending orders
        totalOrders += 1;
        totalQuantity += item.Qty;
      }
    });
    
    return { totalOrders, totalQuantity };
  };

  // Get the list of products for summary (only "Pending" orders)
  const getUniqueProducts = () => {
    const products = new Set();
    allRequests.forEach(item => {
      if (item.Order_Status !== 'Delivered') {  // Only include Pending orders
        products.add(item.ProductName);
      }
    });
    return [...products];
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by Supplier ID"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <View style={styles.idColumn}><Text style={styles.columnHeader}>ID</Text></View>
        <View style={styles.nameColumn}><Text style={styles.columnHeader}>Requests</Text></View>
        <View style={styles.quantityColumn}><Text style={styles.columnHeader}>Quantity</Text></View>
      </View>

      {/* Orders List */}
      <FlatList
        data={filteredRequests}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.Order_ID}-${index}`}
        style={styles.list}
      />

      {/* Product Summary */}
      <View style={styles.productSummary}>
        <Text style={styles.summaryTitle}>Total Orders & Quantities</Text>
        {getUniqueProducts().map((product, index) => {
          const { totalOrders, totalQuantity } = getProductStats(product);
          return (
            <View key={index} style={styles.summaryItem}>
              <Text style={styles.summaryText}>Product: {product}</Text>
              <Text style={styles.summaryText}>Total Orders: {totalOrders}</Text>
              <Text style={styles.summaryText}>Total Quantity: {totalQuantity}</Text>
            </View>
          );
        })}
      </View>

      {/* Popup Modal for Detailed View */}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {selectedRequest && (
              <>
                <Text style={styles.modalTitle}>Order Details</Text>
                <ScrollView contentContainerStyle={styles.modalContent}>
                  <Text style={styles.modalText}>ID: {selectedRequest.S_RegisterID}</Text>
                  <Text style={styles.modalText}>Product: {selectedRequest.ProductName}</Text>
                  <Text style={styles.modalText}>Quantity: {selectedRequest.Qty}</Text>
                  <Text style={styles.modalText}>Total Items: {selectedRequest.Total_Items}</Text>
                  <Text style={styles.modalText}>Status: {selectedRequest.Order_Status}</Text>
                </ScrollView>

                {selectedRequest.Order_Status !== 'Delivered' && (
                  <TouchableOpacity
                    style={styles.deliverButton}
                    onPress={() => {
                      updateStatusToDelivered(selectedRequest.Order_ID);
                    }}
                  >
                    <Text style={styles.deliverButtonText}>Mark as Delivered</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFEEE2' },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 15, paddingVertical: 12,
  },
  searchContainer: {
    flex: 1, flexDirection: 'row', backgroundColor: '#fff',
    borderRadius: 20, paddingHorizontal: 15, alignItems: 'center', height: 40,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, height: 40, fontSize: 16 },
  tableHeader: {
    flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: '#ddd',
  },
  columnHeader: { fontWeight: 'bold', fontSize: 15 },
  idColumn: { width: 65, justifyContent: 'center' },
  nameColumn: { flex: 1, paddingRight: 15, justifyContent: 'center' },
  quantityColumn: { width: 55, alignItems: 'center', justifyContent: 'center' },
  list: { flex: 1 },
  requestItem: {
    flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: '#eee', backgroundColor: '#fff',
  },
  idText: { fontSize: 14 },
  nameText: { fontSize: 15 },
  quantityText: { fontSize: 14, fontWeight: '500' },

  // Product Summary Styles
  productSummary: { padding: 20, backgroundColor: '#fff', marginTop: 20 },
  summaryTitle: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
  summaryItem: { marginBottom: 10 },
  summaryText: { fontSize: 14 },

  // Modal styles
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: { fontSize: 20, fontWeight: '600', marginBottom: 20 },
  modalContent: { marginBottom: 20 },
  modalText: { fontSize: 16, marginBottom: 8 },
  deliverButton: {
    backgroundColor: '#FF9E80', paddingVertical: 10, paddingHorizontal: 20,
    borderRadius: 8, marginTop: 20, justifyContent: 'center', alignItems: 'center',
  },
  deliverButtonText: { color: '#000', fontSize: 16, fontWeight: '600' },
  closeButton: {
    backgroundColor: '#ccc', paddingVertical: 10, paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10, justifyContent: 'center', alignItems: 'center',
  },
  closeButtonText: { color: '#000', fontSize: 16, fontWeight: '600' },
});
