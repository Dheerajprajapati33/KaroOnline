import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CITIES = [
  { id: '1', city: 'Delhi', state: 'Delhi' },
  { id: '2', city: 'Mumbai', state: 'Maharashtra' },
  { id: '3', city: 'Bengaluru', state: 'Karnataka' },
  { id: '4', city: 'Hyderabad', state: 'Telangana' },
  { id: '5', city: 'Chennai', state: 'Tamil Nadu' },
  { id: '6', city: 'Kolkata', state: 'West Bengal' },
  { id: '7', city: 'Pune', state: 'Maharashtra' },
  { id: '8', city: 'Ahmedabad', state: 'Gujarat' },
  { id: '9', city: 'Jaipur', state: 'Rajasthan' },
  { id: '10', city: 'Lucknow', state: 'Uttar Pradesh' },
  { id: '11', city: 'Chandigarh', state: 'Chandigarh' },
  { id: '12', city: 'Surat', state: 'Gujarat' },
  { id: '13', city: 'Kanpur', state: 'Uttar Pradesh' },
  { id: '14', city: 'Nagpur', state: 'Maharashtra' },
  { id: '15', city: 'Indore', state: 'Madhya Pradesh' },
  { id: '16', city: 'Bhopal', state: 'Madhya Pradesh' },
  { id: '17', city: 'Patna', state: 'Bihar' },
  { id: '18', city: 'Kochi', state: 'Kerala' },
  { id: '19', city: 'Goa', state: 'Goa' },
  { id: '20', city: 'Guwahati', state: 'Assam' },
  { id: '21', city: 'Ranchi', state: 'Jharkhand' },
  { id: '22', city: 'Visakhapatnam', state: 'Andhra Pradesh' },
  { id: '23', city: 'Coimbatore', state: 'Tamil Nadu' }
];

export default function CityModal({ visible, onClose }) {
  const { width, height } = useWindowDimensions();

  if (!visible) return null;

  const modalWidth = Math.min(width, 1024);

  return (
    <View style={styles.overlay}>
      {/* Click outside to close */}
      <TouchableOpacity style={styles.dismissArea} activeOpacity={1} onPress={onClose} />

      {/* Pick a City Container (zIndex: 95 to tuck behind bottom navigation bar) */}
      <View style={[styles.modalContainer, { maxWidth: modalWidth, height: height * 0.75 }]}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Pick a city</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose} activeOpacity={0.7}>
            <Ionicons name="close" size={18} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* Scrollable Cities 2-Column Grid */}
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.grid}>
            {CITIES.map((item) => (
              <TouchableOpacity key={item.id} style={styles.cityCard} activeOpacity={0.8}>
                {/* Left side: building orange circle icon */}
                <View style={styles.iconCircle}>
                  <Ionicons name="business-outline" size={15} color="#FF7A00" />
                </View>
                {/* Right side: City name & State info */}
                <View style={styles.textContainer}>
                  <Text style={styles.cityName} numberOfLines={1}>{item.city}</Text>
                  <Text style={styles.stateName} numberOfLines={1}>{item.state}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Padding spacer to clear floating bottom elements */}
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
    fontSize: 18,
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cityCard: {
    width: '48.5%', // Fits exactly 2 columns with automatic space-between spacing
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.01,
    shadowRadius: 2,
    elevation: 1,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFF5EB', // Orange tint background matching screenshot
    borderWidth: 1,
    borderColor: '#FFE2D1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cityName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  stateName: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 2,
  },
  bottomSpacer: {
    height: 160, // Clear floating bottom bar & services ribbon
  },
});
