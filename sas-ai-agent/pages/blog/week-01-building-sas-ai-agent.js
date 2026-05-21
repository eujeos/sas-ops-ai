import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Post.module.css';

export default function Week01() {
  return (
    <>
      <Head>
        <title>Week 1 — Building the SAS AI Agent MVP</title>
        <meta name="description" content="Why I decided to build an AI agent specifically for SAS environments." />
      </Head>

      <div className={styles.page}>
        <div className="container">
          <div className={styles.postWrapper}>

            <div className={styles.postMeta}>
              <Link href="/blog" className={styles.backLink}>← Back to blog</Link>
              <div className={styles.metaRow}>
                <span className="badge badge-amber">Week 01</span>
                <span className={styles.metaDate}>January 16, 2024</span>
                <span className={styles.metaRead}>6 min read</span>
              </div>
            </div>

            <h1 className={styles.postTitle}>Week 1 — Building the SAS AI Agent MVP</h1>
            <p className={styles.postLead}>
              Why I decided to build an AI agent specifically for SAS environments, and what the first functional version looks like after one week of development.
            </p>

            <div className={styles.postBody}>

              <h2>The problem no one is building for</h2>
              <p>
                I've been working with SAS in enterprise environments since 2011. Banks, insurance companies, large government institutions. In every single one of them, the same scene repeats itself: a batch job fails at 3am, someone gets paged, and they spend the next two hours staring at thousands of lines of SAS log output trying to find the actual root cause.
              </p>
              <p>
                The errors are cryptic. The warnings are often more dangerous than the errors. And the context — the macro that was called three levels up, the library that wasn't assigned, the symbolic reference that silently failed — is scattered across lines 847, 1204, and 2891 of the log.
              </p>
              <p>
                Meanwhile, every AI tool being built for "log analysis" is generic. It understands Linux logs, application logs, Kubernetes events. Nobody is building something that understands <em>SAS specifically</em> — the macro resolution order, the SAS Grid memory limits, the difference between a NOTE that matters and a NOTE that doesn't.
              </p>

              <h2>Why I'm the right person to build this</h2>
              <p>
                I have a SAS Programming I certification. I've been a SAS architect in production environments for over a decade. I've configured VMs on OCI to run LLMs. I know what a real SAS failure looks like, smells like, and how to fix it.
              </p>
              <p>
                That combination — deep SAS domain expertise + hands-on AI/LLM architecture — is rare. I'm using it to build something that encodes 13 years of pattern recognition into an agent.
              </p>

              <h2>Week 1: What I built</h2>
              <p>The MVP has two core modules:</p>

              <div className={styles.codeBlock}>
                <div className={styles.codeHeader}>
                  <span>stack.txt</span>
                </div>
                <pre>{`// Log Analyst (Aba A)
- Accepts SAS log input (Base, Grid, Viya)
- LLM with SAS-specialist system prompt
- Returns: root cause, severity, fix recommendations

// Code Review (Aba B)  
- Accepts SAS code (DATA steps, macros, PROCs)
- Identifies performance, errors, bad practices
- Suggests improved code where relevant

// Infrastructure
- Next.js + Vercel (zero-maintenance deploy)
- Anthropic Claude API (SAS-tuned prompts)
- Public GitHub repository`}</pre>
              </div>

              <h2>The key insight: it's all in the system prompt</h2>
              <p>
                The first version doesn't use fine-tuning or RAG. The intelligence comes from a carefully engineered system prompt that tells the LLM <em>exactly</em> how to think about SAS errors — what to look for, what patterns matter, how to distinguish a serious problem from noise.
              </p>
              <p>
                This is sufficient for MVP. Later weeks will add memory (so the agent learns from your environment's specific patterns) and retrieval (so it can reference SAS documentation and your internal runbooks).
              </p>

              <h2>What's coming next week</h2>
              <p>
                Week 2 will add real-time log monitoring — a watcher that detects new log files in a directory and analyses them automatically. The goal: from job failure to root cause diagnosis without human intervention.
              </p>

              <div className={styles.hookBox}>
                <span className={styles.hookLabel}>// next week</span>
                <p>Real-time log monitoring: the agent watches a folder, detects new SAS logs, and analyses them automatically as they appear.</p>
              </div>

            </div>

            <div className={styles.postFooter}>
              <Link href="/agent" className="btn btn-primary">Try the agent →</Link>
              <Link href="/blog" className="btn btn-outline">All posts</Link>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
