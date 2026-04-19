<script lang="ts">
  import CodeBlock from '$lib/components/CodeBlock.svelte'
  import { KekuleViewer } from 'kekule-svelte'

  const code = `<script lang="ts">
  import { onMount }              from 'svelte'
  import { KekuleViewer,
           loadKekule,
           getMoleculeProperties,
           computeLipinski,
           formatFormula }        from 'kekule-svelte'

  let smiles = $state('CC(=O)Oc1ccccc1C(=O)O')

  // Pre-computed descriptor values (from your API / database)
  const descriptors = {
    mw: 180.16, logp: 1.19, hbd: 1, hba: 4
  }

  const lipinski = computeLipinski(descriptors)
<\/script>

<div style="display:grid;grid-template-columns:1fr 280px;gap:16px">
  <KekuleViewer {smiles} height="380px" />

  <aside class="sidebar-280">
    <h3>Properties</h3>
    <dl>
      <dt>MW</dt><dd>{descriptors.mw} g/mol</dd>
      <dt>LogP</dt><dd>{descriptors.logp}</dd>
      <dt>HBD</dt><dd>{descriptors.hbd}</dd>
      <dt>HBA</dt><dd>{descriptors.hba}</dd>
    </dl>

    <div class:pass={lipinski.pass} class:fail={!lipinski.pass} class="lipinski">
      <p>Rule of Five — {lipinski.pass ? 'Pass' : 'Fail'}</p>
      {#each lipinski.rules as rule}
        <p class:ok={rule.pass} class:bad={!rule.pass}>
          {rule.pass ? 'Pass' : 'Fail'} {rule.label}
        </p>
      {/each}
    </div>
  </aside>
</div>`
</script>

<svelte:head>
  <title>Properties panel — kekule-svelte examples</title>
</svelte:head>

<h1>Properties panel</h1>
<p class="lead">
  Combine <code>KekuleViewer</code> with <code>computeLipinski</code>
  and <code>formatFormula</code> to build a full molecular properties sidebar.
</p>

<div class="demo-card">
  <div class="demo-header"><div class="demo-label">Properties Demo</div></div>
  <div class="demo-content">
    <div style="display:grid;grid-template-columns:1fr 280px;gap:24px">
      <!-- Viewer side -->
      <KekuleViewer smiles="CC(=O)Oc1ccccc1C(=O)O" height="380px" />

      <!-- Properties sidebar -->
      <aside style="background:var(--bg);padding:20px;border-radius:var(--radius);border:1px solid var(--border);display:flex;flex-direction:column;gap:16px" class="sidebar-280">
        <div>
          <h3 style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin-bottom:12px">Physicochemical</h3>
          <dl style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:13px">
            <dt style="color:var(--text-secondary)">MW</dt><dd style="text-align:right;font-weight:600">180.16 g/mol</dd>
            <dt style="color:var(--text-secondary)">LogP</dt><dd style="text-align:right;font-weight:600">1.19</dd>
            <dt style="color:var(--text-secondary)">HBD</dt><dd style="text-align:right;font-weight:600">1</dd>
            <dt style="color:var(--text-secondary)">HBA</dt><dd style="text-align:right;font-weight:600">4</dd>
          </dl>
        </div>

        <div style="padding-top:16px;border-top:1px solid var(--border)">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
            <h3 style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted)">Drug-likeness</h3>
            <span style="font-size:10px;font-weight:700;color:var(--brand);background:var(--brand-light);padding:2px 6px;border-radius:4px">PASS</span>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;font-size:12px">
            <div style="display:flex;align-items:center;gap:8px;color:var(--brand)">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg>
              <span>MW &lt; 500</span>
            </div>
            <div style="display:flex;align-items:center;gap:8px;color:var(--brand)">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg>
              <span>LogP &lt; 5</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</div>

<h2>Code</h2>
<CodeBlock {code} lang="svelte" />

<div class="next-bar">
  <a href="/examples/export" class="next-link">Download & export </a>
</div>

<style>
  h1 { font-size: 36px; margin-bottom: 10px; }
</style>
