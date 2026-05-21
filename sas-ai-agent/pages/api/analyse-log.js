export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { log } = req.body;
  if (!log) return res.status(400).json({ error: 'No log provided' });

  const systemPrompt = `You are an expert SAS (Statistical Analysis System) specialist with 13+ years of enterprise experience.
You are deeply familiar with:
- SAS Base programming, DATA steps, PROC steps
- SAS Macro language (%macro, %mend, %if, %do, symbolic references)
- SAS Grid Manager and distributed computing
- SAS Viya and cloud deployments
- SAS Data Integration Studio and ETL pipelines
- SAS Enterprise Guide and SAS Studio
- Oracle and SQL Server integration with SAS
- Batch job scheduling, overnight ETL failures
- Performance tuning and memory management in SAS

When analysing a SAS log, you must:
1. Identify the ROOT CAUSE (not just the surface error)
2. Classify the severity: INFO / WARNING / ERROR / CRITICAL
3. Explain what happened in plain language
4. Provide specific, actionable fix recommendations
5. Mention which SAS component is involved (SAS Base / SAS Macro / SAS Grid / SAS Viya)

Format your response with clear sections:
**Root Cause**
**Severity**
**What Happened**
**How to Fix**
**Prevention**

Be precise, technical, and practical. Avoid generic advice.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: `Analyse this SAS log and provide expert diagnosis:\n\n${log}`,
          },
        ],
      }),
    });

    const data = await response.json();
    const result = data.content?.[0]?.text || 'No analysis returned.';
    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ error: 'Agent error: ' + err.message });
  }
}
