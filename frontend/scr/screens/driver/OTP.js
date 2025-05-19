import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OtpVerificationScreen = ({ navigation, route }) => {
  const { registerId } = route.params || {}; // Get RegisterID passed from previous screen
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [timerActive, setTimerActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  useEffect(() => {
    let interval = null;
    if (timerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setTimerActive(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive, timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}s`;
  };

  const handleOtpChange = (text, index) => {
    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = text;
    setOtpDigits(newOtpDigits);
    if (text && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    const otp = otpDigits.join('');
    if (otp.length !== 6) {
      Alert.alert('Invalid OTP', 'Please enter a valid 6-digit code');
      return;
    }
    if (!registerId) {
      Alert.alert('Error', 'Register ID not found');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://backend-production-f1ac.up.railway.app/api/driver/validateOtpLogin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          D_RegisterID: registerId,
          otp: otp,
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        // Save registerId locally
        await AsyncStorage.setItem('registerId', registerId);
        Alert.alert('Success', 'OTP verification successful!');
        console.log('Saved registerId:', registerId);
        navigation.navigate('DriverHome');
      } else {
        Alert.alert('Failed', data.message || 'OTP verification failed');
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', error.message || 'Network error');
    }
  };

  const handleResendOtp = () => {
    // TODO: Implement resend OTP API call if available
    console.log('Resending OTP...');
    setOtpDigits(['', '', '', '', '', '']);
    setTimer(30);
    setTimerActive(true);
    inputRefs.current[0].focus();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      
      <View style={styles.logoContainer}>
        <Image source={require('../../../assets/images/logo.png')} style={styles.logo} resizeMode="contain" />
      </View>
      
      <Text style={styles.heading}>Almost there !</Text>
      <Text style={styles.instructions}>
        Please enter the 6-digit code sent to your email for verification.
      </Text>
      
      <View style={styles.otpContainer}>
        {otpDigits.map((digit, index) => (
          <TextInput
            key={index}
            ref={ref => { inputRefs.current[index] = ref; }}
            style={styles.otpInput}
            value={digit}
            onChangeText={text => handleOtpChange(text.replace(/[^0-9]/g, ''), index)}
            onKeyPress={e => handleKeyPress(e, index)}
            keyboardType="numeric"
            maxLength={1}
            selectTextOnFocus
            autoFocus={index === 0}
            editable={!loading}
          />
        ))}
      </View>
      
      <TouchableOpacity
        style={[styles.verifyButton, loading && { opacity: 0.7 }]}
        onPress={handleVerify}
        disabled={loading}
      >
        <Text style={styles.verifyButtonText}>{loading ? 'Verifying...' : 'Verify'}</Text>
      </TouchableOpacity>
      
      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Didn't receive any code? </Text>
        <TouchableOpacity onPress={handleResendOtp} disabled={timerActive || loading}>
          <Text style={[styles.resendLink, (timerActive || loading) && styles.resendLinkDisabled]}>
            Resend Again
          </Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.timerText}>
        {timerActive ? `Request new code in ${formatTime(timer)}` : 'You can request a new code now'}
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE8E0',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  backButtonText: {
    fontSize: 30,
    color: '#333',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: -100,
  },
  logo: {
    width: 100,
    height: 100,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  instructions: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 40,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  verifyButton: {
    backgroundColor: '#ff7043',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resendContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  resendText: {
    color: '#666',
    fontSize: 14,
  },
  resendLink: {
    color: '#ff7043',
    fontSize: 14,
    fontWeight: 'bold',
  },
  resendLinkDisabled: {
    color: '#ccc',
  },
  timerText: {
    color: '#999',
    fontSize: 12,
  },
});

export default OtpVerificationScreen;
