import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';  // Import axios
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const SupplierLogin = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle login request
  const handleLogin = async () => {
  try {
    const response = await axios.post(
      'https://backend-production-f1ac.up.railway.app/api/supplier/login',
      {
        username: username,
        password: password,
      }
    );

    // If login is successful
    if (response.data.token && response.data.supplier) {
      const { token, supplier } = response.data;

      // Store token and supplier ID
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('supplierId', supplier.id);  // Save the supplier ID

      // Navigate to the home screen
      navigation.navigate('SupplierHome');
    }
  } catch (error) {
    if (error.response) {
      Alert.alert('Login Failed', error.response.data.message || 'Invalid credentials');
    } else if (error.request) {
      Alert.alert('Login Failed', 'No response from server');
    } else {
      Alert.alert('Login Failed', 'An error occurred during login');
    }
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
        <Text style={styles.title}>User Name:</Text>
        <Input
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        
        <Text style={styles.title}>Password:</Text>
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        
        <Button
          title="Login"
          onPress={handleLogin}  // Call the login handler
          style={styles.loginButton}
        />
        
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SupplierSignup')}>
            <Text style={styles.registerLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F8E8',
    padding: 20,
  },
  backButton: {
    marginTop: 40,
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 1,
    marginTop: 30,
  },  
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#D1F5D1',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#6FCF97',
    marginTop: 10,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerText: {
    color: '#555',
  },
  registerLink: {
    color: '#6FCF97',
    fontWeight: 'bold',
  },
});

export default SupplierLogin;
