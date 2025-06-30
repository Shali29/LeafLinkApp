import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';

const TeaPacketRequest = ({ navigation }) => {
  // State variables
  const [teaQuantity, setTeaQuantity] = useState('');
  const [supplierId, setSupplierId] = useState(null);
  const [supplier, setSupplier] = useState(null);
  const [product, setProduct] = useState(null);

  const [drivers, setDrivers] = useState([]);
  const [selectedDriverId, setSelectedDriverId] = useState(null);
  const [loadingDrivers, setLoadingDrivers] = useState(true);

  // Dropdown picker state
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);

   // Load supplier data from local storage and fetch from backend
  const loadSupplierInfo = async () => {
    try {
      const id = await AsyncStorage.getItem('supplierId');
      if (!id) return;

      setSupplierId(id);

      const res = await axios.get(`https://backend-production-f1ac.up.railway.app/api/supplier/${id}`);
      setSupplier(res.data);
    } catch (error) {
      console.error('Failed to load supplier info:', error);
    }
  };

  // Fetch tea packet product info
  const fetchProduct = async () => {
    try {
      const res = await axios.get('https://backend-production-f1ac.up.railway.app/api/product/T001');
      setProduct(res.data);
    } catch (error) {
      console.error('Failed to fetch product:', error);
    }
  };

  // Fetch driver list for dropdown selection
  const fetchDrivers = async () => {
    try {
      setLoadingDrivers(true);
      const res = await axios.get('https://backend-production-f1ac.up.railway.app/api/driver/AllDrivers');
      setDrivers(res.data);

      // Map driver data for dropdown format
      const mappedDrivers = res.data.map((driver) => ({
        label: `${driver.D_FullName} (${driver.D_RegisterID}) - ${driver.Route}`,
        value: driver.D_RegisterID,
      }));
      setItems(mappedDrivers);

      if (res.data.length > 0) {
        setSelectedDriverId(res.data[0].D_RegisterID);
      }
    } catch (error) {
      console.error('Failed to fetch drivers:', error);
      Alert.alert('Error', 'Failed to load drivers');
    } finally {
      setLoadingDrivers(false);
    }
  };

  // Submit order request
  const handleSubmit = async () => {
    const qty = parseInt(teaQuantity);
    if (!qty || qty <= 0) {
      return Alert.alert('Invalid Quantity', 'Please enter a valid quantity greater than 0.');
    }

    if (!product || !supplierId) {
      return Alert.alert('Missing Info', 'Product or supplier information is not available.');
    }

    if (!selectedDriverId) {
      return Alert.alert('Select Driver', 'Please select a driver.');
    }

    const payload = {
      S_RegisterID: supplierId,
      ProductID: product.ProductID,
      Qty: qty,
      Driver_RegisterID: selectedDriverId,
      Order_Status: 'Pending',
      Total_Items: qty,
      Total_TeaPackets: qty,
      Total_OtherItems: 0,
    };

    try {
      await axios.post(
        'https://backend-production-f1ac.up.railway.app/api/teaPacketFertilizer/create',
        payload
      );
      Alert.alert('Success', 'Order submitted successfully');
      setTeaQuantity('');
    } catch (error) {
      console.error('Order submit error:', error);
      Alert.alert('Error', error.response?.data?.message || 'Failed to submit order');
    }
  };

  useEffect(() => {
    loadSupplierInfo();
    fetchProduct();
    fetchDrivers();
  }, []);


  // Payment rate and total cost calculation
  const rate = product?.Rate_per_Bag || 0;
  const productName = product?.ProductName || 'Tea Packet';
  const totalPayment = (parseInt(teaQuantity) || 0) * rate;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{ flex: 1 }}
      >

      {/* Header with back button and user info */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>

          <View style={styles.userInfoContainer}>
            <View style={styles.avatarContainer}>
              <Ionicons name="person" size={24} color="#6B7280" />
            </View>

            <View style={styles.userDetails}>
              <Text style={styles.greeting}>Hi, {supplier?.S_FullName || 'Supplier'}!</Text>
              <View style={styles.infoBox}>
                <Text style={styles.infoText}>Supplier ID: {supplierId || '-'}</Text>
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.infoText}>Date: {new Date().toDateString()}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Content area */}
        <View style={styles.content}>
          <View style={styles.teaHeader}>
            <Text style={styles.teaHeaderText}>Tea Packet</Text>
          </View>

          <View style={styles.selectionContainer}>
            <Text style={styles.sectionTitle}>Selection</Text>

            <View style={styles.radioContainer}>
              <View style={styles.radioButton}></View>
              <Text style={styles.radioLabel}>{productName}</Text>
            </View>

            <View style={{ marginBottom: 16, zIndex: 1000 }}>
              <Text style={styles.sectionTitle}>Select Driver</Text>
              {loadingDrivers ? (
                <ActivityIndicator size="small" color="#66bb6a" />
              ) : (
                <DropDownPicker
                  open={open}
                  value={selectedDriverId}
                  items={items}
                  setOpen={setOpen}
                  setValue={setSelectedDriverId}
                  setItems={setItems}
                  placeholder="Select a driver"
                  containerStyle={{ height: 50 }}
                  style={{ backgroundColor: '#fff' }}
                  dropDownStyle={{ backgroundColor: '#fafafa' }}
                  zIndex={1000}
                  zIndexInverse={3000}
                />
              )}
            </View>

            <View style={styles.quantityContainer}>
              <Text style={styles.quantityLabel}>Quantity</Text>
              <TextInput
                style={styles.quantityInput}
                keyboardType="numeric"
                placeholder="Enter quantity"
                value={teaQuantity}
                onChangeText={setTeaQuantity}
              />
            </View>

            <View style={styles.divider}></View>
            <Text style={styles.rateText}>Payment Rate per 500g: Rs. {rate}/-</Text>

            <View style={styles.divider}></View>
            <Text style={styles.totalText}>Total Payment Due: Rs. {totalPayment}/-</Text>
          </View>

          <View style={styles.submitContainer}>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitText}>Request</Text>
            </TouchableOpacity>
          </View>
        </View>

        
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e6f7ed' },
  header: {
    backgroundColor: '#c8e6c9',
    padding: 16,
    borderRadius: 8,
    margin: 12,
  },
  backButton: { marginBottom: 8 },
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
  userDetails: { flex: 1 },
  greeting: { fontSize: 18, fontWeight: 'bold' },
  infoBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 4,
  },
  infoText: { fontSize: 14 },
  content: { padding: 16, flex: 1 },
  teaHeader: {
    backgroundColor: '#66bb6a',
    paddingVertical: 8,
    paddingHorizontal: 60,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  teaHeaderText: { fontSize: 16, fontWeight: 'bold', color: 'black' },
  selectionContainer: { marginBottom: 16, flex: 1 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
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
    backgroundColor: '#66bb6a',
  },
  radioLabel: { fontSize: 16 },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  quantityLabel: { marginRight: 16, fontSize: 16 },
  quantityInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 4,
    paddingHorizontal: 10,
    height: 40,
    width: 120,
    backgroundColor: 'white',
  },
  divider: {
    borderTopWidth: 1,
    borderColor: '#d1d5db',
    paddingTop: 8,
    marginBottom: 8,
  },
  rateText: { marginBottom: 8 },
  totalText: { fontWeight: 'bold', marginBottom: 16 },
  submitContainer: { alignItems: 'center' },
  submitButton: {
    backgroundColor: '#5ED9A4',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  submitText: { fontSize: 16, fontWeight: 'bold', color: 'black' },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginTop: 80,
  },
  tabItem: { alignItems: 'center' },
});

export default TeaPacketRequest;
