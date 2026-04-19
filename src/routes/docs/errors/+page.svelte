<script lang="ts">
  import CodeBlock from '$lib/components/CodeBlock.svelte'

  const example = `import { KekuleError } from 'kekule-svelte'
import type { KekuleErrorCode } from 'kekule-svelte'

<KekuleViewer
  smiles="invalid"
  onError={(err: KekuleError) => {
    switch (err.code) {
      case 'PARSE_FAILED':
        console.log('Invalid SMILES format!');
        break;
      case 'LOAD_TIMEOUT':
        console.log('Took too long to load Kekule from CDN');
        break;
    }
  }}
/>`
</script>

<svelte:head>
  <title>Errors — kekule-svelte</title>
</svelte:head>

<h1>KekuleError & Error Handling</h1>
<p class="lead">
  All components and loader functions use a structured <code>KekuleError</code> class
  for robust programmatic error handling.
</p>

<div class="component-badge" style="display:inline-block;padding:4px 8px;background:var(--brand-light);color:var(--brand);border-radius:4px;font-size:12px;font-weight:600;margin-bottom:24px;">Utility</div>

<h2>Import</h2>
<CodeBlock code={`import { KekuleError } from 'kekule-svelte'\nimport type { KekuleErrorCode } from 'kekule-svelte'`} lang="typescript" />

<h2>Error Codes</h2>
<ul>
  <li><code>LOAD_FAILED</code> - The Kekule.js CDN script failed to load.</li>
  <li><code>LOAD_TIMEOUT</code> - The library took too long to initialize.</li>
  <li><code>PARSE_FAILED</code> - The provided SMILES or MOL data was invalid.</li>
  <li><code>RENDER_FAILED</code> - WebGL or Canvas rendering critically failed.</li>
  <li><code>SSR_UNSUPPORTED</code> - Attempted to load Kekule in non-browser context.</li>
</ul>

<h2>Handling Validation Errors</h2>
<CodeBlock code={example} lang="svelte" />

<style>
  h1 { font-size: 36px; margin-bottom: 10px; }
  .lead { margin-bottom: 16px; }
  ul { margin-bottom: 30px; }
  li { margin-bottom: 8px; line-height: 1.6; }
  code { background: var(--bg-code); padding: 2px 6px; border-radius: 4px; font-weight: 600; color: var(--brand); }
</style>
