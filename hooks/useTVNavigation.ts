import { useTVEventHandler } from 'react-native';

interface VideoPlayerActions {
	togglePlayPause: () => Promise<void>;
	seekBackward: () => Promise<void>;
	seekForward: () => Promise<void>;
	handleGoBack: () => void;
}

interface NavigationState {
	focusedControl: string | null;
	showControls: boolean;
	navigateControls: (direction: 'left' | 'right') => void;
	setFocusedControl: (control: string | null) => void;
	setShowControls: (show: boolean) => void;
	showControlsWithTimer: () => void;
	controlRefs: {
		playPauseRef: React.RefObject<any>;
		seekBackRef: React.RefObject<any>;
		seekForwardRef: React.RefObject<any>;
		backRef: React.RefObject<any>;
	};
}

export function useTVNavigation(
	actions: VideoPlayerActions,
	navigationState: NavigationState
) {
	const { togglePlayPause, seekBackward, seekForward, handleGoBack } = actions;

	const {
		focusedControl,
		showControls,
		navigateControls,
		setFocusedControl,
		setShowControls,
		showControlsWithTimer,
		controlRefs,
	} = navigationState;

	const videoTVEventHandler = (evt: any) => {
		if (evt && evt.eventType) {
			switch (evt.eventType) {
				case 'menu':
				case 'back':
					handleGoBack();
					break;

				case 'select':
				case 'enter':
					if (!showControls) {
						// If controls are hidden, show them and set focus
						showControlsWithTimer();
						setTimeout(() => {
							setFocusedControl('playPause');
							controlRefs.playPauseRef.current?.focus();
						}, 100);
					} else {
						// Controls are visible, execute action
						if (focusedControl === 'playPause') {
							togglePlayPause();
						} else if (focusedControl === 'seekBack') {
							seekBackward();
						} else if (focusedControl === 'seekForward') {
							seekForward();
						} else if (focusedControl === 'back') {
							handleGoBack();
						} else {
							// Default to play/pause if no control is focused
							togglePlayPause();
						}
						showControlsWithTimer(); // Reset timer after action
					}
					break;

				case 'left':
				case 'swipeLeft':
					showControlsWithTimer(); // Always show controls first

					if (!showControls) {
						setTimeout(() => {
							setFocusedControl('playPause');
							controlRefs.playPauseRef.current?.focus();
						}, 100);
					} else {
						navigateControls('left');
					}
					break;

				case 'right':
				case 'swipeRight':
					showControlsWithTimer(); // Always show controls first

					if (!showControls) {
						setTimeout(() => {
							setFocusedControl('playPause');
							controlRefs.playPauseRef.current?.focus();
						}, 100);
					} else {
						navigateControls('right');
					}
					break;

				case 'up':
					showControlsWithTimer();
					if (!focusedControl) {
						setTimeout(() => {
							setFocusedControl('playPause');
							controlRefs.playPauseRef.current?.focus();
						}, 150);
					}
					break;

				case 'down':
					setShowControls(false);
					setFocusedControl(null);
					break;

				case 'playPause':
				case 'play':
				case 'pause':
					showControlsWithTimer();
					togglePlayPause();
					break;

				default:
					// Show controls and reset timer on any other interaction
					if (evt.eventType !== 'unknown') {
						showControlsWithTimer();
					}
					break;
			}
		}
	};

	useTVEventHandler(videoTVEventHandler);
}
