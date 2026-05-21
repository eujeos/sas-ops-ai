import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Blog.module.css';

// Static posts — replace with markdown files later
const posts = [
  {
    slug: 'week-01-building-sas-ai-agent',
    week: '01',
    date: '2024-01-16',
    title: 'Week 1 — Building the SAS AI Agent MVP',
    excerpt: 'Why I decided to build an AI agent specifically for SAS environments, and what the first functional version looks like after one week of development.',
    tags: ['SAS', 'LLM', 'MVP', 'AI Ops'],
    readTime: '6 min',
  },
];

export default function Blog() {
  return (
    <>
      <Head>
        <title>Blog — SAS AI Agent</title>
        <meta name="description" content="Weekly build log for the SAS AI Agent project." />
      </Head>

      <div className={styles.page}>
        <div className="container">
          <div className={styles.header}>
            <p className={styles.sectionLabel}>// build log</p>
            <h1 className={styles.title}>Weekly build log</h1>
            <p className={styles.desc}>
              Every week, one post. Architecture decisions, technical lessons, and the honest reality of building in public.
            </p>
          </div>

          <div className={styles.postsGrid}>
            {posts.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.postCard}>
                <div className={styles.postTop}>
                  <span className="badge badge-amber">Week {post.week}</span>
                  <span className={styles.postDate}>{post.date}</span>
                </div>
                <h2 className={styles.postTitle}>{post.title}</h2>
                <p className={styles.postExcerpt}>{post.excerpt}</p>
                <div className={styles.postBottom}>
                  <div className={styles.postTags}>
                    {post.tags.map(t => (
                      <span key={t} className={styles.postTag}>{t}</span>
                    ))}
                  </div>
                  <span className={styles.readTime}>{post.readTime} read</span>
                </div>
              </Link>
            ))}

            {/* PLACEHOLDER UPCOMING POSTS */}
            {[2,3,4].map(w => (
              <div key={w} className={`${styles.postCard} ${styles.postCardUpcoming}`}>
                <div className={styles.postTop}>
                  <span className="badge badge-amber" style={{opacity:.4}}>Week 0{w}</span>
                </div>
                <h2 className={`${styles.postTitle} ${styles.upcomingTitle}`}>Coming soon...</h2>
                <p className={styles.postExcerpt} style={{opacity:.35}}>Published every Tuesday at 08:30 (Lisbon)</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
