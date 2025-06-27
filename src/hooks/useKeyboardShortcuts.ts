
import { useEffect } from 'react';
import { KeyboardShortcuts } from '../types';

const DEFAULT_SHORTCUTS: KeyboardShortcuts = {
  speedUp: 'ctrl+alt+d',
  slowDown: 'ctrl+alt+s',
  reset: 'ctrl+alt+r',
  turboMode: 'shift+d'
};

export const useKeyboardShortcuts = (
  speedUp: () => void,
  slowDown: () => void,
  resetSpeed: () => void,
  turboMode: () => void,
  shortcuts: KeyboardShortcuts = DEFAULT_SHORTCUTS
) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const ctrl = event.ctrlKey;
      const alt = event.altKey;
      const shift = event.shiftKey;

      // Prevent default behavior for our shortcuts
      const isOurShortcut = 
        (ctrl && alt && ['d', 's', 'r'].includes(key)) ||
        (shift && key === 'd');

      if (isOurShortcut) {
        event.preventDefault();
        event.stopPropagation();
      }

      // Speed up: Ctrl+Alt+D
      if (ctrl && alt && key === 'd') {
        speedUp();
      }
      // Slow down: Ctrl+Alt+S
      else if (ctrl && alt && key === 's') {
        slowDown();
      }
      // Reset: Ctrl+Alt+R
      else if (ctrl && alt && key === 'r') {
        resetSpeed();
      }
      // Turbo mode: Shift+D
      else if (shift && key === 'd') {
        turboMode();
      }
    };

    window.addEventListener('keydown', handleKeyPress, true);
    return () => window.removeEventListener('keydown', handleKeyPress, true);
  }, [speedUp, slowDown, resetSpeed, turboMode, shortcuts]);
};
