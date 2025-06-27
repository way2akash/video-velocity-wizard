
import { useState, useEffect, useCallback } from 'react';
import { VideoSpeedSettings, SpeedProfile } from '../types';

const SPEED_PROFILES: SpeedProfile[] = [
  { id: 'normal', name: 'Normal', speed: 1.0, description: 'Standard playback speed' },
  { id: 'lecture', name: 'Lecture Mode', speed: 1.25, description: 'Ideal for educational content' },
  { id: 'podcast', name: 'Podcast Mode', speed: 1.5, description: 'Perfect for audio content' },
  { id: 'review', name: 'Review Mode', speed: 2.0, description: 'Quick content review' },
  { id: 'scan', name: 'Scan Mode', speed: 3.0, description: 'Rapid content scanning' },
];

export const useSpeedController = (video: HTMLVideoElement | null) => {
  const [currentSpeed, setCurrentSpeed] = useState(1.0);
  const [isLocked, setIsLocked] = useState(false);
  const [activeProfile, setActiveProfile] = useState<SpeedProfile>(SPEED_PROFILES[0]);

  const changeSpeed = useCallback((newSpeed: number) => {
    if (isLocked || !video) return;
    
    const clampedSpeed = Math.max(0.1, Math.min(10, newSpeed));
    const roundedSpeed = Math.round(clampedSpeed * 20) / 20; // Round to 0.05 increments
    
    video.playbackRate = roundedSpeed;
    setCurrentSpeed(roundedSpeed);
    
    // Save to localStorage
    const domain = window.location.hostname;
    const settings: VideoSpeedSettings = {
      speed: roundedSpeed,
      domain,
      videoId: video.src || video.currentSrc,
      lastUsed: Date.now()
    };
    
    localStorage.setItem(`video-speed-${domain}`, JSON.stringify(settings));
  }, [video, isLocked]);

  const speedUp = useCallback(() => {
    changeSpeed(currentSpeed + 0.05);
  }, [currentSpeed, changeSpeed]);

  const slowDown = useCallback(() => {
    changeSpeed(currentSpeed - 0.05);
  }, [currentSpeed, changeSpeed]);

  const resetSpeed = useCallback(() => {
    changeSpeed(1.0);
  }, [changeSpeed]);

  const turboMode = useCallback(() => {
    changeSpeed(10.0);
  }, [changeSpeed]);

  const applyProfile = useCallback((profile: SpeedProfile) => {
    setActiveProfile(profile);
    changeSpeed(profile.speed);
  }, [changeSpeed]);

  // Load saved speed on video change
  useEffect(() => {
    if (!video) return;
    
    const domain = window.location.hostname;
    const savedSettings = localStorage.getItem(`video-speed-${domain}`);
    
    if (savedSettings) {
      try {
        const settings: VideoSpeedSettings = JSON.parse(savedSettings);
        changeSpeed(settings.speed);
      } catch (error) {
        console.error('Failed to load saved speed settings:', error);
      }
    }
  }, [video, changeSpeed]);

  return {
    currentSpeed,
    isLocked,
    setIsLocked,
    activeProfile,
    profiles: SPEED_PROFILES,
    speedUp,
    slowDown,
    resetSpeed,
    turboMode,
    changeSpeed,
    applyProfile
  };
};
