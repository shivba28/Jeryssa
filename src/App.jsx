import RingHero from "./components/RingHero.jsx";
import StorySection from "./components/StorySection.jsx";
import Gallery from "./components/Gallery.jsx";

export default function App() {
  return (
    <div className="page">
      <RingHero
        ringSrc="/images/bg.gif"
        videoSrc="/images/video.mp4"
      />
      <StorySection />
      <Gallery />
    </div>
  );
}

