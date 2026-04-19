<script lang="ts">
  import CodeBlock from '$lib/components/CodeBlock.svelte'
  import { examples } from '$lib/data/nav'
  import { KekuleViewer } from 'kekule-svelte'

  let smiles      = $state('CC(=O)Oc1ccccc1C(=O)O')
  let inputValue  = $state('CC(=O)Oc1ccccc1C(=O)O')
  let activeIndex = $state(0)

  function loadExample(idx: number) {
    activeIndex = idx
    smiles      = examples[idx].smiles
    inputValue  = examples[idx].smiles
  }

  function applyInput() {
    smiles = inputValue.trim()
  }

  const code = `<script lang="ts">
  import { KekuleViewer } from 'kekule-svelte'

  let smiles = $state('CC(=O)Oc1ccccc1C(=O)O')
<\/script>

<input bind:value={smiles} />
<KekuleViewer {smiles} height="360px" background="#fafafa" />`
</script>

<svelte:head>
  <title>Basic viewer — kekule-svelte examples</title>
</svelte:head>

<h1>Basic viewer</h1>
<p class="lead">Render a SMILES string as a 2D structural diagram.</p>

<!-- Live demo -->
<div class="demo-card">
  <div class="demo-header">
    <div class="demo-label">Live Demo</div>
  </div>

  <div class="demo-content">
    <div class="demo-controls">
      <input
        bind:value={inputValue}
        onkeydown={(e) => e.key === 'Enter' && applyInput()}
        placeholder="Enter SMILES..."
        class="demo-input"
      />
      <button onclick={applyInput} class="btn-render">Render</button>
    </div>

    <div class="example-pills">
      {#each examples.slice(0, 6) as ex, i}
        <button
          onclick={() => loadExample(i)}
          class="pill-item {activeIndex === i ? 'active' : ''}"
        >
          {ex.name}
        </button>
      {/each}
    </div>

    <div class="viewer-mount">
      {#if smiles}
        <!-- In the real docs site, KekuleViewer is used here. 
             This placeholder reflects the demo layout. -->
        <KekuleViewer {smiles} width="100%" height="100%" background="transparent" />
      {/if}
    </div>
  </div>

  {#if smiles}
    <div class="demo-footer">
      <span class="footer-label">SMILES</span>
      <code class="footer-val">{smiles}</code>
    </div>
  {/if}
</div>

<h2>Code</h2>
<CodeBlock {code} lang="svelte" />

<div class="next-bar">
  <a href="/examples/slots" class="next-link">Custom slots </a>
</div>

<style>
  h1 { font-size: 36px; margin-bottom: 10px; }
</style>
