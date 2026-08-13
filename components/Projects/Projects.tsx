"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Code2 } from "lucide-react";
import { projects } from "@/data/projects";
import { useReducedMotion } from "@/lib/animations/useReducedMotion";
import styles from "./Projects.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const infoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const indexLabelRef = useRef<HTMLSpanElement>(null);
  const dotsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const reducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 900px)").matches
      : false
  );

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 900px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const useStaticLayout = reducedMotion || isMobile;

  useEffect(() => {
    if (useStaticLayout) return;

    const ctx = gsap.context(() => {
      const total = projects.length;

      // Initial state: first project visible, rest hidden.
      infoRefs.current.forEach((el, i) => {
        gsap.set(el, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 24 });
      });
      imageRefs.current.forEach((el, i) => {
        gsap.set(el, {
          opacity: i === 0 ? 1 : 0,
          clipPath:
            i === 0 ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
          scale: i === 0 ? 1 : 1.04,
        });
      });

      let activeIndex = 0;

      const setActive = (nextIndex: number) => {
        if (nextIndex === activeIndex) return;
        const prevIndex = activeIndex;
        activeIndex = nextIndex;

        gsap.to(infoRefs.current[prevIndex], {
          opacity: 0,
          y: -20,
          duration: 0.45,
          ease: "power2.out",
        });
        gsap.fromTo(
          infoRefs.current[nextIndex],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );

        gsap.to(imageRefs.current[prevIndex], {
          opacity: 0,
          scale: 1.04,
          clipPath:
            nextIndex > prevIndex
              ? "inset(0% 0% 100% 0%)"
              : "inset(100% 0% 0% 0%)",
          duration: 0.7,
          ease: "power2.inOut",
        });
        gsap.fromTo(
          imageRefs.current[nextIndex],
          {
            opacity: 0,
            scale: 1.04,
            clipPath:
              nextIndex > prevIndex
                ? "inset(100% 0% 0% 0%)"
                : "inset(0% 0% 100% 0%)",
          },
          {
            opacity: 1,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.7,
            ease: "power2.inOut",
          }
        );

        if (indexLabelRef.current) {
          indexLabelRef.current.textContent = projects[nextIndex].number;
        }
        dotsRef.current.forEach((dot, i) => {
          if (!dot) return;
          dot.dataset.active = i === nextIndex ? "true" : "false";
        });
      };

      const st = ScrollTrigger.create({
        trigger: trackRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: stickyRef.current,
        pinSpacing: false,
        onUpdate: (self) => {
          const segment = 1 / total;
          const idx = Math.min(
            total - 1,
            Math.floor(self.progress / segment)
          );
          setActive(idx);
        },
      });

      return () => st.kill();
    }, trackRef);

    return () => ctx.revert();
  }, [useStaticLayout]);

  return (
    <section id="work" className={styles.section}>
      <div className="container">
        <div className="section-label">
          <span className="index">01</span>
          <span className="title">Selected Work</span>
        </div>
      </div>

      {useStaticLayout ? (
        <div className="container">
          <div className={styles.staticList}>
            {projects.map((project) => (
              <ProjectCardStatic key={project.id} project={project} />
            ))}
          </div>
        </div>
      ) : (
        <div
          ref={trackRef}
          className={styles.track}
          style={{ height: `${projects.length * 100}vh` }}
        >
          <div ref={stickyRef} className={styles.sticky}>
            <div className={`container ${styles.grid}`}>
              <div className={styles.infoCol}>
                {projects.map((project, i) => (
                  <div
                    key={project.id}
                    ref={(el) => {
                      infoRefs.current[i] = el;
                    }}
                    className={styles.info}
                  >
                    <span className={styles.bigNumber}>{project.number}</span>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <p className={styles.projectDesc}>
                      {project.description}
                    </p>
                    <ul className={styles.techList}>
                      {project.technologies.map((tech) => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>
                    <div className={styles.linkRow}>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className={styles.projectLink}
                        >
                          <Code2 size={15} /> Code
                        </a>
                      )}
                      <a href="#contact" className={styles.projectLink}>
                        View Project <ArrowUpRight size={15} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.visualCol}>
                {projects.map((project, i) => (
                  <div
                    key={project.id}
                    ref={(el) => {
                      imageRefs.current[i] = el;
                    }}
                    className={styles.visual}
                  >
                    <Image
                      src={project.image}
                      alt={`${project.title} project visual`}
                      fill
                      sizes="(max-width: 900px) 90vw, 40vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className={`container ${styles.progressRow}`}>
              <span ref={indexLabelRef} className={styles.progressIndex}>
                {projects[0].number}
              </span>
              <div className={styles.dots}>
                {projects.map((project, i) => (
                  <span
                    key={project.id}
                    ref={(el) => {
                      dotsRef.current[i] = el;
                    }}
                    data-active={i === 0 ? "true" : "false"}
                    className={styles.dot}
                  />
                ))}
              </div>
              <span className={styles.progressTotal}>
                / {String(projects.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function ProjectCardStatic({
  project,
}: {
  project: (typeof projects)[number];
}) {
  return (
    <article className={styles.staticCard}>
      <div className={styles.staticVisual}>
        <Image
          src={project.image}
          alt={`${project.title} project visual`}
          fill
          sizes="90vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <span className={styles.bigNumber}>{project.number}</span>
      <h3 className={styles.projectTitle}>{project.title}</h3>
      <p className={styles.projectDesc}>{project.description}</p>
      <ul className={styles.techList}>
        {project.technologies.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
    </article>
  );
}
