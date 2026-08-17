import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, useWindowDimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { RIBBON_SERVICES } from '../constants/data';

const GRID_PADDING = 16;
const GAP = 10;

export default function CategoriesModal({ visible, onClose, selectedView }) {
  const { width, height } = useWindowDimensions();
  const [activeTab, setActiveTab] = useState('tape');

  if (!visible) return null;

  // Dynamic layout width inside modal (capping at screen width)
  const modalWidth = Math.min(width, 1024);
  
  // Calculate item width for a 3-column grid inside the modal
  const itemWidth = (modalWidth - (GRID_PADDING * 2) - (GAP * 2)) / 3;

  return (
    <View style={styles.overlay}>
      {/* Click outside to close */}
      <TouchableOpacity style={styles.dismissArea} activeOpacity={1} onPress={onClose} />

      {/* Modal Container sliding from bottom (using zIndex: 95 to tuck behind BottomBar/ServiceIcon) */}
      <View style={[styles.modalContainer, { maxWidth: modalWidth, height: height * 0.65 }]}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>All Categories</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose} activeOpacity={0.7}>
            <Ionicons name="close" size={20} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* Subheader Filter Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'tape' && styles.activeTab]} 
            onPress={() => setActiveTab('tape')}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabText, activeTab === 'tape' && styles.activeTabText]}>Tape service</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'products' && styles.activeTab]} 
            onPress={() => setActiveTab('products')}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabText, activeTab === 'products' && styles.activeTabText]}>Products</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'other' && styles.activeTab]} 
            onPress={() => setActiveTab('other')}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabText, activeTab === 'other' && styles.activeTabText]}>Other</Text>
          </TouchableOpacity>
        </View>

        {/* Scrollable Categories Grid */}
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.grid}>
            {RIBBON_SERVICES.filter(s => !s.isChevron).map((category, index) => {
              const isDelivery = category.id === '1'; // Delivery is highlighted orange
              const isLastInRow = (index + 1) % 3 === 0;

              return (
                <TouchableOpacity 
                  key={category.id} 
                  style={[
                    styles.gridItem, 
                    { 
                      width: itemWidth,
                      marginRight: isLastInRow ? 0 : GAP,
                      borderColor: isDelivery ? colors.primary : '#E8EBF0',
                      borderWidth: isDelivery ? 1.6 : 1.2,
                    }
                  ]}
                  activeOpacity={0.7}
                >
                  {/* Circle icon container */}
                  <View style={[styles.iconCircle, { borderColor: isDelivery ? '#FFE6D5' : '#E2E8F0' }]}>
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
              );
            })}
          </View>

          {/* Padding spacer to prevent the floating bottom elements from blocking category items */}
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dimmed transparent background
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 95, // Placed behind BottomBar (zIndex: 100) and ServiceIcon (zIndex: 110)
  },
  dismissArea: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32, // Rounded top corners matching the screenshot
    borderTopRightRadius: 32,
    paddingTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0A2540',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9', // Subtle circular background close icon
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 24,
    padding: 4,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: GRID_PADDING,
    paddingBottom: 40,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  gridItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24, // Matches categories border style
    paddingVertical: 14,
    paddingHorizontal: 4,
    alignItems: 'center',
    marginBottom: GAP,
    height: 104, // Proportional squarish height
    // Subtle shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    marginBottom: 8,
  },
  emojiText: {
    fontSize: 20,
  },
  iconImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  itemLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#334155',
    textAlign: 'center',
    lineHeight: 12,
    paddingHorizontal: 2,
  },
  bottomSpacer: {
    height: 160, // Clear the floating ribbon (height 72 + bottom 88) when scrolled completely
  },
});
