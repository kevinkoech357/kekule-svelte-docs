<script lang="ts">
  import CodeBlock from '$lib/components/CodeBlock.svelte'
  import SEO from '$lib/components/SEO.svelte'
  import PackageManagerTabs from '$lib/components/PackageManagerTabs.svelte'

  const sveltekit = `<!-- src/app.html — optional: load Kekule.js early for faster first render -->
<head>
  <!-- kekule-svelte loads this automatically, but you can preload it -->
  <link rel="preload" href="https://cdn.jsdelivr.net/npm/kekule@0.9.7/dist/kekule.min.js?modules=io,chemWidget,algorithm" as="script" />
</head>`

  const peerDep = `{
  "peerDependencies": {
    "svelte": "^5.0.0"
  }
}`
</script>

<SEO 
  title="Installation" 
  description="How to install and set up kekule-svelte in your Svelte 5 application."
/>

<h1>Installation</h1>

<p class="lead">Install kekule-svelte from npm. Svelte 5 is the only peer dependency.</p>

<h2>Package manager</h2>

<p>Pick your package manager of choice to install the library:</p>

<PackageManagerTabs library="kekule-svelte" />

<h2>Peer dependencies</h2>

<p>
  kekule-svelte requires <strong>Svelte 5</strong> as a peer dependency.
  It does <em>not</em> bundle Kekule.js — the library loads it automatically
  from the jsDelivr CDN the first time a component mounts.
</p>

<CodeBlock code={peerDep} lang="json" title="package.json" />

<h2>Kekule.js loading</h2>

<p>
  Kekule.js is loaded once on first use via a <code>&lt;script&gt;</code> tag injected
  into <code>document.head</code>. All subsequent component mounts reuse the same
  loaded module — it is never fetched twice.
</p>

<p>
  If you want to preload it for a faster first render, add a <code>preload</code>
  link hint to your <code>app.html</code>:
</p>

<CodeBlock code={sveltekit} lang="html" title="src/app.html (optional)" />

<h2>TypeScript</h2>

<p>
  kekule-svelte ships full TypeScript definitions. No <code>@types/</code> package needed.
  All component props, exported methods, and utility return types are fully typed.
</p>

<h2>Tree-Shaking</h2>
<p>
  <code>kekule-svelte</code> uses granular exports and the <code>"sideEffects": false</code> flag
  in its package.json. This means your bundler (Vite/Rollup) will only bundle the exact components you import, resulting in minimal bundle bloat.
</p>
<div class="next-bar">
  <a href="/docs/quickstart" class="btn btn-secondary">
    Next: Quick start
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  </a>
</div>

<style>
  .lead { 
    font-size: 18px; 
    color: var(--text-secondary); 
    margin-bottom: 32px; 
    line-height: 1.6; 
  }

  .next-bar { 
    margin-top: 64px; 
    padding-top: 32px; 
    border-top: 1px solid var(--border); 
  }
</style>
