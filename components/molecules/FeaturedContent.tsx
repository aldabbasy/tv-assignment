import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import { Text, Button, Image } from '../atoms';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface FeaturedContentProps {
  video: {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    backdrop: string;
    genre: string[];
    runtime: string;
    year: string;
    rating: string;
    starring: string[];
  };
  onPlay: () => void;
  onAddToList?: () => void;
  focused: boolean;
}

export const FeaturedContent: React.FC<FeaturedContentProps> = ({
  video,
  onPlay,
  onAddToList,
  focused,
}) => {
  const thumbnailOpacity = useRef(new Animated.Value(1)).current;
  const thumbnailScale = useRef(new Animated.Value(1)).current;

  // Animate thumbnail on video change
  useEffect(() => {
    // Reset opacity and scale, then fade in with new video
    thumbnailOpacity.setValue(0);
    thumbnailScale.setValue(0.9);

    Animated.parallel([
      Animated.timing(thumbnailOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(thumbnailScale, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [video.id, video.thumbnail]);

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image
        source={{ uri: video.backdrop }}
        style={styles.backdrop}
        resizeMode="cover"
      />

      {/* Animated Full Screen Thumbnail */}
      <Animated.View
        style={[
          styles.thumbnailContainer,
          {
            opacity: thumbnailOpacity,
            transform: [{ scale: thumbnailScale }]
          }
        ]}
      >
        <Image
          source={{ uri: video.thumbnail }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
      </Animated.View>

      {/* Content Overlay with enhanced text background */}
      <View style={styles.overlay}>
        <View style={styles.contentContainer}>
          {/* Text overlay background */}
          <View style={styles.textOverlayBackground} />

          <View style={styles.textContent}>
            {/* Title */}
            <Text variant="heading" style={styles.title}>
              {video.title}
            </Text>

            {/* Metadata */}
            <View style={styles.metadataContainer}>
              <Text variant="body" style={styles.metadata}>
                {video.year} • {video.runtime} • {video.rating}
              </Text>
              <View style={styles.genreContainer}>
                {video.genre.slice(0, 3).map((genre, index) => (
                  <Text key={index} variant="caption" style={styles.genre}>
                    {genre}
                    {index < Math.min(video.genre.length - 1, 2) ? ' • ' : ''}
                  </Text>
                ))}
              </View>
            </View>

            {/* Description */}
            <Text variant="body" style={styles.description}>
              {video.description.length > 100
                ? video.description.substring(0, 100) + '...'
                : video.description
              }
            </Text>

            {/* Starring */}
            <View style={styles.starringContainer}>
              <Text variant="caption" style={styles.starringLabel}>
                Starring:
              </Text>
              <Text variant="caption" style={styles.starring}>
                {video.starring.join(', ')}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: screenWidth,
    position: 'relative',
  },
  backdrop: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    paddingLeft: 80,
    paddingRight: screenWidth * 0.4,
  },
  contentContainer: {
    maxWidth: 600,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  metadataContainer: {
    marginBottom: 20,
  },
  metadata: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 8,
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  genre: {
    fontSize: 14,
    color: '#aaa',
  },
  description: {
    fontSize: 18,
    lineHeight: 24,
    color: '#fff',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  starringContainer: {
    flexDirection: 'row',
    marginBottom: 32,
    flexWrap: 'wrap',
  },
  starringLabel: {
    fontSize: 14,
    color: '#ccc',
    marginRight: 8,
    fontWeight: '600',
  },
  starring: {
    fontSize: 14,
    color: '#fff',
    flex: 1,
  },
  thumbnailContainer: {
    width: '100%',
    height: '100%',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  textOverlayBackground: {
    position: 'absolute',
    left: -20,
    right: -20,
    top: -20,
    bottom: -20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  textContent: {
    position: 'relative',
    zIndex: 2,
    padding: 20,
  },
});
