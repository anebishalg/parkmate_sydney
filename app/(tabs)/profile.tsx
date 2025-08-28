import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Car, CreditCard, MapPin, Clock, Settings, Star, CircleHelp as HelpCircle, Shield, LogOut, Camera, CreditCard as Edit } from 'lucide-react-native';

interface UserStats {
  totalParking: number;
  finesSaved: number;
  moneySpent: number;
  favoriteSpots: number;
}

interface RecentActivity {
  id: string;
  location: string;
  date: string;
  duration: string;
  cost: string;
  type: 'meter' | 'street' | 'council';
}

const mockStats: UserStats = {
  totalParking: 47,
  finesSaved: 3,
  moneySpent: 156.50,
  favoriteSpots: 8
};

const mockRecentActivity: RecentActivity[] = [
  {
    id: '1',
    location: 'George Street, CBD',
    date: 'Today, 2:30 PM',
    duration: '2h 15m',
    cost: '$9.00',
    type: 'meter'
  },
  {
    id: '2',
    location: 'Kent Street, CBD',
    date: 'Yesterday, 10:15 AM',
    duration: '45m',
    cost: '$3.60',
    type: 'street'
  },
  {
    id: '3',
    location: 'Town Hall Square',
    date: 'Nov 15, 4:20 PM',
    duration: '3h 30m',
    cost: '$21.00',
    type: 'council'
  }
];

export default function ProfileScreen() {
  const [userStats] = useState(mockStats);
  const [recentActivity] = useState(mockRecentActivity);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'meter': return '🅿️';
      case 'street': return '🛣️';
      case 'council': return '🏛️';
      default: return '📍';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <User size={32} color="#FFFFFF" />
            </View>
            <TouchableOpacity style={styles.cameraButton}>
              <Camera size={16} color="#1E88E5" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Sarah Johnson</Text>
            <Text style={styles.profileEmail}>sarah.j@email.com</Text>
            <Text style={styles.memberSince}>ParkMate member since Oct 2024</Text>
          </View>

          <TouchableOpacity style={styles.editProfile}>
            <Edit size={20} color="#1E88E5" />
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{userStats.totalParking}</Text>
              <Text style={styles.statLabel}>Parking Sessions</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{userStats.finesSaved}</Text>
              <Text style={styles.statLabel}>Fines Avoided</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>${userStats.moneySpent.toFixed(0)}</Text>
              <Text style={styles.statLabel}>Total Spent</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{userStats.favoriteSpots}</Text>
              <Text style={styles.statLabel}>Saved Spots</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickAction}>
              <View style={styles.quickActionIcon}>
                <Car size={20} color="#1E88E5" />
              </View>
              <Text style={styles.quickActionText}>My Vehicle</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickAction}>
              <View style={styles.quickActionIcon}>
                <CreditCard size={20} color="#1E88E5" />
              </View>
              <Text style={styles.quickActionText}>Payment</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickAction}>
              <View style={styles.quickActionIcon}>
                <Star size={20} color="#1E88E5" />
              </View>
              <Text style={styles.quickActionText}>Favorites</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickAction}>
              <View style={styles.quickActionIcon}>
                <Clock size={20} color="#1E88E5" />
              </View>
              <Text style={styles.quickActionText}>History</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {recentActivity.map((activity) => (
            <TouchableOpacity key={activity.id} style={styles.activityCard}>
              <View style={styles.activityIcon}>
                <Text style={styles.activityEmoji}>{getActivityIcon(activity.type)}</Text>
              </View>
              
              <View style={styles.activityInfo}>
                <Text style={styles.activityLocation}>{activity.location}</Text>
                <Text style={styles.activityDate}>{activity.date}</Text>
                <View style={styles.activityDetails}>
                  <Text style={styles.activityDetail}>{activity.duration}</Text>
                  <Text style={styles.activityCost}>{activity.cost}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
          
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All Activity</Text>
          </TouchableOpacity>
        </View>

        {/* Settings Menu */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <Settings size={20} color="#757575" />
            <Text style={styles.menuText}>App Settings</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Shield size={20} color="#757575" />
            <Text style={styles.menuText}>Privacy & Security</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <HelpCircle size={20} color="#757575" />
            <Text style={styles.menuText}>Help & Support</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Account Actions */}
        <View style={styles.section}>
          <TouchableOpacity style={[styles.menuItem, styles.logoutItem]}>
            <LogOut size={20} color="#F44336" />
            <Text style={[styles.menuText, styles.logoutText]}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>ParkMate Sydney v1.0.0</Text>
          <Text style={styles.appInfoText}>Made with ❤️ for Sydney drivers</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#1E88E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 14,
    color: '#9E9E9E',
  },
  editProfile: {
    padding: 8,
  },
  statsContainer: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    paddingVertical: 8,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E88E5',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
  },
  section: {
    margin: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickAction: {
    flex: 1,
    minWidth: '22%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quickActionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#212121',
    textAlign: 'center',
  },
  activityCard: {
    flexDirection: 'row',
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
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityEmoji: {
    fontSize: 18,
  },
  activityInfo: {
    flex: 1,
  },
  activityLocation: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212121',
    marginBottom: 4,
  },
  activityDate: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 8,
  },
  activityDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activityDetail: {
    fontSize: 14,
    color: '#757575',
  },
  activityCost: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E88E5',
  },
  viewAllButton: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  viewAllText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E88E5',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#212121',
    marginLeft: 12,
  },
  menuArrow: {
    fontSize: 20,
    color: '#BDBDBD',
  },
  logoutItem: {
    borderColor: '#FFEBEE',
    borderWidth: 1,
  },
  logoutText: {
    color: '#F44336',
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  appInfoText: {
    fontSize: 14,
    color: '#9E9E9E',
    textAlign: 'center',
    lineHeight: 20,
  },
});