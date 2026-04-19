<script lang="ts">
  import CodeBlock from '$lib/components/CodeBlock.svelte'
  import { KekuleReaction } from 'kekule-svelte'
  import { reactions } from '$lib/data/nav'

  const code = `<script lang="ts">
  import { KekuleReaction } from 'kekule-svelte'
<\/script>

<!-- Esterification -->
<KekuleReaction
  reaction="CCO.CC(=O)O>>CC(=O)OCC.O"
  height="220px"
  background="#fafafa"
/>`

  const multiCode = `<script lang="ts">
  import { KekuleReaction } from 'kekule-svelte'

  const reactions = [
    { name: 'Esterification',     eq: 'CCO.CC(=O)O>>CC(=O)OCC.O' },
    { name: 'Aldol condensation', eq: 'CC=O.CC=O>>CC(O)CC=O'      },
  ]
<\/script>

{#each reactions as rx}
  <h3>{rx.name}</h3>
  <KekuleReaction reaction={rx.eq} height="200px" />
{/each}`
</script>

<svelte:head>
  <title>Reaction diagrams — kekule-svelte examples</title>
</svelte:head>

<h1>Reaction diagrams</h1>
<p class="lead">
  Visualize chemical reactions with <code>KekuleReaction</code>.
  Use reaction SMILES format: <code>reactants&gt;&gt;products</code>
</p>

<h2>Single reaction</h2>
<CodeBlock code={code} lang="svelte" />

<h2>Multiple reactions</h2>
<CodeBlock code={multiCode} lang="svelte" />

<div class="demo-card">
  <div class="demo-header"><div class="demo-label">Reaction List</div></div>
  <div class="demo-content">
    <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(min(100%, 280px), 1fr));gap:20px">
      {#each reactions as rx}
        <div class="demo-card" style="margin:0; background:var(--bg)">
          <div class="demo-header">
            <span style="font-weight:600;font-size:14px">{rx.name}</span>
          </div>
          <div class="demo-content" style="padding:16px">
            <p style="font-size:13px;color:var(--text-secondary);margin-bottom:12px">{rx.desc}</p>
            <div class="viewer-mount" style="height:120px;background:var(--surface)">
              <KekuleReaction reaction={rx.reaction} height="120px" />
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<div class="next-bar">
  <a href="/examples/properties" class="next-link">Properties panel </a>
</div>

<style>
  h1 { font-size: 36px; margin-bottom: 10px; }
</style>
