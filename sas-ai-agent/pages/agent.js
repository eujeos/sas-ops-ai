import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Agent.module.css';

const LOG_EXAMPLES = [
  {
    label: 'LIBNAME not assigned',
    log: `NOTE: SAS Institute Inc., SAS Campus Drive, Cary, NC, USA
1   libname MYLIB '/data/input';
ERROR: Physical file does not exist, /data/input.
ERROR: Error in the LIBNAME statement.
2   data MYLIB.customers;
ERROR: Libname MYLIB is not assigned.
NOTE: The SAS System stopped processing this step because of errors.`,
  },
  {
    label: 'Macro variable unresolved',
    log: `WARNING: Apparent symbolic reference STARTDATE not resolved.
WARNING: Apparent symbolic reference ENDDATE not resolved.
1   where date between &STARTDATE and &ENDDATE;
ERROR: A character operand was found in the %EVAL function or %IF condition where a numeric operand is required.
NOTE: The macro FILTER_DATA generated 0 lines.`,
  },
  {
    label: 'OUT OF MEMORY - SAS Grid',
    log: `NOTE: Grid submission started at 14:32:05.
ERROR: Grid job failed with exit code 137.
NOTE: MEMSIZE exceeded. Requested 4GB, limit is 2GB for this queue.
ERROR: The SAS task has been terminated due to memory constraints.
NOTE: SAS Grid Manager: Job ID 84521 killed by scheduler.`,
  },
];

const CODE_EXAMPLES = [
  {
    label: 'Inefficient DATA step',
    code: `data work.result;
  set work.transactions;
  by account_id;
  if first.account_id then total = 0;
  total + amount;
  /* Reading 10M rows to compute a sum */
  /* Could use PROC MEANS instead */
run;`,
  },
  {
    label: 'Macro with no error handling',
    code: `%macro process_data(dsname=, startdt=, enddt=);
  data output;
    set &dsname;
    where date between &startdt and &enddt;
  run;
%mend;
/* No validation: what if dsname doesn't exist? */
/* No %if %syserr check after data step */
%process_data(dsname=MYLIB.sales)`,
  },
];

function AnalysisResult({ result, type }) {
  if (!result) return null;
  return (
    <div className={styles.result}>
      <div className={styles.resultHeader}>
        <span className="badge badge-amber">AI Analysis</span>
        <span className={styles.resultMeta}>SAS AI Agent · {type}</span>
      </div>
      <div className={styles.resultBody}>
        {result.split('\n').map((line, i) => {
          if (line.startsWith('**') && line.endsWith('**')) {
            return <p key={i} className={styles.resultHeading}>{line.replace(/\*\*/g, '')}</p>;
          }
          if (line.startsWith('•') || line.startsWith('-')) {
            return <p key={i} className={styles.resultBullet}>{line}</p>;
          }
          if (line.trim() === '') return <br key={i} />;
          return <p key={i} className={styles.resultText}>{line}</p>;
        })}
      </div>
    </div>
  );
}

