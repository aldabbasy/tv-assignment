import { useState, useRef, useEffect } from 'react';

interface IdleStateOptions {
	hideDelayMs?: number;
	isPlaying: boolean;
	error: boolean;
	loading: boolean;
	onHideControls?: () => void;
}

interface IdleState {
	showControls: boolean;
	resetHideTimer: () => void;
	showControlsWithTimer: () => void;
	setShowControls: (show: boolean) => void;
}

export function useIdleState({
	hideDelayMs = 5000,
	isPlaying,
	error,
	loading,
	onHideControls,
}: IdleStateOptions): IdleState {
	const [showControls, setShowControls] = useState(true);
	const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const resetHideTimer = () => {
		if (hideTimerRef.current) {
			clearTimeout(hideTimerRef.current);
		}

		// Only start hide timer if video is playing
		if (isPlaying && !error && !loading) {
			hideTimerRef.current = setTimeout(() => {
				setShowControls(false);
				onHideControls?.();
			}, hideDelayMs);
		}
	};

	const showControlsWithTimer = () => {
		setShowControls(true);
		resetHideTimer();
	};

	// Reset timer when playing state changes
	useEffect(() => {
		resetHideTimer();

		// Cleanup on unmount
		return () => {
			if (hideTimerRef.current) {
				clearTimeout(hideTimerRef.current);
			}
		};
	}, [isPlaying, error, loading]);

	// Show controls initially and reset timer
	useEffect(() => {
		if (!error && !loading) {
			showControlsWithTimer();
		}
	}, [error, loading]);

	return {
		showControls,
		resetHideTimer,
		showControlsWithTimer,
		setShowControls,
	};
}
