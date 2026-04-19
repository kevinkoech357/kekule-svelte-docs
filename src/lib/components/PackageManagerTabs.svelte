<script lang="ts">
  import CodeBlock from './CodeBlock.svelte'

  interface Props {
    library: string
  }

  let { library = 'kekule-svelte' }: Props = $props()

  let activeTab = $state('bun')

  const managers = $derived([
    { id: 'bun',   label: 'bun',   command: `bun add ${library}` },
    { id: 'npm',   label: 'npm',   command: `npm install ${library}` },
    { id: 'pnpm',  label: 'pnpm',  command: `pnpm add ${library}` },
    { id: 'yarn',  label: 'yarn',  command: `yarn add ${library}` },
  ])

  const activeCommand = $derived(managers.find(m => m.id === activeTab)?.command || '')
</script>

<div class="tabs-container">
  <div class="tabs-header">
    {#each managers as manager}
      <button 
        class="tab-btn" 
        class:active={activeTab === manager.id}
        onclick={() => activeTab = manager.id}
      >
        {manager.label}
      </button>
    {/each}
  </div>
  <div class="tab-content">
    <CodeBlock code={activeCommand} lang="bash" />
  </div>
</div>

<style>
  .tabs-container {
    margin: 24px 0;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    background: var(--bg-elevated);
    overflow: hidden;
  }

  .tabs-header {
    display: flex;
    gap: 1px;
    background: var(--border);
    padding-bottom: 1px;
  }

  .tab-btn {
    flex: 1;
    padding: 10px 16px;
    background: var(--bg-elevated);
    border: none;
    color: var(--text-secondary);
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.1s ease;
    font-family: 'Geist Mono', monospace;
  }

  .tab-btn:hover {
    color: var(--text);
    background: var(--surface);
  }

  .tab-btn.active {
    color: var(--brand);
    background: var(--bg-elevated);
    font-weight: 600;
    box-shadow: inset 0 -2px 0 var(--brand);
  }

  .tab-content {
    background: var(--code-bg);
  }

  :global(.tab-content .code-block) {
    margin: 0 !important;
    border: none !important;
    border-radius: 0 !important;
  }
</style>
