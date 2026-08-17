import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export default function BottomBar({ onOpenQuickMenu }) {
  return (
    <View style={styles.container}>
      <View style={styles.innerBar}>
        {/* Left Side: Floating Box Button */}
        <TouchableOpacity style={styles.leftBoxButton} activeOpacity={0.8}>
          <Ionicons name="cube-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Center: Digital Shope Pill */}
        <TouchableOpacity 
          style={styles.centerPill} 
          activeOpacity={0.85}
          onPress={onOpenQuickMenu}
        >
          <View style={styles.pillLeft}>
            <MaterialCommunityIcons name="storefront" size={20} color="#FFFFFF" style={styles.shopIcon} />
            <View style={styles.pillTextContainer}>
              <Text style={styles.pillTitle} numberOfLines={1}>Digital shope..</Text>
              <Text style={styles.pillSubtitle} numberOfLines={1}>Digital shop | Vander panai | Referral</Text>
            </View>
          </View>
          <Ionicons name="chevron-down" size={16} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Right Side: Microphone Button */}
        <TouchableOpacity style={styles.rightMicButton} activeOpacity={0.8}>
          <Ionicons name="mic-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    width: '100%',
    zIndex: 100,
    elevation: 10,
  },
  innerBar: {
    backgroundColor: colors.primary,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24, // extra padding for safe area bottom space
    height: 84,
    width: '100%',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 10,
    borderLeftWidth: 1.2,
    borderRightWidth: 1.2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  leftBoxButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  centerPill: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    marginHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  pillLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 6,
  },
  shopIcon: {
    marginRight: 8,
  },
  pillTextContainer: {
    flex: 1,
  },
  pillTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  pillSubtitle: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 9,
    marginTop: 1,
  },
  rightMicButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
});
