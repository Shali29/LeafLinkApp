// src/screens/supplier/MyPayments.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MyPayments = ({ navigation }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  
  // Sample payment data
  const paymentData = {
    'current': [
      { id: '1', date: '2024 Nov 10', amount: 12500, leafWeight: 115, status: 'Completed' },
      { id: '2', date: '2024 Oct 25', amount: 8700, leafWeight: 78, status: 'Completed' },
      { id: '3', date: '2024 Oct 15', amount: 10200, leafWeight: 92, status: 'Completed' },
    ],
    'previous': [
      { id: '4', date: '2024 Sep 30', amount: 9800, leafWeight: 88, status: 'Completed' },
      { id: '5', date: '2024 Sep 15', amount: 11500, leafWeight: 104, status: 'Completed' },
      { id: '6', date: '2024 Aug 30', amount: 7600, leafWeight: 68, status: 'Completed' },
      { id: '7', date: '2024 Aug 15', amount: 9300, leafWeight: 84, status: 'Completed' },
    ]
  };

  // Calculate total earnings
  const calculateTotal = (period) => {
    return paymentData[period].reduce((sum, payment) => sum + payment.amount, 0);
  };

  const renderPaymentItem = ({ item }) => (
    <TouchableOpacity style={styles.paymentItem}>
      <View style={styles.paymentLeft}>
        <Text style={styles.paymentDate}>{item.date}</Text>
        <Text style={styles.paymentLeaf}>{item.leafWeight} kg of leaves</Text>
      </View>
      <View style={styles.paymentRight}>
        <Text style={styles.paymentAmount}>₹{item.amount.toLocaleString()}</Text>
        <View style={[styles.statusBadge, 
          item.status === 'Pending' ? styles.pendingBadge : 
          item.status === 'Processing' ? styles.processingBadge : styles.completedBadge
        ]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Payments</Text>
      </View>
      
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>
          {selectedPeriod === 'current' ? 'Recent Earnings (Oct-Nov)' : 'Previous Earnings (Aug-Sep)'}
        </Text>
        <Text style={styles.summaryAmount}>
          ₹{calculateTotal(selectedPeriod).toLocaleString()}
        </Text>
      </View>
      
      <View style={styles.periodSelector}>
        <TouchableOpacity 
          style={[styles.periodButton, selectedPeriod === 'current' && styles.periodButtonActive]}
          onPress={() => setSelectedPeriod('current')}
        >
          <Text style={[styles.periodText, selectedPeriod === 'current' && styles.periodTextActive]}>
            Current Period
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.periodButton, selectedPeriod === 'previous' && styles.periodButtonActive]}
          onPress={() => setSelectedPeriod('previous')}
        >
          <Text style={[styles.periodText, selectedPeriod === 'previous' && styles.periodTextActive]}>
            Previous Period
          </Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Payment History</Text>
        
        <FlatList
          data={paymentData[selectedPeriod]}
          renderItem={renderPaymentItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.paymentsList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No payments found for this period</Text>
            </View>
          }
        />
      </View>
      
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('SupplierHome')}>
          <Ionicons name="home-outline" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('MyPayments')}>
          <Ionicons name="cash-outline" size={24} color="#6FCF97" />
          <Text style={styles.activeTabText}>Payments</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="notifications-outline" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="person-outline" size={24} color="#999" />
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
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  summaryContainer: {
    backgroundColor: '#6FCF97',
    padding: 20,
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
  },
  summaryAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  periodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#f5f5f5',
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: '#eee',
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: '#6FCF97',
  },
  periodText: {
    fontWeight: '500',
  },
  periodTextActive: {
    color: 'white',
  },
  contentContainer: {
    flex: 1,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
  },
  paymentsList: {
    paddingBottom: 20,
  },
  paymentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  paymentLeft: {
    flex: 1,
  },
  paymentRight: {
    alignItems: 'flex-end',
  },
  paymentDate: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  paymentLeaf: {
    fontSize: 12,
    color: '#666',
  },
  paymentAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statusBadge: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  pendingBadge: {
    backgroundColor: '#FFEFD5',
  },
  processingBadge: {
    backgroundColor: '#E6F7FF',
  },
  completedBadge: {
    backgroundColor: '#E8F8E8',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '500',
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
  },
  emptyStateText: {
    color: '#999',
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
  activeTabText: {
    fontSize: 10,
    color: '#6FCF97',
    marginTop: 2,
  },
});

export default MyPayments;