<script lang="ts">
import { onMount } from "svelte";

import { GrapherDrawer } from "../helpers/grapher";

// Props
export let width: number;
export let height: number;
export let equation: (x: number) => number; 

const id = (Math.random() + 1).toString(36).substring(7);

onMount(() => {
  const graphDrawer = new GrapherDrawer(id, width, height);
  graphDrawer.drawFn(equation, { yMin: 3, lineColor: '#ffaaaa' });
})
</script>

<svg id={id}>
  <!-- Prevent unused css selector -->
  <polyline></polyline>
</svg>

<style>
  svg :global(polyline) {
  }
</style>
