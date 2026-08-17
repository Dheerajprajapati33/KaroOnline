import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

const GRID_PADDING = 20;

export default function DigitalShopeModal({ visible, onClose }) {
  const { width, height } = useWindowDimensions();

  if (!visible) return null;

  const modalWidth = Math.min(width, 1024);

  return (
    <View style={styles.overlay}>
      {/* Click outside to close */}
      <TouchableOpacity style={styles.dismissArea} activeOpacity={1} onPress={onClose} />

      {/* Quick Menu Container (zIndex: 95 to layer behind bottom navigation bar) */}
      <View style={[styles.modalContainer, { maxWidth: modalWidth, height: height * 0.62 }]}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Quick Menu</Text>
            <Text style={styles.headerSubtitle}>Tap to open • long-press for APK & link</Text>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose} activeOpacity={0.7}>
            <Ionicons name="close" size={18} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* Scrollable Quick Menu Items */}
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Item 1: Join as Vendor */}
          <TouchableOpacity style={styles.menuCard} activeOpacity={0.8}>
            <View style={[styles.iconCircle, { backgroundColor: '#FF8A00' }]}>
              <Ionicons name="briefcase" size={20} color="#FFFFFF" />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>Join as Vendor</Text>
              <Text style={styles.cardSubtitle}>Grow your business • get leads</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
          </TouchableOpacity>

          {/* Item 2: Digital Shop */}
          <TouchableOpacity style={styles.menuCard} activeOpacity={0.8}>
            <View style={[styles.iconCircle, { backgroundColor: '#10B981' }]}>
              <Ionicons name="storefront" size={20} color="#FFFFFF" />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>Digital Shop</Text>
              <Text style={styles.cardSubtitle}>Browse all digital dukans near you</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
          </TouchableOpacity>

          {/* Item 3: All Programs */}
          <TouchableOpacity style={styles.menuCard} activeOpacity={0.8}>
            <View style={[styles.iconCircle, { backgroundColor: '#A855F7' }]}>
              <Ionicons name="gift" size={20} color="#FFFFFF" />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>All Programs</Text>
              <Text style={styles.cardSubtitle}>Referral program • downloads • rewards</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
          </TouchableOpacity>

          {/* Item 4: My QR Code */}
          <TouchableOpacity style={styles.menuCard} activeOpacity={0.8}>
            <View style={[styles.iconCircle, { backgroundColor: '#0284C7' }]}>
              <Ionicons name="qr-code" size={20} color="#FFFFFF" />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>My QR Code</Text>
              <Text style={styles.cardSubtitle}>QR dashboard • themes • visitor count</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
          </TouchableOpacity>

          {/* Section: Our Other Apps */}
          <Text style={styles.sectionHeader}>OUR OTHER APPS</Text>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.otherAppsScroll}
          >
            {/* Karo Digital Shop */}
            <TouchableOpacity style={styles.appPill} activeOpacity={0.8}>
              <Ionicons name="smartphone" size={12} color="#64748B" style={{ marginRight: 6 }} />
              <View style={[styles.appDot, { backgroundColor: '#FEF9C3', borderColor: '#E2E8F0', borderWidth: 1 }]} />
              <Text style={styles.appPillText}>Karo Digital Shop</Text>
              <Ionicons name="open-outline" size={11} color="#64748B" style={styles.appPillIcon} />
            </TouchableOpacity>

            {/* Karo Referral */}
            <TouchableOpacity style={styles.appPill} activeOpacity={0.8}>
              <Ionicons name="smartphone" size={12} color="#64748B" style={{ marginRight: 6 }} />
              <View style={[styles.appDot, { backgroundColor: '#FF8A00' }]} />
              <Text style={styles.appPillText}>Karo Referral</Text>
              <Ionicons name="open-outline" size={11} color="#64748B" style={styles.appPillIcon} />
            </TouchableOpacity>

            {/* Karo Vendor */}
            <TouchableOpacity style={styles.appPill} activeOpacity={0.8}>
              <Ionicons name="smartphone" size={12} color="#64748B" style={{ marginRight: 6 }} />
              <View style={[styles.appDot, { backgroundColor: '#000000' }]} />
              <Text style={styles.appPillText}>Karo Vendor</Text>
              <Ionicons name="open-outline" size={11} color="#64748B" style={styles.appPillIcon} />
            </TouchableOpacity>

            {/* Karo Staff */}
            <TouchableOpacity style={styles.appPill} activeOpacity={0.8}>
              <Ionicons name="smartphone" size={12} color="#64748B" style={{ marginRight: 6 }} />
              <View style={[styles.appDot, { backgroundColor: '#FEF9C3', borderColor: '#E2E8F0', borderWidth: 1 }]} />
              <Text style={styles.appPillText}>Karo Staff</Text>
              <Ionicons name="open-outline" size={11} color="#64748B" style={styles.appPillIcon} />
            </TouchableOpacity>

            {/* Karo One */}
            <TouchableOpacity style={styles.appPill} activeOpacity={0.8}>
              <Ionicons name="smartphone" size={12} color="#64748B" style={{ marginRight: 6 }} />
              <View style={[styles.appDot, { backgroundColor: '#0284C7' }]} />
              <Text style={styles.appPillText}>Karo One</Text>
              <Ionicons name="open-outline" size={11} color="#64748B" style={styles.appPillIcon} />
            </TouchableOpacity>
          </ScrollView>
           
           
          {/* Extra Bottom Spacer to clear bottom bar */}
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
    paddingHorizontal: GRID_PADDING,
    paddingBottom: 16,
    borderBottomWidth: 1.2,
    borderColor: '#F1F5F9',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
    marginTop: 2,
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
    paddingHorizontal: GRID_PADDING,
    paddingTop: 16,
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  cardSubtitle: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 2,
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 1,
    marginTop: 14,
    marginBottom: 10,
  },
  otherAppsScroll: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    marginBottom: 10,
  },
  appPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  appDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  appPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#334155',
  },
  appPillIcon: {
    marginLeft: 4,
  },
  bottomSpacer: {
    height: 160, // Clear floating bottom bar & services ribbon
  },
});
