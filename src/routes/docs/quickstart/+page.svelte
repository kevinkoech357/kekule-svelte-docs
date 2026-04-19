<script lang="ts">
  import CodeBlock from '$lib/components/CodeBlock.svelte'

  const basic = `<script lang="ts">
  import { KekuleViewer } from 'kekule-svelte'
<\/script>

<KekuleViewer smiles="CC(=O)Oc1ccccc1C(=O)O" />`

  const withState = `<script lang="ts">
  import { KekuleViewer } from 'kekule-svelte'

  let smiles = $state('CCO')
<\/script>

<input bind:value={smiles} placeholder="Enter SMILES..." />
<KekuleViewer {smiles} height="300px" />`

  const withRef = `<script lang="ts">
  import { KekuleViewer } from 'kekule-svelte'

  let viewerRef = $state<any>()
<\/script>

<KekuleViewer
  smiles="c1ccccc1"
  bind:this={viewerRef}
  onReady={() => console.log('ready!')}
/>

<button onclick={() => viewerRef?.downloadSVG('benzene.svg')}>
  Download SVG
</button>`

  const withSlots = `<KekuleViewer smiles={smiles}>
  {#snippet loading()}
    <p>Rendering molecule...</p>
  {/snippet}

  {#snippet error({ error })}
    <p style="color:red">{error}</p>
  {/snippet}
</KekuleViewer>`

  const editor = `<script lang="ts">
  import { KekuleEditor } from 'kekule-svelte'

  let smiles = $state('')
<\/script>

<KekuleEditor
  smiles="c1ccccc1"
  height="480px"
  onSmiles={(s) => smiles = s}
/>

<p>Current SMILES: <code>{smiles}</code></p>`
</script>

<svelte:head>
  <title>Quick start — kekule-svelte</title>
</svelte:head>

<h1>Quick start</h1>
<p class="lead">Get a molecule rendering in your Svelte 5 app in under 5 minutes.</p>

<h2>1. Basic viewer</h2>
<p>Import <code>KekuleViewer</code> and pass a SMILES string. Kekule.js loads automatically.</p>
<CodeBlock code={basic} lang="svelte" />

<h2>2. Reactive SMILES</h2>
<p>Bind the <code>smiles</code> prop to a <code>$state</code> variable — the viewer re-renders automatically when it changes.</p>
<CodeBlock code={withState} lang="svelte" />

<h2>3. Export SVG via bind:this</h2>
<p>
  Use <code>bind:this</code> to get a reference to the component instance
  and call exported methods like <code>downloadSVG()</code>.
</p>
<CodeBlock code={withRef} lang="svelte" />

<h2>4. Custom loading and error UI</h2>
<p>Use Svelte 5 snippets to fully customise the loading and error states.</p>
<CodeBlock code={withSlots} lang="svelte" />

<h2>5. Structure editor</h2>
<p>
  Use <code>KekuleEditor</code> to let users draw molecules.
  The <code>onSmiles</code> callback fires on every change.
</p>
<CodeBlock code={editor} lang="svelte" />

<div class="next-bar">
  <a href="/docs/viewer" class="next-link">KekuleViewer API </a>
</div>

<style>
  h1 { font-size: 36px; margin-bottom: 12px; }
</style>
