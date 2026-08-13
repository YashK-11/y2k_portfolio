"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/animations/useReducedMotion";
import styles from "./About.module.css";

gsap.registerPlugin(ScrollTrigger);

const LINES = [
  "I'm Yash Kuber Khanna, a computer science engineer who enjoys turning ideas into working software.",
  "My work sits between backend systems and machine learning — I like building things that hold up under real use, not just in a demo.",
  "Most of what I know, I learned by building: shipping small projects, breaking them, and fixing what mattered.",
  "I care as much about how software is put together as what it does — clear structure, honest interfaces, code someone else can read.",
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(lineRefs.current, { opacity: 1, color: "var(--color-ink)" });
        return;
      }

      lineRefs.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0.25 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 78%",
              end: "top 42%",
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="about" ref={sectionRef} className={styles.section}>
      <div className="container">
        <div className="section-label">
          <span className="index">02</span>
          <span className="title">About</span>
        </div>

        <div className={styles.textBlock}>
          {LINES.map((line, i) => (
            <p
              key={i}
              ref={(el) => {
                lineRefs.current[i] = el;
              }}
              className={styles.line}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
