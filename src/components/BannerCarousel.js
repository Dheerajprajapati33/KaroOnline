import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Image, FlatList, useWindowDimensions, Text } from 'react-native';
import { colors } from '../theme/colors';
import { BANNER_SLIDES } from '../constants/data';

export default function BannerCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);
  const { width } = useWindowDimensions();

  // Dynamic layout calculations covering 100% viewport width
  // Subtract padding so the next item peeks on the right edge (matching the user's image)
  const carouselWidth = width - 48; 
  const snapInterval = carouselWidth + 12; // Card width + margin offset

  const currentIndex = useRef(0);
  const autoScrollTimer = useRef(null);

  // Auto-scroll loop
  useEffect(() => {
    autoScrollTimer.current = setInterval(() => {
      let nextIndex = currentIndex.current + 1;
      if (nextIndex >= BANNER_SLIDES.length) {
        nextIndex = 0;
      }
      currentIndex.current = nextIndex;
      
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setActiveIndex(nextIndex);
    }, 4000);

    return () => {
      if (autoScrollTimer.current) {
        clearInterval(autoScrollTimer.current);
      }
    };
  }, []);

  // Update indices smoothly based on scroll coordinates
  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / snapInterval);
    if (index >= 0 && index < BANNER_SLIDES.length && index !== activeIndex) {
      setActiveIndex(index);
      currentIndex.current = index;
    }
  };

  const renderItem = ({ item }) => (
    <View style={[styles.slideContainer, { width: carouselWidth }]}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} resizeMode="cover" />
      <View style={styles.textOverlay}>
        <Text style={styles.slideTitle}>{item.title}</Text>
        <Text style={styles.slideSubtitle}>{item.subtitle}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={BANNER_SLIDES}
        renderItem={renderItem}
        horizontal
        pagingEnabled={false} // Allows custom snapping so adjacent cards peek out
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        snapToInterval={snapInterval}
        snapToAlignment="center"
        decelerationRate="fast"
        getItemLayout={(data, index) => ({
          length: snapInterval,
          offset: snapInterval * index,
          index,
        })}
        contentContainerStyle={styles.flatListContent}
      />
      
      {/* Pagination indicators */}
      <View style={styles.paginationContainer}>
        {BANNER_SLIDES.map((_, index) => {
          const isActive = index === activeIndex;
          return (
            <View
              key={index}
              style={[
                styles.dot,
                isActive ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    alignItems: 'center',
    width: '100%',
  },
  flatListContent: {
    paddingHorizontal: 12,
  },
  slideContainer: {
    height: 180,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  slideTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  slideSubtitle: {
    fontSize: 11,
    color: '#E0E0E0',
    marginTop: 2,
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
  },
  activeDot: {
    width: 20,
    backgroundColor: colors.primary,
  },
  inactiveDot: {
    width: 6,
    backgroundColor: '#C8D1DC',
  },
});
