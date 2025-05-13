import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, SafeAreaView } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfile = ({ navigation }) => {
  const [supplierId, setSupplierId] = useState(null);
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [branch, setBranch] = useState('');

  useEffect(() => {
    const loadSupplierInfo = async () => {
      try {
        const id = await AsyncStorage.getItem('supplierId');
        if (!id) return;
        setSupplierId(id);

        const res = await axios.get(`https://backend-production-f1ac.up.railway.app/api/supplier/${id}`);
        const data = res.data;

        setFullName(data.S_FullName || '');
        setAddress(data.S_Address || '');
        setEmail(data.Email || '');
        setContactNumber(data.S_ContactNo || '');
        setAccountNumber(data.AccountNumber || '');
        setBankName(data.BankName || '');
        setBranch(data.Branch || '');
      } catch (error) {
        console.error('Failed to load supplier info:', error);
        Alert.alert('Error', 'Failed to load your profile.');
      }
    };

    loadSupplierInfo();
  }, []);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);
  const validateAccountNumber = (acc) => /^[0-9]{4,}$/.test(acc); // at least 4 digits

  const handleUpdate = async () => {
    // Basic validations
    if (!fullName || !address || !email || !contactNumber || !accountNumber || !bankName || !branch) {
      return Alert.alert('Validation Error', 'Please fill all fields');
    }
    if (!validateEmail(email)) {
      return Alert.alert('Invalid Email', 'Please enter a valid email address');
    }
    if (!validatePhone(contactNumber)) {
      return Alert.alert('Invalid Contact Number', 'Phone number should be 10 digits');
    }
    if (!validateAccountNumber(accountNumber)) {
      return Alert.alert('Invalid Account Number', 'Account number should be at least 4 digits');
    }

    try {
      const payload = {
        S_FullName: fullName,
        S_Address: address,
        S_ContactNo: contactNumber,
        Email: email,
        AccountNumber: accountNumber,
        BankName: bankName,
        Branch: branch,
      };

      await axios.put(
        `https://backend-production-f1ac.up.railway.app/api/supplier/update/${supplierId}`,
        payload
      );

      Alert.alert('Success', 'Profile updated successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Update error:', error);
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
          <Text style={styles.HeaderName}>Edit Profile</Text>
        </TouchableOpacity>

        <View style={styles.formContainer}>
          <View style={styles.profileIcon}>
            <AntDesign name="user" size={60} color="black" />
          </View>

          <Text style={styles.sectionTitle}>Personal Details:</Text>
          <Text style={styles.ProfileDetails}>Register ID:</Text>
          <Input placeholder="Register ID" value={supplierId || ''} editable={false} style={styles.input} />

          <Text style={styles.ProfileDetails}>Full Name:</Text>
          <Input placeholder="Full Name" value={fullName} onChangeText={setFullName} style={styles.input} />

          <Text style={styles.ProfileDetails}>Address:</Text>
          <Input placeholder="Address" value={address} onChangeText={setAddress} style={styles.input} />

          <Text style={styles.ProfileDetails}>Contact Number:</Text>
          <Input placeholder="Contact Number" value={contactNumber} onChangeText={setContactNumber} keyboardType="phone-pad" style={styles.input} />

          <Text style={styles.ProfileDetails}>Email:</Text>
          <Input placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" style={styles.input} />

          <Text style={styles.sectionTitle}>Bank Details:</Text>

          <Text style={styles.ProfileDetails}>Account Number:</Text>
          <Input placeholder="Account Number" value={accountNumber} onChangeText={setAccountNumber} keyboardType="numeric" style={styles.input} />

          <Text style={styles.ProfileDetails}>Bank Name:</Text>
          <Input placeholder="Bank Name" value={bankName} onChangeText={setBankName} style={styles.input} />

          <Text style={styles.ProfileDetails}>Branch:</Text>
          <Input placeholder="Branch" value={branch} onChangeText={setBranch} style={styles.input} />

          <Button title="Save Changes" onPress={handleUpdate} style={styles.editButton} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8F8E8', padding: 8 },
  backButton: { marginTop: 40, marginBottom: 20, flexDirection: 'row', alignItems: 'center' },
  HeaderName: { fontSize: 20, fontWeight: 'bold', marginLeft: 10 },
  formContainer: { paddingBottom: 30 },
  profileIcon: {
    alignSelf: 'center', width: 100, height: 100, borderRadius: 50,
    backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', marginBottom: 30,
  },
  input: { backgroundColor: '#D1F5D1', marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 10, marginBottom: 15 },
  ProfileDetails: { fontSize: 14, marginTop: 5, marginBottom: 2 },
  editButton: {
    backgroundColor: '#6FCF97',
    marginTop: 20,
    width: '100%',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default EditProfile;
