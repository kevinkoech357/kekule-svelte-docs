<script lang="ts">
  import '../lib/styles.css'
  import Sidebar from '$lib/components/Sidebar.svelte'
  import { onMount } from 'svelte'
  import { fade, fly } from 'svelte/transition'
  import { page } from '$app/stores'
  import { navigation } from '$lib/data/nav'

  let { children }: { children: any } = $props()
  
  let theme = $state('dark')
  let searchQuery = $state('')
  let searchOpen = $state(false)
  let mobileMenuOpen = $state(false)

  // Flatten navigation for search
  const flatNav = navigation.flatMap(section => 
    section.items.map(item => ({ ...item, section: section.title }))
  )

  const searchResults = $derived(
    searchQuery.length > 1 
      ? flatNav.filter(item => 
          item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.section.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : []
  )

  const isHome = $derived($page.url.pathname === '/')
  
  function toggleTheme() {
    theme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }
  
  function openSearch() { searchOpen = true }
  function closeSearch() { searchOpen = false; searchQuery = '' }
  function toggleMobileMenu() { mobileMenuOpen = !mobileMenuOpen }
  function closeMobileMenu() { mobileMenuOpen = false }
  
  onMount(() => {
    const saved = localStorage.getItem('theme')
    if (saved) {
      theme = saved
      document.documentElement.setAttribute('data-theme', theme)
    } else {
      theme = 'dark'
      document.documentElement.setAttribute('data-theme', 'dark')
    }
  })

  let searchInput = $state<HTMLInputElement>()

  // Close mobile menu or search on navigation
  $effect(() => {
    $page.url.pathname;
    closeMobileMenu();
    closeSearch();
  });

  // Focus search input on open
  $effect(() => {
    if (searchOpen && searchInput) {
      searchInput.focus();
    }
  });
</script>

<svelte:window onkeydown={(e) => {
  if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
    e.preventDefault()
    openSearch()
  }
  if (e.key === 'Escape') {
    closeSearch()
    closeMobileMenu()
  }
}} />

