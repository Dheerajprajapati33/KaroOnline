import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export default function PillSelector({ selectedView, onViewChange }) {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        {/* Content option */}
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedView === 'content' ? styles.activeTab : styles.inactiveTab,
          ]}
          onPress={() => onViewChange('content')}
          activeOpacity={0.8}
        >
          <Ionicons
            name="grid-outline"
            size={14}
            color={selectedView === 'content' ? '#FFFFFF' : '#7E8A9A'}
            style={styles.icon}
          />
          <Text
            style={[
              styles.tabText,
              selectedView === 'content' ? styles.activeText : styles.inactiveText,
            ]}
          >
            Content
          </Text>
        </TouchableOpacity>

        {/* Map option */}
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedView === 'map' ? styles.activeTab : styles.inactiveTab,
          ]}
          onPress={() => onViewChange('map')}
          activeOpacity={0.8}
        >
          <Ionicons
            name="map-outline"
            size={14}
            color={selectedView === 'map' ? '#FFFFFF' : '#7E8A9A'}
            style={styles.icon}
          />
          <Text
            style={[
              styles.tabText,
              selectedView === 'map' ? styles.activeText : styles.inactiveText,
            ]}
          >
            Map
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    marginVertical: 6,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#EEF2F6',
    borderRadius: 20,
    padding: 3,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 17,
  },
  activeTab: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  inactiveTab: {
    backgroundColor: 'transparent',
  },
  icon: {
    marginRight: 4,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
  },
  activeText: {
    color: '#FFFFFF',
  },
  inactiveText: {
    color: '#7E8A9A',
  },
});
