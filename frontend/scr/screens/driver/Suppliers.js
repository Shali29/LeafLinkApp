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

export default function Suppliers({ navigation }) {
  const [TeaBagWeight, setTeaBagWeight] = useState('');
  const [WaterWeight, setWaterWeight] = useState('');
  const [BagWeight, setBagWeight] = useState('');
  const [TotalBalanceWeight, setTotalBalanceWeight] = useState('');
  const [searchQuery, setSearchQuery] = useState('');


  const goBack = () => {
    navigation.goBack();
  };

  const handleUpload = () => {
    // Handle leaf weight submission logic here
    console.log({ TeaBagWeight, WaterWeight, BagWeight, TotalBalanceWeight });
    // Navigation or confirmation steps would go here
  };

  const handleClear = () => {
    setTeaBagWeight('');
    setWaterWeight('');
    setBagWeight('');
    setTotalBalanceWeight('');
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
            

            <TextInput
              style={styles.searchBar}
              placeholder="Search..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />

            <TouchableOpacity style={styles.notificationButton}>
              <Ionicons name="notifications-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>

          

          <View style={styles.supplierInfoContainer}>
                  <Text style={styles.supplierInfo}>Supplier ID: <Text style={styles.supplierInfoValue}>304</Text></Text>
                  <Text style={styles.supplierInfo}>Current rate per 1 kg of tea leaves: <Text style={styles.supplierInfoValue}>Rs.170/-</Text></Text>
                  <Text style={styles.supplierInfo}>Leaves collected this month: <Text style={styles.supplierInfoValue}>30 kg</Text></Text>
          </View>
          

          {/* Loan Form */}
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Update Daily Leaf Weight</Text>
            

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Tea Bag Weight (kg): </Text>
              <TextInput
                style={styles.input}
                value={TeaBagWeight}
                onChangeText={setTeaBagWeight}
                placeholder="Enter tea bag weight"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Water Weight (kg): </Text>
              <TextInput
                style={styles.input}
                value={WaterWeight}
                onChangeText={setWaterWeight}
                placeholder="Enter water weight"
                keyboardType="numeric"
              />

            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Bag Weight (kg):</Text>
              <TextInput
                style={styles.input}
                value={BagWeight}
                onChangeText={setBagWeight}
                placeholder="Enter bag weight"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Total Balance Weight (kg):</Text>
              <TextInput
                style={styles.output}
                value={TotalBalanceWeight}
                onChangeText={setTotalBalanceWeight}
                placeholder="Today Total Balance Weight"
                keyboardType="numeric"
              />
            </View>

            <TouchableOpacity 
              style={styles.uploadButton} 
              onPress={handleUpload}
            >
              <Text style={styles.submitButtonText}>Upload</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.clearButton} 
              onPress={handleClear}
            >
              <Text style={styles.submitButtonText}>Clear</Text>
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
  searchBar: {
    width: '75%',
    marginLeft: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  notificationButton: {
    marginLeft: 10,
  },
  supplierInfoContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#AFDFBF',
    borderRadius: 10,
    marginHorizontal: 15,
    marginBottom: 20,
  },
  supplierInfo: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  supplierInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 4,
  },
  supplierInfoValue: {
    fontWeight: 'bold',
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
  output: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    fontStyle: 'bold',
    borderWidth: 2,
    borderColor: '#FF0000',
  },
  textArea: {
    height: 100,
    paddingTop: 10,
  },
  uploadButton: {
    backgroundColor: '#ED7152',
    paddingVertical: 12,
    paddingHorizontal: 100, // Modified length
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  clearButton: {
    backgroundColor: '#F8A895',
    paddingVertical: 12,
    paddingHorizontal: 100, // Modified length
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