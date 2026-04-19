<script lang="ts">
  import { page } from '$app/stores'
  import { navigation } from '$lib/data/nav.js'

  let { onSelect } = $props<{ onSelect?: () => void }>()
</script>

<aside class="sidebar">
  <nav class="sidebar-nav">
    {#each navigation as section}
      <div class="nav-section">
        <p class="nav-section-title">{section.title}</p>
        <div class="nav-items">
          {#each section.items as item}
            <a
              href={item.href}
              class="nav-item {$page.url.pathname === item.href ? 'active' : ''}"
              onclick={() => onSelect?.()}
            >
              <span class="nav-label">{item.label}</span>
              {#if item.badge}
                <span class="nav-badge">{item.badge}</span>
              {/if}
            </a>
          {/each}
        </div>
      </div>
    {/each}
  </nav>

  <div class="sidebar-footer">
    <a href="https://github.com/makeez-labs/kekule-svelte" class="footer-link" target="_blank" rel="noopener">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
      GitHub
    </a>
  </div>
</aside>

<style>
  .sidebar {
    width: var(--sidebar-w);
    height: calc(100vh - var(--header-h));
    position: sticky;
    top: var(--header-h);
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    border-right: 1px solid var(--border);
    background: var(--bg);
    overflow-y: auto;
  }

  .sidebar-nav {
    flex: 1;
    padding: 32px 16px;
  }

  .nav-section {
    margin-bottom: 28px;
  }

  .nav-section-title {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-muted);
    padding: 0 12px;
    margin-bottom: 12px;
  }

  .nav-items {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .nav-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    border-radius: var(--radius);
    font-size: 14px;
    font-weight: 500;
    color: var(--text-secondary);
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .nav-item:hover {
    background: var(--surface);
    color: var(--text);
  }

  .nav-item.active {
    background: var(--brand-light);
    color: var(--brand);
    font-weight: 600;
  }

  .nav-badge {
    font-size: 10px;
    font-weight: 600;
    background: var(--brand);
    color: white;
    padding: 1px 6px;
    border-radius: 10px;
  }

  .sidebar-footer {
    padding: 16px;
    border-top: 1px solid var(--border);
  }

  .footer-link {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    border-radius: var(--radius);
    font-size: 13px;
    font-weight: 500;
    color: var(--text-secondary);
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .footer-link:hover {
    background: var(--surface);
    color: var(--text);
  }

  @media (max-width: 768px) {
    .sidebar {
      width: 100%;
      height: 100%;
      position: static;
      border-right: none;
      background: transparent;
    }
  }
</style>