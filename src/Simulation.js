import * as p5 from 'p5';
import Particle from "./Particle";
import HumansRenderer from "./HumansRenderer";

const peopleCount = 200;
let s = (sk) => {
  let particles = [];
  const humansRenderer = new HumansRenderer(sk);

  sk.setup = () =>{
    sk.createCanvas(window.innerWidth, window.innerHeight);
    // sk.createCanvas(600, 600);
    sk.background('#ffffff');

    for(let i = 0;i<peopleCount;i++){
      particles.push(new Particle(sk));
    }
    particles[0].setSick()
  };

  sk.draw = () => {
    sk.background('#ffffff');

    particles.forEach((particle, index) => {
      particle.simulateEncounter(particles.slice(index));
      particle.createParticle();
    });

    humansRenderer.draw(particles);

    for(let i = 0;i<particles.length;i++) {
      particles[i].moveParticle();
    }
  }
}
const P5 = new p5(s);
