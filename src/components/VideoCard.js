import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export default function VideoCard({ item }) {
  const { width } = useWindowDimensions();
  
  // Calculate dynamic card width for responsiveness
  const cardWidth = width > 768 ? 260 : width * 0.65;

  // Option 1: Tailor / Vendor Profile Card
  if (item.isTailorCard) {
    return (
      <View style={[styles.cardContainer, styles.tailorCardContainer, { width: cardWidth }]}>
        {/* Top Info Layout */}
        <View style={styles.tailorTopRow}>
          {/* Left: Thumbnail & Play Overlay */}
          <View style={styles.tailorLeftCol}>
            <Image source={{ uri: item.thumbnailUrl }} style={styles.tailorThumbnail} />
            <TouchableOpacity style={styles.tailorPlayOverlay} activeOpacity={0.8}>
              <View style={styles.smallPlayButton}>
                <Ionicons name="play" size={14} color="#FFFFFF" style={{ marginLeft: 1 }} />
              </View>
            </TouchableOpacity>
          </View>

          {/* Right: Verification list */}
          <View style={styles.tailorRightCol}>
            <View style={styles.statRow}>
              <Ionicons name="shield-checkmark" size={12} color="#00C853" style={styles.statIcon} />
              <Text style={styles.statText}>{item.verifiedCount} Verified</Text>
            </View>
            <View style={styles.statRow}>
              <Ionicons name="checkmark-circle" size={12} color="#00B0FF" style={styles.statIcon} />
              <Text style={styles.statText}>{item.availableCount} Available</Text>
            </View>
            <View style={styles.statRow}>
              <Ionicons name="options-outline" size={12} color={colors.textMuted} style={styles.statIcon} />
              <Text style={styles.statText}>-- options</Text>
            </View>
          </View>
        </View>

        {/* Middle Header Row */}
        <View style={styles.tailorTitleRow}>
          <Text style={styles.tailorTitle}>{item.title}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={12} color="#FFD700" style={styles.starIcon} />
            <Text style={styles.ratingText}>{item.rating} </Text>
            <Text style={styles.reviewsText}>[{item.reviews}]</Text>
          </View>
        </View>

        {/* Bottom Buttons */}
        <View style={styles.tailorButtonsRow}>
          <TouchableOpacity style={styles.requestButton} activeOpacity={0.7}>
            <Text style={styles.requestButtonText}>General request</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.findButton} activeOpacity={0.7}>
            <Text style={styles.findButtonText}>Find Vendor</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Option 2: Branding Card (THE KARO Yellow Polo Card)
  if (item.isBrandingCard) {
    return (
      <TouchableOpacity style={[styles.cardContainer, { width: cardWidth }]} activeOpacity={0.95}>
        <View style={styles.brandingBg}>
          <Image source={{ uri: item.thumbnailUrl }} style={styles.brandImage} />
          
          {/* Top QR Code Circle Overlay */}
          <View style={styles.qrContainer}>
            <View style={styles.qrBadge}>
              <Text style={styles.qrTitle}>SCAN TO</Text>
              <Text style={styles.qrSub}>CONNECT</Text>
              <Ionicons name="qr-code" size={24} color="#000000" style={styles.qrIcon} />
            </View>
          </View>
          
          {/* Bottom Info Overlay */}
          <View style={styles.brandOverlay}>
            <Text style={styles.brandTitle}>THE KARO</Text>
            <Text style={styles.brandSubtitle}>PREMIUM COLLAR WITH BLACK STRIPES</Text>
          </View>

          {/* Golden/Yellow badge in the corner */}
          <View style={styles.bottomRightBadge}>
            <FontAwesome5 name="award" size={14} color="#FFFFFF" />
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  // Option 3: Standard Video Card (with Play overlay)
  return (
    <TouchableOpacity style={[styles.cardContainer, { width: cardWidth }]} activeOpacity={0.9}>
      <View style={styles.thumbnailContainer}>
        <Image source={{ uri: item.thumbnailUrl }} style={styles.thumbnail} />
        
        {/* Play Button Overlay */}
        <View style={styles.playButtonContainer}>
          <View style={styles.playButton}>
            <Ionicons name="play" size={28} color="#FFFFFF" style={styles.playIcon} />
          </View>
        </View>
        
        {/* Title/Label Overlay */}
        <View style={styles.overlayTextContainer}>
          <Text style={styles.videoTitle} numberOfLines={1}>
            {item.title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    height: 180,
    borderRadius: 24,
    marginRight: 16,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  thumbnailContainer: {
    width: '100%',
    height: '100%',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  playButtonContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    marginLeft: 3,
  },
  overlayTextContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  videoTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  
  // Branding Card Styles
  brandingBg: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1E293B',
  },
  brandImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  qrContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  qrBadge: {
    backgroundColor: '#FFCC00',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    padding: 4,
  },
  qrTitle: {
    fontSize: 7,
    fontWeight: '800',
    color: '#000000',
    lineHeight: 8,
  },
  qrSub: {
    fontSize: 7,
    fontWeight: '800',
    color: '#000000',
    lineHeight: 8,
    marginBottom: 2,
  },
  qrIcon: {
    marginTop: -1,
  },
  brandOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  brandTitle: {
    color: '#FFCC00',
    fontSize: 12,
    fontWeight: '800',
  },
  brandSubtitle: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '600',
    marginTop: 2,
  },
  bottomRightBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#FF8A00',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },

  // Tailor Card Styles
  tailorCardContainer: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#EBEBEB',
  },
  tailorTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tailorLeftCol: {
    width: 72,
    height: 72,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#F0F0F0',
  },
  tailorThumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  tailorPlayOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  smallPlayButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tailorRightCol: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statIcon: {
    marginRight: 4,
  },
  statText: {
    fontSize: 10,
    color: colors.textMedium,
    fontWeight: '600',
  },
  tailorTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  tailorTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textDark,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    marginRight: 2,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textDark,
  },
  reviewsText: {
    fontSize: 10,
    color: colors.textMuted,
  },
  tailorButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  requestButton: {
    flex: 1,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  requestButtonText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textMedium,
  },
  findButton: {
    flex: 1,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  findButtonText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
