import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

const TeaPacketRequest = ({ navigation }) => {
  const [teaQuantity, setTeaQuantity] = useState("2");
  
  // Calculate total payment based on quantity
  const ratePerUnit = 300;
  const totalPayment = parseInt(teaQuantity) * ratePerUnit;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with User Info */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        
        <View style={styles.userInfoContainer}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={24} color="#6B7280" />
          </View>
          
          <View style={styles.userDetails}>
            <Text style={styles.greeting}>Hi, Mr. Perera!</Text>
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>Supplier ID: 304</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>Date: 2024 Nov 12</Text>
            </View>
          </View>
        </View>
      </View>
      
      {/* Content */}
      <View style={styles.content}>
        {/* Green Tea Packet Header */}
        <View style={styles.teaHeader}>
          <Text style={styles.teaHeaderText}>Tea Packet</Text>
        </View>
        
        <View style={styles.selectionContainer}>
          <Text style={styles.sectionTitle}>Selection</Text>
          
          {/* Radio Button Selection */}
          <View style={styles.radioContainer}>
            <View style={styles.radioButton}></View>
            <Text style={styles.radioLabel}>Tea Packet - 200g</Text>
          </View>
          
          {/* Quantity Selector */}
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityLabel}>Quantity</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={teaQuantity}
                style={styles.picker}
                onValueChange={(itemValue) => setTeaQuantity(itemValue)}
              >
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
              </Picker>
            </View>
          </View>
          
          {/* Payment Information */}
          <View style={styles.divider}></View>
          <Text style={styles.rateText}>Payment Rate per 200g: Rs. {ratePerUnit}/-</Text>
          
          <View style={styles.divider}></View>
          <Text style={styles.totalText}>Total Payment Due: Rs. {totalPayment}/-</Text>
        </View>
        
        {/* Submit Button */}
        <View style={styles.submitContainer}>
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Footer Navigation */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('SupplierHome')}>
          <Ionicons name="home-outline" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <MaterialIcons name="history" size={29} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="notifications-outline" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="person-outline" size={24} color="#999" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f7ed', // light green background
  },
  header: {
    backgroundColor: '#c8e6c9', // light green header
    padding: 16,
    borderRadius: 8,
    margin: 12,
  },
  backButton: {
    marginBottom: 8,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#d1d5db',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userDetails: {
    flex: 1,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 4,
  },
  infoText: {
    fontSize: 14,
  },
  content: {
    padding: 16,
  },
  teaHeader: {
    backgroundColor: '#66bb6a', // green
    paddingVertical: 8,
    paddingHorizontal: 60,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  teaHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  selectionContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#66bb6a',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#66bb6a', // selected state
  },
  radioLabel: {
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  quantityLabel: {
    marginRight: 16,
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 4,
    overflow: 'hidden',
    width: 100,
  },
  picker: {
    height: 40,
    width: 100,
  },
  divider: {
    borderTopWidth: 1,
    borderColor: '#d1d5db',
    paddingTop: 8,
    marginBottom: 8,
  },
  rateText: {
    marginBottom: 8,
  },
  totalText: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  submitContainer: {
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#5ED9A4', // green
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  submitText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginTop: 220,
  },
  tabItem: {
    alignItems: 'center',
  },
});

export default TeaPacketRequest;