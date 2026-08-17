import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, useWindowDimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { SERVICES } from '../constants/data';

const GRID_PADDING = 16;
const GAP = 8;

export default function AllCategories({ selectedView, onSeeAll, onOpenDelivery }) {
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>All Categories</Text>
        <TouchableOpacity style={styles.seeAllButton} onPress={onSeeAll} activeOpacity={0.7}>
          <Text style={styles.seeAllText}>See All</Text>
          <Ionicons name="chevron-forward" size={14} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {SERVICES.map((category) => (
          <TouchableOpacity 
            key={category.id} 
            style={styles.gridItem}
            activeOpacity={0.7}
            onPress={() => {
              if (category.id === '1' && onOpenDelivery) {
                onOpenDelivery();
              }
            }}
          >
            {/* White circle with colored border matching the site */}
            <View style={[styles.iconCircle, { borderColor: category.circleBorder }]}>
              {selectedView === 'content' && category.iconUrl ? (
                <Image source={{ uri: category.iconUrl }} style={styles.iconImage} />
              ) : (
                <Text style={styles.emojiText}>{category.emoji}</Text>
              )}
            </View>
            <Text style={styles.itemLabel} numberOfLines={2}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 14,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: GRID_PADDING,
    marginBottom: 12,
    width: '100%',
  },
  title: {
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: GRID_PADDING,
    justifyContent: 'space-between', // Distributes items evenly in rows
    width: '100%',
  },
  gridItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24, // Very rounded corners matching the screenshot
    borderWidth: 1.2,
    borderColor: '#E8EBF0',
    paddingVertical: 14,
    paddingHorizontal: 4,
    alignItems: 'center',
    marginBottom: GAP,
    width: '23.8%', // Fits 4 items per row exactly with automatic gap spacing on all viewports
    height: 104, // Proportional height for text and icon container
    // Subtle shadow matching original site
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFFFFF', // Clean white background inside the circle
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2, // Explicit border width
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  emojiText: {
    fontSize: 22,
  },
  iconImage: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },
  itemLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#334155', // Slate-700 color matching original site label
    textAlign: 'center',
    lineHeight: 12,
    paddingHorizontal: 2,
  },
});
