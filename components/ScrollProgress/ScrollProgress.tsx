"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ScrollProgress.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (fillRef.current) {
          fillRef.current.style.transform = `scaleY(${self.progress})`;
        }
      },
    });
    return () => trigger.kill();
  }, []);

  return (
    <div className={styles.track} aria-hidden="true">
      <div ref={fillRef} className={styles.fill} />
    </div>
  );
}
