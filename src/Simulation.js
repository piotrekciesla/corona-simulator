import * as p5 from 'p5';
import Human from "./Human";
import HumansRenderer from "./HumansRenderer";

document.humanStatesCount = {
  healthy: Math.round(window.innerWidth * window.innerHeight / 5000),
  sick: 0,
  immune: 0,
  dead: 0,
} ;

let s = (sk) => {
  let humans = [];
  const humansRenderer = new HumansRenderer(sk);

  sk.setup = () =>{
    sk.createCanvas(window.innerWidth, window.innerHeight);
    // sk.createCanvas(600, 600);
    sk.background('#ffffff');

    for(let i = 0;i<document.humanStatesCount.healthy;i++){
      humans.push(new Human(sk));
    }
    humans[0].setSick()
  };

  sk.draw = () => {
    document.getElementById('healthyCount').innerHTML = document.humanStatesCount.healthy;
    document.getElementById('sickCount').innerHTML = document.humanStatesCount.sick;
    document.getElementById('immuneCount').innerHTML = document.humanStatesCount.immune;
    document.getElementById('deadCount').innerHTML = document.humanStatesCount.dead;



    sk.background('#ffffff');

    humans.forEach((human, index) => {
      human.simulateEncounter(humans.slice(index));
      human.createHuman();
    });

    humansRenderer.draw(humans);

    for(let i = 0;i<humans.length;i++) {
      humans[i].moveHuman();
    }
  };

  sk.mouseClicked = () => {
    const human = new Human(sk, sk.mouseX, sk.mouseY);
    document.humanStatesCount.healthy++;
    human.setSick();
    humans.push(human)
  }
}
const P5 = new p5(s);
