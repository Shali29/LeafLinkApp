import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Button from '../components/Button';

const UserType = ({ navigation }) => {
  return (
    <View style={styles.container}>
      
      <View style={styles.userTypeContainer}>
        <View style={styles.userOption}>
          <Image 
            source={require('../../assets/images/supplier-icon.png')} 
            style={styles.userIcon}
          />
          <Button
            title="Supplier"
            onPress={() => navigation.navigate('SupplierLogin')}
            style={styles.userButton}
          />
        </View>
        
        <View style={styles.userOption}>
          <Image 
            source={require('../../assets/images/driver-profile.png')} 
            style={styles.userIcon}
          />
          <Button
            title="Driver"
            onPress={() => navigation.navigate('DriverLogin')}
            style={[styles.userButton, styles.driverButton]}
          />
        </View>
      </View>
      
      <View style={styles.bottomCircle} />
      <View style={styles.bottomCircle1} />
      <View style={styles.bottomCircle2} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#E8F8E8',
    paddingTop: 190,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  userTypeContainer: {
    width: '100%',
    alignItems: 'center',
  },
  userOption: {
    alignItems: 'center',
    marginBottom: 30,
  },
  userIcon: {
    width: 80,
    height: 80,
    marginBottom: 15,
    borderRadius: 40,
  },
  userButton: {
    width: 120,
  },
  driverButton: {
    backgroundColor: '#FF7A59',
  },
  bottomCircle: {
    position: 'absolute',
    bottom: -100,
    right: 0,
    width: 200,
    height: 200,
    borderRadius: 150,
    backgroundColor: 'rgba(111, 207, 151, 0.3)',
    transform: [{ translateX: 50 }],
  },
  bottomCircle1: {
    position: 'absolute',
    bottom: -70,
    right: 0,
    width: 200,
    height: 200,
    borderRadius: 150,
    backgroundColor: 'rgba(111, 207, 151, 0.3)',
    transform: [{ translateX: -50 }],
  },
  bottomCircle2: {
    position: 'absolute',
    bottom: -5,
    right: 0,
    width: 200,
    height: 200,
    borderRadius: 150,
    backgroundColor: 'rgba(111, 207, 151, 0.3)',
    transform: [{ translateX: 50 }],
  },
});

export default UserType;