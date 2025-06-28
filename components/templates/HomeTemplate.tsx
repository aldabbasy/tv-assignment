import React, { useRef, useEffect } from 'react';
import { Animated, useTVEventHandler, View, StyleSheet, Dimensions } from 'react-native';
import { Container, Text } from '../atoms';
import { FocusIndicatorRow, VideoInfoOverlay, FeaturedContent } from '../molecules';
import { VideoCarousel, AnimatedBackground } from '../organisms';

const { height: screenHeight } = Dimensions.get('window');

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  backdrop: string;
  url: string;
  genre: string[];
  runtime: string;
  year: string;
  rating: string;
  starring: string[];
  director: string;
}

interface HomeTemplateProps {
  videos: Video[];
  focusedIndex: number;
  focusedSection: 'featured' | 'carousel';
  imageErrors: Record<string, boolean>;
  imageLoading: Record<string, boolean>;
  backgroundImageUrl: string;
  backgroundOpacity: Animated.AnimatedValue;
  overlayOpacity: Animated.AnimatedValue;
  onItemPress: (item: any) => void;
  onImageLoad: (id: string) => void;
  onImageError: (id: string) => void;
  onImageLoadStart: (id: string) => void;
  onTVEvent: (evt: any) => void;
  onPlayFeatured?: () => void;
  onAddToList?: () => void;
  fallbackImage?: any;
  showDebugInfo?: boolean;
}

export const HomeTemplate: React.FC<HomeTemplateProps> = ({
  videos,
  focusedIndex,
  focusedSection,
  imageErrors,
  imageLoading,
  backgroundImageUrl,
  backgroundOpacity,
  overlayOpacity,
  onItemPress,
  onImageLoad,
  onImageError,
  onImageLoadStart,
  onTVEvent,
  onPlayFeatured,
  onAddToList,
  fallbackImage,
  showDebugInfo = false,
}) => {
  const carouselRef = useRef<any>(null);

  // Use the currently focused video for featured content
  const featuredVideo = videos[focusedIndex] || videos[0];

  useTVEventHandler(onTVEvent);

  return (
    <Container flex={1} style={styles.container}>
      {/* Featured Content Section */}
      <View style={styles.featuredSection}>
        <FeaturedContent
          video={featuredVideo}
          onPlay={() => onItemPress(featuredVideo)}
          onAddToList={onAddToList}
          focused={false}
        />
      </View>

      {/* Carousel Section */}
      <View style={styles.carouselSection}>
        <Container style={styles.carouselContainer}>
          <VideoCarousel
            videos={videos}
            focusedIndex={focusedSection === 'carousel' ? focusedIndex : -1}
            imageErrors={imageErrors}
            imageLoading={imageLoading}
            onItemPress={onItemPress}
            onImageLoad={onImageLoad}
            onImageError={onImageError}
            onImageLoadStart={onImageLoadStart}
            fallbackImage={fallbackImage}
            showDebugInfo={showDebugInfo}
          />

          {/* Focus indicator for carousel */}
          <Container style={styles.indicatorContainer}>
            <FocusIndicatorRow
              items={videos}
              focusedIndex={focusedIndex}
            />
          </Container>
        </Container>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
  },
  featuredSection: {
    flex: 1,
  },
  carouselSection: {
    flex: 1,
    paddingTop: 30, // Increased padding for better spacing
  },
  carouselContainer: {
    flex: 1,
    paddingHorizontal: 50,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    marginLeft: 10,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
});
