<script lang="ts">
import FunctionSection from "./lib/FunctionSection.svelte";

import Grapher from "./lib/Grapher.svelte";
</script>

<header>
  <h1>Fantastiske Funktioner</h1>
</header>
<main>
  <FunctionSection
    name="Liniær"
    examples={[
      { equation: (x) => 2**x, katex: '2^x' },
      { equation: (x) => x**3, katex: 'x^3' },
    ]}
  ></FunctionSection>
</main>

<style>
</style>
