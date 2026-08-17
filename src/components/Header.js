import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export default function Header({ onOpenLocation }) {
  return (
    <View style={styles.container}>
      {/* Left side: Profile and Location */}
      <View style={styles.leftSection}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' }}
          style={styles.avatar}
        />
        <View style={styles.locationContainer}>
          <Text style={styles.guestText}>Guest</Text>
          <TouchableOpacity 
            style={styles.locationSelector} 
            activeOpacity={0.7}
            onPress={onOpenLocation}
          >
            <Ionicons name="location-sharp" size={16} color={colors.primary} style={styles.locationIcon} />
            <Text style={styles.locationText} numberOfLines={1}>Rattan Park, West</Text>
            <Ionicons name="chevron-down" size={14} color={colors.textMuted} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Right side: Join Seller Button */}
      <TouchableOpacity style={styles.joinSellerButton} activeOpacity={0.8}>
        <View style={styles.sellerContent}>
          <View style={styles.shopIconContainer}>
            <MaterialCommunityIcons name="storefront-outline" size={20} color={colors.primary} />
          </View>
          <View style={styles.sellerTextContainer}>
            <Text style={styles.joinSellerTitle}>Join Seller</Text>
            <Text style={styles.joinSellerSubtitle}>Start your business</Text>
          </View>
          <Ionicons name="chevron-forward" size={14} color={colors.primary} style={styles.chevronForward} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#FFE0CC',
  },
  locationContainer: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  guestText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textDark,
    lineHeight: 18,
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  locationIcon: {
    marginRight: 2,
  },
  locationText: {
    fontSize: 12,
    color: colors.textMedium,
    fontWeight: '500',
    marginRight: 2,
    maxWidth: 100,
  },
  joinSellerButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FFE0CC',
    borderRadius: 24,
    paddingVertical: 6,
    paddingHorizontal: 10,
    shadowColor: '#FF7A00',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sellerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shopIconContainer: {
    marginRight: 6,
  },
  sellerTextContainer: {
    marginRight: 4,
  },
  joinSellerTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    lineHeight: 14,
  },
  joinSellerSubtitle: {
    fontSize: 9,
    color: colors.textMuted,
    lineHeight: 11,
  },
  chevronForward: {
    marginLeft: 2,
  },
});
