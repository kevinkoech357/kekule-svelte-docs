<script lang="ts">
  import { page } from '$app/stores'
  import SEO from '$lib/components/SEO.svelte'

  const status = $derived($page.status)
  const message = $derived($page.error?.message || 'Something went wrong')
  
  const is404 = $derived(status === 404)
</script>

<SEO 
  title={is404 ? 'Page Not Found' : 'Error'} 
  description={message}
/>

<div class="error-page">
  <div class="error-content">
    <h1 class="error-code">{status}</h1>
    <h2 class="error-title">
      {is404 ? 'Oops! Page not found' : 'Under maintenance'}
    </h2>
    <p class="error-message">
      {is404 
        ? "The page you're looking for doesn't exist or has been moved." 
        : "We're experiencing some technical difficulties. Please try again later."}
    </p>
    
    <div class="error-actions">
      <a href="/" class="btn btn-primary">Back to Home</a>
      <a href="/docs/install" class="btn btn-secondary">Read Docs</a>
    </div>
  </div>
</div>

<style>
  .error-page {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    text-align: center;
    padding: 20px;
  }

  .error-code {
    font-size: clamp(80px, 15vw, 120px);
    font-weight: 700;
    line-height: 1;
    margin-bottom: 24px;
    color: var(--brand);
    opacity: 0.9;
    font-family: 'Geist Mono', monospace;
  }

  .error-title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 16px;
    border: none;
    padding: 0;
  }

  .error-message {
    color: var(--text-secondary);
    max-width: 400px;
    margin: 0 auto 32px;
    line-height: 1.6;
  }

  .error-actions {
    display: flex;
    gap: 12px;
    justify-content: center;
  }

  @media (max-width: 640px) {
    .error-actions {
      flex-direction: column;
    }
  }
</style>
