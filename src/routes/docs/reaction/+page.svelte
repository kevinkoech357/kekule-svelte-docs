<script lang="ts">
  import CodeBlock  from '$lib/components/CodeBlock.svelte'
  import PropsTable from '$lib/components/PropsTable.svelte'

  const props = [
    { name: 'reaction',    type: 'string',  required: true,  desc: 'Reaction SMILES in the format reactants>>products' },
    { name: 'width',       type: 'string',  default: "'100%'",       desc: 'CSS width' },
    { name: 'height',      type: 'string',  default: "'220px'",      desc: 'CSS height' },
    { name: 'background',  type: 'string',  default: "'transparent'", desc: 'Canvas background colour' },
    { name: 'class',       type: 'string',  default: "''",           desc: 'Extra CSS classes' },
    { name: 'onReady',     type: '(viewer: unknown) => void', desc: 'Called when viewer is ready' },
    { name: 'onError', type: '(error: KekuleError) => void',  desc: 'Called on render failure' },
    { name: 'loading',     type: 'Snippet',                  desc: 'Custom loading indicator' },
    { name: 'error',       type: "Snippet<[{ error: string }]>", desc: 'Custom error display' },
  ]

  const basicCode = `<script lang="ts">
  import { KekuleReaction } from 'kekule-svelte'
<\/script>

<!-- Esterification -->
<KekuleReaction
  reaction="CCO.CC(=O)O>>CC(=O)OCC.O"
  height="220px"
/>`

  const multipleCode = `<script lang="ts">
  import { KekuleReaction } from 'kekule-svelte'

  const reactions = [
    { name: 'Esterification',     eq: 'CCO.CC(=O)O>>CC(=O)OCC.O'   },
    { name: 'Aldol condensation', eq: 'CC=O.CC=O>>CC(O)CC=O'        },
    { name: 'Saponification',     eq: 'CC(=O)OCC.O>>CC(=O)O.CCO'   },
  ]
<\/script>

{#each reactions as rx}
  <h3>{rx.name}</h3>
  <KekuleReaction reaction={rx.eq} />
{/each}`
</script>

<svelte:head><title>KekuleReaction — kekule-svelte</title></svelte:head>

<h1>KekuleReaction</h1>
<p class="lead">
  Renders a 2D reaction diagram from a reaction SMILES string.
  Format: <code>reactant1.reactant2&gt;&gt;product1.product2</code>
</p>

<div class="component-badge">Component</div>

<h2>Import</h2>
<CodeBlock code={`import { KekuleReaction } from 'kekule-svelte'`} lang="typescript" />

<h2>Props</h2>
<PropsTable {props} />

<h2>Exported methods</h2>
<p><code>getViewer()</code> — returns the raw Kekule viewer instance.</p>
<p><code>exportSVG()</code> — returns the reaction diagram as an SVG data URI.</p>

<h2>Examples</h2>
<h3>Basic usage</h3>
<CodeBlock code={basicCode} lang="svelte" />

<h3>Multiple reactions</h3>
<CodeBlock code={multipleCode} lang="svelte" />

<div class="next-bar">
  <a href="/docs/load-kekule" class="next-link">loadKekule utility </a>
</div>

<style>
  h1 { font-size: 36px; margin-bottom: 10px; }
  .lead { margin-bottom: 16px; }
</style>
