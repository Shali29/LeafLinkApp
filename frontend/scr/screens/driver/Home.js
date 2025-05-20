// src/screens/driver/Home.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DriverHome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        
        <View style={styles.profileContainer}>
          <Text style={styles.welcomeText}>Hi, Mr. Driver!</Text>
        </View>

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

      <View style={styles.ImageContainer}>
              <Image 
                source={require('../../../assets/images/Falcon Factory.png')}
                style={styles.image}
                resizeMode="contain"
              />
      </View>

      <View style={styles.menuContainer}>
              <View style={[styles.menuRow, { marginTop: 20 }]}>
                <TouchableOpacity 
                  style={styles.menuItem}
                  onPress={() => navigation.navigate('Suppliers')}
                >
                  <Image 
                    source={require('../../../assets/images/Supplier.png')}
                    style={{maxWidth: 100, maxHeight: 100}}
                    resizeMode="contain"
                  />
                  <Text style={styles.menuText}>Suppliers</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.menuItem}
                    onPress={() => navigation.navigate('Requests')}
                >
                  <Image 
                    source={require('../../../assets/images/Request-icon.png')}
                    style={{maxWidth: 100, maxHeight: 100}}
                    resizeMode="contain"
                  />
                  <Text style={styles.menuText}>Requests</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.menuItem}
                  onPress={() => navigation.navigate('Map')}
                >
                    <Image 
                    source={require('../../../assets/images/Map-icon.png')}
                    style={{maxWidth: 100, maxHeight: 100}}
                    resizeMode="contain"
                  />
                  <Text style={styles.menuText}>Map</Text>
                </TouchableOpacity>
              </View>
            </View> 

      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="home" size={24} color="#FF7A59" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons onPress={() => navigation.navigate('DriverNotification')} 
          name="notifications-outline" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons onPress={() => navigation.navigate('DriverProfile')} 
          name="person-outline" size={24} color="#999" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingTop: 50,
    backgroundColor: '#FFE8E0',
  },
  logoutButton: {
    marginLeft: 'auto',},
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ImageContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFE8E0',
  },
  logo: {
    width: 100,
    height: 100,
  },
  companyName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  menuContainer: {
    flex: 1,
    padding: 20,
    marginTop: 20,
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
    gap: 20, // Space between buttons
  },
  menuItem: {
    width: 100, // Set width
    height: 100, // Set height (same as width)
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    width: '40%',
  },
  iconContainer: {
    width: 150,
    height: 150,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  menuText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  tabItem: {
    alignItems: 'center',
  },
});

export default DriverHome;
        
    