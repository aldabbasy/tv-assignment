import { useState, useRef } from 'react';
import { Video } from 'expo-av';

interface VideoControlsState {
	loading: boolean;
	error: boolean;
	errorMessage: string;
	status: any;
	isPlaying: boolean;
	retryCount: number;
}

interface VideoControlsActions {
	togglePlayPause: () => Promise<void>;
	seekBackward: () => Promise<void>;
	seekForward: () => Promise<void>;
	retryVideo: () => void;
	setLoading: (loading: boolean) => void;
	setError: (error: boolean) => void;
	setErrorMessage: (message: string) => void;
	setStatus: (status: any) => void;
	setIsPlaying: (playing: boolean) => void;
}

export function useVideoControls(
	videoRef: React.RefObject<Video | null>
): VideoControlsState & VideoControlsActions {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [status, setStatus] = useState<any>({});
	const [isPlaying, setIsPlaying] = useState(true);
	const [retryCount, setRetryCount] = useState(0);

	const togglePlayPause = async () => {
		if (videoRef.current) {
			try {
				if (status.isLoaded) {
					if (isPlaying) {
						await videoRef.current.pauseAsync();
						setIsPlaying(false);
					} else {
						await videoRef.current.playAsync();
						setIsPlaying(true);
					}
				} else {
				}
			} catch (error) {
				console.error('Error controlling video:', error);
			}
		} else {
		}
	};

	const seekBackward = async () => {
		if (
			videoRef.current &&
			status.isLoaded &&
			typeof status.positionMillis === 'number'
		) {
			try {
				const newPosition = Math.max(0, status.positionMillis - 10000);
				await videoRef.current.setPositionAsync(newPosition);
			} catch (error) {
				console.error('Error seeking backward:', error);
			}
		} else {
		}
	};

	const seekForward = async () => {
		if (
			videoRef.current &&
			status.isLoaded &&
			typeof status.positionMillis === 'number' &&
			typeof status.durationMillis === 'number'
		) {
			try {
				const newPosition = Math.min(
					status.durationMillis,
					status.positionMillis + 10000
				);
				await videoRef.current.setPositionAsync(newPosition);
			} catch (error) {
				console.error('Error seeking forward:', error);
			}
		}
	};

	const retryVideo = () => {
		setError(false);
		setErrorMessage('');
		setLoading(true);
		setRetryCount((prev) => prev + 1);
	};

	return {
		loading,
		error,
		errorMessage,
		status,
		isPlaying,
		retryCount,
		togglePlayPause,
		seekBackward,
		seekForward,
		retryVideo,
		setLoading,
		setError,
		setErrorMessage,
		setStatus,
		setIsPlaying,
	};
}
