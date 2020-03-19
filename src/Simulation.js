import * as p5 from "p5";
import Human from "./Human";
import HumansRenderer from "./HumansRenderer";
import StatisticsRenderer from "./StatisticsRenderer";

let getPopulationSize= () => Math.round(window.innerWidth * window.innerHeight / 5000 * document.getElementById('populationDensity').value);

document.humanStatesCount = {
  total: 0,
  healthy: 0,
  sick: 0,
  immune: 0,
  dead: 0,
};

let s = (sk) => {
  let humans = [];
  const humansRenderer = new HumansRenderer(sk);
  const statisticsRenderer = new StatisticsRenderer(sk);

  sk.setup = () => {
    const populationSize = getPopulationSize();
    sk.createCanvas(window.innerWidth, window.innerHeight);
    sk.background("#ffffff");

    for ( let i = 0; i < populationSize; i++ ) {
      humans.push(new Human(sk))
    }
    humans[0].setSick();
    document.getElementById('reset').addEventListener("click", reset )
    document.getElementById("totalCount").innerHTML = document.humanStatesCount.total;
  };

  sk.draw = () => {
    document.getElementById("healthyCount").innerHTML = document.humanStatesCount.healthy;
    document.getElementById("sickCount").innerHTML = document.humanStatesCount.sick;
    document.getElementById("immuneCount").innerHTML = document.humanStatesCount.immune;
    document.getElementById("deadCount").innerHTML = document.humanStatesCount.dead;
    document.getElementById("mortalityRateValue").innerHTML = document.getElementById("mortalityRate").value;
    document.getElementById("infectionDistanceValue").innerHTML = Math.round(document.getElementById("infectionDistance").value / 20 *100)/100;

    sk.background("#ffffff");

    humans.forEach((human, index) => {
      human.simulateEncounter(humans.slice(index));
      human.createHuman();
    });

    humansRenderer.draw(humans);
    statisticsRenderer.draw();

    for ( let i = 0; i < humans.length; i++ ) {
      humans[i].moveHuman();
    }
  };

  sk.keyTyped= () => {
    if ( sk.key !== 'r' ) {
      return;
    }
    reset();
  };

  const reset = () =>{
    const populationSize = getPopulationSize();
    document.humanStatesCount = {
      total: 0,
      healthy: 0,
      sick: 0,
      immune: 0,
      dead: 0,
    };
    humans = []
    for ( let i = 0; i < populationSize; i++ ) {
      humans.push(new Human(sk))
    }
    humans[0].setSick();
  };

  sk.mousePressed = () => {
    if ( sk.mouseY <= 0 ) {
      return;
    }
    const human = new Human(sk, sk.mouseX, sk.mouseY);
    human.setSick();
    humans.push(human);
    document.getElementById("totalCount").innerHTML = document.humanStatesCount.total;
  };
};
const P5 = new p5(s);
