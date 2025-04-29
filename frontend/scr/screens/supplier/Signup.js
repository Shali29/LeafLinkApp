import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { AntDesign } from '@expo/vector-icons';

const SupplierSignup = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [branch, setBranch] = useState('');

  // Submit function to call API
  const handleSubmit = async () => {
    if (
      !fullName || !address || !email || !password || !contactNumber ||
      !accountNumber || !bankName || !branch
    ) {
      Alert.alert('All fields are required');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/supplier/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          address,
          email,
          password,
          contactNumber,
          accountNumber,
          bankName,
          branch,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Signup successful!');
        navigation.navigate('SupplierLogin');
      } else {
        Alert.alert('Error', data.message || 'Signup failed');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Network error', 'Please try again.');
    }
  };

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

        <Text style={styles.sectionTitle}>Personal Details:</Text>

        <Input
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
        />

        <Input
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
          style={styles.input}
        />

        <Input
          placeholder="Contact Number"
          value={contactNumber}
          onChangeText={setContactNumber}
          keyboardType="phone-pad"
          style={styles.input}
        />

        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
        />

        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        <Text style={styles.sectionTitle}>Bank Details:</Text>

        <Input
          placeholder="Account Number"
          value={accountNumber}
          onChangeText={setAccountNumber}
          keyboardType="numeric"
          style={styles.input}
        />

        <Input
          placeholder="Bank Name"
          value={bankName}
          onChangeText={setBankName}
          style={styles.input}
        />

        <Input
          placeholder="Branch"
          value={branch}
          onChangeText={setBranch}
          style={styles.input}
        />

        <Button
          title="Submit"
          onPress={handleSubmit}
          style={styles.submitButton}
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
  submitButton: {
    backgroundColor: '#6FCF97',
    marginTop: 20,
  },
});

export default SupplierSignup;
