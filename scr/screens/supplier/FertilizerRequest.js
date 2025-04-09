import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  ScrollView,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FertilizerRequest = ({ navigation }) => {
  const [fertilizer1Quantity, setFertilizer1Quantity] = useState(1);
  const [fertilizer2Quantity, setFertilizer2Quantity] = useState(1);
  
  // Product prices
  const fertilizer1Price = 2000;
  const fertilizer2Price = 6000;
  
  // Calculate total payment
  const totalPayment = (fertilizer1Quantity * fertilizer1Price) + (fertilizer2Quantity * fertilizer2Price);

  // Handle quantity changes
  const incrementQuantity = (type) => {
    if (type === 'fertilizer1') {
      setFertilizer1Quantity(fertilizer1Quantity + 1);
    } else {
      setFertilizer2Quantity(fertilizer2Quantity + 1);
    }
  };

  const decrementQuantity = (type) => {
    if (type === 'fertilizer1') {
      if (fertilizer1Quantity > 1) {
        setFertilizer1Quantity(fertilizer1Quantity - 1);
      }
    } else {
      if (fertilizer2Quantity > 1) {
        setFertilizer2Quantity(fertilizer2Quantity - 1);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with User Info */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.userInfoContainer}>
          <View style={styles.avatarContainer}>
                      <Ionicons name="person" size={24} color="#6B7280" />
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.greeting}>Hi, Mr. Perera!</Text>
          </View>
        </View>
      </View>

      {/* Supplier Info */}
      <View style={styles.supplierInfoContainer}>
        <Text style={styles.supplierInfo}>Supplier ID: <Text style={styles.supplierInfoValue}>304</Text></Text>
        <Text style={styles.supplierInfo}>Date: <Text style={styles.supplierInfoValue}>2024 Nov 12</Text></Text>
      </View>

      {/* Fertilizer Selection Header */}
      <View style={styles.sectionHeader}>
        <View style={styles.fertilizerBadge}>
          <Text style={styles.fertilizerBadgeText}>Fertilizer</Text>
        </View>
        <Text style={styles.selectionTitle}>Selection</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Fertilizer 1 */}
        <View style={styles.fertilizerItem}>
          <View style={styles.fertilizerInfo}>
            <Text style={styles.fertilizerName}>[Name 1]</Text>
            <Text style={styles.fertilizerPrice}>LKR {fertilizer1Price.toFixed(2)}</Text>
            <Text style={styles.fertilizerWeight}>25kg</Text>
          </View>
          <View style={styles.quantityContainer}>
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => decrementQuantity('fertilizer1')}
            >
              <Text style={styles.quantityButtonText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{fertilizer1Quantity}</Text>
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => incrementQuantity('fertilizer1')}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>ADD</Text>
          </TouchableOpacity>
        </View>

        {/* Fertilizer 2 */}
        <View style={styles.fertilizerItem}>
          <View style={styles.fertilizerInfo}>
            <Text style={styles.fertilizerName}>[Name 2]</Text>
            <Text style={styles.fertilizerPrice}>LKR {fertilizer2Price.toFixed(2)}</Text>
            <Text style={styles.fertilizerWeight}>25kg</Text>
          </View>
          <View style={styles.quantityContainer}>
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => decrementQuantity('fertilizer2')}
            >
              <Text style={styles.quantityButtonText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{fertilizer2Quantity}</Text>
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => incrementQuantity('fertilizer2')}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>ADD</Text>
          </TouchableOpacity>
        </View>

        {/* Total Payment */}
        <View style={styles.totalPaymentContainer}>
          <Text style={styles.totalPaymentText}>Total Payment Due: <Text style={styles.totalPaymentValue}>Rs. {totalPayment.toLocaleString()}/=</Text></Text>
        </View>

        {/* Submit Button */}
        <View style={styles.submitContainer}>
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={() => navigation.navigate('OrderConfirmation')}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('History')}>
          <Ionicons name="time-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Notifications')}>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f7ee',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#e6f7ee',
  },
  backButton: {
    marginRight: 15,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userDetails: {
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
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
  sectionHeader: {
    paddingHorizontal: 15,
    marginBottom: 10,
    padding: 16
  },
  fertilizerBadge: {
    backgroundColor: '#f39c12',
    alignSelf: 'center',
    paddingHorizontal: 142,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 15,
  },
  fertilizerBadgeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  selectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
  },
  fertilizerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  fertilizerInfo: {
    flex: 1,
  },
  fertilizerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  fertilizerPrice: {
    fontSize: 14,
    color: '#444',
  },
  fertilizerWeight: {
    fontSize: 14,
    color: '#777',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  quantityButton: {
    width: 30,
    height: 30,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 10,
    width: 20,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  totalPaymentContainer: {
    padding: 15,
    marginTop: 10,
    marginBottom: 20,
  },
  totalPaymentText: {
    fontSize: 16,
    textAlign: 'center',
  },
  totalPaymentValue: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  submitButton: {
    backgroundColor: '#5ED9A4', // green
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  submitContainer: {
    alignItems: 'center',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  navButton: {
    padding: 10,
  },
});

export default FertilizerRequest;