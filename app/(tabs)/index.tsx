import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Clock, DollarSign, TriangleAlert as AlertTriangle, Navigation } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

interface ParkingSpot {
  id: string;
  name: string;
  address: string;
  distance: string;
  price: string;
  timeLimit: string;
  availability: 'available' | 'limited' | 'full';
  type: 'street' | 'meter' | 'council';
  restrictions?: string[];
}

const mockParkingSpots: ParkingSpot[] = [
  {
    id: '1',
    name: 'George Street',
    address: '123 George St, Sydney CBD',
    distance: '0.2km',
    price: '$4.50/hr',
    timeLimit: '2hrs',
    availability: 'available',
    type: 'meter',
    restrictions: ['No parking 3-6pm']
  },
  {
    id: '2',
    name: 'Kent Street',
    address: '456 Kent St, Sydney CBD',
    distance: '0.4km',
    price: '$3.20/hr',
    timeLimit: '1hr',
    availability: 'limited',
    type: 'street',
    restrictions: ['School zone 8-9am, 3-4pm']
  },
  {
    id: '3',
    name: 'Town Hall Square',
    address: 'Town Hall Square, Sydney CBD',
    distance: '0.6km',
    price: '$6.00/hr',
    timeLimit: '4hrs',
    availability: 'full',
    type: 'council'
  }
];

export default function MapScreen() {
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return '#4CAF50';
      case 'limited': return '#FF9800';
      case 'full': return '#F44336';
      default: return '#757575';
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'available': return 'Available';
      case 'limited': return 'Limited';
      case 'full': return 'Full';
      default: return 'Unknown';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>ParkMate Sydney</Text>
        <Text style={styles.subtitle}>Find smart parking near you</Text>
      </View>

      {/* Map Placeholder */}
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <MapPin size={40} color="#1E88E5" />
          <Text style={styles.mapText}>Interactive Map</Text>
          <Text style={styles.mapSubtext}>Showing parking spots in CBD</Text>
          
          {/* Mock map pins */}
          <View style={[styles.mapPin, { top: 60, left: 120 }]}>
            <View style={[styles.pin, { backgroundColor: '#4CAF50' }]} />
          </View>
          <View style={[styles.mapPin, { top: 100, left: 200 }]}>
            <View style={[styles.pin, { backgroundColor: '#FF9800' }]} />
          </View>
          <View style={[styles.mapPin, { top: 140, left: 160 }]}>
            <View style={[styles.pin, { backgroundColor: '#F44336' }]} />
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Available</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Limited</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Full</Text>
          </View>
        </View>
      </View>

      {/* Nearby Spots */}
      <View style={styles.spotsContainer}>
        <Text style={styles.sectionTitle}>Nearby Parking Spots</Text>
        
        <ScrollView style={styles.spotsList} showsVerticalScrollIndicator={false}>
          {mockParkingSpots.map((spot) => (
            <TouchableOpacity
              key={spot.id}
              style={styles.spotCard}
              onPress={() => setSelectedSpot(spot)}
            >
              <View style={styles.spotHeader}>
                <View style={styles.spotInfo}>
                  <Text style={styles.spotName}>{spot.name}</Text>
                  <Text style={styles.spotAddress}>{spot.address}</Text>
                </View>
                <View style={[
                  styles.availabilityBadge, 
                  { backgroundColor: getAvailabilityColor(spot.availability) }
                ]}>
                  <Text style={styles.availabilityText}>
                    {getAvailabilityText(spot.availability)}
                  </Text>
                </View>
              </View>

              <View style={styles.spotDetails}>
                <View style={styles.detailItem}>
                  <Navigation size={16} color="#757575" />
                  <Text style={styles.detailText}>{spot.distance}</Text>
                </View>
                <View style={styles.detailItem}>
                  <DollarSign size={16} color="#757575" />
                  <Text style={styles.detailText}>{spot.price}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Clock size={16} color="#757575" />
                  <Text style={styles.detailText}>{spot.timeLimit}</Text>
                </View>
              </View>

              {spot.restrictions && spot.restrictions.length > 0 && (
                <View style={styles.restrictionsContainer}>
                  <AlertTriangle size={14} color="#FF9800" />
                  <Text style={styles.restrictionsText}>
                    {spot.restrictions[0]}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
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
    color: '#1E88E5',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
  },
  mapContainer: {
    height: height * 0.35,
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8F4FD',
    position: 'relative',
  },
  mapText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E88E5',
    marginTop: 8,
  },
  mapSubtext: {
    fontSize: 14,
    color: '#757575',
    marginTop: 4,
  },
  mapPin: {
    position: 'absolute',
  },
  pin: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E88E5',
  },
  statLabel: {
    fontSize: 12,
    color: '#757575',
    marginTop: 4,
  },
  spotsContainer: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 16,
  },
  spotsList: {
    flex: 1,
  },
  spotCard: {
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
  spotHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  spotInfo: {
    flex: 1,
  },
  spotName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 4,
  },
  spotAddress: {
    fontSize: 14,
    color: '#757575',
  },
  availabilityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  availabilityText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  spotDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  detailText: {
    fontSize: 14,
    color: '#757575',
    marginLeft: 6,
  },
  restrictionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    padding: 8,
    borderRadius: 6,
    marginTop: 8,
  },
  restrictionsText: {
    fontSize: 12,
    color: '#E65100',
    marginLeft: 6,
    flex: 1,
  },
});