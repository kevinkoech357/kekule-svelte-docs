<script lang="ts">
  import CodeBlock   from '$lib/components/CodeBlock.svelte'
  import PropsTable  from '$lib/components/PropsTable.svelte'

  const props = [
    { name: 'smiles',        type: 'string',             required: true,  desc: 'SMILES string to render as a 2D structural diagram' },
    { name: 'width',         type: 'string',             default: "'100%'",        desc: 'CSS width of the viewer container' },
    { name: 'height',        type: 'string',             default: "'360px'",       desc: 'CSS height of the viewer container' },
    { name: 'showToolbar',   type: 'boolean',            default: 'false',         desc: 'Show the built-in Kekule toolbar' },
    { name: 'interactive',   type: 'boolean',            default: 'false',         desc: 'Enable mouse interaction (pan, zoom)' },
    { name: 'background',    type: 'string',             default: "'transparent'", desc: 'Canvas background colour — any valid CSS colour' },
    { name: 'class',         type: 'string',             default: "''",            desc: 'Extra CSS classes on the wrapper div' },
    { name: 'onReady',       type: '(viewer: unknown) => void',  desc: 'Called once the viewer is fully initialised' },
    { name: 'onError', type: '(error: KekuleError) => void',   desc: 'Called when rendering fails — receives the error message' },
    { name: 'loading',       type: 'Snippet',            desc: 'Custom loading indicator (Svelte 5 snippet)' },
    { name: 'error',         type: "Snippet<[{ error: string }]>", desc: 'Custom error display — receives { error: string }' },
  ]

  const methods = [
    { name: 'getViewer()',             returns: 'unknown',        desc: 'Returns the raw Kekule viewer instance' },
    { name: 'exportSVG()',             returns: 'string | null',  desc: 'Exports the molecule as an SVG data URI' },
    { name: 'exportPNG()',             returns: 'string | null',  desc: 'Exports the molecule as a PNG data URI' },
    { name: 'downloadSVG(filename?)',  returns: 'void',           desc: 'Triggers a browser download as SVG (default: "molecule.svg")' },
    { name: 'downloadPNG(filename?)',  returns: 'void',           desc: 'Triggers a browser download as PNG (default: "molecule.png")' },
  ]

  const basicExample = `<script lang="ts">
  import { KekuleViewer } from 'kekule-svelte'
<\/script>

<KekuleViewer
  smiles="CC(=O)Oc1ccccc1C(=O)O"
  width="100%"
  height="400px"
  background="#fafafa"
/>`

  const bindExample = `<script lang="ts">
  import { KekuleViewer } from 'kekule-svelte'

  let ref = $state<any>()

  function handleDownload() {
    ref?.downloadSVG('aspirin.svg')
  }

  function handleExport() {
    const uri = ref?.exportPNG()
    console.log(uri) // data:image/png;base64,...
  }
<\/script>

<KekuleViewer smiles="CC(=O)Oc1ccccc1C(=O)O" bind:this={ref} />
<button onclick={handleDownload}>Download SVG</button>
<button onclick={handleExport}>Export PNG</button>`

  const slotsExample = `<KekuleViewer smiles={smiles}>
  {#snippet loading()}
    <div class="my-spinner">
      <svg class="spin" .../>
      <p>Loading molecule...</p>
    </div>
  {/snippet}

  {#snippet error({ error })}
    <div class="my-error">
      <p>Error: {error}</p>
      <button onclick={() => smiles = 'CCO'}>Reset</button>
    </div>
  {/snippet}
</KekuleViewer>`

  const reactiveExample = `<script lang="ts">
  import { KekuleViewer } from 'kekule-svelte'

  const compounds = ['CCO', 'c1ccccc1', 'CC(=O)O']
  let index = $state(0)
  let smiles = $derived(compounds[index])
<\/script>

<!-- Re-renders automatically when smiles changes -->
<KekuleViewer {smiles} height="300px" />

<button onclick={() => index = (index + 1) % compounds.length}>
  Next compound
</button>`
</script>

<svelte:head>
  <title>KekuleViewer — kekule-svelte</title>
</svelte:head>

<h1>KekuleViewer</h1>
<p class="lead">
  Renders a 2D structural diagram from a SMILES string. Read-only.
  Use <a href="/docs/editor">KekuleEditor</a> if you need interactive drawing.
</p>

<div class="component-badge">Component</div>

<h2>Import</h2>
<CodeBlock code={`import { KekuleViewer } from 'kekule-svelte'`} lang="typescript" />

<h2>Props</h2>
<PropsTable {props} />

<h2>Exported methods</h2>
<p>Access via <code>bind:this</code>:</p>
<div class="methods-table-wrap">
  <table class="methods-table">
    <thead><tr><th>Method</th><th>Returns</th><th>Description</th></tr></thead>
    <tbody>
      {#each methods as m}
        <tr>
          <td><code>{m.name}</code></td>
          <td><code class="type-code">{m.returns}</code></td>
          <td>{m.desc}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<h2>Examples</h2>

<h3>Basic usage</h3>
<CodeBlock code={basicExample} lang="svelte" />

<h3>Export and download</h3>
<CodeBlock code={bindExample} lang="svelte" />

<h3>Custom slots</h3>
<CodeBlock code={slotsExample} lang="svelte" />

<h3>Reactive SMILES</h3>
<p>The viewer automatically re-renders when the <code>smiles</code> prop changes.</p>
<CodeBlock code={reactiveExample} lang="svelte" />

<div class="next-bar">
  <a href="/docs/editor" class="btn btn-secondary">
    Next: KekuleEditor
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  </a>
</div>

<style>
  h1 { font-size: 36px; margin-bottom: 10px; }
  .lead { margin-bottom: 16px; }
</style>
