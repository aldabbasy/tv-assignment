import React, { useRef } from 'react';
import { BackHandler } from 'react-native';
import { Video } from 'expo-av';
import { router, useLocalSearchParams, useFocusEffect } from 'expo-router';
import { PlayerTemplate } from '../components/templates';
import { useVideoControls } from '../hooks/useVideoControls';
import { useIdleState } from '../hooks/useIdleState';
import { useControlNavigation } from '../hooks/useControlNavigation';
import { useTVNavigation } from '../hooks/useTVNavigation';

export default function PlayerScreen() {
  const { video: videoParam } = useLocalSearchParams();
  const video = JSON.parse(videoParam as string);
  const videoRef = useRef<Video>(null);

  const handleGoBack = () => {
    router.replace('/home');
  };

  // Use custom hooks for separated concerns
  const videoControls = useVideoControls(videoRef);
  const idleState = useIdleState({
    isPlaying: videoControls.isPlaying,
    error: videoControls.error,
    loading: videoControls.loading,
    onHideControls: () => controlNavigation.setFocusedControl(null),
  });
  const controlNavigation = useControlNavigation(idleState.showControls);

  // Handle Android back button and prevent app exit
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        handleGoBack();
        return true; // Prevent default behavior
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => subscription.remove();
    }, [])
  );

  // Setup TV navigation
  useTVNavigation(
    {
      togglePlayPause: videoControls.togglePlayPause,
      seekBackward: videoControls.seekBackward,
      seekForward: videoControls.seekForward,
      handleGoBack,
    },
    {
      focusedControl: controlNavigation.focusedControl,
      showControls: idleState.showControls,
      navigateControls: controlNavigation.navigateControls,
      setFocusedControl: controlNavigation.setFocusedControl,
      setShowControls: idleState.setShowControls,
      showControlsWithTimer: idleState.showControlsWithTimer,
      controlRefs: controlNavigation.controlRefs,
    }
  );

  const handleLoadStart = () => {
    videoControls.setLoading(true);
  };

  const handleLoad = (loadStatus: any) => {
    videoControls.setLoading(false);
    videoControls.setIsPlaying(true);
  };

  const handleError = (error: any) => {
    console.error('Video error for URL:', video.url, error);
    videoControls.setErrorMessage(`Error loading video: ${error || 'Unknown error'}`);
    videoControls.setError(true);
    videoControls.setLoading(false);
  };

  const handlePlaybackStatusUpdate = (playbackStatus: any) => {
    videoControls.setStatus(playbackStatus);
    if (playbackStatus.isLoaded) {
      videoControls.setIsPlaying(playbackStatus.isPlaying || false);
    } else if ('error' in playbackStatus) {
      // Handle potential errors in playback status
      console.error('Playback error:', playbackStatus.error);
      videoControls.setErrorMessage(`Playback error: ${playbackStatus.error || 'Unknown error'}`);
      videoControls.setError(true);
    }
  };

  const handleShowControls = () => {
    idleState.showControlsWithTimer();
  };

  return (
    <PlayerTemplate
      videoRef={videoRef}
      video={video}
      loading={videoControls.loading}
      error={videoControls.error}
      errorMessage={videoControls.errorMessage}
      isPlaying={videoControls.isPlaying}
      status={videoControls.status}
      showControls={idleState.showControls}
      focusedControl={controlNavigation.focusedControl}
      onLoadStart={handleLoadStart}
      onLoad={handleLoad}
      onError={handleError}
      onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
      onShowControls={handleShowControls}
      onPlayPause={videoControls.togglePlayPause}
      onSeekBackward={videoControls.seekBackward}
      onSeekForward={videoControls.seekForward}
      onRetry={videoControls.retryVideo}
      setFocusedControl={controlNavigation.setFocusedControl}
      controlRefs={controlNavigation.controlRefs}
    />
  );
}
