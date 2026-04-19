<script lang="ts">
  interface Prop {
    name:     string
    type:     string
    default?: string
    required?: boolean
    desc:     string
  }

  interface Props {
    props: Prop[]
  }

  let { props }: Props = $props()
</script>

<div class="props-table-wrap">
  <table class="props-table">
    <thead>
      <tr>
        <th>Prop</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      {#each props as prop}
        <tr>
          <td>
            <code class="prop-name">{prop.name}</code>
            {#if prop.required}
              <span class="required-badge">required</span>
            {/if}
          </td>
          <td><code class="type-code">{prop.type}</code></td>
          <td>
            {#if prop.default}
              <code class="default-code">{prop.default}</code>
            {:else}
              <span class="no-default">—</span>
            {/if}
          </td>
          <td class="desc-cell">{prop.desc}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .props-table-wrap {
    overflow-x: auto;
    border-radius: var(--radius-lg);
    border: 1px solid var(--border);
    margin: 24px 0;
    background: var(--bg-elevated);
  }

  .props-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
    line-height: 1.5;
  }

  th {
    background: rgba(0, 0, 0, 0.05);
    padding: 12px 16px;
    text-align: left;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-muted);
    border-bottom: 1px solid var(--border);
    white-space: nowrap;
  }

  td {
    padding: 14px 16px;
    border-bottom: 1px solid var(--border);
    vertical-align: top;
  }

  tr:last-child td { border-bottom: none; }
  tr:hover td { background: var(--surface); }

  .prop-name {
    background: var(--brand-light);
    color: var(--brand);
    border-color: var(--brand-border);
    font-weight: 600;
  }

  .required-badge {
    font-size: 10px;
    font-weight: 700;
    background: var(--red-light);
    color: var(--red);
    border: 1px solid var(--red);
    border-radius: 4px;
    padding: 1px 5px;
    margin-left: 6px;
    opacity: 0.8;
  }

  .type-code {
    background: var(--green-light);
    color: var(--green);
    border-color: transparent;
  }

  .default-code {
    background: var(--surface);
    color: var(--text-secondary);
    border-color: var(--border);
  }

  .no-default { color: var(--text-muted); opacity: 0.5; }

  .desc-cell { color: var(--text-secondary); line-height: 1.6; }
</style>
