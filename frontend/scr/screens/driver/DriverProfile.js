import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { AntDesign } from '@expo/vector-icons';

const DriverProfile = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [Route, setRoute] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  

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
          value={Route}
          onChangeText={setRoute}
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
});

export default DriverProfile;