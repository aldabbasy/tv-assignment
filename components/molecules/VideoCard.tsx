import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Image, Text, Container } from '../atoms';

interface VideoCardProps {
  item: {
    id: string;
    title: string;
    thumbnail: string;
    url: string;
  };
  focused: boolean;
  imageError: boolean;
  imageLoading: boolean;
  onPress: () => void;
  onImageLoad: () => void;
  onImageError: () => void;
  onImageLoadStart: () => void;
  style?: ViewStyle;
  fallbackImage?: any;
  showDebugInfo?: boolean;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  item,
  focused,
  imageError,
  imageLoading,
  onPress,
  onImageLoad,
  onImageError,
  onImageLoadStart,
  style,
  fallbackImage,
  showDebugInfo = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        focused && styles.focusedCard,
        style,
      ]}
      onPress={onPress}
      hasTVPreferredFocus={false}
      focusable={false}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`Video: ${item.title}`}
    >
      <Container variant="card" style={styles.cardContent}>
        <Image
          source={{ uri: item.thumbnail }}
          width={300}
          height={200}
          borderRadius={8}
          resizeMode="cover"
          onLoad={onImageLoad}
          onError={onImageError}
          onLoadStart={onImageLoadStart}
          loading={imageLoading}
          error={imageError}
          fallbackSource={fallbackImage}
          showFallbackText={true}
          fallbackText={item.title}
        />

        <Container
          variant="overlay"
          style={styles.titleOverlay}
          backgroundColor="rgba(0, 0, 0, 0.7)"
        >
          <Text
            variant="body"
            centered
            bold={focused}
          >
            {item.title}
          </Text>

          {showDebugInfo && (
            <Text variant="debug" centered style={styles.debugText}>
              Loading: {imageLoading ? 'Yes' : 'No'} | Error: {imageError ? 'Yes' : 'No'}
            </Text>
          )}
        </Container>
      </Container>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    transform: [{ scale: 1 }],
  },
  focusedCard: {
    borderWidth: 4,
    borderColor: '#1e90ff',
    backgroundColor: 'rgba(30, 144, 255, 0.1)',
    transform: [{ scale: 1.05 }],
    shadowColor: '#1e90ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cardContent: {
    position: 'relative',
  },
  titleOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  debugText: {
    marginTop: 4,
  },
});
