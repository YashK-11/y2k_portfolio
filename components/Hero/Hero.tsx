"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight } from "lucide-react";
import { useReducedMotion } from "@/lib/animations/useReducedMotion";
import styles from "./Hero.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLSpanElement>(null);
  const numeralRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const nameLines = nameRef.current
        ? Array.from(nameRef.current.querySelectorAll("[data-line]"))
        : [];

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        introRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          numeralRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.7 },
          "<"
        )
        .fromTo(
          nameLines,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.08 },
          "-=0.3"
        )
        .fromTo(
          statusRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.5"
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.55"
        )
        .fromTo(
          metaRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.45"
        )
        .fromTo(
          barRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          "-=0.3"
        );

      if (!reducedMotion) {
        gsap.to(nameRef.current, {
          yPercent: -14,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.to(numeralRef.current, {
          yPercent: 30,
          opacity: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.to(descRef.current, {
          yPercent: -32,
          opacity: 0.3,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.to(statusRef.current, {
          yPercent: -18,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.to(metaRef.current, {
          yPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.to(barRef.current, {
          yPercent: -4,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.to(bgRef.current, {
          scale: 1.06,
          yPercent: 4,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" ref={sectionRef} className={styles.hero}>
      <div ref={bgRef} className={styles.bgLayer} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div className={styles.topRow}>
          <span ref={introRef} className={`eyebrow ${styles.intro}`}>
            Introduction
          </span>
          <span ref={numeralRef} className={styles.numeral} aria-hidden="true">
            00
          </span>
        </div>

        <div className={styles.nameRow}>
          <h1 ref={nameRef} className={styles.name}>
            <span className={styles.lineWrap}>
              <span data-line className={styles.line}>
                Yash
              </span>
            </span>
            <span className={styles.lineWrap}>
              <span data-line className={styles.line}>
                Kuber
              </span>
            </span>
            <span className={styles.lineWrap}>
              <span
                data-line
                className={`${styles.line} ${styles.lineAccent}`}
              >
                Khanna
              </span>
            </span>
          </h1>

          <div ref={statusRef} className={styles.statusCard}>
            <span className={styles.statusDot} aria-hidden="true" />
            <div className={styles.statusText}>
              <span>Open to opportunities</span>
              <span className={styles.statusSub}>Bangalore, India</span>
            </div>
          </div>
        </div>

        <div className={styles.lowerRow}>
          <div ref={descRef} className={styles.descBlock}>
            <p className={styles.role}>
              Computer Science Engineer / Developer
            </p>
            <p className={styles.desc}>
              I build software, intelligent systems and digital experiences —
              spending as much care on how a system is put together as on
              what it does.
            </p>
          </div>

          <div ref={metaRef} className={styles.actions}>
            <a
              href="#work"
              onClick={(e) => handleScrollTo(e, "#work")}
              className={styles.primaryAction}
            >
              View Work <ArrowDownRight size={16} strokeWidth={2} />
            </a>
            <a
              href="#about"
              onClick={(e) => handleScrollTo(e, "#about")}
              className={styles.secondaryAction}
            >
              About Me <ArrowDownRight size={16} strokeWidth={2} />
            </a>
          </div>
        </div>

        <div ref={barRef} className={styles.infoBar}>
          <span>PES University — Computer Science</span>
          <span className={styles.infoBarDivider} aria-hidden="true" />
          <span>Bangalore, India</span>
          <span className={styles.infoBarDivider} aria-hidden="true" />
          <span>Python · TypeScript · Machine Learning</span>
        </div>
      </div>
    </section>
  );
}