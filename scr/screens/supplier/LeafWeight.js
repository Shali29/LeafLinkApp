// src/screens/supplier/LeafWeight.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';

const LeafWeight = ({ navigation }) => {
  const [selectedYear, setSelectedYear] = useState('2023');
  
  const weightData = {
    '2023': [
      { area: 'Area 1', weight: 25, moisture: 8.4, waterContent: 9.1 },
      { area: 'Area 2', weight: 32, moisture: 7.9, waterContent: 8.5 },
      { area: 'Area 3', weight: 28, moisture: 8.1, waterContent: 9.0 },
    ],
    '2024': [
      { area: 'Area 1', weight: 29, moisture: 8.0, waterContent: 8.8 },
      { area: 'Area 2', weight: 34, moisture: 7.7, waterContent: 8.2 },
      { area: 'Area 3', weight: 31, moisture: 7.9, waterContent: 8.7 },
    ]
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            ></TouchableOpacity>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Leaf Weight</Text>
      </View>

      <View style={styles.TextContainer}>
          <Text style={styles.subtitle}>Current rate per 1 kg of tea leaves: </Text>
          <Text style={styles.subtitle}>Date: </Text>
          <Text style={styles.subtitle}>Leaves collected this month: </Text>
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>Collected Weight by Estate (Average per kg)</Text>
        
        <View style={styles.yearSelector}>
          <TouchableOpacity 
            style={[styles.yearButton, selectedYear === '2023' && styles.yearButtonActive]}
            onPress={() => setSelectedYear('2023')}
          >
            <Text style={[styles.yearText, selectedYear === '2023' && styles.yearTextActive]}>
              2023 Data
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.yearButton, selectedYear === '2024' && styles.yearButtonActive]}
            onPress={() => setSelectedYear('2024')}
          >
            <Text style={[styles.yearText, selectedYear === '2024' && styles.yearTextActive]}>
              2024 Data
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, { flex: 1.5 }]}>Estate Area</Text>
            <Text style={styles.tableHeaderCell}>Leaf Weight</Text>
            <Text style={styles.tableHeaderCell}>Moisture</Text>
            <Text style={styles.tableHeaderCell}>Water%</Text>
          </View>
          
          <ScrollView>
            {weightData[selectedYear].map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>{item.area}</Text>
                <Text style={styles.tableCell}>{item.weight} kg</Text>
                <Text style={styles.tableCell}>{item.moisture}%</Text>
                <Text style={styles.tableCell}>{item.waterContent}%</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
      
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('SupplierHome')}>
          <Ionicons name="home-outline" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <MaterialIcons name="history" size={29} color="#999" />
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
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: 15,
  },
  TextContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#B0D8C5',
    borderRadius: 30,
  },
  contentContainer: {
    flex: 1,
    padding: 15,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 15,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  yearSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  yearButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#eee',
  },
  yearButtonActive: {
    backgroundColor: '#6FCF97',
  },
  yearText: {
    fontWeight: '500',
  },
  yearTextActive: {
    color: 'white',
  },
  tableContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableHeaderCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
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
});

export default LeafWeight;