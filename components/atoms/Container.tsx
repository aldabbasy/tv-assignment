import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface ContainerProps {
  children: React.ReactNode;
  variant?: 'default' | 'overlay' | 'card' | 'absolute';
  style?: ViewStyle;
  padding?: number;
  backgroundColor?: string;
  borderRadius?: number;
  flex?: number;
  position?: 'absolute' | 'relative';
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  variant = 'default',
  style,
  padding,
  backgroundColor,
  borderRadius,
  flex,
  position,
  top,
  bottom,
  left,
  right,
}) => {
  // Filter out undefined values to avoid React Native style issues
  const containerStyle: ViewStyle = {};

  if (padding !== undefined) containerStyle.padding = padding;
  if (backgroundColor !== undefined) containerStyle.backgroundColor = backgroundColor;
  if (borderRadius !== undefined) containerStyle.borderRadius = borderRadius;
  if (flex !== undefined) containerStyle.flex = flex;
  if (position !== undefined) containerStyle.position = position;
  if (top !== undefined) containerStyle.top = top;
  if (bottom !== undefined) containerStyle.bottom = bottom;
  if (left !== undefined) containerStyle.left = left;
  if (right !== undefined) containerStyle.right = right;

  return (
    <View style={[styles.base, styles[variant], containerStyle, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {},
  default: {
    flex: 1,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  card: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  absolute: {
    position: 'absolute',
  },
});
