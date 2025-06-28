import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FocusIndicator } from '../atoms';

interface FocusIndicatorRowProps {
  items: any[];
  focusedIndex: number;
  indicatorSize?: number;
  indicatorColor?: string;
}

export const FocusIndicatorRow: React.FC<FocusIndicatorRowProps> = ({
  items,
  focusedIndex,
  indicatorSize = 8,
  indicatorColor = '#1e90ff',
}) => {
  return (
    <View style={styles.container}>
      {items.map((_, index) => (
        <FocusIndicator
          key={index}
          focused={focusedIndex === index}
          size={indicatorSize}
          color={indicatorColor}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
