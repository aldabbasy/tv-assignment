import React from 'react';
import { View, StyleSheet } from 'react-native';

interface FocusIndicatorProps {
  focused: boolean;
  size?: number;
  color?: string;
}

export const FocusIndicator: React.FC<FocusIndicatorProps> = ({
  focused,
  size = 8,
  color = '#1e90ff',
}) => {
  return (
    <View
      style={[
        styles.indicator,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: focused ? color : 'rgba(255, 255, 255, 0.3)',
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  indicator: {
    marginHorizontal: 4,
  },
});
