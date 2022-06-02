<script lang="ts">
import FunctionSection from "./lib/FunctionSection.svelte";
import Katex from "./lib/Katex.svelte";
</script>

<header>
  <h1>Fantastiske Funktioner</h1>
</header>
<main>
  <FunctionSection
    name="Liniær"
    abstract="f(x)=a*x+b"
    examples={[
      { equation: (x) => 1*x, katex: '1*x' },
      { equation: (x) => 1*x + 2, katex: '1*x+2' },
      { equation: (x) => -1*x, katex: '-1*x' },
      { equation: (x) => -3*x, katex: '-3*x' },
    ]}
  >
      <ul slot="content">
        <li>Hvor <Katex math="a \neq 0"></Katex></li>
        <li>a er hældningen på en liniær funktion. Hvis <Katex math="a < 0"></Katex> så vender funktionen nedad</li>
        <li>b er der hvor funktionen skærer y-aksen</li>
        <li>Dm = <Katex math="] -\infty; \infty ["></Katex></li>
        <li>Vm = <Katex math="] -\infty; \infty ["></Katex></li>
      </ul>
  </FunctionSection>

  <FunctionSection
    name="Potens"
    abstract="f(x)=a*x^n+b*x+c"
    examples={[
      { equation: (x) => x**2, katex: '1*x^2' },
      { equation: (x) => -1 * x**2, katex: '-1*x^2' },
      { equation: (x) => x**2+4, katex: '1*x^2+4' },
      { equation: (x) => x**3, katex: '1*x^3' },
      { equation: (x) => 0.05 * x**3, katex: '0.05*x^3' },
    ]}
  >
    <ul slot="content">
      <li>b ændrer hvor toppunktet ligger. Dette punkt kan ikke aflæses fra forskriften</li>
      <li>
        a er hvor tæt benene ligger på hindanden. Desto større a er, jo tættere ligger benene.
        <ul>
          <li>Hvis <Katex math="a > 0"></Katex> så ligner parablen en glad smiley</li>
          <li>Hvis <Katex math="a = 0"></Katex> så er det en flad linje</li>
          <li>Hvis <Katex math="a > 0"></Katex> så ligner parablen en sur smiley</li>
        </ul>
      </li>
      <li>c afgører hvor funktionen skærer y-aksen</li>
      <li>Hvis n er et lige tal, så spejles funktionen omkring y-aksen i toppunktet</li>
      <li>Hvis n er et ulige tal, så spejles funktionen både omkring y-aksen og x-aksen</li>
      <li>Dm = <Katex math="] -\infty; \infty ["></Katex></li>
      <li>Vm = <Katex math="] -\infty; \infty ["></Katex></li>
    </ul>
  </FunctionSection>

  <FunctionSection
    name="Fraktionel potens"
    abstract={`f(x)=x^{n/m}`}
    examples={[
      { equation: (x) => x == 0 ? 0 : x**0.25, katex: 'x^{1/4}' },
      { equation: (x) => x == 0 ? 0 : 5 * x**0.25, katex: '5*x^{1/4}' },
      { equation: (x) => x == 0 ? 0 : Math.sign(x) * Math.abs(x)**0.20, katex: 'x^{1/5}' },
    ]}
  >
      <ul slot="content">
        <li>Her bliver potens tallet et kommatal, som kan skrives som en brøk</li>
        <li>
          Hvis m er lige, så er Dm = <Katex math="[0; \infty ["></Katex> <br>
          Ellers så er Dm = <Katex math="] -\infty; \infty ["></Katex>
        </li>
        <li>
          Hvis m er lige, så er Vm = <Katex math="[0; \infty ["></Katex> <br>
          Ellers så er Vm = <Katex math="] -\infty; \infty ["></Katex>
        </li>
      </ul>
  </FunctionSection>

  <FunctionSection
    name="Eksponentiel"
    abstract="f(x)=b*a^x+c"
    examples={[
      { equation: (x) => 2**x, katex: '2^x' },
      { equation: (x) => 0.5**x, katex: '0.5^x' },
      { equation: (x) => -1* 2**x, katex: '-1 * 2^x' },
      { equation: (x) => 3*3**x, katex: '3 * 3^x' },
    ]}
  >
      <ul slot="content">
        <li>Hvis <Katex math="a = 0"></Katex> så er det bare en linje</li>
        <li>Jo mere x stiger, jo mere stiger <Katex math="f(x)"></Katex></li>
        <li>Hvis <Katex math="a < 1"></Katex> så spejles funktionen omkring omkring y-aksen</li>
        <li>Hvis <Katex math="c = 0"></Katex> så skærer funktion y-aksen i b</li>
        <li>c flytter funktion op og ned</li>
        <li>Dm = <Katex math="] -\infty; \infty ["></Katex></li>
        <li>Vm = <Katex math="[0; \infty ["></Katex></li>
      </ul>
  </FunctionSection>

  <FunctionSection
    name="Sinus & Cosinus"
    abstract="f(x)=a*sin(b * x) + c"
    examples={[
      { equation: (x) => Math.sin(x), katex: "sin(x)" },
      { equation: (x) => 2*Math.sin(x), katex: "2*sin(x)" },
      { equation: (x) => Math.sin(x * 0.5) + 3, katex: "sin(0.5 * x) + 3" },
      { equation: (x) => Math.sin(x) - 3, katex: "sin(x) - 3" },
    ]}
  >
      <ul slot="content">
        <li>a bestemmer amplituden for sinus kurven</li>
        <li>Hvis <Katex math="a = 0"></Katex> så er det bare en linje</li>
        <li>b ændrer på frekvensen</li>
        <li>Hvis <Katex math="b = 0"></Katex> så er det bare en linje</li>
        <li>c flytter funtkionen op og ned</li>
      </ul>
  </FunctionSection>
</main>

<style>
header, main {
  padding: 0 2rem;
}
</style>
