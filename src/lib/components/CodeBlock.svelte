<script lang="ts">
  interface Props {
    code:  string
    lang?: string
    title?: string
  }

  let { code, lang = 'svelte', title }: Props = $props()

  let copied = $state(false)

  function copy() {
    navigator.clipboard.writeText(code).then(() => {
      copied = true
      setTimeout(() => copied = false, 1800)
    })
  }
</script>

<div class="code-block">
  <div class="code-header">
    <div class="code-lang">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
      {title ?? lang}
    </div>
    <button class="copy-btn" onclick={copy} aria-label="Copy code" class:copied>
      {#if copied}
        <span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          Copied
        </span>
      {:else}
        <span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
          </svg>
          Copy
        </span>
      {/if}
    </button>
  </div>
  <pre><code>{code}</code></pre>
</div>

<style>
  .code-block {
    border-radius: var(--radius);
    overflow: hidden;
    border: 1px solid var(--border);
    margin: 24px 0;
    background: var(--code-bg);
  }

  .code-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--bg-elevated);
    padding: 8px 16px;
    border-bottom: 1px solid var(--border);
  }

  .code-lang {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'Geist Mono', monospace;
    font-size: 11px;
    color: var(--text-muted);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .copy-btn {
    display: flex;
    align-items: center;
    background: transparent;
    border: 1px solid var(--border);
    cursor: pointer;
    font-size: 11px;
    font-weight: 600;
    color: var(--text-muted);
    padding: 4px 10px;
    border-radius: 4px;
    transition: all 0.15s ease;
    font-family: 'Geist Mono', monospace;
  }

  .copy-btn span {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .copy-btn:hover {
    color: var(--text);
    border-color: var(--text-muted);
    background: var(--surface);
  }

  .copy-btn.copied {
    color: var(--brand);
    border-color: var(--brand);
    background: var(--brand-light);
  }

  pre {
    margin: 0;
    border-radius: 0;
    border: none;
    padding: 20px;
    background: transparent;
    overflow-x: auto;
  }

  code {
    background: transparent;
    border: none;
    padding: 0;
    color: var(--code-text);
  }
</style>
