import React, { useEffect } from 'react';
import RingHero from './components/RingHero';
import StorySection from './components/StorySection';
import Gallery from "./components/Gallery";
import './App.css';

function App() {
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page">
      <RingHero
        ringSrc="/images/bg.svg"
        videoSrc="/images/video4K.mp4"
      />
      <div className="story-section-spacer" aria-hidden="true" />
      <StorySection />
      <Gallery />
    </div>
  );
}

export default App;
