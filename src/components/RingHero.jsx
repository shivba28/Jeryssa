import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function RingHero({
  ringSrc = "/Jeryssa/images/bg.svg",
  videoSrc = "/Jeryssa/images/video4K.mp4",
}) {
  const imageRef = useRef(null);
  const titleLeftRef = useRef(null);
  const titleRightRef = useRef(null);

  // Title animation on page load: center → come together → move up; ring fades in during move
  useGSAP(() => {
    const md = gsap.matchMedia();

    md.add("(min-width: 401px)", () => {
      gsap.set(".hero-video", { opacity: 0 });
      gsap.set(".title-wrapper", { top: "50%", xPercent: -50, yPercent: -50 });
      gsap.set(titleLeftRef.current, { x: "-30vw", opacity: 0 });
      gsap.set(titleRightRef.current, { x: "30vw", opacity: 0 });
      gsap.set(".ring-image", { opacity: 0 });

      const titleTl = gsap.timeline({ delay: 0.3 });
      titleTl
        .to(titleLeftRef.current, { x: 0, opacity: 1, duration: 2, ease: "power2.out" })
        .to(titleRightRef.current, { x: 0, opacity: 1, duration: 2, ease: "power2.out" }, "<1.2")
        .to(".title-wrapper", { top: "15%", xPercent: -50, yPercent: -50, duration: 1.5, ease: "power2.inOut" }, "-=0.2")
        .to(".ring-image", { opacity: 1, duration: 1.5, ease: "power2.inOut" }, "<0.5")
        .to("section.hero", { backgroundColor: "#fffde9", duration: 1.5, ease: "power2.inOut" }, "-=1.5");
    });

    md.add("(max-width: 400px)", () => {
      gsap.set(".hero-video", { opacity: 0 });
      gsap.set(".title-wrapper", { top: "50%", xPercent: -50, yPercent: -50 });
      gsap.set(titleLeftRef.current, { x: "-30vw", opacity: 0 });
      gsap.set(titleRightRef.current, { x: "30vw", opacity: 0 });
      gsap.set(".ring-image", { opacity: 0 });

      const titleTl = gsap.timeline({ delay: 0.3 });
      titleTl
        .to(titleLeftRef.current, { x: 0, opacity: 1, duration: 2, ease: "power2.out" })
        .to(titleRightRef.current, { x: 0, opacity: 1, duration: 2, ease: "power2.out" }, "<1.2")
        .to(".title-wrapper", { top: "20%", xPercent: -50, yPercent: -50, duration: 1.5, ease: "power2.inOut" }, "-=0.2")
        .to(".ring-image", { opacity: 1, duration: 1.5, ease: "power2.out" }, "<0.75")
        .to("section.hero", { backgroundColor: "#fffde9", duration: 1.5, ease: "power2.inOut" }, "-=2");
    });

    return () => md.revert();
  }, []);

  // Ring scroll animation
  useGSAP(() => {
    const md = gsap.matchMedia();
    
    // Desktop: scale to 50
    md.add("(min-width: 401px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".scroll-wrapper",
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Show video when scroll starts (it was hidden until now)
      tl.to(".hero-video", { opacity: 1, duration: 0.3 }, 0);

      // Title exit animation: move up and fade out
      tl.fromTo(
        ".title-wrapper",
        {
          y: 0,
          opacity: 1,
        },
        {
          y: "-100vh",
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
        }, "<0.05"
      )
      // Then scale the ring
      .fromTo(
        ".ring-image",
        {
          scale: 1,
          z: 0,
        },
        {
          scale: 50,
          z: 300,
          transformOrigin: "center center",
          ease: "power1.inOut",
        },
        0.1
      );
    });

    // Mobile: scale to 50
    md.add("(max-width: 400px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".scroll-wrapper",
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Show video when scroll starts (it was hidden until now)
      tl.to(".hero-video", { opacity: 1, duration: 0.3 }, 0);

      // Title exit animation: move up and fade out
      tl.fromTo(
        ".title-wrapper",
        {
          y: 0,
          opacity: 1,
        },
        {
          y: "-100vh",
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
        }, "<0.05"
      )
      // Then scale the ring
      .fromTo(
        ".ring-image",
        {
          scale: 1,
          z: 0,
        },
        {
          scale: 50,
          z: 300,
          transformOrigin: "center center",
          ease: "power1.inOut",
        },
        0.1
      );
    });

    return () => {
      md.revert();
    };
  }, []);

  return (
    <div className="scroll-wrapper">
      <div className="scroll-content">
        <section className="section hero">
          <video
            className="hero-video"
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
          />
        </section>
      </div>
      <div className="image-container">
        <div className="title-wrapper">
          <span className="title-left" ref={titleLeftRef}>To Alyssa</span>
          <span className="title-right" ref={titleRightRef}>And Jeremiah</span>
        </div>
        <img className="ring-image" src={ringSrc} ref={imageRef} alt="Wedding ring" />
      </div>
    </div>
  );
}
