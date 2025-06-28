import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Container } from '../atoms';

interface ErrorStateProps {
  title?: string;
  message?: string;
  details?: string;
  url?: string;
  onRetry?: () => void;
  retryLabel?: string;
  backLabel?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Error loading video",
  message,
  details,
  url,
  onRetry,
  retryLabel = "Retry",
}) => {
  return (
    <Container style={styles.container}>
      <Text variant="error" centered style={styles.title}>
        {title}
      </Text>

      {message && (
        <Text variant="body" centered style={styles.message}>
          {message}
        </Text>
      )}

      {details && (
        <Text variant="caption" centered style={styles.details}>
          {details}
        </Text>
      )}

      {url && (
        <Text variant="caption" centered style={styles.url}>
          URL: {url}
        </Text>
      )}

      <View style={styles.buttonContainer}>
        {onRetry && (
          <Button
            title={retryLabel}
            onPress={onRetry}
            variant="primary"
            style={styles.button}
          />
        )}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    marginBottom: 16,
  },
  message: {
    marginBottom: 12,
  },
  details: {
    marginBottom: 8,
  },
  url: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  button: {
    minWidth: 120,
  },
});
