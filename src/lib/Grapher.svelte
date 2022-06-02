<script lang="ts">
import { onMount } from "svelte";

import { GrapherDrawer } from "../helpers/grapher";

// Props
export let width: number;
export let height: number;
export let equations: Array<(x: number) => number>; 
export let highlight: number;

const id = (Math.random() + 1).toString(36).substring(7).replace(/[0-9]/g, '');

let graphDrawer: GrapherDrawer | undefined;

$: if (true) {
  document.querySelector(`svg#${id} polyline.active`)?.classList.remove('active');
  if (highlight != -1) document.querySelector(`svg#${id} polyline#\\3${highlight}`)?.classList.add('active');
}

onMount(() => {
  graphDrawer = new GrapherDrawer(id, width, height);
  equations.forEach((eq, idx) => graphDrawer.drawFn(eq, GrapherDrawer.pastelColors[idx], idx));
})
</script>

<svg id={id}>
  <!-- Prevent unused css selector -->
  <polyline></polyline>
</svg>

<style>
  svg :global(polyline.active) {
    stroke-width: 3;
    filter: drop-shadow(0 0 10px #4d4e5e);
  }
</style>
