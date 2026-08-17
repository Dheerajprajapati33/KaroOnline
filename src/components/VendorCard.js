import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export default function VendorCard({ item, selectedView, onOpenDelivery }) {
  const { width } = useWindowDimensions();

  // Dynamic layout calculations for responsiveness
  const cardWidth = width > 768 ? 168 : width * 0.44;

  return (
    <TouchableOpacity 
      style={[styles.cardContainer, { width: cardWidth }]} 
      activeOpacity={0.85}
      onPress={() => {
        if (item.id === '1' && onOpenDelivery) {
          onOpenDelivery();
        }
      }}
    >
      {/* Top Section (Image or Cream background with emoji/image) */}
      <View style={styles.topSection}>
        {item.isImageBased ? (
          <Image source={{ uri: item.imageUrl }} style={styles.cardImage} resizeMode="cover" />
        ) : (
          <View style={styles.iconBackground}>
            {selectedView === 'content' && item.iconUrl ? (
              <Image source={{ uri: item.iconUrl }} style={styles.cartoonIcon} resizeMode="contain" />
            ) : (
              <Text style={styles.emojiIcon}>{item.emoji}</Text>
            )}
          </View>
        )}
      </View>

      {/* Bottom Section (Info) */}
      <View style={styles.bottomSection}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <View style={styles.linkContainer}>
          <Text style={styles.linkText}>{item.subtitle}</Text>
          <Ionicons name="chevron-forward" size={10} color={colors.primary} style={styles.chevron} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    height: 168,
    backgroundColor: '#FFFFFF', // Unified white card container background
    borderRadius: 24,
    marginRight: 12,
    borderWidth: 1.2,
    borderColor: '#EBEBEB',
    overflow: 'hidden',
    // Subtle shadow matching original site
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 6,
  },
  topSection: {
    width: '100%',
    height: 104, // Exact top container height
    backgroundColor: '#FFF8F2', // Default peach/cream background for icon top sections
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  iconBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojiIcon: {
    fontSize: 32, // Perfect graphic icon representation matching screenshots
  },
  cartoonIcon: {
    width: 44,
    height: 44,
  },
  bottomSection: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textDark,
    lineHeight: 16,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  linkText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
  chevron: {
    marginLeft: 2,
    marginTop: 1,
  },
});
