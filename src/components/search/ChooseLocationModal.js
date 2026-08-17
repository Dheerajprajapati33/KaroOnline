import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ChooseLocationModal({ visible, onClose, onOpenCity, onOpenDistance, selectedRadius }) {
  const { width, height } = useWindowDimensions();

  if (!visible) return null;

  const modalWidth = Math.min(width, 1024);

  return (
    <View style={styles.overlay}>
      {/* Click outside to close */}
      <TouchableOpacity
        style={styles.dismissArea}
        activeOpacity={1}
        onPress={onClose}
      />

      {/* Choose Location Container (zIndex: 95 to tuck behind bottom navigation bar) */}
      <View
        style={[
          styles.modalContainer,
          { maxWidth: modalWidth, height: height * 0.85 },
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Choose Location</Text>
            <Text style={styles.headerSubtitle}>
              Search city, area or landmark
            </Text>
          </View>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={18} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* Content Body */}
        <View style={styles.content}>
          {/* Peach-bordered Search Input Box */}
          <View style={styles.searchBox}>
            <Ionicons name="search" size={18} color="#94A3B8" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search address, area, city..."
              placeholderTextColor="#94A3B8"
              editable={false} // Presentation placeholder
            />
            <Ionicons
              name="mic-outline"
              size={18}
              color="#FF7A00"
              style={styles.micIcon}
            />
          </View>

          {/* Filter Dropdown Pills Row */}
          <View style={styles.pillsRow}>
            {/* City dropdown (Yellow/Gold design matching screenshot) */}
            <TouchableOpacity
              style={[styles.dropdownPill, styles.cityPill]}
              activeOpacity={0.8}
              onPress={onOpenCity}
            >
              <Ionicons
                name="business-outline"
                size={13}
                color="#B45309"
                style={styles.pillIconLeft}
              />
              <Text style={[styles.pillText, styles.cityText]}>City</Text>
              <Ionicons
                name="chevron-down"
                size={11}
                color="#B45309"
                style={styles.chevron}
              />
            </TouchableOpacity>

            {/* 1km dropdown (Blue design matching screenshot) */}
            <TouchableOpacity
              style={[styles.dropdownPill, styles.distancePill]}
              activeOpacity={0.8}
              onPress={onOpenDistance}
            >
              <Ionicons
                name="compass-outline"
                size={13}
                color="#2563EB"
                style={styles.pillIconLeft}
              />
              <Text style={[styles.pillText, styles.distanceText]}>{selectedRadius} km</Text>
              <Ionicons
                name="chevron-down"
                size={11}
                color="#2563EB"
                style={styles.chevron}
              />
            </TouchableOpacity>
          </View>

          {/* Recent Searches Section */}
          <View style={styles.recentSection}>
            <Text style={styles.recentTitle}>RECENT</Text>
            <Text style={styles.recentText}>No recent searches yet.</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Dimmed transparent backdrop
    justifyContent: "flex-end",
    alignItems: "center",
    zIndex: 95, // Behind BottomBar (zIndex: 100) and ServiceIcon (zIndex: 110)
  },
  dismissArea: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 32, // Rounded top corners matching screenshots
    borderTopRightRadius: 32,
    paddingTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1.2,
    borderColor: "#F1F5F9",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
  },
  headerSubtitle: {
    fontSize: 11,
    color: "#64748B",
    fontWeight: "600",
    marginTop: 2,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFBF8", // Very light peach tint matching screenshots
    borderWidth: 1.2,
    borderColor: "#FFE2D1", // Orange border tint
    borderRadius: 24,
    height: 48,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    fontWeight: "600",
    color: "#334155",
    marginLeft: 8,
  },
  micIcon: {
    marginLeft: 8,
  },
  pillsRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  dropdownPill: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.2,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 10,
  },
  cityPill: {
    backgroundColor: "#FFFBEB", // Light yellow cream matching screenshot
    borderColor: "#FDE047", // Gold yellow outline matching screenshot
  },
  distancePill: {
    backgroundColor: "#EFF6FF", // Light blue matching screenshot
    borderColor: "#BFDBFE", // Soft blue outline matching screenshot
  },
  pillIconLeft: {
    marginRight: 6,
  },
  pillText: {
    fontSize: 12,
    fontWeight: "700",
  },
  cityText: {
    color: "#B45309", // Dark brown/gold matching screenshot
  },
  distanceText: {
    color: "#2563EB", // Royal blue matching screenshot
  },
  chevron: {
    marginLeft: 6,
    marginTop: 1,
  },
  recentSection: {
    marginTop: 6,
  },
  recentTitle: {
    fontSize: 11,
    fontWeight: "800",
    color: "#94A3B8",
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  recentText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#94A3B8",
    fontStyle: "italic", // Slanted text matching screenshot
    marginTop: 2,
  },
});
