/* home screen.js */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SupplierHome = ({ navigation }) => {
  const [supplierName, setSupplierName] = useState('');

  // Fetch supplier details on component mount
  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const id = await AsyncStorage.getItem('supplierId'); // Get supplier ID from local storage
        if (!id) return;

        const res = await axios.get(`https://backend-production-f1ac.up.railway.app/api/supplier/${id}`);
        setSupplierName(res.data.S_FullName || '');
      } catch (err) {
        console.error('Failed to fetch supplier info:', err);
        Alert.alert('Error', 'Could not load supplier name');
      }
    };
    fetchSupplier();
  }, []);

  return (
    <View style={styles.container}>

      {/* Header section with welcome message and logout button */}
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Text style={styles.welcomeText}>Hi, {supplierName || 'Supplier'}!</Text>
        </View>

      {/* Logout button */}
        <TouchableOpacity
    onPress={async () => {
      await AsyncStorage.clear();
      navigation.reset({
        index: 0,
        routes: [{ name: 'UserType' }],
      });
    }}
    style={styles.logoutButton}
  >
    <Ionicons name="log-out-outline" size={24} color="black" />
  </TouchableOpacity>
</View>


      {/* Factory banner image */}
      <View style={styles.ImageContainer}>
        <Image 
          source={require('../../../assets/images/Falcon Factory.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* First row of menu items */}
      <View style={styles.menuContainer}>
        <View style={[styles.menuRow, { marginTop: 20 }]}>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('LeafWeight')}
          >
            <Image 
              source={require('../../../assets/images/Leaf Weight icon.png')}
              style={{maxWidth: 150, maxHeight: 150}}
              resizeMode="contain"
            />
            <Text style={styles.menuText}>Leaf Weight</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('MyPayments')}
          >
            <Image 
              source={require('../../../assets/images/My Payment icon.png')}
              style={{maxWidth: 150, maxHeight: 150}}
              resizeMode="contain"
            />
            <Text style={styles.menuText}>My Payments</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.menuContainer}>  
        <View style={[styles.menuRow, { marginTop: 1 }]}>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('PreOrders')}
          >
            <Image 
              source={require('../../../assets/images/Pre Orders.png')}
              style={{maxWidth: 150, maxHeight: 150}}
              resizeMode="contain"
            />
            <Text style={styles.menuText}>Pre Orders</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('TrackLorry')}
          >
            <Image 
              source={require('../../../assets/images/Track Lorry icon.png')}
              style={{maxWidth: 150, maxHeight: 150}}
              resizeMode="contain"
            />
            <Text style={styles.menuText}>Track Lorry</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('QuickLoan')}
          >
            <Image 
              source={require('../../../assets/images/Quick Loan icon.png')}
              style={{maxWidth: 150, maxHeight: 150}}
              resizeMode="contain"
            />
            <Text style={styles.menuText}>Quick Loan</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="home" size={28} color="#6FCF97" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons onPress={() => navigation.navigate('Notification')} 
            name="notifications-outline" size={28} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons onPress={() => navigation.navigate('SupplierProfile')} 
            name="person-outline" size={28} color="#999" />
        </TouchableOpacity>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' },

  header: {
    flexDirection: 'row', alignItems: 'center', padding: 15,
    paddingTop: 50, backgroundColor: '#E8F8E8'}
    ,
  logoutButton: {
  marginLeft: 'auto',},

  profileContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginLeft: 15,},

  welcomeText: { 
    fontSize: 16, 
    fontWeight: 'bold' },

  ImageContainer: {
    alignItems: 'center', 
    padding: 20, 
    backgroundColor: '#E8F8E8'},

  image: { 
    Width: 1000, 
    Height: 20 },

  menuContainer: { 
    flex: 1, 
    padding: 20, 
    marginTop: 20 },

  menuRow: {
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center', 
    gap: 20},

  menuItem: {
    width: 100, 
    height: 100, 
    borderRadius: 50,
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#f9f9f9',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2, shadowRadius: 4},

  menuText: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    textAlign: 'center' },
  
  tabBar: {
    flexDirection: 'row', 
    justifyContent: 'space-around',
    padding: 15, 
    backgroundColor: '#fff', 
    borderTopWidth: 1,
    borderTopColor: '#eee'},

tabItem: { 
  alignItems: 'center' },
});

export default SupplierHome;