<div class="app-shell" class:menu-open={mobileMenuOpen}>
  <header class="header glass">
    <div class="header-left">
      <button 
        class="mobile-toggle" 
        onclick={toggleMobileMenu} 
        aria-label="Toggle menu"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          {#if mobileMenuOpen}
            <path d="M18 6L6 18M6 6l12 12" />
          {:else}
            <path d="M4 6h16M4 12h16M4 18h16" />
          {/if}
        </svg>
      </button>

      <a href="/" class="logo">
        <div class="logo-icon">K</div>
        <span class="logo-text">kekule-svelte</span>
      </a>
    </div>

    <div class="header-center">
      <button class="search-btn" onclick={openSearch}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M7 12A5 5 0 1 0 7 2a5 5 0 0 0 0 10z" stroke="currentColor" stroke-width="1.8"/>
          <path d="M14 14l-3-3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
        <span>Search documentation...</span>
        <kbd>⌘K</kbd>
      </button>
    </div>

    <div class="header-right">
      <div class="nav-links">
        <a href="/docs/install" class="header-link">Docs</a>
        <a href="/examples/basic" class="header-link">Examples</a>
      </div>

      <div class="actions">
        <a href="https://github.com/makeez-labs/kekule-svelte" target="_blank" rel="noopener" class="icon-btn" aria-label="GitHub">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
          </svg>
        </a>
        <button class="theme-toggle icon-btn" onclick={toggleTheme} aria-label="Toggle theme">
          {#if theme === 'light'}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
          {:else}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          {/if}
        </button>
      </div>
    </div>
  </header>
  
  <div class="app-body">
    {#if !isHome}
      <div class="sidebar-desktop">
        <Sidebar />
      </div>
    {/if}

    {#if mobileMenuOpen}
      <div 
        class="mobile-overlay" 
        transition:fade={{ duration: 200 }} 
        onclick={closeMobileMenu}
        onkeydown={(e) => e.key === 'Enter' && closeMobileMenu()}
        role="button"
        tabindex="0"
        aria-label="Close menu"
      ></div>
      <div 
        class="mobile-drawer" 
        transition:fly={{ x: -260, duration: 300 }}
      >
        <Sidebar onSelect={closeMobileMenu} />
      </div>
    {/if}

    <main class="main-content" class:is-home={isHome}>
      <div class="content-container">
        {@render children()}
        
        <footer class="footer">
          <div class="footer-left">
            <span>© {new Date().getFullYear()} Makeez Labs. Released under MIT License.</span>
          </div>
          <div class="footer-right">
            <span class="version-tag">v0.0.1</span>
          </div>
        </footer>
      </div>
    </main>
  </div>
  
  {#if searchOpen}
    <div 
      class="search-overlay" 
      role="dialog" 
      aria-modal="true" 
      onclick={closeSearch} 
      onkeydown={(e) => e.key === 'Enter' && closeSearch()}
      transition:fade={{ duration: 150 }}
      tabindex="-1"
    >
      <div 
        class="search-modal" 
        role="presentation" 
        onclick={(e) => e.stopPropagation()} 
        transition:fly={{ y: -20, duration: 200 }}
      >
        <div class="search-input-wrap">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
            <path d="M7 12A5 5 0 1 0 7 2a5 5 0 0 0 0 10z" stroke="currentColor" stroke-width="1.8"/>
            <path d="M14 14l-3-3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
          <input 
            type="text" 
            placeholder="Search documentation..." 
            bind:value={searchQuery}
            bind:this={searchInput}
            class="search-input"
          />
          <kbd class="esc-kbd">ESC</kbd>
        </div>
        <div class="search-results">
          {#if searchQuery.length > 1}
            {#if searchResults.length > 0}
              <div class="results-list">
                {#each searchResults as result}
                  <a href={result.href} class="search-result-item" onclick={closeSearch}>
                    <div class="result-info">
                      <span class="result-label">{result.label}</span>
                      <span class="result-section">{result.section}</span>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </a>
                {/each}
              </div>
            {:else}
              <div class="search-hint">
                <p>No results for "{searchQuery}"</p>
                <span class="text-muted">Try a different keyword</span>
              </div>
            {/if}
          {:else}
            <div class="search-hint">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="search-hint-icon">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <p>Type to search the documentation</p>
              <span class="text-muted">Quickly find help, components, or examples</span>
            </div>
          {/if}
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  /* Search Results Styling */
  .results-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .search-result-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    border-radius: 8px;
    text-decoration: none;
    background: var(--surface);
    border: 1px solid var(--border);
    transition: all 0.15s ease;
  }

  .search-result-item:hover {
    border-color: var(--brand);
    background: var(--bg-elevated);
    transform: translateX(4px);
  }

  .result-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .result-label {
    font-size: 15px;
    font-weight: 600;
    color: var(--text);
  }

  .result-section {
    font-size: 11px;
    font-weight: 500;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .app-shell {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: var(--bg);
  }
  
  .header {
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: var(--header-h);
    padding: 0 32px;
  }
  
  .header-left {
    display: flex;
    align-items: center;
    gap: 16px;
    flex: 1;
  }
  
  .mobile-toggle {
    display: none;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: transparent;
    border: none;
    color: var(--text);
    cursor: pointer;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
    color: var(--text);
  }
  
  .logo-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: var(--brand);
    color: #000;
    font-weight: 800;
    font-size: 16px;
    border-radius: 8px;
  }
  
  .logo-text {
    font-family: 'Outfit', sans-serif;
    font-weight: 700;
    font-size: 18px;
    letter-spacing: -0.03em;
  }
  
  .header-center {
    flex: 2;
    display: flex;
    justify-content: center;
  }
  
  .search-btn {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    max-width: 400px;
    padding: 8px 16px;
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: 10px;
    color: var(--text-muted);
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .search-btn:hover {
    border-color: var(--brand);
    background: var(--surface);
  }
  
  .search-btn span { flex: 1; text-align: left; }
  
  .search-btn kbd {
    font-family: inherit;
    font-size: 11px;
    font-weight: 600;
    padding: 2px 6px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 4px;
    color: var(--text-muted);
  }
  
  .header-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 24px;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  
  .header-link {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-secondary);
    text-decoration: none;
    transition: color 0.2s ease;
  }
  
  .header-link:hover { color: var(--text); }
  
  .actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .icon-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 8px;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .icon-btn:hover {
    background: var(--surface);
    color: var(--text);
    border-color: var(--border);
  }
  
  .app-body {
    display: flex;
    flex: 1;
  }
  
  .sidebar-desktop { display: block; }

  .main-content {
    flex: 1;
    min-width: 0;
    display: flex;
    justify-content: center;
  }

  .content-container {
    width: 100%;
    max-width: 860px;
    padding: 60px 40px;
  }

  /* Landing Page Layout Adjustments */
  .main-content.is-home {
    padding-left: 0;
  }

  .main-content.is-home .content-container {
    max-width: 1200px;
    padding: 0 40px;
  }
  
  @media (max-width: 1024px) {
    .header { padding: 0 20px; }
    .content-container { padding: 40px 32px; }
  }

  @media (max-width: 768px) {
    .sidebar-desktop { display: none; }
    .mobile-toggle { display: flex; }
    .header-center { display: none; }
    .nav-links { display: none; }
    .content-container { padding: 32px 20px; }
    
    .logo-text { font-size: 16px; }
  }
  
  /* Mobile Sidebar */
  .mobile-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(4px);
    z-index: 150;
  }

  .mobile-drawer {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 280px;
    background: var(--bg);
    z-index: 160;
    box-shadow: 20px 0 50px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
  }

  /* Search Modal */
  .search-overlay {
    position: fixed;
    inset: 0;
    z-index: 200;
    background: rgba(2, 6, 23, 0.8);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 100px;
  }
  
  .search-modal {
    width: 100%;
    max-width: 600px;
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: 16px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    overflow: hidden;
    margin: 0 20px;
  }
  
  .search-input-wrap {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px 24px;
    border-bottom: 1px solid var(--border);
    color: var(--brand);
  }
  
  .search-input {
    flex: 1;
    border: none;
    background: transparent;
    font-size: 18px;
    color: var(--text);
    outline: none;
    font-family: inherit;
  }
  
  .search-input::placeholder { color: var(--text-muted); }
  
  .esc-kbd {
    font-size: 10px;
    font-weight: 700;
    padding: 4px 8px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 6px;
    color: var(--text-muted);
  }

  .search-results {
    min-height: 200px;
    max-height: 450px;
    overflow-y: auto;
    padding: 24px;
  }
  
  .search-hint {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--text-muted);
    text-align: center;
    padding: 40px 0;
  }

  .search-hint-icon {
    margin-bottom: 16px;
    opacity: 0.5;
  }

  .search-hint p {
    font-size: 16px;
    font-weight: 600;
    color: var(--text-secondary);
    margin-bottom: 4px;
  }

  .footer {
    margin-top: 80px;
    padding-top: 24px;
    border-top: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 13px;
    color: var(--text-muted);
  }

  .version-tag {
    font-family: var(--font-mono);
    font-weight: 600;
    font-size: 11px;
    padding: 2px 8px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 6px;
  }
</style>