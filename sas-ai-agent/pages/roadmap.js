import Head from 'next/head';
import styles from '../styles/Roadmap.module.css';

const phases = [
  {
    label: 'Phase 1',
    title: 'Foundation',
    weeks: ['01','02','03','04'],
    color: 'purple',
  },
  {
    label: 'Phase 2',
    title: 'Intelligence',
    weeks: ['05','06','07','08'],
    color: 'teal',
  },
  {
    label: 'Phase 3',
    title: 'Scale',
    weeks: ['09','10','11','12'],
    color: 'amber',
  },
];

const weeks = [
  {w:'01',title:'SAS Log Analyst MVP',status:'live',desc:'LLM-powered SAS log diagnosis with expert system prompt.'},
  {w:'02',title:'Real-time log monitoring',status:'building',desc:'Watcher detects new SAS logs and analyses automatically.'},
  {w:'03',title:'Executive dashboard',status:'planned',desc:'Operational metrics: top errors, severity, daily volume.'},
  {w:'04',title:'ETL operational pipeline',status:'planned',desc:'Automated log ingestion, backup, and organisation.'},
  {w:'05',title:'Intelligent email alerts',status:'planned',desc:'Daily digest with critical errors and severity summary.'},
  {w:'06',title:'Enterprise SaaS UX',status:'planned',desc:'Full interface redesign for production environments.'},
  {w:'07',title:'Incident classification',status:'planned',desc:'Auto-classify: Oracle, SAS, ETL, Infra, Network.'},
  {w:'08',title:'Operational memory',status:'planned',desc:'SQLite/PostgreSQL history of incidents and patterns.'},
  {w:'09',title:'Smart recommendations',status:'planned',desc:'RAG-powered: surface solutions from past incidents.'},
  {w:'10',title:'Multi-agent architecture',status:'planned',desc:'Specialised agents: SAS, Oracle, ETL, Infra routers.'},
  {w:'11',title:'Enterprise API',status:'planned',desc:'FastAPI REST endpoints with Swagger documentation.'},
  {w:'12',title:'Cloud deploy + final arch',status:'planned',desc:'Docker, CI/CD, cloud-ready SaaS architecture.'},
];

const statusMap = {
  live: { label: '✓ live', cls: 'badge-green' },
  building: { label: '⟳ building', cls: 'badge-amber' },
  planned: { label: 'planned', cls: '' },
};

export default function Roadmap() {
  return (
    <>
      <Head>
        <title>Roadmap — SAS AI Agent</title>
        <meta name="description" content="12-week public build roadmap for the SAS AI Agent." />
      </Head>

      <div className={styles.page}>
        <div className="container">
          <div className={styles.header}>
            <p className={styles.sectionLabel}>// build roadmap</p>
            <h1 className={styles.title}>12 weeks. Built in public.</h1>
            <p className={styles.desc}>Every feature shipped weekly, documented on the blog.</p>
          </div>

          <div className={styles.phases}>
            {phases.map(ph => (
              <div key={ph.label} className={`${styles.phaseTag} ${styles['phase-'+ph.color]}`}>
                <span className={styles.phaseLabel}>{ph.label}</span>
                <span className={styles.phaseTitle}>{ph.title}</span>
                <span className={styles.phaseWeeks}>Weeks {ph.weeks[0]}–{ph.weeks[3]}</span>
              </div>
            ))}
          </div>

          <div className={styles.weeksList}>
            {weeks.map((wk, i) => {
              const s = statusMap[wk.status];
              const phase = i < 4 ? 'purple' : i < 8 ? 'teal' : 'amber';
              return (
                <div key={wk.w} className={`${styles.weekRow} ${styles['week-'+phase]}`}>
                  <span className={styles.weekNum}>W{wk.w}</span>
                  <div className={styles.weekInfo}>
                    <span className={styles.weekTitle}>{wk.title}</span>
                    <span className={styles.weekDesc}>{wk.desc}</span>
                  </div>
                  {s.cls ? (
                    <span className={`badge ${s.cls}`}>{s.label}</span>
                  ) : (
                    <span className={styles.planned}>{s.label}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
