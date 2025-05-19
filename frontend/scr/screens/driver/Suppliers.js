import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, Text, TextInput, TouchableOpacity,
  SafeAreaView, StatusBar, ScrollView, KeyboardAvoidingView,
  Platform, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

export default function Suppliers({ navigation }) {
  const [supplierId, setSupplierId] = useState('');
  const [supplier, setSupplier] = useState(null);
  const [teaBagWeight, setTeaBagWeight] = useState('');
  const [waterWeight, setWaterWeight] = useState('');
  const [bagWeight, setBagWeight] = useState('');
  const [totalBalanceWeight, setTotalBalanceWeight] = useState('');
  const [rate, setRate] = useState(null);

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const res = await axios.get('https://backend-production-f1ac.up.railway.app/api/rate/2');
        setRate(res.data?.Rate_Per_Kg || null);
      } catch (err) {
        console.error('Rate fetch error:', err);
        Alert.alert('Error', 'Could not fetch rate info');
      }
    };
    fetchRate();
  }, []);

  useEffect(() => {
    const tea = parseFloat(teaBagWeight) || 0;
    const water = parseFloat(waterWeight) || 0;
    const bag = parseFloat(bagWeight) || 0;
    const total = tea - water - bag;
    setTotalBalanceWeight(total > 0 ? String(Math.round(total)) : '0');
  }, [teaBagWeight, waterWeight, bagWeight]);

  const handleSearchSupplier = async () => {
    if (!supplierId) return Alert.alert('Enter Supplier ID');
    try {
      const res = await axios.get(`https://backend-production-f1ac.up.railway.app/api/supplier/${supplierId}`);
      setSupplier(res.data);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Supplier not found');
    }
  };

  const handleUpload = async () => {
    if (!supplier) return Alert.alert('Error', 'Please search and select a supplier first');
    if (!rate) return Alert.alert('Error', 'Rate information is not available');

    if (
      !teaBagWeight || parseFloat(teaBagWeight) <= 0 ||
      !bagWeight || parseFloat(bagWeight) <= 0
    ) {
      return Alert.alert('Validation', 'Tea Bag Weight and Bag Weight are required and must be greater than 0');
    }

    const payload = {
      S_RegisterID: supplier.S_RegisterID,
      Current_Rate: parseFloat(rate),
      TeaBagWeight_kg: parseFloat(teaBagWeight),
      Water_kg: parseFloat(waterWeight) || 0,
      Bag_kg: parseFloat(bagWeight),
      TotalBalanceWeight: parseFloat(totalBalanceWeight)
    };

    try {
      await axios.post('https://backend-production-f1ac.up.railway.app/api/supplierCollection/create', payload);
      Alert.alert('Success', 'Data uploaded successfully');
      handleClear();
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Error', 'Failed to upload data');
    }
  };

  const handleClear = () => {
    setTeaBagWeight('');
    setWaterWeight('');
    setBagWeight('');
    setTotalBalanceWeight('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardAvoidView}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>

            <TextInput
              style={styles.searchBar}
              placeholder="Enter Supplier ID (e.g. SUP12345)"
              value={supplierId}
              onChangeText={setSupplierId}
              onSubmitEditing={handleSearchSupplier}
            />

            <TouchableOpacity style={styles.notificationButton}>
              <Ionicons
  onPress={() => {
    if (!supplier) {
      Alert.alert('Info', 'Please search and select a supplier first');
      return;
    }
    navigation.navigate('Requests', { supplierId: supplier.S_RegisterID });
  }}
  name="notifications-outline"
  size={24}
  color="black"
/>

            </TouchableOpacity>
          </View>

          {supplier && (
            <View style={styles.supplierInfoContainer}>
              <Text style={styles.supplierInfo}>Supplier ID: <Text style={styles.supplierInfoValue}>{supplier.S_RegisterID}</Text></Text>
              <Text style={styles.supplierInfo}>Full Name: <Text style={styles.supplierInfoValue}>{supplier.S_FullName}</Text></Text>
  
              <Text style={styles.supplierInfo}>Current Rate: <Text style={styles.supplierInfoValue}>Rs. {rate}/kg</Text></Text>
            </View>
          )}

          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Update Daily Leaf Weight</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Tea Bag Weight (kg):</Text>
              <TextInput
                style={styles.input}
                value={teaBagWeight}
                onChangeText={setTeaBagWeight}
                placeholder="Enter tea bag weight"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Water Weight (kg):</Text>
              <TextInput
                style={styles.input}
                value={waterWeight}
                onChangeText={setWaterWeight}
                placeholder="Enter water weight (optional)"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Bag Weight (kg):</Text>
              <TextInput
                style={styles.input}
                value={bagWeight}
                onChangeText={setBagWeight}
                placeholder="Enter bag weight"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Total Balance Weight (kg):</Text>
              <TextInput
                style={[styles.input, { backgroundColor: '#f0f0f0' }]}
                value={totalBalanceWeight}
                editable={false}
                placeholder="Auto-calculated"
              />
            </View>

            <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
              <Text style={styles.submitButtonText}>Upload</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
              <Text style={styles.submitButtonText}>Clear</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F4F9F6' 
    },

  keyboardAvoidView: { 
    flex: 1 
  },

  scrollContainer: { 
    flexGrow: 1, 
    paddingBottom: 20 
  },

  header: {
    flexDirection: 'row', 
    alignItems: 'center',
    padding: 15, 
    borderBottomLeftRadius: 20, 
    borderBottomRightRadius: 20,
  },

  backButton: { 
    padding: 5 
  },

  searchBar: {
    width: '70%', 
    marginLeft: 10,
    paddingVertical: 6, 
    paddingHorizontal: 12,
    backgroundColor: '#fff', 
    borderRadius: 20,
    fontSize: 16, 
    borderWidth: 1, 
    borderColor: '#ccc',
  },

  notificationButton: { 
    marginLeft: 10 
  },

  supplierInfoContainer: {
    paddingHorizontal: 20, 
    paddingVertical: 10,
    backgroundColor: '#AFDFBF', 
    borderRadius: 10,
    marginHorizontal: 15, 
    marginBottom: 20,
  },

  supplierInfo: {
    fontSize: 14, 
    color: '#333', 
    marginBottom: 5,
  },

  supplierInfoValue: { 
    fontWeight: 'bold' 
  },

  formContainer: { 
    paddingHorizontal: 20, 
    paddingVertical: 5 
  },

  formTitle: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 10 
  },
  
  inputGroup: { 
    marginBottom: 15 
  },
  
  inputLabel: {
    fontSize: 16, 
    marginBottom: 5,
    fontWeight: '500', 
    fontStyle: 'italic', 
    marginTop: 10,
  },
  
  input: {
    backgroundColor: 'white', 
    borderRadius: 8,
    paddingHorizontal: 12, 
    paddingVertical: 10, 
    fontSize: 16,
    borderWidth: 1, 
    borderColor: '#E0E0E0',
  },

  uploadButton: {
    backgroundColor: '#ED7152',
    paddingVertical: 12, 
    paddingHorizontal: 100,
    borderRadius: 25, 
    alignItems: 'center',
    marginTop: 20, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2, 
    shadowRadius: 3, 
    elevation: 5,
  },

  clearButton: {
    backgroundColor: '#F8A895',
    paddingVertical: 12, 
    paddingHorizontal: 100,
    borderRadius: 25, 
    alignItems: 'center',
    marginTop: 20, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2, 
    shadowRadius: 3, 
    elevation: 5,
  },

  submitButtonText: { 
    color: 'black', 
    fontSize: 18, 
    fontWeight: 'bold' },
});
