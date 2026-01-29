import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const videoSrc = "/images/pictures/39.mov";
// List of available images (including HEIC files)
const galleryImages = [
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
