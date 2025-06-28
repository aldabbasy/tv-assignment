import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Container } from '../atoms';

interface VideoInfoOverlayProps {
  title: string;
  instructions?: string;
  opacity?: number;
}

export const VideoInfoOverlay: React.FC<VideoInfoOverlayProps> = ({
  title,
  instructions = "Use ← → to navigate • Press Enter to play",
  opacity = 0.6,
}) => {
  return (
    <Container
      variant="absolute"
      bottom={0}
      left={0}
      right={0}
      backgroundColor="rgba(0, 0, 0, 0.8)"
      padding={20}
      style={{ opacity }}
    >
      <Text variant="heading" centered style={styles.title}>
        {title}
      </Text>
      <Text variant="body" centered color="rgba(255, 255, 255, 0.8)">
        {instructions}
      </Text>
    </Container>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 8,
  },
});
