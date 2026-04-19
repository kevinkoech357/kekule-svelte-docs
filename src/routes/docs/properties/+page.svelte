<script lang="ts">
  import CodeBlock from '$lib/components/CodeBlock.svelte'

  const typeCode = `interface MoleculeProperties {
  formula:         string   // Hill notation e.g. "C9H8O4"
  molecularWeight: number   // g/mol
  atomCount:       number   // total atoms including H
  bondCount:       number
  ringCount:       number   // estimated via Euler's formula
  heavyAtomCount:  number   // non-hydrogen atoms
  isValid:         boolean
}`

  const usageCode = `import { onMount }              from 'svelte'
import { loadKekule,
         getMoleculeProperties } from 'kekule-svelte'

const smiles = 'CC(=O)Oc1ccccc1C(=O)O' // Aspirin

onMount(async () => {
  const Kekule = await loadKekule()
  const props  = getMoleculeProperties(smiles, Kekule)

  console.log(props)
  // {
  //   formula:         'C9H8O4',
  //   molecularWeight: 180.16,
  //   atomCount:       21,
  //   bondCount:       21,
  //   ringCount:        1,
  //   heavyAtomCount:  13,
  //   isValid:         true,
  // }
})`

  const componentCode = `<script lang="ts">
  import { onMount }              from 'svelte'
  import { KekuleViewer,
           loadKekule,
           getMoleculeProperties,
           formatFormula,
           type MoleculeProperties } from 'kekule-svelte'

  let { smiles }: { smiles: string } = $props()

  let props = $state<MoleculeProperties | null>(null)

  onMount(async () => {
    const K = await loadKekule()
    props = getMoleculeProperties(smiles, K)
  })

  $effect(async () => {
    const K = await loadKekule()
    props = getMoleculeProperties(smiles, K)
  })
<\/script>

<KekuleViewer {smiles} />

{#if props}
  <dl>
    <dt>Formula</dt>
    <dd>{formatFormula(props.formula)}</dd>
    <dt>MW</dt>
    <dd>{props.molecularWeight} g/mol</dd>
    <dt>Rings</dt>
    <dd>{props.ringCount}</dd>
  </dl>
{/if}`

  const standalonesCode = `import { computeFormula,
         computeMolecularWeight,
         computeRingCount } from 'kekule-svelte'

// These accept raw atom/bond arrays from a Kekule mol object
const atoms = mol.getLeafAtoms()
const bonds = mol.getAllBonds()

const formula = computeFormula(atoms)          // "C9H8O4"
const mw      = computeMolecularWeight(atoms)  // 180.16
const rings   = computeRingCount(bonds.length, atoms.filter(a => a.getSymbol() !== 'H').length)`
</script>

<svelte:head>
  <title>getMoleculeProperties — kekule-svelte</title>
</svelte:head>

<h1>getMoleculeProperties</h1>
<p class="lead">
  Extract molecular properties from a SMILES string.
  Requires a loaded Kekule module — call <code>await loadKekule()</code> first.
</p>

<div class="component-badge">Utility</div>

<h2>Signature</h2>
<CodeBlock code={`function getMoleculeProperties(\n  smiles: string,\n  Kekule: KekuleModule\n): MoleculeProperties | null`} lang="typescript" />

<h2>Return type</h2>
<CodeBlock code={typeCode} lang="typescript" />

<h2>Usage</h2>
<CodeBlock code={usageCode} lang="typescript" />

<h2>In a component</h2>
<CodeBlock code={componentCode} lang="svelte" />

<h2>Standalone helpers</h2>
<p>
  The underlying calculation functions are also exported individually
  if you need to work directly with Kekule atom/bond arrays:
</p>
<CodeBlock code={standalonesCode} lang="typescript" />

<div class="next-bar">
  <a href="/docs/lipinski" class="next-link">computeLipinski </a>
</div>

<style>
  h1 { font-size: 36px; margin-bottom: 10px; }
  .lead { margin-bottom: 16px; }
</style>
