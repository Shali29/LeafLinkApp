// src/screens/supplier/MyPayments.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyPayments = ({ navigation }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  const [supplierId, setSupplierId] = useState(null);
  const [supplier, setSupplier] = useState(null);
  const [payments, setPayments] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = await AsyncStorage.getItem('supplierId');
        if (!id) return;

        setSupplierId(id);

        const supplierRes = await axios.get(`https://backend-production-f1ac.up.railway.app/api/supplier/${id}`);
        setSupplier(supplierRes.data);

        const res = await axios.get(`https://backend-production-f1ac.up.railway.app/api/supplierPayment/supplier/${id}`);
        setPayments(res.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        Alert.alert('Error', 'Failed to load supplier info or payment history.');
      }
    };

    fetchData();
  }, []);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const filteredPayments = payments.filter(payment => {
    const date = new Date(payment.Date);
    const payMonth = date.getMonth();
    const payDay = date.getDate();
    const payYear = date.getFullYear();

    if (payYear !== currentYear) return false;
    return selectedPeriod === 'current'
      ? payMonth === currentMonth && payDay >= 10
      : payMonth < currentMonth || (payMonth === currentMonth && payDay < 10);
  });

  const calculateTotal = () => {
    return filteredPayments.reduce((sum, payment) => sum + payment.Final_Total_Salary, 0);
  };

  const renderPaymentItem = ({ item }) => (
    <TouchableOpacity style={styles.paymentItem} onPress={() => { setSelectedPayment(item); setModalVisible(true); }}>
      <View style={styles.paymentLeft}>
        <Text style={styles.paymentDate}>{new Date(item.Date).toDateString()}</Text>
        <Text style={styles.paymentLeaf}>Loan: Rs.{item.Supplier_Loan_Amount.toLocaleString()}</Text>
      </View>
      <View style={styles.paymentRight}>
        <Text style={styles.paymentAmount}>Rs.{item.Final_Total_Salary.toLocaleString()}</Text>
        <View style={[styles.statusBadge, 
          item.Status === 'Pending' ? styles.pendingBadge : 
          item.Status === 'Processing' ? styles.processingBadge : styles.completedBadge
        ]}>
          <Text style={styles.statusText}>{item.Status}</Text>
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
          {selectedPeriod === 'current' ? 'Current Period Earnings' : 'Previous Earnings'}
        </Text>
        <Text style={styles.summaryAmount}>Rs.{calculateTotal().toLocaleString()}</Text>
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
          data={filteredPayments}
          renderItem={renderPaymentItem}
          keyExtractor={item => item.PaymentsID.toString()}
          contentContainerStyle={styles.paymentsList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<View style={styles.emptyState}><Text style={styles.emptyStateText}>No payments found for this period</Text></View>}
        />
      </View>

      {/* Modal View */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <View style={{ backgroundColor: 'white', margin: 20, padding: 20, borderRadius: 10 }}>
            {selectedPayment && (
              <>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Payment Details</Text>
                <Text>Date: {new Date(selectedPayment.Date).toDateString()}</Text>
                <Text>Loan Amount: Rs.{selectedPayment.Supplier_Loan_Amount}</Text>
                <Text>Advance Amount: Rs.{selectedPayment.Supplier_Advance_Amount}</Text>
                <Text>Product Cost: Rs.{selectedPayment.TeaPackets_Fertilizers_Amount}</Text>
                <Text>Transport Charge: Rs.{selectedPayment.Transport_Charge}</Text>
                <Text>Total Salary: Rs.{selectedPayment.Final_Total_Salary}</Text>
                <Text>Status: {selectedPayment.Status}</Text>
              </>
            )}
            <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginTop: 20, alignSelf: 'flex-end' }}>
              <Text style={{ color: 'blue' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row', alignItems: 'center', padding: 15,
    paddingTop: 50, backgroundColor: '#E8F8E8'
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 15 },
  summaryContainer: {
    backgroundColor: '#6FCF97', padding: 20, alignItems: 'center'
  },
  summaryTitle: { fontSize: 14, color: '#fff', marginBottom: 5 },
  summaryAmount: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  periodSelector: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingHorizontal: 15, paddingVertical: 10, backgroundColor: '#f5f5f5'
  },
  periodButton: {
    flex: 1, paddingVertical: 8, paddingHorizontal: 5,
    borderRadius: 20, marginHorizontal: 5, backgroundColor: '#eee', alignItems: 'center'
  },
  periodButtonActive: { backgroundColor: '#6FCF97' },
  periodText: { fontWeight: '500' },
  periodTextActive: { color: 'white' },
  contentContainer: { flex: 1, padding: 15 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 15 },
  paymentsList: { paddingBottom: 20 },
  paymentItem: {
    flexDirection: 'row', justifyContent: 'space-between',
    padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee',
    backgroundColor: '#fff', borderRadius: 8, marginBottom: 10,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1, shadowRadius: 2, elevation: 2
  },
  paymentLeft: { flex: 1 },
  paymentRight: { alignItems: 'flex-end' },
  paymentDate: { fontSize: 14, fontWeight: '500', marginBottom: 4 },
  paymentLeaf: { fontSize: 12, color: '#666' },
  paymentAmount: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  statusBadge: { paddingVertical: 2, paddingHorizontal: 8, borderRadius: 12 },
  pendingBadge: { backgroundColor: '#FFEFD5' },
  processingBadge: { backgroundColor: '#E6F7FF' },
  completedBadge: { backgroundColor: '#E8F8E8' },
  statusText: { fontSize: 11, fontWeight: '500' },
  emptyState: { padding: 20, alignItems: 'center' },
  emptyStateText: { color: '#999' },
  tabBar: {
    flexDirection: 'row', justifyContent: 'space-around',
    padding: 15, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#eee'
  },
  tabItem: { alignItems: 'center' },
  activeTabText: { fontSize: 10, color: '#6FCF97', marginTop: 2 },
});

export default MyPayments;