<script lang="ts">
  import CodeBlock from '$lib/components/CodeBlock.svelte'
  import { KekuleViewer } from 'kekule-svelte'

  const svgCode = `<script lang="ts">
  import { KekuleViewer } from 'kekule-svelte'

  let ref = $state<any>()
<\/script>

<KekuleViewer smiles="CC(=O)Oc1ccccc1C(=O)O" bind:this={ref} />

<!-- Download buttons -->
<button onclick={() => ref?.downloadSVG('aspirin.svg')}>
  Download SVG
</button>
<button onclick={() => ref?.downloadPNG('aspirin.png')}>
  Download PNG
</button>`

  const dataUriCode = `<script lang="ts">
  import { KekuleViewer } from 'kekule-svelte'

  let ref    = $state<any>()
  let imgSrc = $state<string | null>(null)

  function capture() {
    imgSrc = ref?.exportSVG() ?? null
  }
<\/script>

<KekuleViewer smiles="CCO" bind:this={ref} />

<button onclick={capture}>Capture</button>

{#if imgSrc}
  <!-- Use the data URI however you like -->
  <img src={imgSrc} alt="Molecule" />
  <a href={imgSrc} download="molecule.svg">Save</a>
{/if}`

  const editorCode = `<script lang="ts">
  import { KekuleEditor } from 'kekule-svelte'

  let ref = $state<any>()
<\/script>

<KekuleEditor bind:this={ref} height="480px" />

<button onclick={() => ref?.downloadSVG('structure.svg')}>
  Export SVG
</button>
<button onclick={() => console.log(ref?.getMolBlock())}>
  Log MOL block
</button>`
</script>

<svelte:head>
  <title>Download & export — kekule-svelte examples</title>
</svelte:head>

<h1>Download &amp; export</h1>
<p class="lead">
  Export molecules as SVG or PNG from <code>KekuleViewer</code>,
  or export structures as SVG and MOL from <code>KekuleEditor</code>.
</p>

<div class="demo-card">
  <div class="demo-header"><div class="demo-label">Export Demo</div></div>
  <div class="demo-content">
    <div style="display:grid;grid-template-columns:1fr 200px;gap:24px" class="demo-split-grid">
      <!-- Viewer side -->
      <KekuleViewer smiles="CCO" height="300px" />

      <!-- Export controls -->
      <div style="display:flex;flex-direction:column;gap:12px">
        <h3 style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin-bottom:4px">Download</h3>
        <button class="btn-render" style="width:100%;padding:10px;font-size:13px">Download SVG</button>
        <button class="btn-render" style="width:100%;padding:10px;font-size:13px">Download PNG</button>
        <div style="margin-top:20px">
           <h3 style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin-bottom:4px">Utilities</h3>
           <button class="pill-item" style="width:100%">Capture URI</button>
        </div>
      </div>
    </div>
  </div>
</div>

<h2>Download SVG / PNG</h2>
<p>Triggers an immediate browser file download.</p>
<CodeBlock code={svgCode} lang="svelte" />

<h2>Get data URI</h2>
<p>
  Use <code>exportSVG()</code> or <code>exportPNG()</code> to get
  the raw data URI — useful for sending to a server, displaying inline,
  or copying to clipboard.
</p>
<CodeBlock code={dataUriCode} lang="svelte" />

<h2>Export from editor</h2>
<p>The editor supports SVG download and MOL block export.</p>
<CodeBlock code={editorCode} lang="svelte" />

<div class="next-bar">
  <a href="/docs/viewer" class="next-link">Back to KekuleViewer API </a>
</div>

<style>
  h1 { font-size: 36px; margin-bottom: 10px; }
</style>
