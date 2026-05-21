export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { code } = req.body;
  if (!code) return res.status(400).json({ error: 'No code provided' });

  const systemPrompt = `You are an expert SAS (Statistical Analysis System) code reviewer with 13+ years of enterprise experience.
You specialise in:
- SAS Base: DATA steps, PROC steps, array processing, hash objects
- SAS Macro language: macro variables, macro programs, scope, quoting functions
- SAS SQL: PROC SQL optimisation, joins, subqueries
- Performance: WHERE clause optimisation, index usage, KEEP/DROP, SET options
- SAS Data Integration Studio: ETL best practices
- SAS Grid: parallel processing, distributed jobs
- Code quality: readability, maintainability, error handling

When reviewing SAS code, you must:
1. Identify performance issues (slow DATA steps, missing WHERE conditions, large unnecessary reads)
2. Find potential runtime errors (unresolved macro variables, missing error handling, invalid references)
3. Highlight bad practices (hard-coded values, no %syserr checks, missing NOPRINT options)
4. Suggest specific improvements with code examples where relevant
5. Rate overall code quality: POOR / FAIR / GOOD / EXCELLENT

Format your response with clear sections:
**Overall Quality**
**Performance Issues**
**Potential Errors**
**Bad Practices**
**Recommendations**
**Improved Code** (when relevant, show a better version)

Be direct and specific. Include brief code snippets in your recommendations.`;

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
            content: `Review this SAS code and provide expert feedback:\n\n${code}`,
          },
        ],
      }),
    });

    const data = await response.json();
    const result = data.content?.[0]?.text || 'No review returned.';
    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ error: 'Agent error: ' + err.message });
  }
}
