import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const Notification = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);  // State to show loading indicator

  const fetchNotifications = async () => {
    try {
      const supplierId = await AsyncStorage.getItem('supplierId'); // Assuming you stored supplier ID after login
      if (!supplierId) {
        Alert.alert('Error', 'Supplier ID not found');
        return;
      }

      const res = await fetch(`https://backend-production-f1ac.up.railway.app/api/notifications/supplier/${supplierId}`);
      const data = await res.json();

      // Format notifications
      const formatted = data.map((item) => ({
        id: item.NotificationID,
        title: 'Notification',
        message: item.Message,
        time: new Date(item.CreatedAt).toLocaleString(),
        read: item.IsRead,
      }));

      setNotifications(formatted);
    } catch (err) {
      Alert.alert('Error', 'Failed to fetch notifications');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Mark a single notification as read
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );

    // Update backend
    fetch(`https://backend-production-f1ac.up.railway.app/api/notifications/supplier/read/${id}`, {
      method: 'PUT',
    }).catch((err) => console.error('Failed to mark as read', err));
  };

  // Mark all unread notifications as read
  const markAllAsRead = () => {
    notifications.forEach((n) => {
      if (!n.read) markAsRead(n.id);
    });
  };

  // Count unread notifications
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header1}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle1}>Notification</Text>
      </View>

      <View style={styles.header}>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={markAllAsRead}>
            <Text style={styles.markAllText}>Mark all as read</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="settings-outline" size={22} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Notification count display */}
      <View style={styles.countContainer}>
        <Text style={styles.countText}>
          You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
        </Text>
      </View>
 
    {/* Loader while fetching */}
      {loading ? (
        <ActivityIndicator size="large" color="#6FCF97" style={{ marginTop: 20 }} />
      ) : (
        <ScrollView style={styles.notificationsList}>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <View
                key={notification.id}
                style={[
                  styles.notificationItem,
                  !notification.read && styles.unreadNotification,
                ]}
              >
                <View style={styles.notificationContent}>
                  <View style={styles.notificationHeader}>
                    <Text
                      style={[
                        styles.notificationTitle,
                        !notification.read && styles.unreadTitle,
                      ]}
                    >
                      {notification.title}
                    </Text>
                    <Text style={styles.timeText}>{notification.time}</Text>
                  </View>
                  <Text style={styles.messageText}>{notification.message}</Text>
                </View>
                <View style={styles.actionButtons}>
                  {!notification.read && (
                    <TouchableOpacity
                      onPress={() => markAsRead(notification.id)}
                      style={styles.actionButton}
                    >
                      <Ionicons name="checkmark" size={18} color="#10b981" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No notifications</Text>
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header1: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingTop: 30,
    backgroundColor: '#E8F8E8',
  },
  header: {
    backgroundColor: '#6FCF97',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle1: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: 15,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  markAllText: {
    color: 'white',
    marginRight: 16,
    fontSize: 14,
  },
  countContainer: {
    padding: 12,
    backgroundColor: '#f9fafb',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  countText: {
    fontSize: 14,
    color: '#4b5563',
  },
  notificationsList: {
    flex: 1,
  },
  notificationItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  unreadNotification: {
    backgroundColor: '#eff6ff',
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  notificationTitle: {
    fontWeight: '500',
    fontSize: 16,
    color: '#1f2937',
    flex: 1,
    marginRight: 8,
  },
  unreadTitle: {
    color: '#2563eb',
  },
  timeText: {
    fontSize: 12,
    color: '#6b7280',
  },
  messageText: {
    marginTop: 6,
    fontSize: 14,
    color: '#4b5563',
  },
  actionButtons: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  actionButton: {
    padding: 6,
    marginLeft: 4,
  },
  emptyState: {
    padding: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    color: '#6b7280',
    fontSize: 16,
  },
});

export default Notification;
