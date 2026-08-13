"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Code2, Link2, Mail } from "lucide-react";
import { useReducedMotion } from "@/lib/animations/useReducedMotion";
import styles from "./Contact.module.css";

gsap.registerPlugin(ScrollTrigger);

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/yashkuberkhanna", icon: Code2 },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/yashkuberkhanna",
    icon: Link2,
  },
  { label: "Email", href: "mailto:hello@yashkuberkhanna.in", icon: Mail },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      const lines = headlineRef.current
        ? Array.from(headlineRef.current.querySelectorAll("[data-line]"))
        : [];

      gsap.fromTo(
        lines,
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="contact" ref={sectionRef} className={styles.section}>
      <div className="container">
        <div className="section-label">
          <span className="index">05</span>
          <span className="title">Contact</span>
        </div>

        <h2 ref={headlineRef} className={styles.headline}>
          <span className={styles.lineWrap}>
            <span data-line className={styles.hLine}>
              Let&apos;s build
            </span>
          </span>
          <span className={styles.lineWrap}>
            <span data-line className={styles.hLine}>
              something
            </span>
          </span>
          <span className={styles.lineWrap}>
            <span
              data-line
              className={`${styles.hLine} ${styles.hLineAccent}`}
            >
              interesting.
            </span>
          </span>
        </h2>

        <div className={styles.ctaRow}>
          <p className={styles.ctaText}>
            Have an idea, project or opportunity?
          </p>
          <a href="mailto:hello@yashkuberkhanna.in" className={styles.cta}>
            Get In Touch <ArrowUpRight size={18} />
          </a>
        </div>

        <ul className={styles.socials}>
          {SOCIALS.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                target={label !== "Email" ? "_blank" : undefined}
                rel="noreferrer"
                className={styles.socialLink}
              >
                <Icon size={15} /> {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
