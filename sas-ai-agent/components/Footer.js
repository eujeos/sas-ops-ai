import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.left}>
          <span className={styles.logo}>▲ SAS<span className={styles.acc}>AI</span>Agent</span>
          <p className={styles.desc}>Built in public. Week by week.</p>
        </div>
        <div className={styles.right}>
          <span className={styles.muted}>Built by a SAS Certified Architect × AI Engineer</span>
        </div>
      </div>
    </footer>
  );
}
