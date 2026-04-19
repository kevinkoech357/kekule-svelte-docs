<script lang="ts">
  import { page } from "$app/stores";

  interface Props {
    title?: string;
    description?: string;
    image?: string;
    canonical?: string;
    type?: "website" | "article";
  }

  let {
    title = "kekule-svelte — Svelte 5 Chemistry Components",
    description = "Svelte 5 wrapper for Kekule.js — render and edit organic compound structures from SMILES strings",
    image = "/og-image.png",
    canonical = "",
    type = "website",
  }: Props = $props();

  const siteName = "kekule-svelte";
  const fullTitle = $derived(
    title === siteName ? title : `${title} — ${siteName}`,
  );
  const url = $derived($page.url.origin + $page.url.pathname);
  const themeColor = "#10b981";
</script>

<svelte:head>
  <title>{fullTitle}</title>
  <meta name="description" content={description} />
  <meta name="theme-color" content={themeColor} />

  <link rel="canonical" href={canonical || url} />
  <link rel="manifest" href="/manifest.json" />

  <!-- Open Graph -->
  <meta property="og:site_name" content={siteName} />
  <meta property="og:title" content={fullTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={url} />
  <meta property="og:type" content={type} />
  <meta property="og:image" content={image} />

  <!-- Twitter / X-->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={fullTitle} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={image} />
</svelte:head>
