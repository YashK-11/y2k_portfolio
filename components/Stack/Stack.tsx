"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { technologies } from "@/data/technologies";
import styles from "./Stack.module.css";

export default function Stack() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="stack" className={styles.section}>
      <div className="container">
        <div className="section-label">
          <span className="index">03</span>
          <span className="title">Stack</span>
        </div>

        <ul className={styles.list}>
          {technologies.map((tech, i) => (
            <li
              key={tech.name}
              className={styles.item}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className={styles.itemRow}>
                <span
                  className={`${styles.itemName} ${
                    hovered === i ? styles.itemNameActive : ""
                  }`}
                >
                  {tech.name}
                </span>

                <span
                  className={`${styles.tags} ${
                    hovered === i ? styles.tagsVisible : ""
                  }`}
                >
                  {tech.tags.join(" · ")}
                </span>

                <ArrowUpRight
                  size={20}
                  className={`${styles.arrow} ${
                    hovered === i ? styles.arrowVisible : ""
                  }`}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
