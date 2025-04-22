import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  StatusBar 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Requests({ navigation}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [requests, setRequests] = useState([
    { id: '304', name: 'Tea Packet - 200g', quantity: 2 },
    { id: '304', name: '[Name 1]', price: 'LKR 2000.00', weight: '25kg', quantity: 1 },
    { id: '210', name: 'Tea Packet - 200g', quantity: 2 },
    { id: '111', name: '[Name 2]', price: 'LKR 6000.00', weight: '25kg', quantity: 3 },
    { id: '204', name: 'Tea Packet - 200g', quantity: 1 },
    { id: '254', name: '[Name 1]', price: 'LKR 2000.00', weight: '25kg', quantity: 1 },
    { id: '098', name: 'Tea Packet - 200g', quantity: 21 },
  ]);

  // Calculate totals
  const totalItems = requests.reduce((sum, item) => sum + item.quantity, 0);
  const teaPacketItems = requests.filter(item => item.name.includes('Tea Packet')).reduce((sum, item) => sum + item.quantity, 0);
  const otherItems = totalItems - teaPacketItems;

  const renderItem = ({ item }) => {
    return (
      <View style={styles.requestItem}>
        <View style={styles.idColumn}>
          <Text style={styles.idText}>{item.id}</Text>
        </View>
        
        <View style={styles.nameColumn}>
          <Text style={styles.nameText}>{item.name}</Text>
          {item.price && (
            <Text style={styles.priceText}>
              {item.price}
              {item.weight && <Text style={styles.weightText}> {item.weight}</Text>}
            </Text>
          )}
        </View>
        
        <View style={styles.quantityColumn}>
          <Text style={styles.quantityText}>{item.quantity}</Text>
        </View>
      </View>
    );
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
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
      
      {/* Table Header */}
      <View style={styles.tableHeader}>
        <View style={styles.idColumn}>
          <Text style={styles.columnHeader}>ID</Text>
        </View>
        <View style={styles.nameColumn}>
          <Text style={styles.columnHeader}>Requests</Text>
        </View>
        <View style={styles.quantityColumn}>
          <Text style={styles.columnHeader}>Quantity</Text>
        </View>
      </View>
      
      {/* Requests List */}
      <FlatList
        data={requests}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        style={styles.list}
      />
      
      {/* Totals Section */}
      <View style={styles.totalsSection}>
        <View style={styles.totalItem}>
          <Text style={styles.totalLabel}>Total Items:</Text>
          <Text style={styles.totalValue}>{totalItems}</Text>
        </View>
        <View style={styles.totalItem}>
          <Text style={styles.totalLabel}>Total Tea Packet:</Text>
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
  container: {
    flex: 1,
    backgroundColor: '#FFEEE2',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  backButton: {
    marginRight: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  columnHeader: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  idColumn: {
    width: 65,
    justifyContent: 'center',
  },
  nameColumn: {
    flex: 1,
    paddingRight: 15,
    justifyContent: 'center',
  },
  quantityColumn: {
    width: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flex: 1,
  },
  requestItem: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  idText: {
    fontSize: 14,
  },
  nameText: {
    fontSize: 15,
  },
  priceText: {
    fontSize: 13,
    color: '#666',
    marginTop: 3,
  },
  weightText: {
    fontSize: 13,
    color: '#666',
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '500',
  },
  totalsSection: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  totalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  totalValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  deliverButton: {
    backgroundColor: '#FF9E80',
    paddingVertical: 15,
    alignItems: 'center',
    margin: 15,
    borderRadius: 8,
  },
  deliverButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
});