<script lang="ts">
  import CodeBlock from '$lib/components/CodeBlock.svelte'

  const typeCode = `interface LipinskiInput {
  mw:   number  // molecular weight (g/mol)
  logp: number  // lipophilicity
  hbd:  number  // hydrogen bond donors
  hba:  number  // hydrogen bond acceptors
}

interface LipinskiRule {
  label: string  // e.g. "Molecular weight ≤ 500"
  value: number  // actual value
  limit: number  // rule threshold
  pass:  boolean
}

interface LipinskiResult {
  pass:  boolean        // true if ALL four rules pass
  rules: LipinskiRule[] // per-rule breakdown (always 4 items)
}`

  const usageCode = `import { computeLipinski } from 'kekule-svelte'

// Aspirin
const result = computeLipinski({
  mw:   180.16,
  logp: 1.19,
  hbd:  1,
  hba:  4,
})

console.log(result.pass)   // true
console.log(result.rules)
// [
//   { label: 'Molecular weight ≤ 500', value: 180.16, limit: 500, pass: true },
//   { label: 'LogP ≤ 5',               value: 1.19,   limit: 5,   pass: true },
//   { label: 'H-bond donors ≤ 5',      value: 1,      limit: 5,   pass: true },
//   { label: 'H-bond acceptors ≤ 10',  value: 4,      limit: 10,  pass: true },
// ]`

  const componentCode = `<${'script'} lang="ts">
  import { computeLipinski, type LipinskiResult } from 'kekule-svelte'

  // Values typically come from a database or your Go API
  let result: LipinskiResult = computeLipinski({
    mw: 180.16, logp: 1.19, hbd: 1, hba: 4
  })
</${'script'}>

<div class:pass={result.pass} class:fail={!result.pass} class="lipinski-box">
  <p class="verdict">
    Lipinski Rule of Five — {result.pass ? 'Pass' : 'Fail'}
  </p>
  {#each result.rules as rule}
    <p class:ok={rule.pass} class:bad={!rule.pass}>
      {rule.pass ? 'Pass' : 'Fail'} {rule.label} ({rule.value})
    </p>
  {/each}
</div>

<${'style'}>
  .lipinski-box { border-radius: 8px; padding: 12px 16px; }
  .pass { background: #ecfdf5; border: 1px solid var(--brand-border); }
  .fail { background: #fef2f2; border: 1px solid #fecaca; }
  .verdict { font-weight: 700; margin-bottom: 8px; }
  .ok  { color: #065f46; font-size: 13px; }
  .bad { color: #991b1b; font-size: 13px; }
</${'style'}>`
</script>

<svelte:head>
  <title>computeLipinski — kekule-svelte</title>
</svelte:head>

<h1>computeLipinski</h1>
<p class="lead">
  Compute Lipinski's Rule of Five — a widely used heuristic for predicting
  whether a drug candidate will be orally bioavailable.
</p>

<div class="component-badge">Utility</div>

<h2>The Rule of Five</h2>
<ul>
  <li>Molecular weight ≤ 500 g/mol</li>
  <li>LogP ≤ 5 (lipophilicity)</li>
  <li>H-bond donors ≤ 5</li>
  <li>H-bond acceptors ≤ 10</li>
</ul>
<p>A molecule passes if it violates <em>no more than one</em> of these rules.</p>

<h2>Signature</h2>
<CodeBlock code="function computeLipinski(input: LipinskiInput): LipinskiResult" lang="typescript" />

<h2>Types</h2>
<CodeBlock code={typeCode} lang="typescript" />

<h2>Usage</h2>
<CodeBlock code={usageCode} lang="typescript" />

<h2>In a component</h2>
<CodeBlock code={componentCode} lang="svelte" />

<div class="next-bar">
  <a href="/docs/format-formula" class="next-link">formatFormula </a>
</div>

<style>
  h1 { font-size: 36px; margin-bottom: 10px; }
  .lead { margin-bottom: 16px; }
</style>
