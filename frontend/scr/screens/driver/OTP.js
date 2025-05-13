import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

const OtpVerificationScreen = ({ navigation }) => {
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [timerActive, setTimerActive] = useState(true);
  const inputRefs = useRef([]);

  // Initialize input refs
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  // Timer countdown
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

  // Format timer as "00:30s"
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}s`;
  };

  // Handle OTP input changes
  const handleOtpChange = (text, index) => {
    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = text;
    setOtpDigits(newOtpDigits);

    // Auto focus to next input field if value is entered
    if (text && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace
  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle verify button press
  const handleVerify = () => {
    const otp = otpDigits.join('');
    // Here you would typically validate the OTP with your backend
    console.log('Verifying OTP:', otp);
    
    // For demo purposes, just show success
    if (otp.length === 6) {
      alert('OTP verification successful!');
      // Navigate to next screen
      // navigation.navigate('NextScreen');
    } else {
      alert('Please enter a valid 6-digit code');
    }
  };

  // Handle Resend OTP
  const handleResendOtp = () => {
    // Here you would make an API call to resend OTP
    console.log('Resending OTP...');
    
    // Reset OTP fields
    setOtpDigits(['', '', '', '', '', '']);
    
    // Reset timer
    setTimer(30);
    setTimerActive(true);
    
    // Focus on first input
    inputRefs.current[0].focus();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Back button */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      
      {/* Heading */}
      <Text style={styles.heading}>Almost there !</Text>
      
      {/* Instructions */}
      <Text style={styles.instructions}>
        Please enter the 6-digit code sent to your email for verification.
      </Text>
      
      {/* OTP Input Fields */}
      <View style={styles.otpContainer}>
        {otpDigits.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              inputRefs.current[index] = ref;
            }}
            style={styles.otpInput}
            value={digit}
            onChangeText={(text) => handleOtpChange(text.replace(/[^0-9]/g, ''), index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="numeric"
            maxLength={1}
            selectTextOnFocus
            autoFocus={index === 0}
          />
        ))}
      </View>
      
      {/* Verify Button */}
      <TouchableOpacity
        style={styles.verifyButton}
        onPress={() => navigation.navigate('DriverHome')}
      >
        <Text style={styles.verifyButtonText}>Verify</Text>
      </TouchableOpacity>
      
      {/* Resend Code Section */}
      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Didn't receive any code? </Text>
        <TouchableOpacity
          onPress={handleResendOtp}
          disabled={timerActive}
        >
          <Text style={[
            styles.resendLink,
            timerActive && styles.resendLinkDisabled
          ]}>
            Resend Again
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Timer */}
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