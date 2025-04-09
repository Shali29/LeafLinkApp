// src/screens/Splash.js
import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import AppNavigator from '../navigation/AppNavigator';

const Splash = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('UserType');
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timeout to avoid memory leaks
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a5cca5',
  },
  logo: {
    width: 150,
    height: 150,
  },
});

export default Splash;
