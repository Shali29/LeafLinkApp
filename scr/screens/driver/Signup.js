// src/screens/driver/Signup.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { AntDesign } from '@expo/vector-icons';

const DriverSignup = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [route, setRoute] = useState('');
  const [email, setEmail] = useState('');

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      
      <View style={styles.logoContainer}>
        <View style={styles.logo}>
          <AntDesign name="user" size={60} color="black" />
        </View>
      </View>
      
      <View style={styles.formContainer}>
        <Input
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
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
          placeholder="Vehicle Number"
          value={vehicleNumber}
          onChangeText={setVehicleNumber}
          style={styles.input}
        />
        
        <Input
          placeholder="Route"
          value={route}
          onChangeText={setRoute}
          style={styles.input}
        />

        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        
        <Button
          title="Submit"
          onPress={() => navigation.navigate('DriverLogin')}
          style={styles.submitButton}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE8E0',
    padding: 20,
  },
  backButton: {
    marginTop: 40,
    marginBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    flex: 1,
    paddingBottom: 30,
  },
  input: {
    backgroundColor: '#FFD5C8',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#FF7A59',
    marginTop: 20,
  },
});

export default DriverSignup;