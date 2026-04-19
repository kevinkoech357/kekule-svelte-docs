<script lang="ts">
  import CodeBlock from '$lib/components/CodeBlock.svelte'
  import SEO from '$lib/components/SEO.svelte'
  import PackageManagerTabs from '$lib/components/PackageManagerTabs.svelte'
  import { fade, fly } from 'svelte/transition'

  const usageCode = `<script lang="ts">
  import { KekuleViewer } from 'kekule-svelte'
<\/script>

<KekuleViewer smiles="CC(=O)Oc1ccccc1C(=O)O" height="360px" />`

  const features = [
    { title: 'SMILES Input', desc: 'Render any valid SMILES string instantly' },
    { title: 'Structure Editor', desc: 'Full interactive drawing for chemists' },
    { title: 'Reaction Diagrams', desc: 'Visualize complex reaction SMILES' },
    { title: '3D Viewer', desc: 'High-performance WebGL rendering' },
    { title: 'Utilities', desc: 'Lipinski, MW, formula, and more' },
    { title: 'TypeScript First', desc: 'Comprehensive type definitions' },
  ]
</script>

<SEO title="kekule-svelte" />

<div class="home-container">
  <section class="hero" in:fade={{ duration: 400 }}>
    <div class="hero-content">
      <h1 class="hero-title" in:fly={{ y: 20, duration: 500, delay: 200 }}>
        Chemistry components for Svelte 5
      </h1>
      <p class="hero-sub" in:fly={{ y: 20, duration: 500, delay: 300 }}>
        A lightweight, type-safe wrapper for Kekule.js. Render, edit, and analyze organic compound structures with ease.
      </p>
      <div class="hero-actions" in:fly={{ y: 20, duration: 500, delay: 400 }}>
        <a href="/docs/install" class="btn btn-primary">
          Get Started
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
        <a href="/examples/basic" class="btn btn-secondary">Explore Examples</a>
      </div>
    </div>
  </section>

  <div class="content-grid">
    <div class="installation-section" in:fade={{ duration: 600, delay: 500 }}>
      <h2 class="section-title">Quick Install</h2>
      <PackageManagerTabs library="kekule-svelte" />
    </div>

    <div class="code-previews" in:fade={{ duration: 600, delay: 600 }}>
      <h2 class="section-title">Basic Usage</h2>
      <CodeBlock code={usageCode} lang="svelte" title="Usage" />
    </div>

    <section class="features-section">
      <h2 class="section-title">Core Features</h2>
      <div class="features-grid">
        {#each features as f, i}
          <div class="feature-card" in:fly={{ y: 20, duration: 400, delay: 600 + (i * 50) }}>
            <div class="feature-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" stroke-width="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h3 class="feature-title">{f.title}</h3>
            <p class="feature-desc">{f.desc}</p>
          </div>
        {/each}
      </div>
    </section>

    <section class="next-section">
      <h2 class="section-title">Next Steps</h2>
      <div class="next-grid">
        <a href="/docs/install" class="next-card">
          <div class="next-label-group">
            <strong>Installation</strong>
            <span>Set up your project</span>
          </div>
        </a>
        <a href="/docs/quickstart" class="next-card">
          <div class="next-label-group">
            <strong>Quick Start</strong>
            <span>Up and running in 2 min</span>
          </div>
        </a>
        <a href="/docs/viewer" class="next-card">
          <div class="next-label-group">
            <strong>API Reference</strong>
            <span>Component documentation</span>
          </div>
        </a>
        <a href="/examples/basic" class="next-card">
          <div class="next-label-group">
            <strong>Examples</strong>
            <span>Interactive demos</span>
          </div>
        </a>
      </div>
    </section>
  </div>
</div>

<style>
  .home-container {
    padding-bottom: 80px;
  }

  .hero {
    padding: 100px 0 80px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .hero-title {
    font-size: clamp(32px, 6vw, 64px);
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.04em;
    margin: 0 auto 24px;
    max-width: 900px;
  }

  .hero-sub {
    font-size: clamp(16px, 2vw, 19px);
    color: var(--text-secondary);
    max-width: 600px;
    margin: 0 auto 40px;
    line-height: 1.6;
  }

  .hero-actions {
    display: flex;
    gap: 16px;
    justify-content: center;
  }

  .section-title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 24px;
    border: none;
    padding: 0;
  }

  .features-section {
    margin-top: 64px;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }

  .feature-card {
    padding: 24px;
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    transition: all 0.3s ease;
  }

  .feature-card:hover {
    border-color: var(--brand-border);
    transform: translateY(-2px);
    box-shadow: 0 12px 30px -10px rgba(0, 0, 0, 0.3);
  }

  .feature-icon {
    width: 40px;
    height: 40px;
    background: var(--brand-light);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
  }

  .feature-title {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 8px;
  }

  .feature-desc {
    font-size: 14px;
    color: var(--text-muted);
    line-height: 1.5;
    margin: 0;
  }

  .next-section {
    margin-top: 64px;
  }

  .next-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
  }

  .next-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 24px;
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .next-card:hover {
    border-color: var(--brand);
    background: var(--surface);
  }

  .next-label-group {
    flex: 1;
  }

  .next-card strong {
    display: block;
    font-size: 15px;
    color: var(--text);
    margin-bottom: 2px;
  }

  .next-card span {
    font-size: 12px;
    color: var(--text-muted);
  }

  @media (max-width: 640px) {
    .hero { padding: 40px 0 60px; }
    .hero-actions { flex-direction: column; width: 100%; max-width: 300px; }
    .next-grid { grid-template-columns: 1fr; }
  }
</style>