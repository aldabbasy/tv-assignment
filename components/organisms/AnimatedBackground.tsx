import React from 'react';
import { Animated, ImageBackground, Dimensions, StyleSheet } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface AnimatedBackgroundProps {
  imageUrl: string;
  opacity: Animated.AnimatedValue;
  overlayOpacity: Animated.AnimatedValue;
  blurRadius?: number;
  children?: React.ReactNode;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  imageUrl,
  opacity,
  overlayOpacity,
  blurRadius = 10,
  children,
}) => {
  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity,
        },
      ]}
    >
      <ImageBackground
        source={{ uri: imageUrl }}
        style={styles.background}
        resizeMode="cover"
        blurRadius={blurRadius}
      >
        <Animated.View
          style={[
            styles.overlay,
            {
              opacity: overlayOpacity,
            },
          ]}
        />
        {children}
      </ImageBackground>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  background: {
    flex: 1,
    width: screenWidth,
    height: screenHeight,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
});
