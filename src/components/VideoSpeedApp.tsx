
import React, { useState } from 'react';
import { SpeedController } from './SpeedController';
import { SettingsPanel } from './SettingsPanel';
import { useVideoDetection } from '../hooks/useVideoDetection';
import { useSpeedController } from '../hooks/useSpeedController';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { UISettings, ControllerSettings } from '../types';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

const DEFAULT_UI_SETTINGS: UISettings = {
  theme: 'dark',
  position: 'top-right',
  mode: 'full',
  visible: true
};

const DEFAULT_CONTROLLER_SETTINGS: ControllerSettings = {
  rewindInterval: 10,
  forwardInterval: 10,
  mouseWheelEnabled: true,
  speedLocked: false,
  autoApplyDefaults: true,
  whitelistedSites: [],
  blacklistedSites: []
};

export const VideoSpeedApp: React.FC = () => {
  const [uiSettings, setUISettings] = useState<UISettings>(DEFAULT_UI_SETTINGS);
  const [controllerSettings, setControllerSettings] = useState<ControllerSettings>(DEFAULT_CONTROLLER_SETTINGS);
  const [showSettings, setShowSettings] = useState(false);

  const { activeVideo } = useVideoDetection();
  const {
    currentSpeed,
    isLocked,
    activeProfile,
    profiles,
    speedUp,
    slowDown,
    resetSpeed,
    turboMode,
    changeSpeed,
    applyProfile,
    setIsLocked
  } = useSpeedController(activeVideo);

  useKeyboardShortcuts(speedUp, slowDown, resetSpeed, turboMode);

  const handleLockToggle = () => {
    setIsLocked(!isLocked);
  };

  // Only show controller if video is detected and not on blacklisted sites
  const shouldShowController = activeVideo && uiSettings.visible;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Settings Button */}
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setShowSettings(true)}
        className="fixed top-4 left-4 pointer-events-auto z-[10001] h-8 w-8 p-0"
      >
        <Settings className="h-4 w-4" />
      </Button>

      {/* Speed Controller */}
      {shouldShowController && (
        <div className="pointer-events-auto">
          <SpeedController
            currentSpeed={currentSpeed}
            isLocked={isLocked}
            activeProfile={activeProfile}
            profiles={profiles}
            uiSettings={uiSettings}
            onSpeedChange={changeSpeed}
            onLockToggle={handleLockToggle}
            onProfileChange={applyProfile}
            onSpeedUp={speedUp}
            onSlowDown={slowDown}
            onReset={resetSpeed}
            onTurbo={turboMode}
          />
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <div className="pointer-events-auto">
          <SettingsPanel
            uiSettings={uiSettings}
            controllerSettings={controllerSettings}
            onUISettingsChange={setUISettings}
            onControllerSettingsChange={setControllerSettings}
            onClose={() => setShowSettings(false)}
          />
        </div>
      )}

      {/* Video Detection Status */}
      {!activeVideo && (
        <div className="fixed bottom-4 left-4 pointer-events-auto">
          <div className="bg-yellow-500/90 text-black px-3 py-2 rounded-lg text-sm font-medium">
            No video detected on this page
          </div>
        </div>
      )}
    </div>
  );
};
