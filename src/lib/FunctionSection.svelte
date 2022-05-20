<script lang="ts">
import { GrapherDrawer } from "../helpers/grapher";
import Grapher from "./Grapher.svelte";

import Katex from "./Katex.svelte";

// Props
export let name: string;
export let examples: Array<{
  equation: (x: number) => number;
  katex: string;
}>

let hoveredEquation = -1;

$: console.log(hoveredEquation);
</script>

<section>
  <h2>{name}</h2>
  <slot name="content" />

  <p>Her er nogle eksempler</p>
  <div class="examples">
    <ul>
      {#each examples as example, i}
        <li on:mouseenter={() => hoveredEquation = i} on:mouseleave={() => hoveredEquation = -1}>
          <Katex math={GrapherDrawer.letters[i]} --color={GrapherDrawer.pastelColors[i]}></Katex>
          <Katex math={"(x) = " + example.katex}></Katex>
        </li>
      {/each}
    </ul>

    <Grapher
      width={400}
      height={400}
      equations={examples.map(cur => cur.equation)}
      highlight={hoveredEquation}
    ></Grapher>
  </div>
</section>

<style>
.examples {
  display: flex;
  justify-content: center;
}

.examples > ul > li {
  display: flex;
}
</style>
