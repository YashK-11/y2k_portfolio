"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Menu, X } from "lucide-react";
import styles from "./Navigation.module.css";

gsap.registerPlugin(ScrollTrigger);

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
];

const SECTION_IDS = ["hero", "work", "about", "stack", "background", "contact"];

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.2 }
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    const scrollState = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => setScrolled(self.scroll() > 40),
    });
    triggers.push(scrollState);

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActive(id),
        onEnterBack: () => setActive(id),
      });
      triggers.push(st);
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      ref={navRef}
      className={`${styles.nav} ${scrolled ? styles.navScrolled : ""}`}
    >
      <div className={`container ${styles.inner}`}>
        <a
          href="#hero"
          className={styles.logo}
          onClick={(e) => handleNavClick(e, "#hero")}
          aria-label="Back to top"
        >
          YashK.
        </a>

        <nav className={styles.links} aria-label="Primary">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`${styles.link} ${
                active === link.href.slice(1) ? styles.linkActive : ""
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, "#contact")}
          className={styles.contactLink}
        >
          Contact <ArrowUpRight size={14} strokeWidth={2} />
        </a>

        <button
          className={styles.menuButton}
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          {LINKS.concat([{ label: "Contact", href: "#contact" }]).map(
            (link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={styles.mobileLink}
              >
                {link.label}
              </a>
            )
          )}
        </div>
      )}
    </header>
  );
}
