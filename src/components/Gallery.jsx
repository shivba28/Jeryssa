import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const videoSrc = "/images/pictures/39.mov";
// List of available images (including HEIC files)
const galleryImages = [
  "/Jeryssa/images/pictures/1.jpg",
  "/Jeryssa/images/pictures/2.jpg",
  "/Jeryssa/images/pictures/3.jpg",
  "/Jeryssa/images/pictures/4.jpg",
  "/Jeryssa/images/pictures/5.jpg",
  "/Jeryssa/images/pictures/6.jpg",
  "/Jeryssa/images/pictures/7.jpg",
  "/Jeryssa/images/pictures/8.jpg",
  "/Jeryssa/images/pictures/9.jpg",
  "/Jeryssa/images/pictures/10.jpg",
  "/Jeryssa/images/pictures/11.jpg",
  "/Jeryssa/images/pictures/12.jpg",
  "/Jeryssa/images/pictures/13.jpg",
  "/Jeryssa/images/pictures/14.jpg",
  "/Jeryssa/images/pictures/15.jpg",
  "/Jeryssa/images/pictures/16.jpg",
  "/Jeryssa/images/pictures/17.jpg",
  "/Jeryssa/images/pictures/18.jpg",
  "/Jeryssa/images/pictures/19.jpg",
  "/Jeryssa/images/pictures/20.jpg",
  "/Jeryssa/images/pictures/21.jpg",
  "/Jeryssa/images/pictures/22.jpg",
  "/Jeryssa/images/pictures/23.jpg",
  "/Jeryssa/images/pictures/24.jpg",
  "/Jeryssa/images/pictures/25.jpg",
  "/Jeryssa/images/pictures/26.jpg",
  "/Jeryssa/images/pictures/27.jpg",
  "/Jeryssa/images/pictures/28.jpg",
  "/Jeryssa/images/pictures/29.jpg",
  "/Jeryssa/images/pictures/30.jpg",
  "/Jeryssa/images/pictures/31.jpg",
  "/Jeryssa/images/pictures/32.jpg",
  "/Jeryssa/images/pictures/33.jpg",
  "/Jeryssa/images/pictures/34.jpg",
  "/Jeryssa/images/pictures/35.jpg",
  "/Jeryssa/images/pictures/36.jpg",
  "/Jeryssa/images/pictures/37.jpg",
  "/Jeryssa/images/pictures/38.jpg",
  "/Jeryssa/images/pictures/39.jpg",
  "/Jeryssa/images/pictures/40.jpg",
  "/Jeryssa/images/pictures/41.jpg",
  "/Jeryssa/images/pictures/42.jpg",
  "/Jeryssa/images/pictures/43.jpg",
  "/Jeryssa/images/pictures/44.jpg",
  "/Jeryssa/images/pictures/45.jpg",
];

export default function Gallery() {
  useGSAP(() => {
    // Animate gallery images as they come into view (fade in only, no fade out)
    const images = document.querySelectorAll(".gallery-image");
    images.forEach((img) => {
      gsap.fromTo(
        img,
        {
          opacity: 0,
          scale: 0.95,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: img,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  return (
    <section className="gallery-section">
      <div className="gallery-container">
        {galleryImages.map((imgSrc, index) => (
          <div key={index} className="gallery-item">
            <img
              src={imgSrc}
              alt={`Gallery ${index + 1}`}
              className="gallery-image"
            />
          </div>
        ))}
        <div className="gallery-item">
          <video
            className="gallery-image"
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
        
      </div>
    </section>
  );
}
