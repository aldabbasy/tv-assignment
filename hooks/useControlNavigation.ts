import { useState, useRef, useEffect } from 'react';

type ControlType = 'back' | 'seekBack' | 'playPause' | 'seekForward';

interface ControlRefs {
	playPauseRef: React.RefObject<any>;
	seekBackRef: React.RefObject<any>;
	seekForwardRef: React.RefObject<any>;
	backRef: React.RefObject<any>;
}

interface ControlNavigationState {
	focusedControl: string | null;
	navigateControls: (direction: 'left' | 'right') => void;
	setFocusedControl: (control: string | null) => void;
	controlRefs: ControlRefs;
}

export function useControlNavigation(
	showControls: boolean
): ControlNavigationState {
	const [focusedControl, setFocusedControl] = useState<string | null>(null);

	// Control button refs
	const playPauseRef = useRef<any>(null);
	const seekBackRef = useRef<any>(null);
	const seekForwardRef = useRef<any>(null);
	const backRef = useRef<any>(null);

	const controlRefs = {
		playPauseRef,
		seekBackRef,
		seekForwardRef,
		backRef,
	};

	const navigateControls = (direction: 'left' | 'right') => {
		const controls: ControlType[] = [
			'back',
			'seekBack',
			'playPause',
			'seekForward',
		];
		const currentIndex = focusedControl
			? controls.indexOf(focusedControl as ControlType)
			: 2; // Default to playPause

		let newIndex;
		if (direction === 'left') {
			newIndex = currentIndex > 0 ? currentIndex - 1 : controls.length - 1;
		} else {
			newIndex = currentIndex < controls.length - 1 ? currentIndex + 1 : 0;
		}

		const newControl = controls[newIndex];
		setFocusedControl(newControl);

		// Focus the appropriate button
		switch (newControl) {
			case 'back':
				backRef.current?.focus();
				break;
			case 'seekBack':
				seekBackRef.current?.focus();
				break;
			case 'playPause':
				playPauseRef.current?.focus();
				break;
			case 'seekForward':
				seekForwardRef.current?.focus();
				break;
		}
	};

	// Auto-focus play/pause button when controls are shown
	useEffect(() => {
		if (showControls && !focusedControl) {
			setFocusedControl('playPause');
			setTimeout(() => {
				playPauseRef.current?.focus();
			}, 50); // Reduced timeout for faster response
		} else if (!showControls) {
			setFocusedControl(null);
		}
	}, [showControls]);

	return {
		focusedControl,
		navigateControls,
		setFocusedControl,
		controlRefs,
	};
}
