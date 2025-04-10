// src/screens/supplier/Login.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { AntDesign } from '@expo/vector-icons';

const SupplierLogin = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
          onPress={() => navigation.navigate('SupplierHome')}
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
  header: {
    marginTop: 60,
    alignItems: 'center',
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
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginTop: 20,
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