export default function Agent() {
  const [tab, setTab] = useState('log');

  // Log Analyst state
  const [logInput, setLogInput] = useState('');
  const [logResult, setLogResult] = useState('');
  const [logLoading, setLogLoading] = useState(false);

  // Code Review state
  const [codeInput, setCodeInput] = useState('');
  const [codeResult, setCodeResult] = useState('');
  const [codeLoading, setCodeLoading] = useState(false);

  async function analyseLog() {
    if (!logInput.trim()) return;
    setLogLoading(true);
    setLogResult('');
    try {
      const res = await fetch('/api/analyse-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ log: logInput }),
      });
      const data = await res.json();
      setLogResult(data.result || data.error || 'No response.');
    } catch {
      setLogResult('Error connecting to the agent. Please try again.');
    }
    setLogLoading(false);
  }

  async function reviewCode() {
    if (!codeInput.trim()) return;
    setCodeLoading(true);
    setCodeResult('');
    try {
      const res = await fetch('/api/review-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: codeInput }),
      });
      const data = await res.json();
      setCodeResult(data.result || data.error || 'No response.');
    } catch {
      setCodeResult('Error connecting to the agent. Please try again.');
    }
    setCodeLoading(false);
  }

  return (
    <>
      <Head>
        <title>SAS AI Agent — Log Analyst & Code Review</title>
        <meta name="description" content="Diagnose SAS log errors and review SAS code with AI." />
      </Head>

      <div className={styles.page}>
        <div className="container">

          {/* PAGE HEADER */}
          <div className={styles.pageHeader}>
            <p className={styles.sectionLabel}>// live tool</p>
            <h1 className={styles.pageTitle}>SAS AI Agent</h1>
            <p className={styles.pageDesc}>
              Two specialist modules. Paste your SAS log or code and get expert-level diagnosis instantly.
            </p>
          </div>

          {/* TABS */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${tab === 'log' ? styles.tabActive : ''}`}
              onClick={() => setTab('log')}
            >
              <span className={styles.tabIcon}>◈</span>
              Log Analyst
              <span className="badge badge-amber" style={{marginLeft:'6px'}}>Aba A</span>
            </button>
            <button
              className={`${styles.tab} ${tab === 'code' ? styles.tabActive : ''}`}
              onClick={() => setTab('code')}
            >
              <span className={styles.tabIcon}>◉</span>
              Code Review
              <span className="badge badge-blue" style={{marginLeft:'6px'}}>Aba B</span>
            </button>
          </div>

          {/* TAB: LOG ANALYST */}
          {tab === 'log' && (
            <div className={styles.tabPanel}>
              <div className={styles.panelTop}>
                <div>
                  <h2 className={styles.panelTitle}>SAS Log Analyst</h2>
                  <p className={styles.panelDesc}>Paste a SAS log excerpt. The agent identifies root causes, severity, and recommends fixes.</p>
                </div>
                <div className={styles.examples}>
                  <span className={styles.examplesLabel}>Load example:</span>
                  {LOG_EXAMPLES.map(e => (
                    <button key={e.label} className={styles.exampleBtn} onClick={() => setLogInput(e.log)}>
                      {e.label}
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                className={styles.textarea}
                placeholder="Paste your SAS log here...&#10;&#10;NOTE: SAS Institute Inc.&#10;ERROR: ..."
                value={logInput}
                onChange={e => setLogInput(e.target.value)}
                rows={14}
              />

              <div className={styles.actions}>
                <button
                  className="btn btn-primary"
                  onClick={analyseLog}
                  disabled={logLoading || !logInput.trim()}
                >
                  {logLoading ? (
                    <><span className={styles.spinner} /> Analysing...</>
                  ) : (
                    <>Analyse log →</>
                  )}
                </button>
                {logInput && (
                  <button className="btn btn-outline" onClick={() => { setLogInput(''); setLogResult(''); }}>
                    Clear
                  </button>
                )}
                <span className={styles.hint}>Supports SAS Base, SAS Grid, SAS Viya logs</span>
              </div>

              <AnalysisResult result={logResult} type="Log Analyst" />
            </div>
          )}

          {/* TAB: CODE REVIEW */}
          {tab === 'code' && (
            <div className={styles.tabPanel}>
              <div className={styles.panelTop}>
                <div>
                  <h2 className={styles.panelTitle}>SAS Code Review</h2>
                  <p className={styles.panelDesc}>Submit SAS code for expert analysis. Identifies performance issues, macro errors, bad practices, and improvement opportunities.</p>
                </div>
                <div className={styles.examples}>
                  <span className={styles.examplesLabel}>Load example:</span>
                  {CODE_EXAMPLES.map(e => (
                    <button key={e.label} className={styles.exampleBtn} onClick={() => setCodeInput(e.code)}>
                      {e.label}
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                className={styles.textarea}
                placeholder="%macro my_macro(param=);&#10;  data work.output;&#10;    set &param;&#10;  run;&#10;%mend;"
                value={codeInput}
                onChange={e => setCodeInput(e.target.value)}
                rows={14}
              />

              <div className={styles.actions}>
                <button
                  className="btn btn-primary"
                  onClick={reviewCode}
                  disabled={codeLoading || !codeInput.trim()}
                >
                  {codeLoading ? (
                    <><span className={styles.spinner} /> Reviewing...</>
                  ) : (
                    <>Review code →</>
                  )}
                </button>
                {codeInput && (
                  <button className="btn btn-outline" onClick={() => { setCodeInput(''); setCodeResult(''); }}>
                    Clear
                  </button>
                )}
                <span className={styles.hint}>DATA steps · Macros · PROCs · SAS SQL</span>
              </div>

              <AnalysisResult result={codeResult} type="Code Review" />
            </div>
          )}

        </div>
      </div>
    </>
  );
}
