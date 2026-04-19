<script lang="ts">
  import CodeBlock from '$lib/components/CodeBlock.svelte'
  import { KekuleEditor, KekuleViewer } from 'kekule-svelte'

  let currentSmiles = $state('c1ccccc1')
  let editorRef = $state<any>()

  const code = `<script lang="ts">
  import { KekuleEditor, KekuleViewer } from 'kekule-svelte'

  let smiles      = $state('c1ccccc1')
  let editorRef   = $state<any>()
<\/script>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px" class="demo-split-grid">
  <!-- Editor -->
  <div>
    <KekuleEditor
      {smiles}
      height="480px"
      onSmiles={(s) => smiles = s}
      bind:this={editorRef}
    />
    <div style="display:flex;gap:8px;margin-top:10px">
      <button onclick={() => editorRef?.undo()}>Undo</button>
      <button onclick={() => editorRef?.redo()}>Redo</button>
      <button onclick={() => editorRef?.clear()}>Clear</button>
      <button onclick={() => editorRef?.downloadSVG()}>Export SVG</button>
    </div>
  </div>

  <!-- Live 2D preview -->
  <KekuleViewer {smiles} height="480px" />
</div>

<!-- Current SMILES -->
<pre>{smiles}</pre>`
</script>

<svelte:head>
  <title>Structure editor — kekule-svelte examples</title>
</svelte:head>

<h1>Structure editor</h1>
<p class="lead">
  Use <code>KekuleEditor</code> paired with <code>KekuleViewer</code>
  for a live 2D preview as you draw.
</p>

<div class="demo-card">
  <div class="demo-header"><div class="demo-label">Interactive Editor Demo</div></div>
  <div class="demo-content">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px" class="demo-split-grid">
      <!-- Editor side -->
      <div>
        <KekuleEditor 
          smiles={currentSmiles} 
          height="400px" 
          onSmiles={(s) => currentSmiles = s} 
          bind:this={editorRef} 
        />
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:16px">
          <button class="pill-item" onclick={() => editorRef?.undo()}>Undo</button>
          <button class="pill-item" onclick={() => editorRef?.redo()}>Redo</button>
          <button class="pill-item" onclick={() => editorRef?.clear()}>Clear</button>
          <button class="btn-render" onclick={() => editorRef?.downloadSVG()} style="padding: 6px 16px; font-size: 13px;">Export SVG</button>
        </div>
      </div>

      <!-- Preview side -->
      <div>
        <KekuleViewer smiles={currentSmiles} height="400px" />
        <div class="demo-footer" style="margin-top:16px;border:1px solid var(--border);border-radius:var(--radius)">
           <span class="footer-label">SMILES</span>
           <code class="footer-val">{currentSmiles}</code>
        </div>
      </div>
    </div>
  </div>
</div>

<h2>Code</h2>
<CodeBlock {code} lang="svelte" />

<div class="next-bar">
  <a href="/examples/reaction" class="next-link">Reaction diagrams </a>
</div>

<style>
  h1 { font-size: 36px; margin-bottom: 10px; }
</style>
