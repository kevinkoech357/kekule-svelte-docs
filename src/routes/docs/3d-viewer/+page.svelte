<script lang="ts">
  import CodeBlock   from '$lib/components/CodeBlock.svelte'
  import PropsTable  from '$lib/components/PropsTable.svelte'

  const props = [
    { name: 'smiles',        type: 'string',            desc: 'SMILES string to render' },
    { name: 'molBlock',      type: 'string',            desc: 'MOL block content (alternative to smiles)' },
    { name: 'width',         type: 'string',            default: "'100%'", desc: 'CSS width' },
    { name: 'height',        type: 'string',            default: "'400px'", desc: 'CSS height' },
    { name: 'showToolbar',   type: 'boolean',           default: 'false', desc: 'Show the 3D viewer toolbar' },
    { name: 'renderMode',    type: 'RenderMode',        default: "'ballAndStick'", desc: 'Rendering style (ballAndStick, spaceFill, wireframe, cylinder)' },
    { name: 'background',    type: 'string',            default: "'white'", desc: 'Background color' },
    { name: 'onReady',       type: '(viewer: unknown) => void', desc: 'Called when viewer is ready' },
    { name: 'onError',       type: '(error: KekuleError) => void', desc: 'Called when rendering fails' },
    { name: 'loading',       type: 'Snippet',           desc: 'Custom loading snippet' },
    { name: 'error',         type: 'Snippet<{error: string}>', desc: 'Custom error display' },
  ]

  const methods = [
    { name: 'getViewer()',             returns: 'unknown',        desc: 'Returns the raw Kekule 3D viewer instance' },
    { name: 'exportSVG()',             returns: 'string | null',  desc: 'Exports the molecule as SVG' },
    { name: 'exportPNG()',             returns: 'string | null',  desc: 'Exports the molecule as PNG' },
    { name: 'downloadSVG(filename?)',  returns: 'void',           desc: 'Triggers an SVG download' },
    { name: 'downloadPNG(filename?)',  returns: 'void',           desc: 'Triggers a PNG download' },
    { name: 'rotate(x, y, z)',         returns: 'void',           desc: 'Rotate the molecule by angle' },
    { name: 'zoomToFit()',             returns: 'void',           desc: 'Zoom to fit the molecule in view' },
  ]

  const basicExample = `<script lang="ts">
  import { Kekule3DViewer } from 'kekule-svelte'
<\/script>

<Kekule3DViewer
  smiles="CC(=O)Oc1ccccc1C(=O)O"
  renderMode="spaceFill"
/>`
</script>

<svelte:head>
  <title>Kekule3DViewer — kekule-svelte</title>
</svelte:head>

<h1>Kekule3DViewer</h1>
<p class="lead">
  Renders a 3D molecular structure from a SMILES or MOL file using the Kekule.js WebGL renderer.
</p>

<div class="component-badge" style="display:inline-block;padding:4px 8px;background:var(--brand-light);color:var(--brand);border-radius:4px;font-size:12px;font-weight:600;margin-bottom:24px;">Component</div>

<h2>Import</h2>
<CodeBlock code={`import { Kekule3DViewer } from 'kekule-svelte'\nimport type { RenderMode } from 'kekule-svelte'`} lang="typescript" />

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
<CodeBlock code={basicExample} lang="svelte" />

<style>
  h1 { font-size: 36px; margin-bottom: 10px; }
  .lead { margin-bottom: 16px; }
</style>
