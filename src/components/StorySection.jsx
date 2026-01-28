import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// List of available images (including HEIC files)
const availableImages = [
  "/images/pictures/1.JPG",
  "/images/pictures/2.JPG",
  "/images/pictures/3.JPG",
  "/images/pictures/4.JPG",
  "/images/pictures/5.JPG",
  "/images/pictures/6.JPG",
  "/images/pictures/7.JPG",
  "/images/pictures/8.JPG",
  "/images/pictures/9.JPG",
  "/images/pictures/10.JPG",
  "/images/pictures/11.JPG",
  "/images/pictures/12.JPG",
  "/images/pictures/13.JPG",
  "/images/pictures/14.JPG",
  "/images/pictures/15.JPG",
  "/images/pictures/16.JPG",
  "/images/pictures/17.JPG",
  "/images/pictures/20.JPG",
  "/images/pictures/IMG_9312.JPG",
  "/images/pictures/IMG_9313.JPEG",
  "/images/pictures/IMG_9314.JPEG",
  "/images/pictures/IMG_9315.JPEG",
  "/images/pictures/IMG_9317.JPEG",
  "/images/pictures/IMG_9318.JPEG",
  "/images/pictures/IMG_9320.JPEG",
  "/images/pictures/IMG_9328.JPEG",
  "/images/pictures/18.heic",
  "/images/pictures/19.heic",
  "/images/pictures/21.HEIC",
  "/images/pictures/22.HEIC",
  "/images/pictures/23.HEIC",
];

// Function to randomly select images
function getRandomImages(count) {
  const shuffled = [...availableImages].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

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
  // Randomly select images on component mount (every refresh)
  const [storyParts] = useState(() => {
    const imageCount = storyPartsTemplate.filter(p => p.needsImage).length;
    const randomImages = getRandomImages(imageCount);
    let imageIndex = 0;
    
    return storyPartsTemplate.map(part => {
      if (part.needsImage) {
        return {
          ...part,
          image: randomImages[imageIndex++],
        };
      }
      return part;
    });
  });

  useGSAP(() => {
    let yesSectionIndex = 0;
    
    // Animate each story part as it comes into view
    storyParts.forEach((storyPart, index) => {
      // Handle Yes-style sections separately (Yes and final "One story" section)
      if (storyPart.isYes) {
        const yesSections = document.querySelectorAll(".story-yes-section");
        if (yesSections[yesSectionIndex]) {
          gsap.fromTo(
            yesSections[yesSectionIndex],
            {
              opacity: 0,
              scale: 0.8,
            },
            {
              opacity: 1,
              scale: 1,
              duration: 1.5,
              ease: "power3.out",
              scrollTrigger: {
                trigger: yesSections[yesSectionIndex],
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play reverse play reverse",
              },
            }
          );
        }
        yesSectionIndex++;
        return;
      }

      // Animate text section
      const textSection = document.querySelector(`.story-text-section-${index}`);
      if (textSection) {
        gsap.fromTo(
          textSection,
          {
            opacity: 0,
            y: 60,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: textSection,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }

      // Animate image section
      const imageSection = document.querySelector(`.story-image-section-${index}`);
      if (imageSection) {
        gsap.fromTo(
          imageSection,
          {
            opacity: 0,
            y: 60,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: imageSection,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse",
            },
          }
        );

        const image = imageSection.querySelector(".story-image");
        if (image) {
          gsap.fromTo(
            image,
            {
              opacity: 0,
              scale: 0.9,
            },
            {
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: image,
                start: "top 85%",
                end: "bottom 20%",
                toggleActions: "play reverse play reverse",
              },
            }
          );
        }
      }
    });
  }, []);

  return (
    <section className="story-section">
      <div className="story-container">
        {storyParts.map((part, index) => {
          if (part.isYes) {
            const isLastYes = index === storyParts.length - 1;
            return (
              <div key={index} className={`story-yes-section ${isLastYes ? 'story-yes-section--last' : ''}`}>
                <div className="story-yes-text">
                  {part.text.split("\n").map((line, lineIndex) => (
                    <p key={lineIndex}>{line || "\u00A0"}</p>
                  ))}
                </div>
              </div>
            );
          }
          
          // Alternate layout: even index = text left, image right; odd index = image left, text right
          const isTextLeft = index % 2 === 0;
          
          return (
            <div key={index}>
              {isTextLeft ? (
                <>
                  <div className={`story-text-section story-text-section-${index}`}>
                    <div className="story-text">
                      {part.text.split("\n").map((line, lineIndex) => (
                        <p key={lineIndex}>{line || "\u00A0"}</p>
                      ))}
                    </div>
                  </div>
                  <div className={`story-image-section story-image-section-${index}`}>
                    <div className="story-image-wrapper">
                      <img
                        src={part.image}
                        alt=""
                        className="story-image"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className={`story-image-section story-image-section-${index}`}>
                    <div className="story-image-wrapper">
                      <img
                        src={part.image}
                        alt=""
                        className="story-image"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className={`story-text-section story-text-section-${index}`}>
                    <div className="story-text">
                      {part.text.split("\n").map((line, lineIndex) => (
                        <p key={lineIndex}>{line || "\u00A0"}</p>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
