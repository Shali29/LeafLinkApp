import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, View, Text, SafeAreaView, TextInput, 
  TouchableOpacity, FlatList, StatusBar, Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

export default function Requests({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [allRequests, setAllRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get('https://backend-production-f1ac.up.railway.app/api/teaPacketFertilizer/all');
        setAllRequests(res.data);
        setFilteredRequests(res.data); // Show all by default
      } catch (err) {
        console.error('Fetch error:', err);
        Alert.alert('Error', 'Failed to fetch order data');
      }
    };

    fetchRequests();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredRequests(allRequests);
    } else {
      const filtered = allRequests.filter(order =>
        order.S_RegisterID.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRequests(filtered);
    }
  }, [searchQuery, allRequests]);

  const totalItems = filteredRequests.reduce((sum, item) => sum + (item.Total_Items || 0), 0);
  const teaPacketItems = filteredRequests.reduce((sum, item) => sum + (item.Total_TeaPackets || 0), 0);
  const otherItems = filteredRequests.reduce((sum, item) => sum + (item.Total_OtherItems || 0), 0);

  const renderItem = ({ item }) => (
    <View style={styles.requestItem}>
      <View style={styles.idColumn}>
        <Text style={styles.idText}>{item.S_RegisterID}</Text>
      </View>
      <View style={styles.nameColumn}>
        <Text style={styles.nameText}>Tea Packet</Text>
        <Text style={styles.priceText}>Qty: {item.Qty}</Text>
      </View>
      <View style={styles.quantityColumn}>
        <Text style={styles.quantityText}>{item.Total_Items}</Text>
      </View>
    </View>
  );

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
        keyExtractor={(item, index) => `${item.TeaFertilizerID}-${index}`}
        style={styles.list}
      />

      {/* Totals */}
      <View style={styles.totalsSection}>
        <View style={styles.totalItem}>
          <Text style={styles.totalLabel}>Total Items:</Text>
          <Text style={styles.totalValue}>{totalItems}</Text>
        </View>
        <View style={styles.totalItem}>
          <Text style={styles.totalLabel}>Total Tea Packets:</Text>
          <Text style={styles.totalValue}>{teaPacketItems}</Text>
        </View>
        <View style={styles.totalItem}>
          <Text style={styles.totalLabel}>Total Other Items:</Text>
          <Text style={styles.totalValue}>{otherItems}</Text>
        </View>
      </View>

      {/* Delivery Button */}
      <TouchableOpacity style={styles.deliverButton}>
        <Text style={styles.deliverButtonText}>Delivered</Text>
      </TouchableOpacity>
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
  priceText: { fontSize: 13, color: '#666', marginTop: 3 },
  quantityText: { fontSize: 14, fontWeight: '500' },
  totalsSection: {
    backgroundColor: '#fff', paddingHorizontal: 15, paddingVertical: 12,
    borderTopWidth: 1, borderTopColor: '#ddd',
  },
  totalItem: {
    flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4,
  },
  totalLabel: { fontSize: 14, fontWeight: '500' },
  totalValue: { fontSize: 14, fontWeight: '600' },
  deliverButton: {
    backgroundColor: '#FF9E80', paddingVertical: 15, alignItems: 'center',
    margin: 15, borderRadius: 8,
  },
  deliverButtonText: { color: '#000', fontSize: 16, fontWeight: '600' },
});
