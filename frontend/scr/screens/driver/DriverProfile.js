import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../../components/Input';
import { AntDesign } from '@expo/vector-icons';

const DriverProfile = ({ navigation }) => {
  const [registerId, setRegisterId] = useState('');
  const [fullName, setFullName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [route, setRoute] = useState('');
  const [serialCode, setSerialCode] = useState('');

  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        const storedId = await AsyncStorage.getItem('registerId');
        if (!storedId) {
          Alert.alert('Error', 'No Register ID found. Please login again.');
          navigation.navigate('DriverLogin');
          return;
        }
        setRegisterId(storedId);

        const response = await fetch(`https://backend-production-f1ac.up.railway.app/api/driver/DriverById/${storedId}`);
        const data = await response.json();

        if (response.ok) {
          setFullName(data.D_FullName || '');
          setContactNumber(data.D_ContactNumber || '');
          setEmail(data.Email || '');
          setVehicleNumber(data.VehicalNumber || '');
          setRoute(data.Route || '');
          setSerialCode(data.Serial_Code || '');
        } else {
          Alert.alert('Error', data.message || 'Failed to load driver data');
        }
      } catch (error) {
        Alert.alert('Error', error.message || 'Network error');
      }
    };

    fetchDriverData();
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

        <Text style={styles.ProfileDetails}>Register ID:</Text>
        <Input
          placeholder="Register ID"
          value={registerId}
          editable={false}
          style={styles.input}
        />
        
        <Text style={styles.ProfileDetails}>Full Name:</Text>
        <Input
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
        />
        
        <Text style={styles.ProfileDetails}>Contact Number:</Text>
        <Input
          placeholder="Contact Number"
          value={contactNumber}
          onChangeText={setContactNumber}
          style={styles.input}
        />
        
        <Text style={styles.ProfileDetails}>Email:</Text>
        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
        />
        
        <Text style={styles.ProfileDetails}>Vehicle Number:</Text>
        <Input
          placeholder="Vehicle Number"
          value={vehicleNumber}
          onChangeText={setVehicleNumber}
          style={styles.input}
        />
        
        <Text style={styles.ProfileDetails}>Route:</Text>
        <Input
          placeholder="Route"
          value={route}
          onChangeText={setRoute}
          style={styles.input}
        />

        <Text style={styles.ProfileDetails}>Serial Code:</Text>
        <Input
          placeholder="Serial Code"
          value={serialCode}
          onChangeText={setSerialCode}
          style={styles.input}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fae0d9',
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
    backgroundColor: '#F6C3B6',
    marginBottom: 15,
  },
  ProfileDetails: {
    fontSize: 14,
    marginTop: 5,
    marginBottom: 2,
  },
});

export default DriverProfile;
