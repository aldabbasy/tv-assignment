import React, { forwardRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, AccessibilityRole } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  focused?: boolean;
  variant?: 'primary' | 'secondary' | 'control';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityRole?: AccessibilityRole;
}

export const Button = React.forwardRef(({
  title,
  onPress,
  focused = false,
  variant = 'primary',
  disabled = false,
  style,
  textStyle,
  accessible = true,
  accessibilityLabel,
  accessibilityRole = 'button',
}: ButtonProps, ref: any) => {
  return (
    <TouchableOpacity
      ref={ref}
      style={[
        styles.button,
        styles[variant],
        focused && styles.focused,
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityRole={accessibilityRole}
    >
      <Text
        style={[
          styles.text,
          styles[`${variant}Text`],
          focused && styles.focusedText,
          disabled && styles.disabledText,
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: 'rgba(30, 144, 255, 0.3)',
    borderColor: 'rgba(30, 144, 255, 0.5)',
    borderWidth: 2,
  },
  secondary: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  control: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    minWidth: 100,
  },
  focused: {
    backgroundColor: 'rgba(30, 144, 255, 0.4)',
    borderColor: '#1e90ff',
    borderWidth: 3,
    transform: [{ scale: 1.05 }],
    shadowColor: '#1e90ff',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 12,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryText: {
    color: '#fff',
    fontSize: 16,
  },
  secondaryText: {
    color: '#fff',
  },
  controlText: {
    color: '#fff',
  },
  focusedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  disabledText: {
    opacity: 0.6,
  },
});
