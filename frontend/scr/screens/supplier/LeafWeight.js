import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment'; // npm install moment

const LeafWeight = ({ navigation }) => {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCollections = async () => {
    try {
      const supplierId = await AsyncStorage.getItem('supplierId');
      if (!supplierId) return;

      const res = await axios.get(`https://backend-production-f1ac.up.railway.app/api/supplierCollection/supplier/${supplierId}`);
      setCollections(res.data || []);
    } catch (err) {
      console.error('Fetch Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const today = moment().format('YYYY-MM-DD');
  const currentMonth = moment().format('YYYY-MM');

  // Filter for current month
  const currentMonthCollections = collections.filter(item =>
    item.DateTime && item.DateTime.startsWith(currentMonth)
  );

  const currentRate = currentMonthCollections[0]?.Current_Rate || 'N/A';

  const totalMonthWeight = currentMonthCollections.reduce(
    (sum, item) => sum + (item.BalanceWeight_kg || 0), 0
  );

  // Group by date
  const groupedByDate = {};
  currentMonthCollections.forEach(item => {
    const date = item.DateTime?.split('T')[0];
    if (!groupedByDate[date]) {
      groupedByDate[date] = [];
    }
    groupedByDate[date].push(item);
  });

  const sortedDates = Object.keys(groupedByDate).sort((a, b) => moment(b).diff(moment(a)));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Leaf Weight</Text>
      </View>

      <View style={styles.topCard}>
        <Text style={styles.infoText}>
          Current rate per 1 kg of tea leaves:  <Text style={styles.bold}>Rs.{currentRate}/-</Text>
        </Text>
        <Text style={styles.infoText}>
          Date: <Text style={styles.bold}>{moment().format('YYYY MMM D')}</Text>
        </Text>
        <Text style={styles.infoText}>
          Leaves collected this month: <Text style={{styles: 'bold', fontSize: 24
            
          }}>{totalMonthWeight} kg</Text>
        </Text>
      </View>

      <ScrollView style={styles.scrollContent}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#6FCF97" style={{ marginTop: 20 }} />
        ) : sortedDates.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>No data for this month</Text>
        ) : (
          sortedDates.map(date => (
            <View key={date} style={styles.dateSection}>
              <Text style={styles.dateHeader}>{moment(date).format('YYYY MMM D')}</Text>
              <View style={styles.dataBox}>
                <View style={styles.rowHeader}>
                  <Text style={styles.cell}>Tea Bag weight{'\n'}(kg)</Text>
                  <Text style={styles.cell}>Water{'\n'}(kg)</Text>
                  <Text style={styles.cell}>Bag{'\n'}(kg)</Text>
                  <Text style={styles.cell}>Balance Weight{'\n'}(kg)</Text>
                </View>
                {groupedByDate[date].map((entry, idx) => (
                  <View key={idx} style={styles.row}>
                    <Text style={styles.cell}>{entry.TeaBagWeight_kg}</Text>
                    <Text style={styles.cell}>{entry.Water_kg}</Text>
                    <Text style={styles.cell}>{entry.Bag_kg}</Text>
                    <Text style={[styles.cell, { fontWeight: 'bold', color: 'crimson' }]}>
                      {entry.BalanceWeight_kg}
                    </Text>
                  </View>
                ))}
                <Text style={styles.totalText}>
                  Total Weight: <Text style={{ color: 'crimson', fontWeight: 'bold' }}>
                    {groupedByDate[date].reduce((sum, e) => sum + (e.BalanceWeight_kg || 0), 0)}kg
                  </Text>
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>

    
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8F8E8' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  topCard: {
    backgroundColor: '#B0D8C5',
    margin: 15,
    borderRadius: 20,
    padding: 15,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingHorizontal: 15,
    marginBottom: 70,
  },
  dateSection: {
    marginBottom: 20,
  },
  dateHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dataBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  rowHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 6,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 13,
  },
  totalText: {
    textAlign: 'right',
    marginTop: 6,
    fontSize: 13,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  tabItem: {
    alignItems: 'center',
  },
});

export default LeafWeight;
