import styles from "./Background.module.css";

export default function Background() {
  return (
    <section id="background" className={styles.section}>
      <div className="container">
        <div className="section-label">
          <span className="index">04</span>
          <span className="title">Background</span>
        </div>

        <div className={styles.row}>
          <div className={styles.school}>
            <h3 className={styles.schoolName}>PES University</h3>
            <p className={styles.degree}>Computer Science Engineering</p>
          </div>
          <div className={styles.meta}>
            <span>2023 — Present</span>
            <span>Bangalore, India</span>
          </div>
        </div>
      </div>
    </section>
  );
}
