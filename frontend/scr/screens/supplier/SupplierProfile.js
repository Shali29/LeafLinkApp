// src/screens/supplier/SupplierProfile.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Input from '../../components/Input';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SupplierProfile = ({ navigation }) => {
  const [supplierId, setSupplierId] = useState('');
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
        console.error('Failed to fetch supplier data:', error);
        Alert.alert('Error', 'Failed to load profile data.');
      }
    };

    loadSupplierInfo();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.formContainer}>
        <View style={styles.profileIcon}>
          <AntDesign name="user" size={60} color="black" />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
          <Text style={styles.registerLink}>Edit Profile</Text>
        </TouchableOpacity>  

        <Text style={styles.sectionTitle}>Personal Details:</Text>
        <Text style={styles.ProfileDetails}>Register ID:</Text>
        <Input
          placeholder="Register ID"
          value={supplierId}
          editable={false}
          style={styles.input}
        />

        <Text style={styles.ProfileDetails}>Full Name:</Text>
        <Input
          placeholder="Full Name"
          value={fullName}
          editable={false}
          style={styles.input}
        />

        <Text style={styles.ProfileDetails}>Address:</Text>
        <Input
          placeholder="Address"
          value={address}
          editable={false}
          style={styles.input}
        />

        <Text style={styles.ProfileDetails}>Contact Number:</Text>
        <Input
          placeholder="Contact Number"
          value={contactNumber}
          editable={false}
          style={styles.input}
        />

        <Text style={styles.ProfileDetails}>Email:</Text>
        <Input
          placeholder="Email"
          value={email}
          editable={false}
          style={styles.input}
        />

        <Text style={styles.sectionTitle}>Bank Details:</Text>

        <Input
          placeholder="Account Number"
          value={accountNumber}
          editable={false}
          style={styles.input}
        />

        <Input
          placeholder="Bank Name"
          value={bankName}
          editable={false}
          style={styles.input}
        />

        <Input
          placeholder="Branch"
          value={branch}
          editable={false}
          style={styles.input}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F8E8',
    padding: 8,
  },
  backButton: {
    marginTop: 40,
    marginBottom: 20,
  },
  formContainer: {
    paddingBottom: 30,
  },
  profileIcon: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#D1F5D1',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 15,
  },
  ProfileDetails: {
    fontSize: 14,
    marginTop: 5,
    marginBottom: 2,
  },
  registerLink: {
    color: '#53b57c',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 0.25,
  },
});

export default SupplierProfile;