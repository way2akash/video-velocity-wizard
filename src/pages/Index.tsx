
import React from 'react';
import { VideoSpeedApp } from '../components/VideoSpeedApp';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Universal Video Speed Controller
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Take control of any video playback with advanced speed controls, keyboard shortcuts, and smart detection.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            {
              title: "Precise Speed Control",
              description: "0.1× to 10× speed range with 0.05× increments for perfect playback control"
            },
            {
              title: "Smart Video Detection",
              description: "Automatically detects videos on YouTube, Netflix, Twitter, Reddit, and more"
            },
            {
              title: "Keyboard Shortcuts",
              description: "Ctrl+Alt+D/S for speed control, Ctrl+Alt+R to reset, Shift+D for turbo"
            },
            {
              title: "Draggable Interface",
              description: "Moveable speed controller that works in fullscreen and PiP modes"
            },
            {
              title: "Memory Per Site",
              description: "Remembers your preferred speed for each website and video"
            },
            {
              title: "Speed Profiles",
              description: "Preset modes: Normal, Lecture, Podcast, Review, and Scan"
            },
            {
              title: "Custom Themes",
              description: "Light, Dark, and Transparent themes with adjustable positioning"
            },
            {
              title: "Privacy First",
              description: "Minimal permissions required, all settings stored locally"
            },
            {
              title: "Site Management",
              description: "Whitelist/blacklist specific websites for granular control"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Demo Video Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
            Try it with any video!
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-4">
              <video 
                controls 
                className="w-full h-full rounded-lg"
                poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 225'%3E%3Crect width='400' height='225' fill='%23f3f4f6'/%3E%3Ctext x='200' y='112.5' text-anchor='middle' font-family='Arial' font-size='14' fill='%236b7280'%3EDemo Video Player%3C/text%3E%3C/svg%3E"
              >
                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
              The speed controller will automatically appear when a video is detected. 
              Try the keyboard shortcuts or drag the controller around!
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">How to Use</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-semibold mb-2">Automatic Detection</h3>
              <p>The controller appears automatically when videos are detected on any website.</p>
            </div>
            <div>
              <div className="text-3xl mb-2">⌨️</div>
              <h3 className="font-semibold mb-2">Keyboard Control</h3>
              <p>Use Ctrl+Alt+D/S to adjust speed, Ctrl+Alt+R to reset, or Shift+D for turbo mode.</p>
            </div>
            <div>
              <div className="text-3xl mb-2">🎛️</div>
              <h3 className="font-semibold mb-2">Drag & Configure</h3>
              <p>Drag the controller to reposition it, or click settings to customize the experience.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Video Speed Controller App */}
      <VideoSpeedApp />
    </div>
  );
};

export default Index;
