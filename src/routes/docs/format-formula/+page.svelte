<script lang="ts">
  import CodeBlock from '$lib/components/CodeBlock.svelte'

  const usageCode = `import { formatFormula } from 'kekule-svelte'

formatFormula('C9H8O4')   //  'C₉H₈O₄'   (Aspirin)
formatFormula('H2O')      //  'H₂O'
formatFormula('C27H46O')  //  'C₂₇H₄₆O'  (Cholesterol)
formatFormula('CO')       //  'CO'         (no digits, unchanged)`

  const componentCode = `<script lang="ts">
  import { KekuleViewer, formatFormula } from 'kekule-svelte'
<\/script>

<KekuleViewer smiles="CC(=O)Oc1ccccc1C(=O)O" />
<p>{formatFormula('C9H8O4')}</p>  <!-- C₉H₈O₄ -->`
</script>

<svelte:head>
  <title>formatFormula — kekule-svelte</title>
</svelte:head>

<h1>formatFormula</h1>
<p class="lead">
  Converts ASCII digit characters in a molecular formula to Unicode subscripts.
  Useful for displaying formulas in HTML without needing <code>&lt;sub&gt;</code> tags.
</p>

<div class="util-badge">Utility</div>

<h2>Signature</h2>
<CodeBlock code="function formatFormula(formula: string): string" lang="typescript" />

<h2>Usage</h2>
<CodeBlock code={usageCode} lang="typescript" />

<h2>In a component</h2>
<CodeBlock code={componentCode} lang="svelte" />

<h2>Subscript map</h2>
<div class="map-grid">
  {#each [['0','₀'],['1','₁'],['2','₂'],['3','₃'],['4','₄'],['5','₅'],['6','₆'],['7','₇'],['8','₈'],['9','₉']] as [from, to]}
    <div class="map-item"><code>{from}</code>  <code>{to}</code></div>
  {/each}
</div>

<div class="next-bar">
  <a href="/examples/basic" class="next-link">See examples </a>
</div>

<style>
  h1   { font-size: 36px; font-weight: 900; letter-spacing: -0.03em; margin-bottom: 10px; }
  h2   { font-size: 20px; font-weight: 700; margin: 36px 0 12px; padding-top: 32px; border-top: 1px solid var(--border); }
  .lead { font-size: 17px; color: var(--mid); margin-bottom: 16px; line-height: 1.6; }
  p    { color: var(--mid); margin-bottom: 12px; line-height: 1.65; }
  .util-badge { display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; background: #fef3c7; color: #92400e; border: 1px solid #fde68a; border-radius: 20px; padding: 3px 10px; margin-bottom: 32px; }
  .map-grid { display: flex; flex-wrap: wrap; gap: 10px; margin: 12px 0; }
  .map-item { background: var(--surface); border: 1px solid var(--border); border-radius: 6px; padding: 6px 12px; font-size: 13px; }
  .next-bar { margin-top: 48px; padding-top: 24px; border-top: 1px solid var(--border); }
  .next-link { font-weight: 700; font-size: 15px; color: var(--brand); text-decoration: none; }
  .next-link:hover { text-decoration: underline; }
</style>
