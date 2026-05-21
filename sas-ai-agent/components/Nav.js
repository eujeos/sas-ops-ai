import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Nav.module.css';

export default function Nav() {
  const router = useRouter();
  const isActive = (path) => router.pathname === path || router.pathname.startsWith(path + '/');

  return (
    <nav className={styles.nav}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>▲</span>
          <span className={styles.logoText}>SAS<span className={styles.logoAccent}>AI</span>Agent</span>
        </Link>
        <div className={styles.links}>
          <Link href="/agent" className={`${styles.link} ${isActive('/agent') ? styles.active : ''}`}>
            <span className={styles.linkDot} />
            Agent
          </Link>
          <Link href="/blog" className={`${styles.link} ${isActive('/blog') ? styles.active : ''}`}>
            <span className={styles.linkDot} />
            Blog
          </Link>
          <Link href="/roadmap" className={`${styles.link} ${isActive('/roadmap') ? styles.active : ''}`}>
            <span className={styles.linkDot} />
            Roadmap
          </Link>
          <a href="https://github.com" target="_blank" rel="noreferrer" className={styles.link}>
            GitHub ↗
          </a>
        </div>
      </div>
    </nav>
  );
}
