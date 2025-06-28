import React, { useRef, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { VideoCard } from '../molecules';

interface VideoCarouselProps {
  videos: Array<{
    id: string;
    title: string;
    thumbnail: string;
    url: string;
  }>;
  focusedIndex: number;
  imageErrors: Record<string, boolean>;
  imageLoading: Record<string, boolean>;
  onItemPress: (item: any) => void;
  onImageLoad: (id: string) => void;
  onImageError: (id: string) => void;
  onImageLoadStart: (id: string) => void;
  fallbackImage?: any;
  showDebugInfo?: boolean;
}

export const VideoCarousel: React.FC<VideoCarouselProps> = ({
  videos,
  focusedIndex,
  imageErrors,
  imageLoading,
  onItemPress,
  onImageLoad,
  onImageError,
  onImageLoadStart,
  fallbackImage,
  showDebugInfo = false,
}) => {
  const flatListRef = useRef<FlatList>(null);

  const scrollToIndex = (index: number) => {
    if (flatListRef.current && index >= 0 && index < videos.length) {
      try {
        flatListRef.current.scrollToIndex({
          index,
          animated: true,
          viewPosition: 0.5, // Center the item in the viewport
        });
      } catch (error) {
        // Fallback to scrollToOffset if scrollToIndex fails
        console.warn('scrollToIndex failed, using scrollToOffset:', error);
        const offset = index * 320; // item width + margin
        flatListRef.current.scrollToOffset({
          offset,
          animated: true,
        });
      }
    }
  };

  // Auto-scroll to focused item when focusedIndex changes
  useEffect(() => {
    if (focusedIndex >= 0 && focusedIndex < videos.length && videos.length > 0) {
      // Small delay to ensure the list is rendered and avoid race conditions
      const timeoutId = setTimeout(() => {
        scrollToIndex(focusedIndex);
      }, 150);

      return () => clearTimeout(timeoutId);
    }
  }, [focusedIndex, videos.length]);

  return (
    <FlatList
      ref={flatListRef}
      horizontal
      data={videos}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
      removeClippedSubviews={false}
      initialScrollIndex={0}
      scrollEnabled={true}
      nestedScrollEnabled={false}
      decelerationRate="fast"
      scrollEventThrottle={16}
      onScrollToIndexFailed={(info) => {
        // Handle scroll to index failure gracefully
        console.warn('Scroll to index failed:', info);
        const wait = new Promise(resolve => setTimeout(resolve, 500));
        wait.then(() => {
          if (flatListRef.current) {
            flatListRef.current.scrollToIndex({
              index: info.index,
              animated: true,
              viewPosition: 0.5,
            });
          }
        });
      }}
      getItemLayout={(data, index) => ({
        length: 320, // width + margin
        offset: 320 * index,
        index,
      })}
      renderItem={({ item, index }) => (
        <VideoCard
          item={item}
          focused={focusedIndex === index}
          imageError={imageErrors[item.id] || false}
          imageLoading={imageLoading[item.id] || false}
          onPress={() => onItemPress(item)}
          onImageLoad={() => onImageLoad(item.id)}
          onImageError={() => onImageError(item.id)}
          onImageLoadStart={() => onImageLoadStart(item.id)}
          fallbackImage={fallbackImage}
          showDebugInfo={showDebugInfo}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 50,
  },
});
