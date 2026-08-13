import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.row}`}>
        <span>© {new Date().getFullYear()} Yash Kuber Khanna</span>
        <span>Designed &amp; built in Bangalore</span>
      </div>
    </footer>
  );
}
