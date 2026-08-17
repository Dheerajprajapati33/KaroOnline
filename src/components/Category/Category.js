import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CategoryModal({ visible, onClose }) {
  const { width, height } = useWindowDimensions();
  const [selectedSub, setSelectedSub] = useState('2delivery');
  const [selectedVar, setSelectedVar] = useState('all');

  if (!visible) return null;

  const modalWidth = Math.min(width, 1024);

  return (
    <View style={styles.overlay}>
      {/* Click outside to close */}
      <TouchableOpacity style={styles.dismissArea} activeOpacity={1} onPress={onClose} />

      {/* Category Container (zIndex: 95 to tuck behind bottom navigation bar) */}
      <View style={[styles.modalContainer, { maxWidth: modalWidth, height: height * 0.80 }]}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.packageIcon}>📦</Text>
            <Text style={styles.headerTitle}>Delivery</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.filterButton} activeOpacity={0.8}>
              <Ionicons name="funnel-outline" size={11} color="#FF7A00" />
              <Text style={styles.filterText}>Filter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={onClose} activeOpacity={0.7}>
              <Ionicons name="close" size={18} color="#64748B" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Scrollable Drawer Content */}
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Horizontal Sub-categories Row */}
          <View style={styles.subContainer}>
            {/* 2 Delivery */}
            <TouchableOpacity 
              style={[styles.subCard, selectedSub === '2delivery' ? styles.selectedSubCard : styles.unselectedSubCard]} 
              activeOpacity={0.8}
              onPress={() => setSelectedSub('2delivery')}
            >
              <View style={[styles.subIconCircle, { backgroundColor: '#FFF5EB' }]}>
                <Ionicons name="car-outline" size={24} color="#FF7A00" />
              </View>
              <Text style={[styles.subCardText, selectedSub === '2delivery' && styles.selectedSubText]}>
                2 Delivery
              </Text>
            </TouchableOpacity>

            {/* Ato */}
            <TouchableOpacity 
              style={[styles.subCard, selectedSub === 'ato' ? styles.selectedSubCard : styles.unselectedSubCard]} 
              activeOpacity={0.8}
              onPress={() => setSelectedSub('ato')}
            >
              <View style={[styles.subIconCircle, { backgroundColor: '#F1F5F9' }]}>
                <Ionicons name="smartphone-outline" size={24} color="#64748B" />
              </View>
              <Text style={[styles.subCardText, selectedSub === 'ato' && styles.selectedSubText]}>
                Ato
              </Text>
            </TouchableOpacity>
          </View>

          {/* Variation Section */}
          <Text style={styles.sectionHeader}>Variation...</Text>
          <View style={styles.variationRow}>
            {/* All */}
            <TouchableOpacity 
              style={[styles.varPill, selectedVar === 'all' ? styles.selectedVarPill : styles.unselectedVarPill]}
              activeOpacity={0.8}
              onPress={() => setSelectedVar('all')}
            >
              <Text style={[styles.varText, selectedVar === 'all' && styles.selectedVarText]}>All</Text>
            </TouchableOpacity>

            {/* Product only */}
            <TouchableOpacity 
              style={[styles.varPill, selectedVar === 'product' ? styles.selectedVarPill : styles.unselectedVarPill]}
              activeOpacity={0.8}
              onPress={() => setSelectedVar('product')}
            >
              <Ionicons name="cube-outline" size={12} color={selectedVar === 'product' ? '#FFFFFF' : '#64748B'} style={styles.pillIcon} />
              <Text style={[styles.varText, selectedVar === 'product' && styles.selectedVarText]}>Product only</Text>
            </TouchableOpacity>

            {/* Rider only */}
            <TouchableOpacity 
              style={[styles.varPill, selectedVar === 'rider' ? styles.selectedVarPill : styles.unselectedVarPill]}
              activeOpacity={0.8}
              onPress={() => setSelectedVar('rider')}
            >
              <Ionicons name="bicycle-outline" size={12} color={selectedVar === 'rider' ? '#FFFFFF' : '#64748B'} style={styles.pillIcon} />
              <Text style={[styles.varText, selectedVar === 'rider' && styles.selectedVarText]}>Rider only</Text>
            </TouchableOpacity>
          </View>

          {/* Vendors List */}
          <View style={styles.vendorsList}>
            {/* Card 1 */}
            <View style={styles.vendorCard}>
              <View style={styles.vendorUpper}>
                <View style={[styles.vendorAvatarContainer, { backgroundColor: '#EFF6FF' }]}>
                  <Ionicons name="shield-outline" size={22} color="#2563EB" />
                </View>
                <View style={styles.vendorInfo}>
                  <View style={styles.statsRow}>
                    <Ionicons name="star" size={11} color="#FFB800" />
                    <Text style={styles.ratingText}>4.8</Text>
                    <Ionicons name="checkmark-circle" size={11} color="#10B981" style={styles.checkIcon} />
                    <Text style={styles.verifiedText}>Verified</Text>
                    <Ionicons name="location" size={11} color="#94A3B8" style={styles.locationIcon} />
                    <Text style={styles.locationText}>Nearby</Text>
                  </View>
                </View>
              </View>
              <View style={styles.vendorLower}>
                <TouchableOpacity style={styles.choiceFilter} activeOpacity={0.7}>
                  <View style={styles.checkbox} />
                  <Text style={styles.choiceText}>Choice filter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.findVendorBtn} activeOpacity={0.8}>
                  <Text style={styles.findVendorText}>Find vendor</Text>
                  <Ionicons name="navigate-outline" size={12} color="#2E7D32" style={styles.navigateIcon} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Card 2 */}
            <View style={styles.vendorCard}>
              <View style={styles.vendorUpper}>
                <View style={[styles.vendorAvatarContainer, { backgroundColor: '#F0FDF4' }]}>
                  <Ionicons name="smartphone-outline" size={22} color="#10B981" />
                </View>
                <View style={styles.vendorInfo}>
                  <Text style={styles.vendorName}>1 pepel delivery</Text>
                  <View style={styles.statsRow}>
                    <Ionicons name="star" size={11} color="#FFB800" />
                    <Text style={styles.ratingText}>4.8</Text>
                    <Ionicons name="checkmark-circle" size={11} color="#10B981" style={styles.checkIcon} />
                    <Text style={styles.verifiedText}>Verified</Text>
                    <Ionicons name="location" size={11} color="#94A3B8" style={styles.locationIcon} />
                    <Text style={styles.locationText}>Nearby</Text>
                  </View>
                </View>
              </View>
              <View style={styles.vendorLower}>
                <TouchableOpacity style={styles.choiceFilter} activeOpacity={0.7}>
                  <View style={styles.checkbox} />
                  <Text style={styles.choiceText}>Choice filter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.findVendorBtn} activeOpacity={0.8}>
                  <Text style={styles.findVendorText}>Find vendor</Text>
                  <Ionicons name="navigate-outline" size={12} color="#2E7D32" style={styles.navigateIcon} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Card 3 */}
            <View style={styles.vendorCard}>
              <View style={styles.vendorUpper}>
                <View style={[styles.vendorAvatarContainer, { backgroundColor: '#F1F5F9' }]}>
                  <Ionicons name="wrench-outline" size={22} color="#64748B" />
                </View>
                <View style={styles.vendorInfo}>
                  <Text style={styles.vendorName}>A</Text>
                  <View style={styles.statsRow}>
                    <Ionicons name="star" size={11} color="#FFB800" />
                    <Text style={styles.ratingText}>4.8</Text>
                    <Ionicons name="checkmark-circle" size={11} color="#10B981" style={styles.checkIcon} />
                    <Text style={styles.verifiedText}>Verified</Text>
                    <Ionicons name="location" size={11} color="#94A3B8" style={styles.locationIcon} />
                    <Text style={styles.locationText}>Nearby</Text>
                  </View>
                </View>
              </View>
              <View style={styles.vendorLower}>
                <TouchableOpacity style={styles.choiceFilter} activeOpacity={0.7}>
                  <View style={styles.checkbox} />
                  <Text style={styles.choiceText}>Choice filter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.findVendorBtn} activeOpacity={0.8}>
                  <Text style={styles.findVendorText}>Find vendor</Text>
                  <Ionicons name="navigate-outline" size={12} color="#2E7D32" style={styles.navigateIcon} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Padding spacer to prevent bottom elements from blocking last vendors list elements */}
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  packageIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginRight: 10,
  },
  filterText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    marginLeft: 4,
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
  subContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  subCard: {
    width: 80,
    height: 80,
    borderRadius: 16,
    borderWidth: 1.2,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  unselectedSubCard: {
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  selectedSubCard: {
    borderColor: '#FF8A00', // Orange selected border outline
    backgroundColor: '#FFF5EB', // Orange cream selected background
  },
  subIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  subCardText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#64748B',
    textAlign: 'center',
  },
  selectedSubText: {
    color: '#B45309', // Selected tag text color matching screenshots
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.8,
    marginBottom: 10,
    marginTop: 4,
  },
  variationRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  varPill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    borderWidth: 1.2,
  },
  unselectedVarPill: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E8F0',
  },
  selectedVarPill: {
    backgroundColor: '#FF7A00', // Solid orange variation background matching screenshots
    borderColor: '#FF7A00',
  },
  pillIcon: {
    marginRight: 4,
  },
  varText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
  },
  selectedVarText: {
    color: '#FFFFFF',
  },
  vendorsList: {
    marginTop: 4,
  },
  vendorCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#EBEBEB',
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 2,
  },
  vendorUpper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vendorAvatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  vendorInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  vendorName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0F172A',
    marginLeft: 3,
  },
  checkIcon: {
    marginLeft: 8,
  },
  verifiedText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#10B981',
    marginLeft: 3,
  },
  locationIcon: {
    marginLeft: 8,
  },
  locationText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    marginLeft: 3,
  },
  vendorLower: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#F1F5F9',
    marginTop: 12,
    paddingTop: 10,
  },
  choiceFilter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 14,
    height: 14,
    borderRadius: 3,
    borderWidth: 1.2,
    borderColor: '#94A3B8',
    backgroundColor: '#FFFFFF',
    marginRight: 6,
  },
  choiceText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#475569',
  },
  findVendorBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9', // Light green background matching screenshot
    borderRadius: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  findVendorText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#2E7D32',
    marginRight: 4,
  },
  navigateIcon: {
    marginTop: 1,
  },
  bottomSpacer: {
    height: 160, // Clear floating bottom bar & services ribbon
  },
});
