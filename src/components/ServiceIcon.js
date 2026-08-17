import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { RIBBON_SERVICES } from '../constants/data';
import { LinearGradient } from 'expo-linear-gradient';

export default function ServiceIcon({ selectedView, onOpenCategories, onOpenRefer, hideCategories }) {
  const isContent = selectedView === 'content';

  return (
    <View style={isContent ? styles.inlineContainer : styles.floatingContainer}>
      {/* Left side: Floating Services Ribbon bar - Hidden when hideCategories is true */}
      {!hideCategories && (
        <View style={[styles.ribbonBar, isContent && styles.transparentRibbon]}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
          >
            {RIBBON_SERVICES.map((service) => {
              const isHighlighted = service.isHighlighted;
              const isChevron = service.isChevron;

              return (
                <TouchableOpacity 
                  key={service.id} 
                  style={styles.serviceItem} 
                  activeOpacity={0.7}
                  onPress={() => {
                    if (isChevron && onOpenCategories) {
                      onOpenCategories(); // Triggers categories slide-up modal when clicking More
                    }
                  }}
                >
                  <View 
                    style={[
                      styles.iconCircle, 
                      { borderColor: isHighlighted ? colors.primary : '#E2E8F0' },
                      isHighlighted && styles.highlightedCircle
                    ]}
                  >
                    {isChevron ? (
                      <Ionicons name={service.iconName} size={16} color={colors.textDark} />
                    ) : (
                      isContent && service.iconUrl ? (
                        <Image source={{ uri: service.iconUrl }} style={styles.iconImage} />
                      ) : (
                        <Text style={styles.emojiText}>{service.emoji}</Text>
                      )
                    )}
                  </View>
                  <Text 
                    style={[
                      styles.serviceLabel, 
                      isContent ? styles.mapLabel : (isHighlighted ? styles.highlightedLabel : styles.normalLabel)
                    ]} 
                    numberOfLines={2}
                  >
                    {service.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}

      {/* Right side: Renders only in standard Map View. (In Content View it floats independently on HomeScreen) */}
      {!isContent && (
        <TouchableOpacity 
          style={styles.referEarnFloating} 
          activeOpacity={0.9}
          onPress={onOpenRefer}
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
    </View>
  );
}

const styles = StyleSheet.create({
  floatingContainer: {
    position: 'absolute',
    bottom: 88, // Placed exactly above the 84px bottom navigation bar (with a 4px gap)
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    width: '100%',
    zIndex: 110, // Renders in front of bottom bar
    height: 72, // Fixed height to keep child alignment consistent when ribbon is hidden
  },
  inlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
  },
  ribbonBar: {
    flex: 1,
    height: 72,
    backgroundColor: '#FFFFFF',
    borderRadius: 36, // Highly rounded pill container matching screenshots
    borderWidth: 1.2,
    borderColor: '#EBEBEB',
    paddingVertical: 6,
    marginRight: 10,
    // Soft shadow matching screenshots
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  transparentRibbon: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    marginRight: 0,
    elevation: 0,
    shadowOpacity: 0,
    height: 68,
  },
  scrollContainer: {
    paddingLeft: 12,
    paddingRight: 12,
    alignItems: 'center',
  },
  serviceItem: {
    width: 60,
    alignItems: 'center',
    marginHorizontal: 4,
    justifyContent: 'center',
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  highlightedCircle: {
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: '#FFF8F2',
  },
  emojiText: {
    fontSize: 18,
  },
  iconImage: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  serviceLabel: {
    marginTop: 4,
    fontSize: 8,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 10,
    height: 20, // Ensure fixed height for alignment
    paddingHorizontal: 2,
  },
  normalLabel: {
    color: '#64748B',
  },
  mapLabel: {
    color: '#1E293B', // Solid slate dark color for readability on the map image
  },
  highlightedLabel: {
    color: colors.primary, // Highlighted text color matching screenshot
  },
  referEarnFloating: {
    position: 'absolute',
    right: 16,
    top: 12, // Centered alignment inside the 72px floatingContainer
    shadowColor: '#F4511E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  gradientPill: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48, // Compact matching floating layout
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
