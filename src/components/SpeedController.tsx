
import React, { useState, useRef, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { SpeedProfile, UISettings } from '../types';
import { FastForward, Rewind, RotateCcw, Lock, Unlock } from 'lucide-react';

interface SpeedControllerProps {
  currentSpeed: number;
  isLocked: boolean;
  activeProfile: SpeedProfile;
  profiles: SpeedProfile[];
  uiSettings: UISettings;
  onSpeedChange: (speed: number) => void;
  onLockToggle: () => void;
  onProfileChange: (profile: SpeedProfile) => void;
  onSpeedUp: () => void;
  onSlowDown: () => void;
  onReset: () => void;
  onTurbo: () => void;
}

export const SpeedController: React.FC<SpeedControllerProps> = ({
  currentSpeed,
  isLocked,
  activeProfile,
  profiles,
  uiSettings,
  onSpeedChange,
  onLockToggle,
  onProfileChange,
  onSpeedUp,
  onSlowDown,
  onReset,
  onTurbo
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const dragRef = useRef<HTMLDivElement>(null);

  const speedToSliderValue = (speed: number) => Math.log10(speed) * 50 + 50;
  const sliderValueToSpeed = (value: number) => Math.pow(10, (value - 50) / 50);

  const handleSliderChange = (values: number[]) => {
    if (!isLocked) {
      const speed = sliderValueToSpeed(values[0]);
      const roundedSpeed = Math.round(speed * 20) / 20;
      onSpeedChange(roundedSpeed);
    }
  };

  // Dragging functionality
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      setPosition({
        x: e.clientX - 150, // Half of controller width
        y: e.clientY - 50   // Offset for better positioning
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const getPositionStyle = () => {
    if (isDragging) {
      return {
        position: 'fixed' as const,
        left: position.x,
        top: position.y,
        zIndex: 10000
      };
    }

    const baseStyle = {
      position: 'fixed' as const,
      zIndex: 10000
    };

    switch (uiSettings.position) {
      case 'top-left':
        return { ...baseStyle, top: 20, left: 20 };
      case 'top-right':
        return { ...baseStyle, top: 20, right: 20 };
      case 'bottom-left':
        return { ...baseStyle, bottom: 20, left: 20 };
      case 'bottom-right':
        return { ...baseStyle, bottom: 20, right: 20 };
      default:
        return { ...baseStyle, top: 20, right: 20 };
    }
  };

  const getThemeClasses = () => {
    switch (uiSettings.theme) {
      case 'dark':
        return 'bg-gray-900/95 text-white border-gray-700';
      case 'transparent':
        return 'bg-black/20 backdrop-blur-md text-white border-white/20';
      case 'light':
      default:
        return 'bg-white/95 text-gray-900 border-gray-200';
    }
  };

  if (!uiSettings.visible) return null;

  return (
    <Card 
      ref={dragRef}
      className={`${getThemeClasses()} shadow-lg cursor-move min-w-[300px] ${
        uiSettings.mode === 'compact' ? 'p-3' : 'p-4'
      }`}
      style={getPositionStyle()}
      onMouseDown={() => setIsDragging(true)}
    >
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs font-mono">
              {currentSpeed.toFixed(2)}×
            </Badge>
            <span className="text-sm font-medium">{activeProfile.name}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onLockToggle}
            className="h-6 w-6 p-0"
          >
            {isLocked ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
          </Button>
        </div>

        {/* Speed Slider */}
        <div className="space-y-2">
          <Slider
            value={[speedToSliderValue(currentSpeed)]}
            onValueChange={handleSliderChange}
            min={speedToSliderValue(0.1)}
            max={speedToSliderValue(10)}
            step={1}
            disabled={isLocked}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0.1×</span>
            <span>1×</span>
            <span>10×</span>
          </div>
        </div>

        {/* Control Buttons */}
        {uiSettings.mode === 'full' && (
          <div className="grid grid-cols-4 gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={onSlowDown}
              disabled={isLocked}
              className="h-8"
            >
              <Rewind className="h-3 w-3" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onReset}
              disabled={isLocked}
              className="h-8"
            >
              <RotateCcw className="h-3 w-3" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onSpeedUp}
              disabled={isLocked}
              className="h-8"
            >
              <FastForward className="h-3 w-3" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onTurbo}
              disabled={isLocked}
              className="h-8 text-xs"
            >
              10×
            </Button>
          </div>
        )}

        {/* Speed Profiles */}
        {uiSettings.mode === 'full' && (
          <Select
            value={activeProfile.id}
            onValueChange={(value) => {
              const profile = profiles.find(p => p.id === value);
              if (profile) onProfileChange(profile);
            }}
            disabled={isLocked}
          >
            <SelectTrigger className="h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {profiles.map((profile) => (
                <SelectItem key={profile.id} value={profile.id} className="text-xs">
                  <div>
                    <div className="font-medium">{profile.name}</div>
                    <div className="text-xs text-muted-foreground">{profile.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {/* Keyboard Shortcuts Hint */}
        {uiSettings.mode === 'full' && (
          <div className="text-xs text-muted-foreground border-t pt-2 space-y-1">
            <div>Ctrl+Alt+D/S: Speed up/down</div>
            <div>Ctrl+Alt+R: Reset | Shift+D: Turbo</div>
          </div>
        )}
      </div>
    </Card>
  );
};
