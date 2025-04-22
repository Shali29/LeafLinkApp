import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { AntDesign } from '@expo/vector-icons';

const EditProfile = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [branch, setBranch] = useState('');

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrowleft" size={24} color="black" />
        <Text style={styles.HeaderName}>Edit Profile</Text>
      </TouchableOpacity>
      
      <View style={styles.formContainer}>
        <View style={styles.profileIcon}>
          <AntDesign name="user" size={60} color="black" />
        </View>

    
        <Text style={styles.sectionTitle}>Personal Details:</Text>
        <Text style={styles.ProfileDetails}>Register ID:</Text>
        <Input
          placeholder="Register ID"
          style={styles.input}
        />
        
        <Text style={styles.ProfileDetails}>Full Name:</Text>
        <Input
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
        />
        
        <Text style={styles.ProfileDetails}>Address:</Text>
        <Input
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
          style={styles.input}
        />
        
        <Text style={styles.ProfileDetails}>Contact Number:</Text>
        <Input
          placeholder="Contact Number"
          value={contactNumber}
          onChangeText={setContactNumber}
          keyboardType="phone-pad"
          style={styles.input}
        />
        
        <Text style={styles.ProfileDetails}>Email:</Text>
        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
        />

        <Text style={styles.sectionTitle}>Bank Details:</Text>
        
        <Text style={styles.ProfileDetails}>Account Number:</Text>
        <Input
          placeholder="Account Number"
          value={accountNumber}
          onChangeText={setAccountNumber}
          keyboardType="numeric"
          style={styles.input}
        />
        
        <Text style={styles.ProfileDetails}>Bank Name:</Text>
        <Input
          placeholder="Bank Name"
          value={bankName}
          onChangeText={setBankName}
          style={styles.input}
        />

        <Text style={styles.ProfileDetails}>Branch:</Text>
        <Input
          placeholder="Branch"
          value={branch}
          onChangeText={setBranch}
          style={styles.input}
        />

        <Button
          title="Edit"
          style={styles.editButton}
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
  HeaderName: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 0.25,
  },
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