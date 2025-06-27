
import { useState, useEffect } from 'react';

export const useVideoDetection = () => {
  const [videos, setVideos] = useState<HTMLVideoElement[]>([]);
  const [activeVideo, setActiveVideo] = useState<HTMLVideoElement | null>(null);

  useEffect(() => {
    const detectVideos = () => {
      const videoElements = Array.from(document.querySelectorAll('video')) as HTMLVideoElement[];
      setVideos(videoElements);
      
      // Find the most likely active video (playing, largest, or most recent)
      const playingVideo = videoElements.find(video => !video.paused && !video.ended);
      const largestVideo = videoElements.reduce((prev, current) => {
        const prevArea = prev.videoWidth * prev.videoHeight;
        const currentArea = current.videoWidth * current.videoHeight;
        return currentArea > prevArea ? current : prev;
      }, videoElements[0]);
      
      setActiveVideo(playingVideo || largestVideo || null);
    };

    // Initial detection
    detectVideos();

    // Watch for new videos
    const observer = new MutationObserver(detectVideos);
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });

    // Listen for video events
    const handleVideoEvents = () => detectVideos();
    document.addEventListener('play', handleVideoEvents, true);
    document.addEventListener('loadstart', handleVideoEvents, true);

    return () => {
      observer.disconnect();
      document.removeEventListener('play', handleVideoEvents, true);
      document.removeEventListener('loadstart', handleVideoEvents, true);
    };
  }, []);

  return { videos, activeVideo };
};
