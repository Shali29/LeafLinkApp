import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';

const PreOrders = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name="arrow-back" size={24} color="black" padding={10}/>
        </TouchableOpacity>

      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../../assets/images/Falcon Factory.png')} 
            // If you don't have the image, use a placeholder or comment this line
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.headerTitle}>Pre Orders</Text>
      </View>
      
      {/* Buttons Section */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.teaButton}
          onPress={() => navigation.navigate('TeaPacketRequest')}
        >
          <Text style={styles.buttonText}>Tea Packet</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.fertilizerButton}
          onPress={() => navigation.navigate('FertilizerRequest')}
        >
          <Text style={styles.buttonText}>Fertilizer</Text>
        </TouchableOpacity>
        
        {/* Contact Icons */}
        <View style={styles.contactContainer}>
          <TouchableOpacity style={styles.emailButton}>
            <Ionicons name="mail" size={24} color="black" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.phoneButton}>
            <Ionicons name="call" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f7ed', 
  },
  header: {
    backgroundColor: '#c8e6c9', // light green header
    padding: 16,
    borderRadius: 8,
    margin: 12,
    alignItems: 'center',
  },
  
  logoContainer: {
    width: 200,
    height: 200,
    backgroundColor: 'white',
    padding: 4,
    borderRadius: 8,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 175,
    height: 175,
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  buttonContainer: {
    paddingHorizontal: 60,
    alignItems: 'center',
  },
  teaButton: {
    backgroundColor: '#66bb6a', 
    width: '100%',
    padding: 14,
    borderRadius: 8,
    marginTop: 50,
    alignItems: 'center',
  },
  fertilizerButton: {
    backgroundColor: '#ffa726', 
    width: '100%',
    padding: 14,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 200,
  },
  emailButton: {
    backgroundColor: '#ffeb3b', // yellow
    padding: 12,
    borderRadius: 25,
    marginHorizontal: 8,
  },
  phoneButton: {
    backgroundColor: '#66bb6a', // green
    padding: 12,
    borderRadius: 25,
    marginHorizontal: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#c8e6c9', // light green footer
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
  },
  footerButton: {
    padding: 8,
  },
  
});

export default PreOrders;