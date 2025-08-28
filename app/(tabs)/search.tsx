import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, MapPin, Clock, Filter, Star } from 'lucide-react-native';

interface SearchResult {
  id: string;
  name: string;
  address: string;
  type: 'landmark' | 'street' | 'suburb';
  distance?: string;
  rating?: number;
}

const recentSearches = [
  'Sydney CBD',
  'Circular Quay',
  'North Strathfield Station',
  'Parramatta Westfield'
];

const popularLocations: SearchResult[] = [
  {
    id: '1',
    name: 'Sydney Opera House',
    address: 'Bennelong Point, Sydney NSW',
    type: 'landmark',
    distance: '2.3km',
    rating: 4.8
  },
  {
    id: '2',
    name: 'Darling Harbour',
    address: 'Darling Harbour, Sydney NSW',
    type: 'landmark',
    distance: '1.8km',
    rating: 4.6
  },
  {
    id: '3',
    name: 'North Strathfield',
    address: 'North Strathfield NSW',
    type: 'suburb',
    distance: '12.4km',
    rating: 4.2
  },
  {
    id: '4',
    name: 'Parramatta CBD',
    address: 'Parramatta NSW',
    type: 'suburb',
    distance: '18.7km',
    rating: 4.4
  }
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      setIsSearching(true);
      // Simulate search delay
      setTimeout(() => {
        const filtered = popularLocations.filter(location =>
          location.name.toLowerCase().includes(query.toLowerCase()) ||
          location.address.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filtered);
        setIsSearching(false);
      }, 300);
    } else {
      setSearchResults([]);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'landmark': return '🏛️';
      case 'street': return '🛣️';
      case 'suburb': return '🏘️';
      default: return '📍';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Find Parking</Text>
        <Text style={styles.subtitle}>Search for locations in Sydney</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#757575" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for a location..."
            value={searchQuery}
            onChangeText={handleSearch}
            placeholderTextColor="#999999"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <Text style={styles.clearButton}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
        
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#1E88E5" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Results */}
        {searchQuery.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {isSearching ? 'Searching...' : `Results for "${searchQuery}"`}
            </Text>
            {searchResults.map((result) => (
              <TouchableOpacity key={result.id} style={styles.resultCard}>
                <View style={styles.resultIcon}>
                  <Text style={styles.iconText}>{getTypeIcon(result.type)}</Text>
                </View>
                <View style={styles.resultInfo}>
                  <Text style={styles.resultName}>{result.name}</Text>
                  <Text style={styles.resultAddress}>{result.address}</Text>
                  <View style={styles.resultMeta}>
                    <View style={styles.metaItem}>
                      <MapPin size={12} color="#757575" />
                      <Text style={styles.metaText}>{result.distance}</Text>
                    </View>
                    {result.rating && (
                      <View style={styles.metaItem}>
                        <Star size={12} color="#FFB300" />
                        <Text style={styles.metaText}>{result.rating}</Text>
                      </View>
                    )}
                  </View>
                </View>
                <View style={styles.resultAction}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionText}>View</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Recent Searches */}
        {searchQuery.length === 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Searches</Text>
            <View style={styles.chipContainer}>
              {recentSearches.map((search, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.chip}
                  onPress={() => handleSearch(search)}
                >
                  <Clock size={14} color="#757575" />
                  <Text style={styles.chipText}>{search}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Popular Locations */}
        {searchQuery.length === 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Popular Locations</Text>
            {popularLocations.map((location) => (
              <TouchableOpacity key={location.id} style={styles.resultCard}>
                <View style={styles.resultIcon}>
                  <Text style={styles.iconText}>{getTypeIcon(location.type)}</Text>
                </View>
                <View style={styles.resultInfo}>
                  <Text style={styles.resultName}>{location.name}</Text>
                  <Text style={styles.resultAddress}>{location.address}</Text>
                  <View style={styles.resultMeta}>
                    <View style={styles.metaItem}>
                      <MapPin size={12} color="#757575" />
                      <Text style={styles.metaText}>{location.distance}</Text>
                    </View>
                    {location.rating && (
                      <View style={styles.metaItem}>
                        <Star size={12} color="#FFB300" />
                        <Text style={styles.metaText}>{location.rating}</Text>
                      </View>
                    )}
                  </View>
                </View>
                <View style={styles.resultAction}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionText}>View</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Quick Actions */}
        {searchQuery.length === 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionGrid}>
              <TouchableOpacity style={styles.quickAction}>
                <Text style={styles.quickActionIcon}>🏢</Text>
                <Text style={styles.quickActionText}>CBD Parking</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickAction}>
                <Text style={styles.quickActionIcon}>🚉</Text>
                <Text style={styles.quickActionText}>Station Parking</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickAction}>
                <Text style={styles.quickActionIcon}>🏥</Text>
                <Text style={styles.quickActionText}>Hospital Zones</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickAction}>
                <Text style={styles.quickActionIcon}>🛒</Text>
                <Text style={styles.quickActionText}>Shopping Centers</Text>
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
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#212121',
  },
  clearButton: {
    fontSize: 16,
    color: '#757575',
    padding: 4,
  },
  filterButton: {
    padding: 12,
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
  },
  content: {
    flex: 1,
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
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F4FD',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  chipText: {
    fontSize: 14,
    color: '#1E88E5',
    marginLeft: 6,
  },
  resultCard: {
    flexDirection: 'row',
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
  resultIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 18,
  },
  resultInfo: {
    flex: 1,
  },
  resultName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 4,
  },
  resultAddress: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 8,
  },
  resultMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: '#757575',
    marginLeft: 4,
  },
  resultAction: {
    justifyContent: 'center',
  },
  actionButton: {
    backgroundColor: '#1E88E5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  actionText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickAction: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quickActionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212121',
    textAlign: 'center',
  },
});