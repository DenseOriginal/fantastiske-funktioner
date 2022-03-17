<script lang="ts">
import Grapher from './lib/Grapher.svelte'
</script>

<main>
  <Grapher width={400} height={400} equation={(x) => 2**x} />
</main>

<style>
</style>
