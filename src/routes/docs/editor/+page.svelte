<script lang="ts">
  import CodeBlock  from '$lib/components/CodeBlock.svelte'
  import PropsTable from '$lib/components/PropsTable.svelte'

  const props = [
    { name: 'smiles',    type: 'string',  default: "''",      desc: 'Initial SMILES to load into the editor on mount' },
    { name: 'width',     type: 'string',  default: "'100%'",  desc: 'CSS width' },
    { name: 'height',    type: 'string',  default: "'480px'", desc: 'CSS height' },
    { name: 'class',     type: 'string',  default: "''",      desc: 'Extra CSS classes' },
    { name: 'onSmiles',  type: '(smiles: string) => void',  desc: 'Called on every structural change — emits the current SMILES' },
    { name: 'onChange',  type: '(mol: unknown) => void',    desc: 'Called on every structural change — emits the raw Kekule mol object' },
    { name: 'onReady',   type: '(editor: unknown) => void', desc: 'Called once the editor is fully initialised' },
    { name: 'loading',   type: 'Snippet', desc: 'Custom loading indicator' },
  ]

  const methods = [
    { name: 'getEditor()',           returns: 'unknown',       desc: 'Returns the raw Kekule Composer instance' },
    { name: 'getSmiles()',           returns: 'string | null', desc: 'Returns the current structure as SMILES' },
    { name: 'getMolBlock()',         returns: 'string | null', desc: 'Returns the current structure as MOL block (V2000)' },
    { name: 'setSmiles(smiles)',     returns: 'void',          desc: 'Load a new SMILES into the editor programmatically' },
    { name: 'clear()',               returns: 'void',          desc: 'Clear the canvas' },
    { name: 'undo()',                returns: 'void',          desc: 'Undo last action' },
    { name: 'redo()',                returns: 'void',          desc: 'Redo last undone action' },
    { name: 'downloadSVG(filename?)', returns: 'void',         desc: 'Trigger SVG download (default: "structure.svg")' },
  ]

  const basicCode = `<script lang="ts">
  import { KekuleEditor } from 'kekule-svelte'

  let smiles = $state('')
<\/script>

<KekuleEditor
  smiles="c1ccccc1"
  height="480px"
  onSmiles={(s) => smiles = s}
/>

<p>SMILES: <code>{smiles}</code></p>`

  const controlCode = `<script lang="ts">
  import { KekuleEditor } from 'kekule-svelte'

  let ref = $state<any>()
<\/script>

<KekuleEditor bind:this={ref} height="480px" />

<div>
  <button onclick={() => ref?.setSmiles('c1ccccc1')}>Load benzene</button>
  <button onclick={() => ref?.undo()}>Undo</button>
  <button onclick={() => ref?.redo()}>Redo</button>
  <button onclick={() => ref?.clear()}>Clear</button>
  <button onclick={() => console.log(ref?.getSmiles())}>Log SMILES</button>
  <button onclick={() => ref?.downloadSVG()}>Export SVG</button>
</div>`

  const viewerSyncCode = `<script lang="ts">
  import { KekuleEditor, KekuleViewer } from 'kekule-svelte'

  let smiles = $state('CCO')
<\/script>

<!-- Editor on the left, live 2D preview on the right -->
<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px" class="demo-split-grid">
  <KekuleEditor {smiles} onSmiles={(s) => smiles = s} />
  <KekuleViewer {smiles} />
</div>`
</script>

<svelte:head>
  <title>KekuleEditor — kekule-svelte</title>
</svelte:head>

<h1>KekuleEditor</h1>
<p class="lead">
  Full interactive 2D structure editor powered by Kekule.js Composer.
  Emits SMILES via <code>onSmiles</code> on every change.
</p>

<div class="component-badge">Component</div>

<h2>Import</h2>
<CodeBlock code={`import { KekuleEditor } from 'kekule-svelte'`} lang="typescript" />

<h2>Props</h2>
<PropsTable {props} />

<h2>Exported methods</h2>
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
<CodeBlock code={basicCode} lang="svelte" />

<h3>Programmatic control</h3>
<CodeBlock code={controlCode} lang="svelte" />

<h3>Sync with KekuleViewer</h3>
<p>Pair the editor with a viewer for a live 2D preview as you draw.</p>
<CodeBlock code={viewerSyncCode} lang="svelte" />

<div class="next-bar">
  <a href="/docs/reaction" class="next-link">KekuleReaction </a>
</div>

<style>
  h1 { font-size: 36px; margin-bottom: 10px; }
</style>
