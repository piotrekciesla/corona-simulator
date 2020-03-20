import P5 from "p5";
import Human from "./Human";
import HumansRenderer from "./HumansRenderer";
import StatisticsRenderer from "./StatisticsRenderer";
import updateHtmlStatistisc from "./updateHtmlStatistisc";
import createNewWorld from "./createNewWorld";
import humansSimulator from "./humansSimulator";

document.humanStatesCount = {
  total: 0,
  healthy: 0,
  sick: 0,
  immune: 0,
  dead: 0,
};

let humans = [];

const reset = () =>{
  humans = createNewWorld(simulation);
};

document.getElementById('reset').addEventListener("click", reset );

let s = (sk) => {
  const humansRenderer = new HumansRenderer(sk);

  sk.setup = () => {
    sk.createCanvas(window.innerWidth, window.innerHeight-100);
    humans = createNewWorld(sk);
  };

  sk.draw = async () => {

    updateHtmlStatistisc();
    await humansSimulator(humans);
    humansRenderer.draw(humans);

    document.getElementById('fps').innerHTML = sk.frameRate().toFixed(2)
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

const simulation = new P5(s);

const statistics = new P5((sk)=>{
  const statisticsRenderer = new StatisticsRenderer(sk);
  sk.setup= () => {
    sk.createCanvas(window.innerWidth, 100);
    sk.noLoop();
  };
  sk.draw = ()=>{
    sk.background("#d6d6d6");
    statisticsRenderer.draw();
  }
});

setInterval(statistics.draw, 100)


