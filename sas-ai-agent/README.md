# SAS AI Agent — Deployment Guide

## Stack
- **Frontend + Backend**: Next.js 14
- **Hosting**: Vercel (free tier)
- **AI**: Anthropic Claude API
- **Repo**: GitHub (public)

---

## Local Development

```bash
npm install
# Create .env.local with your Anthropic API key:
# ANTHROPIC_API_KEY=sk-ant-...
npm run dev
# Open http://localhost:3000
```

---

## Deploy to Vercel (5 minutes)

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "feat: initial SAS AI Agent"
git remote add origin https://github.com/YOUR_USERNAME/sas-ai-agent.git
git push -u origin main
```

### 2. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repository
3. Add Environment Variable:
   - Key: `ANTHROPIC_API_KEY`
   - Value: your Anthropic API key
4. Click Deploy

Your site will be live at `https://sas-ai-agent.vercel.app`

### 3. Custom domain (optional)
In Vercel → Settings → Domains → add your domain.

---

## Adding a New Blog Post

Create a new file in `/pages/blog/week-XX-title.js`:

```js
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Post.module.css';

export default function WeekXX() {
  return (
    <>
      <Head><title>Week XX — Your Title</title></Head>
      <div className={styles.page}>
        <div className="container">
          <div className={styles.postWrapper}>
            {/* your content */}
          </div>
        </div>
      </div>
    </>
  );
}
```

Then add it to the `posts` array in `/pages/blog/index.js`.

---

## Environment Variables

| Variable | Description |
|---|---|
| `ANTHROPIC_API_KEY` | Your Anthropic API key (required) |

---

## Project Structure

```
/pages
  index.js          — Homepage
  agent.js          — Log Analyst + Code Review tool
  roadmap.js        — 12-week roadmap
  blog/
    index.js        — Blog listing
    week-01-*.js    — Individual posts
  api/
    analyse-log.js  — Log analysis API
    review-code.js  — Code review API
/components
  Nav.js / Nav.module.css
  Footer.js / Footer.module.css
/styles
  globals.css
  Home.module.css
  Agent.module.css
  Blog.module.css
  Post.module.css
  Roadmap.module.css
```
