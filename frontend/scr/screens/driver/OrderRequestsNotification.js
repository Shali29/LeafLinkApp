import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar, 
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const OrderRequestsNotification = ({ navigation }) => {
  const [searchText, setSearchText] = useState('304');
  const supplierId = '304';
  const supplierName = 'Mr. Perera';
  const [searchQuery, setSearchQuery] = useState('');
  
  const goBack = () => {
    navigation.goBack();
  };
  
  const handleDelivered = () => {
    // Add delivered logic here
    console.log('Delivered pressed');
    // You could navigate back or show a success message
    alert('Delivery confirmed!');
    navigation.goBack();
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.keyboardAvoidView}
            >
            </KeyboardAvoidingView>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Header */}
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
          <TextInput
            style={styles.searchInput}
            placeholder="304"
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </ScrollView>
      
      <ScrollView style={styles.content}>
        {/* Supplier Info */}
        <View style={styles.supplierInfoSection}>
          <Text style={styles.label}>Supplier ID: {supplierId}</Text>
          <Text style={styles.nameLabel}>Name: {supplierName}</Text>
        </View>
        
        {/* Requests Table */}
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, styles.idCell]}>ID</Text>
            <Text style={[styles.tableHeaderCell, styles.requestsCell]}>Requests</Text>
            <Text style={[styles.tableHeaderCell, styles.quantityCell]}>Quantity</Text>
          </View>
          
          {/* Tea Packet Row */}
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.idCell]}>304</Text>
            <Text style={[styles.tableCell, styles.requestsCell]}>Tea Packet - 200g</Text>
            <Text style={[styles.tableCell, styles.quantityCell]}>2</Text>
          </View>
          
          {/* Normal Row */}
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.idCell]}>304</Text>
            <View style={styles.requestDetailCell}>
              <Text style={styles.requestText}>Normal</Text>
              <Text style={styles.requestDetail}>LKR:2000.00</Text>
              <Text style={styles.requestDetail}>25kg</Text>
            </View>
            <Text style={[styles.tableCell, styles.quantityCell]}>1</Text>
          </View>
        </View>
        
        {/* Delivered Button */}
        <View style={styles.buttonSection}>
          <TouchableOpacity 
            style={styles.deliveredButton}
            onPress={handleDelivered}
          >
            <Text style={styles.buttonText}>Delivered</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f8e8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#f19c9c',
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  searchBar: {
    width: '75%',
    marginLeft: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  searchIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    height: 35,
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  supplierInfoSection: {
    backgroundColor: '#d6f0e0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  nameLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  tableContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
  },
  tableHeaderCell: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  tableCell: {
    textAlign: 'center',
    fontSize: 14,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  idCell: {
    flex: 1,
  },
  requestsCell: {
    flex: 3,
  },
  quantityCell: {
    flex: 1,
  },
  requestDetailCell: {
    flex: 3,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  requestText: {
    fontSize: 14,
    fontWeight: '500',
  },
  requestDetail: {
    fontSize: 12,
    color: '#666',
  },
  buttonSection: {
    marginVertical: 20,
    paddingBottom: 40,
  },
  deliveredButton: {
    backgroundColor: '#f19c9c',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default OrderRequestsNotification;

