// src/screens/driver/Login.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { AntDesign } from '@expo/vector-icons';

const DriverLogin = ({ navigation }) => {
  const [registerid, setRegisterId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!registerid.trim()) {
      Alert.alert('Error', 'Please enter Register ID');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://backend-production-f1ac.up.railway.app/api/driver/requestOtpLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          D_RegisterID: registerid,
        }),
      });

      const data = await response.json();

      setLoading(false);

      if (response.ok) {
        // Assuming the response means OTP request was successful
        // You can pass data to OTP screen if needed
        navigation.navigate('OtpVerificationScreen', { registerId: registerid });
      } else {
        Alert.alert('Login Failed', data.message || 'Something went wrong');
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', error.message || 'Network error');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      
      <View style={styles.logoContainer}>
        <Image 
          source={require('../../../assets/images/logo.png')} 
          style={styles.logo}
        />
      </View>
      
      <View style={styles.formContainer}>
        <Text style={styles.title}>Register ID:</Text>
        <Input
          placeholder="RegisterID"
          value={registerid}
          onChangeText={setRegisterId}
          style={styles.input}
        />

        <Button
          title={loading ? "Loading..." : "Login"}
          onPress={handleLogin}
          style={styles.loginButton}
          disabled={loading}
        />
      </View>
    </View>
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
    marginBottom: 100,
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 70,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#FFD5C8',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#FF7A59',
    marginTop: 10,
  },
});

export default DriverLogin;
