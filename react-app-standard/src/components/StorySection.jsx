import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const availableImages = [
  "/images/pictures/1.jpg",
  "/images/pictures/2.jpg",
  "/images/pictures/3.jpg",
  "/images/pictures/4.jpg",
  "/images/pictures/5.jpg",
  "/images/pictures/6.jpg",
  "/images/pictures/7.jpg",
  "/images/pictures/8.jpg",
  "/images/pictures/9.jpg",
  "/images/pictures/10.jpg",
  "/images/pictures/11.jpg",
  "/images/pictures/12.jpg",
  "/images/pictures/13.jpg",
  "/images/pictures/14.jpg",
  "/images/pictures/15.jpg",
  "/images/pictures/16.jpg",
  "/images/pictures/17.jpg",
  "/images/pictures/18.jpg",
  "/images/pictures/19.jpg",
  "/images/pictures/20.jpg",
  "/images/pictures/21.jpg",
  "/images/pictures/22.jpg",
  "/images/pictures/23.jpg",
  "/images/pictures/24.jpg",
  "/images/pictures/25.jpg",
  "/images/pictures/26.jpg",
  "/images/pictures/27.jpg",
  "/images/pictures/28.jpg",
  "/images/pictures/29.jpg",
  "/images/pictures/30.jpg",
  "/images/pictures/31.jpg",
  "/images/pictures/32.jpg",
  "/images/pictures/33.jpg",
  "/images/pictures/34.jpg",
  "/images/pictures/35.jpg",
  "/images/pictures/36.jpg",
  "/images/pictures/37.jpg",
  "/images/pictures/38.jpg",
  "/images/pictures/39.jpg",
  "/images/pictures/40.jpg",
  "/images/pictures/41.jpg",
  "/images/pictures/42.jpg",
  "/images/pictures/43.jpg",
  "/images/pictures/44.jpg",
  "/images/pictures/45.jpg",
];

// Pick n random images; repeat from list if n > availableImages.length
function getRandomImagesWithRepeat(n) {
  const list = [...availableImages];
  const result = [];
  for (let i = 0; i < n; i++) {
    result.push(list[Math.floor(Math.random() * list.length)]);
  }
  return result;
}

const LAYERS = [1, 2, 3];
const IMAGES_PER_SLIDE = 15;

const storyPartsTemplate = [
  {
    text: "It started with laughter.\nThe kind that lingers and makes everything else feel quieter.",
    needsImage: true,
  },
  {
    text: "Somewhere between ordinary days,\nlove decided to settle in and stay.",
    needsImage: true,
  },
  {
    text: "Then came a question,\nasked with a steady voice and a hopeful heart.",
    needsImage: true,
  },
  {
    text: "Will you marry me?",
    needsImage: true,
  },
  {
    text: "And an answer that changed everything.",
    needsImage: true,
  },
  {
    text: "Yes.",
    image: null,
    isYes: true,
  },
  {
    text: "Not just to a moment,\nbut to all the moments still waiting.",
    needsImage: true,
  },
  {
    text: "To choosing each other,\non loud days, quiet days, and every day in between.",
    needsImage: true,
  },
  {
    text: "This is the beginning of a shared forever.\nOne story, now told together.",
    image: null,
    isYes: true,
  },
];

export default function StorySection() {
  const zoomContainerRef = useRef(null);
  const numSlides = storyPartsTemplate.length;

  const [slideImages] = useState(() =>
    Array.from({ length: numSlides }, () =>
      getRandomImagesWithRepeat(IMAGES_PER_SLIDE)
    )
  );

  useGSAP(
    () => {
      const trigger = zoomContainerRef.current;
      if (!trigger) return;

      const seg = 1 / numSlides;
      const zoomInDuration = seg * 0.4;
      const zoomOutDuration = seg * 0.4;

      // Perspective zoom: start far (small scale, deep z), zoom in to viewer, then zoom out past viewer
      const zFar = -2000;
      const zNear = 600;
      const zPast = 3200;
      const scaleFar = 0.15;
      const scaleNear = 1;
      const scalePast = 2.2;

      gsap.set(".zoom-slide .zoom-slide-text", {
        xPercent: -50,
        yPercent: -50,
        z: zFar,
        scale: scaleFar,
        opacity: 0,
      });
      gsap.set(".zoom-slide .zoom-item", {
        z: zFar,
        scale: scaleFar,
        opacity: 0,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger,
          start: "top top",
          end: "+=800%",
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      for (let i = 0; i < numSlides; i++) {
        const slideInStart = i * seg;
        const slideOutStart = (i + 1) * seg - zoomOutDuration;

        // Text: zoom in from far, then zoom out past viewer
        tl.to(
          `.zoom-slide-${i} .zoom-slide-text`,
          {
            z: 50,
            scale: scaleNear,
            opacity: 1,
            duration: zoomInDuration,
            ease: "power2.out",
          },
          slideInStart
        ).to(
          `.zoom-slide-${i} .zoom-slide-text`,
          {
            z: zPast,
            scale: scalePast,
            opacity: 0,
            duration: zoomOutDuration,
            ease: "power2.in",
          },
          slideOutStart
        );

        // Layer 1 images
        tl.to(
          `.zoom-slide-${i} .zoom-item[data-layer="1"]`,
          {
            z: zNear,
            scale: scaleNear,
            opacity: 1,
            duration: zoomInDuration,
            ease: "power2.out",
          },
          slideInStart
        ).to(
          `.zoom-slide-${i} .zoom-item[data-layer="1"]`,
          {
            z: zPast,
            scale: scalePast,
            opacity: 0,
            duration: zoomOutDuration,
            ease: "power2.in",
          },
          slideOutStart
        );

        // Layer 2 images
        tl.to(
          `.zoom-slide-${i} .zoom-item[data-layer="2"]`,
          {
            z: zNear + 300,
            scale: scaleNear,
            opacity: 1,
            duration: zoomInDuration,
            ease: "power2.out",
          },
          slideInStart
        ).to(
          `.zoom-slide-${i} .zoom-item[data-layer="2"]`,
          {
            z: zPast,
            scale: scalePast,
            opacity: 0,
            duration: zoomOutDuration,
            ease: "power2.in",
          },
          slideOutStart
        );

        // Layer 3 images
        tl.to(
          `.zoom-slide-${i} .zoom-item[data-layer="3"]`,
          {
            z: zNear + 600,
            scale: scaleNear,
            opacity: 1,
            duration: zoomInDuration,
            ease: "power2.out",
          },
          slideInStart
        ).to(
          `.zoom-slide-${i} .zoom-item[data-layer="3"]`,
          {
            z: zPast,
            scale: scalePast,
            opacity: 0,
            duration: zoomOutDuration,
            ease: "power2.in",
          },
          slideOutStart
        );
      }
    },
    { scope: zoomContainerRef, dependencies: [numSlides] }
  );

  return (
    <section className="story-section story-zoom-section" aria-label="Our story">
      <div ref={zoomContainerRef} className="zoom-container">
        {storyPartsTemplate.map((part, i) => (
          <div key={i} className={`zoom-slide zoom-slide-${i}`}>
            <div className="zoom-slide-text">
              {part.text.split("\n").map((line, lineIndex) => (
                <p key={lineIndex}>{line || "\u00A0"}</p>
              ))}
            </div>
            <div className="zoom-slide-images">
              {slideImages[i].map((src, j) => (
                <div
                  key={`${i}-${j}-${src}`}
                  className="zoom-item"
                  data-layer={LAYERS[j % LAYERS.length]}
                >
                  <img src={src} alt="" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
