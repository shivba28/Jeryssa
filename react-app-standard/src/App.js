import React from 'react';
import RingHero from './components/RingHero';
import Gallery from "./components/Gallery";
import './App.css';

function App() {
  return (
    <div className="page">
      <RingHero
        ringSrc="/images/bg.svg"
        videoSrc="/images/video.mp4"
      />
      <Gallery />
    </div>
  );
}

export default App;
