<script lang="ts">
  import CodeBlock from '$lib/components/CodeBlock.svelte'

  const customLoadingCode = `<KekuleViewer smiles={smiles}>
  {#snippet loading()}
    <div style="display:flex;flex-direction:column;align-items:center;gap:12px">
      <svg class="spin" width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="12" stroke="var(--border)" stroke-width="3"/>
        <path d="M16 4 A12 12 0 0 1 28 16" stroke="var(--brand)" stroke-width="3" stroke-linecap="round"/>
      </svg>
      <p style="font-size:13px;color:var(--text-muted)">Rendering molecule...</p>
    </div>
  {/snippet}
</KekuleViewer>`

  const customErrorCode = `<KekuleViewer smiles="invalid-smiles">
  {#snippet error({ error })}
    <div style="padding:16px;background:#fef2f2;border:1px solid #fee2e2;border-radius:8px;color:#991b1b;font-size:13px">
      <strong>Error:</strong> {error}
    </div>
  {/snippet}
</KekuleViewer>`
</script>

<svelte:head>
  <title>Custom slots — kekule-svelte examples</title>
</svelte:head>

<h1>Custom slots</h1>
<p class="lead">Use Svelte 5 snippets to fully customize the loading and error UI.</p>

<h2>Loading state</h2>
<p>Override the default loading spinner with your own design.</p>
<CodeBlock code={customLoadingCode} lang="svelte" />

<div class="demo-card">
  <div class="demo-header"><div class="demo-label">Custom Loading Demo</div></div>
  <div class="demo-content">
    <div class="viewer-mount">
      <div style="display:flex;flex-direction:column;align-items:center;gap:12px">
        <svg class="spin" width="32" height="32" viewBox="0 0 32 32" fill="none" style="animation: spin 1s linear infinite;">
          <circle cx="16" cy="16" r="12" stroke="var(--border)" stroke-width="3"/>
          <path d="M16 4 A12 12 0 0 1 28 16" stroke="var(--brand)" stroke-width="3" stroke-linecap="round"/>
        </svg>
        <p style="font-size:13px;color:var(--text-muted)">Rendering molecule...</p>
      </div>
    </div>
  </div>
</div>

<h2>Error state</h2>
<p>Catch SMILES parsing errors or network failures and show a user-friendly message.</p>
<CodeBlock code={customErrorCode} lang="svelte" />

<div class="demo-card">
  <div class="demo-header"><div class="demo-label">Custom Error Demo</div></div>
  <div class="demo-content">
    <div style="padding:16px;background:var(--bg);border:1px solid #ef4444;border-radius:8px;color:#ef4444;font-size:13px">
      <strong>Error:</strong> Cannot parse SMILES string "invalid-smiles"
    </div>
  </div>
</div>

<div class="next-bar">
  <a href="/examples/editor" class="next-link">Structure editor </a>
</div>

<style>
  h1 { font-size: 36px; margin-bottom: 10px; }
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
</style>
