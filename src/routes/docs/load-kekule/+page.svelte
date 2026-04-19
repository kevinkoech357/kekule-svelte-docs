<script lang="ts">
  import CodeBlock from '$lib/components/CodeBlock.svelte'

  const basicCode = `import { loadKekule, isKekuleReady, configureKekule } from 'kekule-svelte'

// Load Kekule.js — safe to call multiple times
const Kekule = await loadKekule()

// Check if already loaded (synchronous)
if (isKekuleReady()) {
  console.log('Kekule is ready')
}`

  const onMountCode = `<script lang="ts">
  import { onMount }   from 'svelte'
  import { loadKekule } from 'kekule-svelte'

  let Kekule: any = $state(null)

  onMount(async () => {
    Kekule = await loadKekule()
  })
<\/script>

{#if Kekule}
  <!-- Safe to use Kekule directly -->
  <p>Kekule loaded Pass</p>
{/if}`

  const singletonCode = `// All three calls resolve to the same Kekule module
// Kekule.js is only loaded once
const K1 = await loadKekule()
const K2 = await loadKekule()
const K3 = await loadKekule()

console.log(K1 === K2) // true
console.log(K2 === K3) // true`

    const errorCode = `import { loadKekule, retryKekule, configureKekule } from 'kekule-svelte'

// Global configuration (call before mounting any components)
configureKekule({
  cdnBase: 'https://my-custom-cdn.example.com/kekule',
  timeout: 30000 // 30 seconds
})

try {
  const Kekule = await loadKekule()
} catch (e) {
  console.error(e.code, e.message)
  
  // Retry manually after network recovery:
  const K = await retryKekule()
}`
</script>

<svelte:head>
  <title>loadKekule — kekule-svelte</title>
</svelte:head>

<h1>loadKekule</h1>
<p class="lead">
  Singleton loader for Kekule.js. Loads the library from CDN once
  and returns the global <code>Kekule</code> object. Safe to call
  from multiple components simultaneously.
</p>

<div class="component-badge">Utility</div>

<h2>Signature</h2>
<CodeBlock code={`function configureKekule(opts: { cdnBase?: string, timeout?: number }): void`} lang="typescript" />
<CodeBlock code="function loadKekule(): Promise<KekuleModule>" lang="typescript" />
<CodeBlock code="function retryKekule(): Promise<KekuleModule>" lang="typescript" />
<CodeBlock code="function isKekuleReady(): boolean" lang="typescript" />

<h2>Basic usage</h2>
<CodeBlock code={basicCode} lang="typescript" />

<h2>Inside a Svelte component</h2>
<CodeBlock code={onMountCode} lang="svelte" />

<h2>Singleton behaviour</h2>
<p>
  No matter how many components call <code>loadKekule()</code>, the CDN script
  is only injected into the DOM once. All callers receive the same
  <code>Promise</code> — they all resolve at the same time with the same object.
</p>
<CodeBlock code={singletonCode} lang="typescript" />

<h2>Error handling</h2>
<p>
  The promise rejects if Kekule.js fails to load or if initialisation
  takes longer than 15 seconds. After a rejection, the singleton resets
  so the next call will attempt to load again.
</p>
<CodeBlock code={errorCode} lang="typescript" />

<div class="next-bar">
  <a href="/docs/properties" class="next-link">getMoleculeProperties </a>
</div>

<style>
  h1 { font-size: 36px; margin-bottom: 10px; }
  .lead { margin-bottom: 16px; }
</style>
