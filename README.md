# kekule-svelte-docs

Documentation site for [kekule-svelte](https://github.com/makeez-labs/kekule-svelte).

Built with SvelteKit and deployed to GitHub Pages at
[kekule-svelte.makeez.dev](https://kekule-svelte.makeez.dev).

## Development

```bash
# Install
bun install

# Dev server
bun run dev

# Build
bun run build
```

## Structure

```
src/
  routes/
    +page.svelte            → Homepage / introduction
    docs/
      install/              → Installation guide
      quickstart/           → Quick start
      viewer/               → KekuleViewer API reference
      editor/               → KekuleEditor API reference
      reaction/             → KekuleReaction API reference
      load-kekule/          → loadKekule utility
      properties/           → getMoleculeProperties utility
      lipinski/             → computeLipinski utility
      format-formula/       → formatFormula utility
    examples/
      basic/                → Basic viewer
      slots/                → Custom slots
      editor/               → Structure editor
      reaction/             → Reaction diagrams
      properties/           → Properties panel
      export/               → Download & export
  lib/
    components/
      Sidebar.svelte
      CodeBlock.svelte
      PropsTable.svelte
    data/
      nav.ts                → Navigation structure + example data
    styles.css              → Global styles
```

## Deployment

Automatically deployed to GitHub Pages via `.github/workflows/deploy.yml`
on every push to `main`.

## License

MIT © [Makeez Labs](https://github.com/makeez-labs)
