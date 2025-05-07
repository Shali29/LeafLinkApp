import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { AntDesign } from '@expo/vector-icons';

const SupplierSignup = ({ navigation }) => {
  const [S_FullName, setS_FullName] = useState('');
  const [S_Address, setS_Address] = useState('');
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [S_ContactNo, setS_ContactNo] = useState('');
  const [AccountNumber, setAccountNumber] = useState('');
  const [BankName, setBankName] = useState('');
  const [Branch, setBranch] = useState('');
  const [Username, setUsername] = useState('');
  const [S_RegisterID, setS_RegisterID] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  // Pick image from gallery
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Please allow access to gallery to upload a profile picture.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  // Submit function to call API
  const handleSubmit = async () => {
    if (
      !S_FullName || !S_Address || !Email || !password || !S_ContactNo ||
      !AccountNumber || !BankName || !Branch || !Username || !S_RegisterID
    ) {
      Alert.alert('All fields are required');
      return;
    }

    try {
      const response = await fetch('https://backend-production-f1ac.up.railway.app/api/supplier/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          S_RegisterID,
          S_FullName,
          S_Address,
          S_ContactNo,
          AccountNumber,
          BankName,
          Branch,
          Email,
          Username,
          password,
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
          <TouchableOpacity onPress={pickImage} style={styles.profileImageWrapper}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <AntDesign name="user" size={60} color="black" />
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={pickImage} style={styles.cameraIcon}>
            <AntDesign name="camerao" size={20} color="black" />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Personal Details:</Text>

        <Input
          placeholder="Register ID"
          value={S_RegisterID}
          onChangeText={setS_RegisterID}
          style={styles.input}
        />

        <Input
          placeholder="Full Name"
          value={S_FullName}
          onChangeText={setS_FullName}
          style={styles.input}
        />

        <Input
          placeholder="Address"
          value={S_Address}
          onChangeText={setS_Address}
          style={styles.input}
        />

        <Input
          placeholder="Contact Number"
          value={S_ContactNo}
          onChangeText={setS_ContactNo}
          keyboardType="phone-pad"
          style={styles.input}
        />

        <Input
          placeholder="Email"
          value={Email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
        />

        <Input
          placeholder="Username"
          value={Username}
          onChangeText={setUsername}
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
          value={AccountNumber}
          onChangeText={setAccountNumber}
          keyboardType="numeric"
          style={styles.input}
        />

        <Input
          placeholder="Bank Name"
          value={BankName}
          onChangeText={setBankName}
          style={styles.input}
        />

        <Input
          placeholder="Branch"
          value={Branch}
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
    position: 'relative',
  },
  profileImageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
    elevation: 3,
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
