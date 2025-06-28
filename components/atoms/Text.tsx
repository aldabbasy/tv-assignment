import React from 'react';
import { Text as RNText, StyleSheet, TextStyle } from 'react-native';

interface TextProps {
  children: React.ReactNode;
  variant?: 'heading' | 'body' | 'caption' | 'error' | 'debug';
  color?: string;
  centered?: boolean;
  bold?: boolean;
  style?: TextStyle;
  accessible?: boolean;
  accessibilityLabel?: string;
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  color,
  centered = false,
  bold = false,
  style,
  accessible = true,
  accessibilityLabel,
}) => {
  return (
    <RNText
      style={[
        styles.base,
        styles[variant],
        centered && styles.centered,
        bold && styles.bold,
        color && { color },
        style,
      ]}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  base: {
    color: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 16,
  },
  caption: {
    fontSize: 12,
  },
  error: {
    fontSize: 16,
    color: '#ff6b6b',
  },
  debug: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  centered: {
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
});
