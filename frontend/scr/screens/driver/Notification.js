/* notification screen*/
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Notification = ({ navigation }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New message from Sarah",
      message: "Hey, just checking in about the project deadline.",
      time: "5 minutes ago",
      read: false,
      type: "message"
    },
    {
      id: 2,
      title: "Meeting reminder",
      message: "Team standup in 15 minutes.",
      time: "10 minutes ago",
      read: false,
      type: "reminder"
    },
    {
      id: 3,
      title: "Your document was approved",
      message: "The proposal you submitted has been approved by management.",
      time: "1 hour ago",
      read: true,
      type: "alert"
    },
    {
      id: 4,
      title: "System update available",
      message: "A new system update is available. Please update at your earliest convenience.",
      time: "2 hours ago",
      read: true,
      type: "system"
    }
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? {...notif, read: true} : notif
    ));
  };

  const removeNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({...notif, read: true})));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <SafeAreaView style={styles.container}>
      
      <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
      ></TouchableOpacity>
            <View style={styles.header1}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.headerTitle1}>Notification</Text>
            </View>

      {/* Header */}
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

      {/* Notification count */}
      <View style={styles.countContainer}>
        <Text style={styles.countText}>
          You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
        </Text>
      </View>

      {/* Notifications list */}
      <ScrollView style={styles.notificationsList}>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <View 
              key={notification.id} 
              style={[
                styles.notificationItem, 
                !notification.read && styles.unreadNotification
              ]}
            >
              <View style={styles.notificationContent}>
                <View style={styles.notificationHeader}>
                  <Text 
                    style={[
                      styles.notificationTitle,
                      !notification.read && styles.unreadTitle
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
                <TouchableOpacity 
                  onPress={() => removeNotification(notification.id)}
                  style={styles.actionButton}
                >
                  <Ionicons name="close" size={18} color="#6b7280" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="chevron-forward" size={18} color="#6b7280" />
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No notifications</Text>
          </View>
        )}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View all notifications</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backButton: {
    marginTop: 40,
    marginBottom: 20,
  },
  header1: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingTop: 30,
    backgroundColor: '#E8F8E8',
    marginTop: 0,
  },
  header: {
    backgroundColor: '#F8A895',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle1: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: 15,
  },
  headerTitle: {
    marginLeft: 8,
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
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
    alignItems: 'flex-start',
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
  footer: {
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  viewAllText: {
    fontSize: 14,
    color: '#2563eb',
  },
});

export default Notification;