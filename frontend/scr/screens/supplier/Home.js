/* home screen.js */
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';

const SupplierHome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.profileContainer}>
          {/*<Image 
            source={require('../../../assets/images/profile.png')} 
            style={styles.profileImage} 
          /> */}
          <Text style={styles.welcomeText}>Hi, Mr. Perera!</Text>
        </View>
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
          <MaterialIcons name="history" size={29} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="notifications-outline" size={28} color="#999" />
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
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingTop: 50,
    backgroundColor: '#E8F8E8',
  },
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
    backgroundColor: '#E8F8E8',
  },
  image: {
    Width: 1000, 
    Height: 20, 
  },
  image1: {
    Width: 30, 
    Height: 30, 
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
      borderRadius: 50, // Half of width/height to make it circular
      justifyContent: 'center', // Center content vertically
      alignItems: 'center', // Center content horizontally
      backgroundColor: '#f9f9f9',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  menuText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
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

export default SupplierHome;