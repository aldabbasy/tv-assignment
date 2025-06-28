import React, { useState, useRef, useEffect } from 'react';
import { Animated, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { HomeTemplate } from '../components/templates';
import videos from '../data/videos.json';

export default function HomeScreen() {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [focusedSection, setFocusedSection] = useState<'featured' | 'carousel'>('carousel');
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [imageLoading, setImageLoading] = useState<Record<string, boolean>>({});
  const [backgroundImageUrl, setBackgroundImageUrl] = useState(videos[0]?.backdrop || '');
  const isNavigating = useRef(false);

  // Animation values for background image fade
  const backgroundOpacity = useRef(new Animated.Value(1)).current;
  const overlayOpacity = useRef(new Animated.Value(0.6)).current;

  // Handle TV remote events - focus always stays on carousel
  const handleTVEvent = (evt: any) => {
    if (isNavigating.current) return;

    if (evt && evt.eventType) {
      switch (evt.eventType) {
        case 'right':
        case 'swipeRight':
          if (focusedIndex < videos.length - 1) {
            const newIndex = focusedIndex + 1;
            setFocusedIndex(newIndex);
          }
          break;

        case 'left':
        case 'swipeLeft':
          if (focusedIndex > 0) {
            const newIndex = focusedIndex - 1;
            setFocusedIndex(newIndex);
          }
          break;

        case 'select':
        case 'playPause':
          handleItemPress(videos[focusedIndex]);
          break;
      }
    }
  };

  const handleItemPress = (item: any) => {
    if (isNavigating.current) return; // Prevent multiple rapid navigations

    isNavigating.current = true;
    router.replace({
      pathname: '/video',
      params: { video: JSON.stringify(item) }
    });

    // Reset navigation flag after a delay
    setTimeout(() => {
      isNavigating.current = false;
    }, 1000);
  };

  const handleImageLoad = (id: string) => {
    setImageLoading(prev => ({ ...prev, [id]: false }));
  };

  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
    setImageLoading(prev => ({ ...prev, [id]: false }));
  };

  const handleImageLoadStart = (id: string) => {
    setImageLoading(prev => ({ ...prev, [id]: true }));
  };

  // Handle background image change with fade animation
  useEffect(() => {
    const newImageUrl = videos[focusedIndex]?.backdrop || '';

    if (newImageUrl !== backgroundImageUrl) {
      // Fade out current background
      Animated.timing(backgroundOpacity, {
        toValue: 0.3,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        // Update background image
        setBackgroundImageUrl(newImageUrl);
        // Fade in new background
        Animated.timing(backgroundOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });

      // Animate overlay for emphasis
      Animated.sequence([
        Animated.timing(overlayOpacity, {
          toValue: 0.8,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0.6,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [focusedIndex, backgroundImageUrl]);

  return (
    <HomeTemplate
      videos={videos}
      focusedIndex={focusedIndex}
      focusedSection={focusedSection}
      imageErrors={imageErrors}
      imageLoading={imageLoading}
      backgroundImageUrl={backgroundImageUrl}
      backgroundOpacity={backgroundOpacity}
      overlayOpacity={overlayOpacity}
      onItemPress={handleItemPress}
      onImageLoad={handleImageLoad}
      onImageError={handleImageError}
      onImageLoadStart={handleImageLoadStart}
      onTVEvent={handleTVEvent}
      onPlayFeatured={() => handleItemPress(videos[focusedIndex])}
      onAddToList={() => console.log('Added to list')}
      fallbackImage={require('../assets/images/react-logo.png')}
      showDebugInfo={true}
    />
  );
}
