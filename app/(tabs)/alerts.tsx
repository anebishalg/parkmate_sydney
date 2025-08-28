import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, TriangleAlert as AlertTriangle, Clock, MapPin, Settings, Car } from 'lucide-react-native';

interface Alert {
  id: string;
  type: 'warning' | 'info' | 'error';
  title: string;
  message: string;
  location: string;
  time: string;
  isRead: boolean;
}

interface AlertSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  icon: string;
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'warning',
    title: 'T-Section Rule Alert',
    message: '10m rule applies - check for nearby driveways',
    location: 'George St & Martin Pl',
    time: '2 mins ago',
    isRead: false
  },
  {
    id: '2',
    type: 'error',
    title: 'School Zone Active',
    message: 'No parking 8-9:30am & 2:30-4pm on school days',
    location: 'North Strathfield Public School',
    time: '15 mins ago',
    isRead: false
  },
  {
    id: '3',
    type: 'info',
    title: 'Meter Expiring Soon',
    message: 'Your parking expires in 10 minutes',
    location: 'Kent St (Zone 3B)',
    time: '1 hour ago',
    isRead: true
  },
  {
    id: '4',
    type: 'warning',
    title: 'Construction Zone',
    message: 'Temporary no parking - roadworks until 5pm',
    location: 'Pitt St (near QVB)',
    time: '2 hours ago',
    isRead: true
  }
];

const alertSettings: AlertSetting[] = [
  {
    id: '1',
    title: 'T-Section Warnings',
    description: 'Get alerts about 10m rule near T-sections',
    enabled: true,
    icon: '⚠️'
  },
  {
    id: '2',
    title: 'School Zone Alerts',
    description: 'Notify about active school zones',
    enabled: true,
    icon: '🏫'
  },
  {
    id: '3',
    title: 'Meter Expiry',
    description: 'Remind before parking meter expires',
    enabled: true,
    icon: '⏰'
  },
  {
    id: '4',
    title: 'Construction Updates',
    description: 'Alert about temporary parking changes',
    enabled: false,
    icon: '🚧'
  },
  {
    id: '5',
    title: 'Peak Hour Restrictions',
    description: 'Warn about clearway times',
    enabled: true,
    icon: '🕒'
  },
  {
    id: '6',
    title: 'Loading Zone Times',
    description: 'Alert when loading zones become active',
    enabled: false,
    icon: '📦'
  }
];

