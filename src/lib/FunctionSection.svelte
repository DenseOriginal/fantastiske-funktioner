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
export let abstract: string;

let hoveredEquation = -1;
</script>

<section>
  <h2>{name}</h2>
  <div class="abstract">
    <p>Den generelle forskrift:</p>
    <Katex math={abstract}></Katex>
  </div>

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

    <div class="graph">
      <Grapher
        width={500}
        height={400}
        equations={examples.map(cur => cur.equation)}
        highlight={hoveredEquation}
      ></Grapher>
    </div>
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

.examples > .graph {
  overflow-x: auto;
  max-width: 500px;
  width: 100%;
}

@media only screen and (max-width: 800px) {
  .examples {
    flex-direction: column;
    align-items: center;
  }
}

.abstract > * {
  margin: 2px auto;
}

section {
  margin-bottom: 3rem;
}
</style>
