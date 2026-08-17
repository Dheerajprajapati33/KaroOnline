import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import ServiceIcon from '../ServiceIcon';

export default function ContentViewHeader({ selectedView, onViewChange, onOpenCategories, onOpenLocation, hideCategories }) {
  const { width } = useWindowDimensions();

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=800&q=80' }}
      style={[styles.mapBackground, { width: '100%' }]}
      resizeMode="cover"
    >
      {/* Dark overlay for readability */}
      <View style={styles.darkOverlay} />

      {/* Top Controls Row */}
      <View style={styles.topRow}>
        {/* Left Status Indicators */}
        <View style={styles.leftStatus}>
          <View style={styles.pillsRow}>
            <View style={[styles.statusPill, styles.onlinePill]}>
              <View style={[styles.dot, { backgroundColor: '#10B981' }]} />
              <Text style={styles.pillText}>0 online</Text>
            </View>
            <View style={[styles.statusPill, styles.offlinePill]}>
              <View style={[styles.dot, { backgroundColor: '#EF4444' }]} />
              <Text style={styles.pillText}>0 offline</Text>
            </View>
          </View>
          <View style={styles.radiusPill}>
            <Text style={styles.radiusText}>1km radius</Text>
          </View>
        </View>

        {/* Right Location Picker Dropdown */}
        <TouchableOpacity 
          style={styles.locationDropdown} 
          activeOpacity={0.8}
          onPress={onOpenLocation}
        >
          <Ionicons name="location" size={14} color="#FF7A00" style={styles.locationIcon} />
          <Text style={styles.locationText} numberOfLines={1}>Rattan Park</Text>
          <Ionicons name="chevron-down" size={14} color="#64748B" />
        </TouchableOpacity>
      </View>

      {/* Center Pinned Avatar */}
      <View style={styles.avatarPinContainer}>
        {/* Businessman avatar photo with orange border & map pin style */}
        <View style={styles.avatarOutline}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' }}
            style={styles.avatarImage}
          />
        </View>
        
        {/* Pinned label bubble */}
        <View style={styles.speechBubble}>
          <Text style={styles.speechText}>📍 Rattan Park</Text>
        </View>
      </View>

      {/* Floating Chat/Support Icon */}
      <TouchableOpacity style={styles.floatingChatIcon} activeOpacity={0.8}>
        <Ionicons name="chatbox-ellipses-outline" size={18} color="#5C6066" />
      </TouchableOpacity>

      {/* Center Bottom View Selector Switch and Services Ribbon */}
      <View style={styles.bottomControlsContainer}>
        <View style={styles.switchContainer}>
          <View style={styles.switchWrapper}>
            <TouchableOpacity
              style={[
                styles.switchButton,
                selectedView === 'content' ? styles.activeSwitch : styles.inactiveSwitch
              ]}
              onPress={() => onViewChange('content')}
              activeOpacity={0.8}
            >
              <Ionicons 
                name="grid" 
                size={13} 
                color={selectedView === 'content' ? '#FFFFFF' : '#64748B'} 
                style={styles.switchIcon}
              />
              <Text style={[styles.switchText, selectedView === 'content' ? styles.activeText : styles.inactiveText]}>
                Content View
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.switchButton,
                selectedView === 'map' ? styles.activeSwitch : styles.inactiveSwitch
              ]}
              onPress={() => onViewChange('map')}
              activeOpacity={0.8}
            >
              <Ionicons 
                name="map" 
                size={13} 
                color={selectedView === 'map' ? '#FFFFFF' : '#64748B'} 
                style={styles.switchIcon}
              />
              <Text style={[styles.switchText, selectedView === 'map' ? styles.activeText : styles.inactiveText]}>
                Map View
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Services Ribbon rendered inline and transparent inside map area */}
        <ServiceIcon selectedView={selectedView} onOpenCategories={onOpenCategories} hideCategories={hideCategories} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  mapBackground: {
    height: 410, // Increased map height slightly to fit switcher and inline transparent ribbon
    position: 'relative',
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingBottom: 10,
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.05)', // Subtle contrast overlay
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    width: '100%',
    zIndex: 10,
  },
  leftStatus: {
    alignItems: 'flex-start',
  },
  pillsRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginRight: 6,
    borderWidth: 1,
  },
  onlinePill: {
    backgroundColor: 'rgba(240, 253, 244, 0.95)',
    borderColor: '#DCFCE7',
  },
  offlinePill: {
    backgroundColor: 'rgba(254, 242, 242, 0.95)',
    borderColor: '#FEE2E2',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  pillText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#334155',
  },
  radiusPill: {
    backgroundColor: '#FF7A00',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  radiusText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  locationDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    maxWidth: '50%',
  },
  locationIcon: {
    marginRight: 4,
  },
  locationText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    marginRight: 4,
    flex: 1,
  },
  avatarPinContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: '50%',
    top: '32%',
    marginLeft: -45,
    zIndex: 5,
  },
  avatarOutline: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#FF7A00',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF7A00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  avatarImage: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },
  speechBubble: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 14,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#FF7A00',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  speechText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#0F172A',
  },
  floatingChatIcon: {
    position: 'absolute',
    right: 16,
    top: '60%',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#EBEBEB',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    zIndex: 10,
  },
  bottomControlsContainer: {
    width: '100%',
    alignItems: 'center',
    zIndex: 10,
  },
  switchContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 8,
  },
  switchWrapper: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    padding: 4,
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  switchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  activeSwitch: {
    backgroundColor: '#FF7A00',
  },
  inactiveSwitch: {
    backgroundColor: 'transparent',
  },
  switchIcon: {
    marginRight: 6,
  },
  switchText: {
    fontSize: 11,
    fontWeight: '800',
  },
  activeText: {
    color: '#FFFFFF',
  },
  inactiveText: {
    color: '#5C6066',
  },
});
