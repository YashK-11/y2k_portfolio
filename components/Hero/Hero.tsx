"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/animations/useReducedMotion";
import styles from "./Hero.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const circleBgRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(
          [
            introRef.current,
            headingRef.current,
            descriptionRef.current,
            tagsRef.current,
            circleBgRef.current,
            characterRef.current,
          ],
          {
            opacity: 1,
            y: 0,
            scale: 1,
          }
        );
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        introRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          headingRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.3"
        )
        .fromTo(
          descriptionRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.4"
        )
        .fromTo(
          tagsRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3"
        )
        .fromTo(
          circleBgRef.current,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1 },
          "-=0.4"
        )
        .fromTo(
          characterRef.current,
          { scale: 0.9, opacity: 0, y: 15 },
          { scale: 1, opacity: 1, y: 0, duration: 1, ease: "back.out(1.7)" },
          "-=0.6"
        );

      gsap.to(characterRef.current, {
        y: -8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className={styles.hero}
      aria-label="Hero section - Yash K. Khanna, full-stack developer"
    >
      <div className={styles.bgLayer} aria-hidden="true" />
      <div className={styles.gradientOverlay} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.contentCol}>
          <p ref={introRef} className={styles.introLine}>
            // computer science engineer
          </p>

          <h1 ref={headingRef} className={styles.heading}>
            I BUILD <br />
            SOLUTIONS <br />
            THAT ARE{" "}
            <span className={styles.accent}>
              CLEAN,
              <br />
              SCALABLE &amp; <br />
              IMPACTFUL.
            </span>
          </h1>

          <p ref={descriptionRef} className={styles.description}>
            Full-stack developer focused on crafting fast, scalable and
            meaningful digital experiences.
          </p>

          <div ref={tagsRef} className={styles.tags}>
            <span>full-stack</span>
            <span>systems</span>
            <span>clean code</span>
          </div>
        </div>

        <div className={styles.visualCol}>
          <div ref={circleBgRef} className={styles.circleBg} />

          <div ref={characterRef} className={styles.characterWrap}>
            <div className={styles.codeAccent} aria-hidden="true">
              <span>// think</span>
              <span>// build</span>
              <span>// ship</span>
            </div>

            <img
              src="/images/pixel-char.png"
              alt="Pixel art character representing Yash, a full-stack developer"
              className={styles.pixelCharacter}
              width={400}
              height={400}
              loading="eager"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.style.display = "none";
                const parent = img.parentElement;
                if (parent) {
                  const fallback = document.createElement("div");
                  fallback.className = styles.fallbackCharacter;
                  fallback.textContent = "👨‍💻";
                  parent.appendChild(fallback);
                }
              }}
            />
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.bottomContent}>
          <div className={styles.leftSection}>
            <span className={styles.tagline}>
              Have an idea, project or opportunity?
            </span>
          </div>

          <div className={styles.rightSection}>
            <div className={styles.socialLinks}>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                GITHUB
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                LINKEDIN
              </a>
              <a
                href="mailto:hello@yash.dev"
                className={styles.socialLink}
              >
                EMAIL
              </a>
            </div>

            <div className={styles.footerInfo}>
              <span className={styles.copyright}>© 2026 YASH KUBER KHANNA</span>
              <span className={styles.divider}>•</span>
              <span className={styles.location}>
                DESIGNED &amp; BUILT IN BANGALORE
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}