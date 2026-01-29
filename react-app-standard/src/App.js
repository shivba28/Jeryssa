import React from 'react';
import RingHero from './components/RingHero';
import './App.css';

function App() {
  return (
    <div className="page">
      <RingHero
        ringSrc="/images/bg.gif"
        videoSrc="/images/video.mp4"
      />
      
      {/* Minimal continuation content so scrolling continues after the pinned phase */}
      <main className="afterHero">
        <div className="afterHero__spacer" />
      </main>
    </div>
  );
}

export default App;
