import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, Button } from '../atoms';

interface PlayerControlsProps {
  showControls: boolean;
  isPlaying: boolean;
  position: number;
  duration: number;
  focusedControl: string | null;
  videoTitle: string;
  onPlayPause: () => void;
  onSeekBackward: () => void;
  onSeekForward: () => void;
  onShowControls: () => void;
  setFocusedControl?: (control: string | null) => void;
  controlRefs: {
    playPauseRef: React.RefObject<any>;
    seekBackRef: React.RefObject<any>;
    seekForwardRef: React.RefObject<any>;
    backRef: React.RefObject<any>;
  };
}

export const PlayerControls: React.FC<PlayerControlsProps> = ({
  showControls,
  isPlaying,
  position,
  duration,
  focusedControl,
  videoTitle,
  onPlayPause,
  onSeekBackward,
  onSeekForward,
  onShowControls,
  controlRefs,
}) => {
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <TouchableOpacity
      style={styles.overlayContainer}
      activeOpacity={1}
      onPress={onShowControls}
    >
      {showControls && (
        <View style={styles.statusBar}>
          <Text variant="body" style={styles.statusText} color="#fff">
            {videoTitle} • {formatTime(position)} / {formatTime(duration)}
          </Text>
        </View>
      )}

      {showControls && (
        <View style={styles.controlsContainer}>
          <Button
            ref={(ref: any) => {
              if (controlRefs.seekBackRef) {
                controlRefs.seekBackRef.current = ref;
              }
            }}
            title="⏪ -10s"
            onPress={onSeekBackward}
            focused={focusedControl === 'seekBack'}
            variant="control"
            style={styles.controlButton}
            textStyle={{ fontSize: 16, fontWeight: '600' }}
            accessible={true}
            accessibilityLabel="Seek backward 10 seconds"
          />

          <Button
            ref={(ref: any) => {
              if (controlRefs.playPauseRef) {
                controlRefs.playPauseRef.current = ref;
              }
            }}
            title={isPlaying ? '⏸️ Pause' : '▶️ Play'}
            onPress={onPlayPause}
            focused={focusedControl === 'playPause'}
            variant="primary"
            style={styles.playButton}
            textStyle={{ fontSize: 18, fontWeight: 'bold' }}
            accessible={true}
            accessibilityLabel={isPlaying ? 'Pause video' : 'Play video'}
          />

          <Button
            ref={(ref: any) => {
              if (controlRefs.seekForwardRef) {
                controlRefs.seekForwardRef.current = ref;
              }
            }}
            title="⏩ +10s"
            onPress={onSeekForward}
            focused={focusedControl === 'seekForward'}
            variant="control"
            style={styles.controlButton}
            textStyle={{ fontSize: 16, fontWeight: '600' }}
            accessible={true}
            accessibilityLabel="Seek forward 10 seconds"
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 80,
    paddingHorizontal: 40,
    pointerEvents: 'box-none',
  },
  statusBar: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
    alignSelf: 'center',
    maxWidth: '80%',
    minWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  statusText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  controlsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    borderRadius: 40,
    paddingHorizontal: 32,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    alignSelf: 'center',
    minWidth: 600,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 12,
  },
  controlButton: {
    minWidth: 100,
    height: 60,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  playButton: {
    minWidth: 120,
    height: 70,
    borderRadius: 35,
    paddingHorizontal: 24,
    backgroundColor: 'rgba(30, 144, 255, 0.2)',
  },
});
