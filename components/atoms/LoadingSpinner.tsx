import React from 'react';
import { ActivityIndicator as RNActivityIndicator, View, StyleSheet } from 'react-native';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  overlay?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  color = '#fff',
  overlay = false,
}) => {
  if (overlay) {
    return (
      <View style={styles.overlay}>
        <RNActivityIndicator size={size} color={color} />
      </View>
    );
  }

  return <RNActivityIndicator size={size} color={color} />;
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
});
