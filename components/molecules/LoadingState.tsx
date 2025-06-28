import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LoadingSpinner, Text, Container } from '../atoms';

interface LoadingStateProps {
  message?: string;
  overlay?: boolean;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = "Loading...",
  overlay = false,
}) => {
  return (
    <Container
      style={overlay ? styles.overlayContainer : styles.container}
      backgroundColor={overlay ? 'rgba(0, 0, 0, 0.7)' : undefined}
    >
      <LoadingSpinner size="large" color="#fff" />
      <Text variant="body" centered style={styles.message}>
        {message}
      </Text>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    marginTop: 16,
  },
});
