import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header';
import BannerCarousel from '../components/BannerCarousel';
import PillSelector from '../components/PillSelector';
import VideoCard from '../components/VideoCard';
import VendorCard from '../components/VendorCard';
import AllCategories from '../components/AllCategories';
import ServiceIcon from '../components/ServiceIcon';
import BottomBar from '../components/BottomBar';
import CategoriesModal from '../components/CategoriesModal';
import ContentViewHeader from '../components/ContentView/ContentViewHeader';
import DigitalShopeModal from '../components/digitalShope/digitalShope';
import ReferModal from '../components/Refer/Refer';
import ChooseLocationModal from '../components/search/ChooseLocationModal';
import CityModal from '../components/city/city';
import DistanceModal from '../components/city/distance';
import { RECOMMENDED_VIDEOS, RECOMMENDED_VENDORS } from '../constants/data';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  // Default is 'map' to match the previous standard dashboard layout on initial render
  const [selectedView, setSelectedView] = useState('map'); 
  const [categoriesModalVisible, setCategoriesModalVisible] = useState(false);
  const [quickMenuVisible, setQuickMenuVisible] = useState(false);
  const [referModalVisible, setReferModalVisible] = useState(false);
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [cityModalVisible, setCityModalVisible] = useState(false);
  const [distanceModalVisible, setDistanceModalVisible] = useState(false);
  
  // Shared global state for selected distance radius, default to 2 to match screenshots
  const [selectedRadius, setSelectedRadius] = useState(2);

  // Check if any of the search/location dropdown drawers are open
  const isSearchDrawerOpen = locationModalVisible || cityModalVisible || distanceModalVisible;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {selectedView === 'content' ? (
        /* CONTENT VIEW DESIGN (SPLIT SCREEN LAYOUT) */
        <View style={styles.appContainer}>
          {/* Integrated Split-Map Top Header (contains transparent Services Ribbon) */}
          <ContentViewHeader 
            selectedView={selectedView} 
            onViewChange={setSelectedView} 
            onOpenCategories={() => setCategoriesModalVisible(true)}
            onOpenLocation={() => setLocationModalVisible(true)}
            hideCategories={isSearchDrawerOpen}
          />

          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Recommended Videos Section */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recommended Videos</Text>
                <TouchableOpacity style={styles.seeAllButton}>
                  <Text style={styles.seeAllText}>See All</Text>
                  <Ionicons name="chevron-forward" size={14} color={colors.primary} />
                </TouchableOpacity>
              </View>
              
              <FlatList
                data={RECOMMENDED_VIDEOS}
                renderItem={({ item }) => <VideoCard item={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.horizontalListPadding}
              />
            </View>

            {/* Recommended for you Section */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recommended for you</Text>
                <TouchableOpacity 
                  style={styles.seeAllButton}
                  onPress={() => setCategoriesModalVisible(true)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.seeAllText}>See All</Text>
                  <Ionicons name="chevron-forward" size={14} color={colors.primary} />
                </TouchableOpacity>
              </View>
              
              <FlatList
                data={RECOMMENDED_VENDORS}
                renderItem={({ item }) => <VendorCard item={item} selectedView={selectedView} />}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.horizontalListPadding}
              />
            </View>

            {/* All Categories Grid Section */}
            <AllCategories selectedView={selectedView} onSeeAll={() => setCategoriesModalVisible(true)} />

            {/* Padding spacer to prevent floating bottom elements from blocking last scroll elements */}
            <View style={styles.bottomSpacer} />
          </ScrollView>
        </View>
      ) : (
        /* PREVIOUS STANDARD LAYOUT FOR MAP VIEW MODE */
        <View style={styles.appContainer}>
          {/* Header */}
          <Header onOpenLocation={() => setLocationModalVisible(true)} />

          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Banner Slider */}
            <BannerCarousel />

            {/* Pill Selector (Content / Map switch connecting to global view switcher) */}
            <PillSelector selectedView={selectedView} onViewChange={setSelectedView} />

            {/* Recommended Videos Section */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recommended Videos</Text>
                <TouchableOpacity style={styles.seeAllButton}>
                  <Text style={styles.seeAllText}>See All</Text>
                  <Ionicons name="chevron-forward" size={14} color={colors.primary} />
                </TouchableOpacity>
              </View>
              
              <FlatList
                data={RECOMMENDED_VIDEOS}
                renderItem={({ item }) => <VideoCard item={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.horizontalListPadding}
              />
            </View>

            {/* Recommended for you Section */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recommended for you</Text>
                <TouchableOpacity 
                  style={styles.seeAllButton}
                  onPress={() => setCategoriesModalVisible(true)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.seeAllText}>See All</Text>
                  <Ionicons name="chevron-forward" size={14} color={colors.primary} />
                </TouchableOpacity>
              </View>
              
              <FlatList
                data={RECOMMENDED_VENDORS}
                renderItem={({ item }) => <VendorCard item={item} selectedView={selectedView} />}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.horizontalListPadding}
              />
            </View>

            {/* All Categories Grid Section */}
            <AllCategories selectedView={selectedView} onSeeAll={() => setCategoriesModalVisible(true)} />

            {/* Padding spacer to prevent floating bottom elements from blocking last scroll elements */}
            <View style={styles.bottomSpacer} />
          </ScrollView>
        </View>
      )}

      {/* Categories Details Modal Overlay */}
      <CategoriesModal 
        visible={categoriesModalVisible} 
        onClose={() => setCategoriesModalVisible(false)} 
        selectedView={selectedView}
      />

      {/* Quick Menu Drawer Overlay (tucks behind bottom bar and ribbon overlay) */}
      <DigitalShopeModal 
        visible={quickMenuVisible} 
        onClose={() => setQuickMenuVisible(false)} 
      />

      {/* Refer & Earn Drawer Overlay (tucks behind bottom bar and ribbon overlay) */}
      <ReferModal 
        visible={referModalVisible} 
        onClose={() => setReferModalVisible(false)} 
      />

      {/* Choose Location Drawer Overlay (tucks behind bottom bar and ribbon overlay) */}
      <ChooseLocationModal 
        visible={locationModalVisible} 
        onClose={() => setLocationModalVisible(false)} 
        onOpenCity={() => setCityModalVisible(true)}
        onOpenDistance={() => setDistanceModalVisible(true)}
        selectedRadius={selectedRadius}
      />

      {/* Pick a City Drawer Overlay (tucks behind bottom bar and ribbon overlay) */}
      <CityModal 
        visible={cityModalVisible} 
        onClose={() => setCityModalVisible(false)} 
      />

      {/* Search Radius Drawer Overlay (tucks behind bottom bar and ribbon overlay) */}
      <DistanceModal 
        visible={distanceModalVisible} 
        onClose={() => setDistanceModalVisible(false)} 
        selectedRadius={selectedRadius}
        onChangeRadius={setSelectedRadius}
      />

      {/* Services Ribbon Row - FLOATS PERSISTENTLY ON TOP ONLY IN MAP VIEW */}
      {selectedView === 'map' && !referModalVisible && !quickMenuVisible && (
        <ServiceIcon 
          selectedView={selectedView} 
          onOpenCategories={() => setCategoriesModalVisible(true)} 
          onOpenRefer={() => setReferModalVisible(true)}
          hideCategories={isSearchDrawerOpen}
        />
      )}

      {/* Standalone Refer & Earn button floating at bottom-right in Content View */}
      {selectedView === 'content' && !referModalVisible && !quickMenuVisible && (
        <TouchableOpacity 
          style={styles.standaloneReferEarn} 
          activeOpacity={0.9}
          onPress={() => setReferModalVisible(true)}
        >
          <LinearGradient
            colors={['#FF9800', '#F4511E']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientPill}
          >
            <Ionicons name="gift" size={16} color="#FFFFFF" style={styles.giftIcon} />
            <Text style={styles.referEarnText}>Refer & Earn</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}

      {/* Persistent Bottom Navigation Bar - FLOATS PERSISTENTLY ON TOP, HIDDEN WHEN REFER OR QUICK MENU DRAWER IS OPEN */}
      {!referModalVisible && !quickMenuVisible && (
        <BottomBar onOpenQuickMenu={() => setQuickMenuVisible(true)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  appContainer: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  sectionContainer: {
    marginVertical: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textDark,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
    marginRight: 2,
  },
  horizontalListPadding: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  bottomSpacer: {
    height: 160,
  },
  standaloneReferEarn: {
    position: 'absolute',
    right: 16,
    bottom: 96, // Floats nicely above the bottom navigation bar
    zIndex: 110,
    shadowColor: '#F4511E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  gradientPill: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    paddingHorizontal: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  giftIcon: {
    marginRight: 4,
  },
  referEarnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
});