export default function AlertsScreen() {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [settings, setSettings] = useState(alertSettings);
  const [activeTab, setActiveTab] = useState<'alerts' | 'settings'>('alerts');

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning': return '#FF9800';
      case 'error': return '#F44336';
      case 'info': return '#1E88E5';
      default: return '#757575';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return AlertTriangle;
      case 'error': return AlertTriangle;
      case 'info': return Bell;
      default: return Bell;
    }
  };

  const toggleSetting = (id: string) => {
    setSettings(prev => prev.map(setting => 
      setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
    ));
  };

  const markAsRead = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, isRead: true } : alert
    ));
  };

  const unreadCount = alerts.filter(alert => !alert.isRead).length;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Parking Alerts</Text>
        <Text style={styles.subtitle}>
          {unreadCount > 0 ? `${unreadCount} new alerts` : 'All caught up!'}
        </Text>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'alerts' && styles.activeTab]}
          onPress={() => setActiveTab('alerts')}
        >
          <Bell size={20} color={activeTab === 'alerts' ? '#1E88E5' : '#757575'} />
          <Text style={[styles.tabText, activeTab === 'alerts' && styles.activeTabText]}>
            Alerts
          </Text>
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'settings' && styles.activeTab]}
          onPress={() => setActiveTab('settings')}
        >
          <Settings size={20} color={activeTab === 'settings' ? '#1E88E5' : '#757575'} />
          <Text style={[styles.tabText, activeTab === 'settings' && styles.activeTabText]}>
            Settings
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'alerts' ? (
          /* Alerts Tab */
          <View style={styles.alertsContainer}>
            {alerts.length === 0 ? (
              <View style={styles.emptyState}>
                <Bell size={48} color="#E0E0E0" />
                <Text style={styles.emptyTitle}>No alerts yet</Text>
                <Text style={styles.emptyText}>
                  You'll receive notifications about parking rules and restrictions here
                </Text>
              </View>
            ) : (
              alerts.map((alert) => {
                const IconComponent = getAlertIcon(alert.type);
                return (
                  <TouchableOpacity
                    key={alert.id}
                    style={[styles.alertCard, !alert.isRead && styles.unreadAlert]}
                    onPress={() => markAsRead(alert.id)}
                  >
                    <View style={styles.alertHeader}>
                      <View style={[styles.alertIcon, { backgroundColor: `${getAlertColor(alert.type)}20` }]}>
                        <IconComponent size={20} color={getAlertColor(alert.type)} />
                      </View>
                      <View style={styles.alertInfo}>
                        <Text style={styles.alertTitle}>{alert.title}</Text>
                        <Text style={styles.alertTime}>{alert.time}</Text>
                      </View>
                      {!alert.isRead && <View style={styles.unreadDot} />}
                    </View>

                    <Text style={styles.alertMessage}>{alert.message}</Text>

                    <View style={styles.alertFooter}>
                      <MapPin size={14} color="#757575" />
                      <Text style={styles.alertLocation}>{alert.location}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })
            )}
          </View>
        ) : (
          /* Settings Tab */
          <View style={styles.settingsContainer}>
            <View style={styles.settingsSection}>
              <Text style={styles.sectionTitle}>Alert Types</Text>
              <Text style={styles.sectionDescription}>
                Choose which parking alerts you want to receive
              </Text>

              {settings.map((setting) => (
                <View key={setting.id} style={styles.settingItem}>
                  <View style={styles.settingIcon}>
                    <Text style={styles.settingEmoji}>{setting.icon}</Text>
                  </View>
                  <View style={styles.settingInfo}>
                    <Text style={styles.settingTitle}>{setting.title}</Text>
                    <Text style={styles.settingDescription}>{setting.description}</Text>
                  </View>
                  <Switch
                    value={setting.enabled}
                    onValueChange={() => toggleSetting(setting.id)}
                    trackColor={{ false: '#E0E0E0', true: '#90CAF9' }}
                    thumbColor={setting.enabled ? '#1E88E5' : '#F5F5F5'}
                  />
                </View>
              ))}
            </View>

            <View style={styles.settingsSection}>
              <Text style={styles.sectionTitle}>Notification Timing</Text>
              
              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingIcon}>
                  <Clock size={20} color="#1E88E5" />
                </View>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>Meter Reminder</Text>
                  <Text style={styles.settingDescription}>Notify 10 minutes before expiry</Text>
                </View>
                <Text style={styles.settingValue}>10 min</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingIcon}>
                  <Car size={20} color="#1E88E5" />
                </View>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>Approach Distance</Text>
                  <Text style={styles.settingDescription}>Alert when within this distance</Text>
                </View>
                <Text style={styles.settingValue}>100m</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.settingsSection}>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Test Notifications</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
                <Text style={[styles.actionButtonText, styles.secondaryButtonText]}>
                  Reset to Defaults
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: '#E3F2FD',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#757575',
    marginLeft: 8,
  },
  activeTabText: {
    color: '#1E88E5',
  },
  badge: {
    backgroundColor: '#F44336',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  badgeText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  alertsContainer: {
    padding: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#212121',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    paddingHorizontal: 32,
    lineHeight: 22,
  },
  alertCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  unreadAlert: {
    borderLeftWidth: 4,
    borderLeftColor: '#1E88E5',
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  alertIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  alertInfo: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 4,
  },
  alertTime: {
    fontSize: 14,
    color: '#757575',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1E88E5',
  },
  alertMessage: {
    fontSize: 15,
    color: '#424242',
    lineHeight: 20,
    marginBottom: 12,
  },
  alertFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertLocation: {
    fontSize: 14,
    color: '#757575',
    marginLeft: 6,
  },
  settingsContainer: {
    padding: 16,
  },
  settingsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 20,
    lineHeight: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingEmoji: {
    fontSize: 18,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212121',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#757575',
    lineHeight: 18,
  },
  settingValue: {
    fontSize: 14,
    color: '#1E88E5',
    fontWeight: '500',
  },
  actionButton: {
    backgroundColor: '#1E88E5',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  secondaryButtonText: {
    color: '#757575',
  },
});