import React from 'react';
import { Image as RNImage, View, StyleSheet, ImageStyle } from 'react-native';
import { Text } from './Text';

interface ImageProps {
  source: { uri: string } | any;
  style?: ImageStyle;
  width?: number;
  height?: number;
  borderRadius?: number;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
  onLoad?: () => void;
  onError?: () => void;
  onLoadStart?: () => void;
  fallbackSource?: any;
  showFallbackText?: boolean;
  fallbackText?: string;
  loading?: boolean;
  error?: boolean;
}

export const Image: React.FC<ImageProps> = ({
  source,
  style,
  width,
  height,
  borderRadius = 8,
  resizeMode = 'cover',
  onLoad,
  onError,
  onLoadStart,
  fallbackSource,
  showFallbackText = false,
  fallbackText = 'Image not available',
  loading = false,
  error = false,
}) => {
  const imageStyle = {
    width,
    height,
    borderRadius,
    ...style,
  };

  if (error && fallbackSource) {
    return (
      <RNImage
        source={fallbackSource}
        style={[imageStyle, styles.fallbackImage]}
        resizeMode="contain"
      />
    );
  }

  if (error && showFallbackText) {
    return (
      <View style={[imageStyle, styles.fallbackContainer]}>
        <Text variant="caption" centered>
          {fallbackText}
        </Text>
      </View>
    );
  }

  return (
    <View style={{ position: 'relative' }}>
      <RNImage
        source={source}
        style={imageStyle}
        resizeMode={resizeMode}
        onLoad={onLoad}
        onError={onError}
        onLoadStart={onLoadStart}
      />
      {loading && (
        <View style={[StyleSheet.absoluteFill, styles.loadingOverlay, { borderRadius }]}>
          <Text variant="caption" centered>
            Loading...
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fallbackImage: {
    opacity: 0.5,
  },
  fallbackContainer: {
    backgroundColor: '#2c3e50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingOverlay: {
    backgroundColor: '#2c3e50',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
