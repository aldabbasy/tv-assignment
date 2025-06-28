import React from 'react';
import { StyleSheet } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Container } from '../atoms';
import { LoadingState, ErrorState } from '../molecules';
import { PlayerControls } from '../organisms';

interface PlayerTemplateProps {
  videoRef: React.RefObject<Video | null>;
  video: {
    id: string;
    title: string;
    thumbnail: string;
    url: string;
  };
  loading: boolean;
  error: boolean;
  errorMessage?: string;
  isPlaying: boolean;
  status: any;
  showControls: boolean;
  focusedControl: string | null;
  onLoadStart: () => void;
  onLoad: (loadStatus: any) => void;
  onError: (error: any) => void;
  onPlaybackStatusUpdate: (playbackStatus: any) => void;
  onShowControls: () => void;
  onPlayPause: () => void;
  onSeekBackward: () => void;
  onSeekForward: () => void;
  onRetry: () => void;
  setFocusedControl?: (control: string | null) => void;
  controlRefs: {
    playPauseRef: React.RefObject<any>;
    seekBackRef: React.RefObject<any>;
    seekForwardRef: React.RefObject<any>;
    backRef: React.RefObject<any>;
  };
}

export const PlayerTemplate: React.FC<PlayerTemplateProps> = ({
  videoRef,
  video,
  loading,
  error,
  errorMessage,
  isPlaying,
  status,
  showControls,
  focusedControl,
  onLoadStart,
  onLoad,
  onError,
  onPlaybackStatusUpdate,
  onShowControls,
  onPlayPause,
  onSeekBackward,
  onSeekForward,
  onRetry,
  setFocusedControl,
  controlRefs,
}) => {
  const position = (status?.isLoaded && status?.positionMillis) ? status.positionMillis / 1000 : 0;
  const duration = (status?.isLoaded && status?.durationMillis) ? status.durationMillis / 1000 : 0;

  return (
    <Container style={styles.container}>
      {loading && (
        <LoadingState message="Loading video..." overlay />
      )}

      {error && (
        <ErrorState
          title="Failed to load video"
          message={errorMessage}
          url={video.url}
          onRetry={onRetry}
          retryLabel="Retry"
          backLabel="Go Back to Home"
        />
      )}

      {!error && (
        <Video
          ref={videoRef}
          source={{
            uri: video.url,
            headers: {
              'User-Agent': 'ExpoAV/1.0'
            }
          }}
          style={styles.video}
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay={isPlaying}
          useNativeControls={false}
          isLooping={false}
          volume={1.0}
          isMuted={false}
          progressUpdateIntervalMillis={1000}
          onLoadStart={onLoadStart}
          onLoad={onLoad}
          onError={onError}
          onPlaybackStatusUpdate={onPlaybackStatusUpdate}
        />
      )}

      {/* Video player overlay with accessible controls */}
      {!loading && !error && (
        <PlayerControls
          showControls={showControls}
          isPlaying={isPlaying}
          position={position}
          duration={duration}
          focusedControl={focusedControl}
          videoTitle={video.title}
          onPlayPause={onPlayPause}
          onSeekBackward={onSeekBackward}
          onSeekForward={onSeekForward}
          onShowControls={onShowControls}
          setFocusedControl={setFocusedControl}
          controlRefs={controlRefs}
        />
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  video: {
    flex: 1,
  },
});
