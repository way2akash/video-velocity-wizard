
export interface VideoSpeedSettings {
  speed: number;
  domain: string;
  videoId?: string;
  lastUsed: number;
}

export interface KeyboardShortcuts {
  speedUp: string;
  slowDown: string;
  reset: string;
  turboMode: string;
}

export interface SpeedProfile {
  id: string;
  name: string;
  speed: number;
  description: string;
}

export interface UISettings {
  theme: 'light' | 'dark' | 'transparent';
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  mode: 'compact' | 'full';
  visible: boolean;
}

export interface ControllerSettings {
  rewindInterval: number;
  forwardInterval: number;
  mouseWheelEnabled: boolean;
  speedLocked: boolean;
  autoApplyDefaults: boolean;
  whitelistedSites: string[];
  blacklistedSites: string[];
}
