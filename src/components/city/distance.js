import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RADII = [1, 2, 5, 7, 10, 20, 50];

export default function DistanceModal({ visible, onClose, selectedRadius, onChangeRadius }) {
  const { width, height } = useWindowDimensions();

  if (!visible) return null;

  const modalWidth = Math.min(width, 1024);

  return (
    <View style={styles.overlay}>
      {/* Click outside to close */}
      <TouchableOpacity style={styles.dismissArea} activeOpacity={1} onPress={onClose} />

      {/* Search radius Container (zIndex: 95 to tuck behind bottom navigation bar) */}
      <View style={[styles.modalContainer, { maxWidth: modalWidth, height: height * 0.35 }]}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Search radius</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose} activeOpacity={0.7}>
            <Ionicons name="close" size={18} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* 3-Column Distance Options Grid */}
        <View style={styles.content}>
          <View style={styles.grid}>
            {RADII.map((radius) => {
              const isSelected = selectedRadius === radius;

              return (
                <TouchableOpacity 
                  key={radius} 
                  style={[
                    styles.radiusCard, 
                    isSelected ? styles.selectedCard : styles.unselectedCard
                  ]} 
                  activeOpacity={0.8}
                  onPress={() => {
                    if (onChangeRadius) {
                      onChangeRadius(radius); // Updates the parent state
                    }
                    setTimeout(onClose, 200); // Close modal briefly after selection
                  }}
                >
                  <Text style={[styles.radiusNumber, isSelected ? styles.selectedText : styles.unselectedText]}>
                    {radius}
                  </Text>
                  <Text style={styles.radiusUnit}>KM</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dimmed transparent backdrop
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 95, // Behind BottomBar (zIndex: 100) and ServiceIcon (zIndex: 110)
  },
  dismissArea: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32, // Rounded top corners matching screenshots
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
    borderBottomWidth: 1.2,
    borderColor: '#F1F5F9',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  radiusCard: {
    width: '31.3%', // Fits exactly 3 columns with automatic spacing gaps
    marginRight: '2%', // Margin gap
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    paddingVertical: 12,
    marginBottom: 10,
    borderWidth: 1.2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.01,
    shadowRadius: 2,
    elevation: 1,
  },
  unselectedCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E8F0',
  },
  selectedCard: {
    backgroundColor: '#FFFBEB', // Light yellow cream background matching screenshot
    borderColor: '#FF8A00', // Orange selected outline border matching screenshot
    borderWidth: 1.6,
  },
  radiusNumber: {
    fontSize: 18,
    fontWeight: '800',
  },
  unselectedText: {
    color: '#0F172A',
  },
  selectedText: {
    color: '#B45309', // Gold brown selected number color matching screenshot
  },
  radiusUnit: {
    fontSize: 9,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.5,
    marginTop: 2,
  },
});
