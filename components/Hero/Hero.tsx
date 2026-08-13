"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/animations/useReducedMotion";
import styles from "./Hero.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLHeadingElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const circleBgRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      
      // 1. Intro Line
      tl.fromTo(
        introRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
      // 2. Name (Staggered Lines)
      .fromTo(
        nameRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.3"
      )
      // 3. Tagline
      .fromTo(
        taglineRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.4"
      )
      // 4. Character Circle Background
      .fromTo(
        circleBgRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "power2.out" },
        "-=0.2"
      )
      // 5. Character Image
      .fromTo(
        characterRef.current,
        { scale: 0.85, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 1, ease: "back.out(1.7)" },
        "-=0.7"
      );

      // Parallax on Scroll
      if (!reducedMotion) {
        const scrollConfig = {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        };

        gsap.to(nameRef.current, { yPercent: -12, ease: "none", scrollTrigger: scrollConfig });
        gsap.to(taglineRef.current, { yPercent: -10, ease: "none", scrollTrigger: scrollConfig });
        gsap.to(characterRef.current, { yPercent: -8, ease: "none", scrollTrigger: scrollConfig });
        gsap.to(circleBgRef.current, { scale: 1.05, ease: "none", scrollTrigger: scrollConfig });
        gsap.to(bgRef.current, { scale: 1.04, yPercent: 5, ease: "none", scrollTrigger: scrollConfig });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="hero" ref={sectionRef} className={styles.hero}>
      <div ref={bgRef} className={styles.bgLayer} aria-hidden="true" />

      <div className={styles.inner}>
        
        {/* Left Content Column */}
        <div className={styles.contentCol}>
          <span ref={introRef} className={styles.introLine}>
           Computer Science Engineer
          </span>
          
          <h1 ref={nameRef} className={styles.name}>
            YASH KUBER <span className={styles.nameAccent}>KHANNA</span>
          </h1>

          <h2 ref={taglineRef} className={styles.tagline}>
            I build digital experiences <br />
            that are <span className={styles.taglineItalic}>clean</span>, <span className={styles.taglineAccent}>efficient</span> <br />
            and <span className={styles.taglineAccent}>impactful</span>.
          </h2>
        </div>

        {/* Right Visual Column (Character) */}
        <div className={styles.visualCol}>
          <div ref={circleBgRef} className={styles.circleBg} />
          
          <div ref={characterRef} className={styles.characterWrap}>
            {/* Floating Code Accents */}
            <div className={`${styles.codeAccent} ${styles.codeTopRight}`}>
              101101 01<br />
              01111 10<br />
              10100 01
            </div>
            
            <div className={`${styles.codeAccent} ${styles.codeBottomRight}`}>
              // code<br />
              // coffee<br />
              // repeat();
            </div>

            <img
              src="/images/pixel-char.png"
              alt="Pixel character of Yash Kuber Khanna"
              className={styles.pixelCharacter}
              width={500}
              height={500}
              loading="eager"
            />
          </div>
        </div>

      </div>
    </section>
  );
}