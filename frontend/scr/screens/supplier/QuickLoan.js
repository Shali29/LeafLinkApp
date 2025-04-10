import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar, 
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function QuickLoan({ navigation }) {
  const [loanAmount, setLoanAmount] = useState('');
  const [repaymentDuration, setRepaymentDuration] = useState('');
  const [purpose, setPurpose] = useState('');

  const goBack = () => {
    navigation.goBack();
  };

  const handleSubmit = () => {
    // Handle loan submission logic here
    console.log({ loanAmount, repaymentDuration, purpose });
    // Navigation or confirmation steps would go here
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidView}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={goBack} style={styles.backButton}>
              <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
          </View>

          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <Image 
              source={require('../../../assets/images/logo.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* Loan Form */}
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Loan Request</Text>
            
            <Text style={styles.description}>
              If you need a loan, please provide the following details:
            </Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Loan Amount:</Text>
              <TextInput
                style={styles.input}
                value={loanAmount}
                onChangeText={setLoanAmount}
                placeholder="Enter amount"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Repayment Duration:</Text>
              <TextInput
                style={styles.input}
                value={repaymentDuration}
                onChangeText={setRepaymentDuration}
                placeholder="Enter duration (in months)"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Purpose of Loan:</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={purpose}
                onChangeText={setPurpose}
                placeholder="Describe the purpose of your loan"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <TouchableOpacity 
              style={styles.submitButton} 
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F9F6',
    },
    keyboardAvoidView: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    backButton: {
        padding: 5,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 1,
        marginBottom: 10,
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 2,
    },
    logoText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#05A44C',
    },
    formContainer: {
        paddingHorizontal: 20,
        paddingVertical: 5,
    },
    formTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    description: {
        textAlign: 'left',
        marginLeft: 5,
        marginBottom: 20,
        fontSize: 15,
        color: '#555',
        fontStyle: 'italic',
    },
    inputGroup: {
        marginBottom: 15,
    },
    inputLabel: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: '500',
        fontStyle: 'italic',
        marginTop: 10,
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    textArea: {
        height: 100,
        paddingTop: 10,
    },
    submitButton: {
        backgroundColor: '#5ED9A4',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    submitButtonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
});