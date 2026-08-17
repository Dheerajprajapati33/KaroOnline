import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ReferModal({ visible, onClose }) {
  const { width, height } = useWindowDimensions();

  if (!visible) return null;

  const modalWidth = Math.min(width, 1024);

  return (
    <View style={styles.overlay}>
      {/* Click outside to close */}
      <TouchableOpacity style={styles.dismissArea} activeOpacity={1} onPress={onClose} />

      {/* Refer & Earn Container (zIndex: 95 to tuck behind bottom navigation bar) */}
      <View style={[styles.modalContainer, { maxWidth: modalWidth, height: height * 0.44 }]}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitleSmall}>REFER & EARN</Text>
            <Text style={styles.headerTitle}>Share & earn rewards</Text>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose} activeOpacity={0.7}>
            <Ionicons name="close" size={18} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* Content Body */}
        <View style={styles.content}>
          {/* Peach Code Container Card */}
          <View style={styles.codeCard}>
            {/* Grey Rounded QR Placeholder Box */}
            <View style={styles.qrPlaceholder} />
            <View style={styles.codeDetails}>
              <Text style={styles.codeLabel}>YOUR CODE</Text>
              <Text style={styles.codeText}>—</Text>
            </View>
          </View>

          {/* Quick Sharing Action Buttons Row */}
          <View style={styles.actionsRow}>
            {/* Share */}
            <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
              <Ionicons name="share-social-outline" size={18} color="#FF7A00" />
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>

            {/* WhatsApp */}
            <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
              <Ionicons name="logo-whatsapp" size={18} color="#25D366" />
              <Text style={styles.actionText}>WhatsApp</Text>
            </TouchableOpacity>

            {/* Copy */}
            <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
              <Ionicons name="copy-outline" size={18} color="#FF7A00" />
              <Text style={styles.actionText}>Copy</Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Wallet Status Row */}
          <TouchableOpacity style={styles.walletRow} activeOpacity={0.85}>
            <View style={styles.walletLeft}>
              <Ionicons name="wallet-outline" size={16} color="#FF7A00" />
              <Text style={styles.walletText}>Wallet Rx. 0</Text>
            </View>
            <Ionicons name="chevron-forward" size={14} color="#94A3B8" />
          </TouchableOpacity>
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
    paddingBottom: 12,
  },
  headerTitleSmall: {
    fontSize: 9,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 1.2,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 4,
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
  },
  codeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5EB', // Peach/cream background matching screenshot
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FFE2D1',
    padding: 16,
    marginVertical: 12,
  },
  qrPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#E2E8F0', // Grey rounded QR box placeholder
  },
  codeDetails: {
    marginLeft: 14,
    justifyContent: 'center',
  },
  codeLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.8,
  },
  codeText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#334155',
    marginTop: 2,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  actionButton: {
    width: '31%', // Render exactly three balanced button capsules
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    borderRadius: 20,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 2,
    elevation: 1,
  },
  actionText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#475569',
    marginTop: 6,
  },
  walletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 12,
    marginTop: 16,
  },
  walletLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#334155',
    marginLeft: 8,
  },
});
