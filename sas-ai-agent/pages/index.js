import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const features = [
  {
    icon: '◈',
    badge: 'Log Analyst',
    badgeClass: 'badge-amber',
    title: 'SAS Log Diagnosis',
    desc: 'Paste any SAS log — Base, Grid or Viya. The agent identifies root causes, severity levels, and gives actionable fixes with context only a SAS specialist would know.',
  },
  {
    icon: '◉',
    badge: 'Code Review',
    badgeClass: 'badge-blue',
    title: 'SAS Code Intelligence',
    desc: 'Submit your SAS programs for expert review. Macro errors, DATA step inefficiencies, PROC performance patterns — analysed with 13+ years of enterprise SAS knowledge encoded.',
  },
  {
    icon: '◎',
    badge: 'Coming soon',
    badgeClass: 'badge-green',
    title: 'Operational Memory',
    desc: 'The agent learns from your environment. Recurring errors are recognised. Solutions from past incidents are surfaced automatically.',
  },
];

const sampleLog = `NOTE: SAS Institute Inc., SAS Campus Drive
ERROR: Libname MYLIB is not assigned.
WARNING: Apparent symbolic reference DSNAME not resolved.
ERROR: File MYLIB.CUSTOMERS.DATA does not exist.
NOTE: The SAS System stopped processing this step because of errors.
NOTE: DATA statement used (Total process time):
      real time           0.02 seconds`;

export default function Home() {
  return (
    <>
      <Head>
        <title>SAS AI Agent — Intelligent SAS Operations</title>
        <meta name="description" content="AI-powered SAS log analysis and code review. Built by a SAS Certified Architect." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* HERO */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroTop}>
            <span className="badge badge-amber">
              <span className={styles.pulse} /> Live — Week 1
            </span>
            <span className={styles.heroSub}>Built in public · Updated weekly</span>
          </div>

          <h1 className={styles.heroTitle}>
            The AI Agent that<br />
            <span className={styles.heroAccent}>speaks SAS fluently</span>
          </h1>

          <p className={styles.heroDesc}>
            Diagnose log failures. Review SAS code. Understand your pipelines.<br />
            Powered by LLM + 13 years of enterprise SAS expertise.
          </p>

          <div className={styles.heroCtas}>
            <Link href="/agent" className="btn btn-primary">
              Try the Agent →
            </Link>
            <Link href="/blog" className="btn btn-outline">
              Read the build log
            </Link>
          </div>

          <div className={styles.heroStack}>
            {['SAS Base','SAS Grid','SAS Viya','Oracle','ETL','LLM'].map(t => (
              <span key={t} className={styles.stackTag}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE DEMO TEASER */}
      <section className={styles.demoSection}>
        <div className="container">
          <div className={styles.demoGrid}>
            <div className={styles.demoLeft}>
              <p className={styles.sectionLabel}>// what it does</p>
              <h2 className={styles.sectionTitle}>From cryptic SAS log<br />to clear diagnosis</h2>
              <p className={styles.sectionDesc}>
                Enterprise SAS environments generate thousands of log lines daily.
                Finding the real root cause — not just the surface error — requires deep knowledge
                of how SAS processes data, resolves macros, and manages libraries.
              </p>
              <p className={styles.sectionDesc}>
                This agent encodes that knowledge and applies it instantly.
              </p>
              <Link href="/agent" className="btn btn-primary" style={{marginTop: '16px'}}>
                Try it now →
              </Link>
            </div>
            <div className={styles.demoRight}>
              <div className={styles.terminalHeader}>
                <span className={styles.termDot} style={{background:'#f56565'}}/>
                <span className={styles.termDot} style={{background:'#f5a623'}}/>
                <span className={styles.termDot} style={{background:'#3dd68c'}}/>
                <span className={styles.termTitle}>sas_job_20240115.log</span>
              </div>
              <pre className={styles.terminal}>{sampleLog}</pre>
              <div className={styles.analysisBox}>
                <div className={styles.analysisHeader}>
                  <span className="badge badge-red">ERROR</span>
                  <span className={styles.analysisTitle}>Root cause identified</span>
                </div>
                <p className={styles.analysisText}>
                  <strong>LIBNAME not assigned before DATA step execution.</strong> The macro variable
                  <code className={styles.inlineCode}>&DSNAME</code> was referenced before being defined,
                  causing the library reference to fail silently. Assign MYLIB before the DATA step
                  or verify the %INCLUDE sequence.
                </p>
                <div className={styles.analysisTags}>
                  <span className="badge badge-amber">SAS Base</span>
                  <span className="badge badge-blue">Macro resolution</span>
                  <span className="badge badge-red">Severity: High</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className={styles.featuresSection}>
        <div className="container">
          <p className={styles.sectionLabel}>// capabilities</p>
          <h2 className={styles.sectionTitle}>Two specialist modules.<br />One platform.</h2>
          <div className={styles.featuresGrid}>
            {features.map((f) => (
              <div key={f.title} className={`card ${styles.featureCard}`}>
                <div className={styles.featureIcon}>{f.icon}</div>
                <span className={`badge ${f.badgeClass}`} style={{marginBottom:'12px'}}>{f.badge}</span>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUILD IN PUBLIC */}
      <section className={styles.buildSection}>
        <div className="container">
          <div className={styles.buildInner}>
            <div>
              <p className={styles.sectionLabel}>// building in public</p>
              <h2 className={styles.sectionTitle}>Week by week.<br />No shortcuts.</h2>
              <p className={styles.sectionDesc}>
                Every feature, architecture decision, and lesson learned is documented
                on the blog. Follow the build as it happens.
              </p>
              <Link href="/blog" className="btn btn-outline" style={{marginTop:'16px'}}>
                Read the blog →
              </Link>
            </div>
            <div className={styles.weekList}>
              {[
                {w:'01', t:'MVP — SAS Log Analyst', s:'done'},
                {w:'02', t:'Real-time log monitoring', s:'soon'},
                {w:'03', t:'Executive dashboard', s:'soon'},
                {w:'04', t:'ETL operational pipeline', s:'soon'},
              ].map(item => (
                <div key={item.w} className={styles.weekItem}>
                  <span className={styles.weekNum}>W{item.w}</span>
                  <span className={styles.weekTitle}>{item.t}</span>
                  <span className={`badge ${item.s === 'done' ? 'badge-green' : 'badge-amber'}`}>
                    {item.s === 'done' ? '✓ live' : 'upcoming'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
