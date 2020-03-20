import HumanStates from './HumanStates'
import random from './utils/random'

const sickTime = 400;
const spring = 0.03;
const friction = 0.999;
const mortalityRate = () => document.getElementById('mortalityRate').value/100;
const getInfectionDistance = () => document.getElementById('infectionDistance').value;

class Human {
  constructor(sk, x , y){
    document.humanStatesCount.healthy++;
    document.humanStatesCount.total++;
    this.sk = sk;

    this.r = 6;

    this.x = x || random(0,sk.width);
    this.y = y || random(0,sk.height);
    this.xSpeed = random(-2,2);
    this.ySpeed = random(-1,1.5);

    this.age = random(1, 90);
    this.state = HumanStates.HEALTHY;
    this.timeUntilCured = 0;


  }

// creation of a particle.
  createHuman() {
    if (this.isSick()){
      if (this.r > 6 ){
        this.r -= 0.2
      }
      this.timeUntilCured--;
      this.xSpeed += random(-0.1,0.1);
      this.ySpeed -= random(-0.1,0.1);

      if(this.timeUntilCured === 0 ){
        const chanceOfDeath = Math.random();
        if  (chanceOfDeath < mortalityRate()){
          this.setDead();
          return;
        }
        this.setImmune();
      }

      return;
    }

    if(this.isCured()){
      if (this.r > 6 ){
        this.r -= 0.02
      }
      return;
    }

    if (this.isDead()){
      this.xSpeed = 0;
      this.ySpeed = 0;
    }

    if(this.isImmune()){
      if (this.r< 12 ){
        this.r += 0.02
      }else {
        this.setHealthy();
      }
      return;
    }
  }

  isSick() {
    return this.state === HumanStates.SICK;
  }

  isDead() {
    return this.state === HumanStates.DEAD;
  }

  isCured() {
    return this.state === HumanStates.HEALTHY;
  }

  isImmune() {
    return this.state === HumanStates.IMMUNE;
  }

// setting the particle in motion.
  moveHuman() {
    if  (this.isSick() && this.timeUntilCured < sickTime/2){
      this.xSpeed = 0;
      this.ySpeed = 0;
    }

    if(this.x < this.r || this.x >this.sk.width - this.r)
      this.xSpeed*=-1;
    if(this.y < this.r || this.y > this.sk.height -this.r)
      this.ySpeed*=-1;
    this.x+=this.xSpeed;
    this.y+=this.ySpeed;
    this.xSpeed *= friction;
    this.ySpeed *= friction;

  }

  setSick(){
    if(this.isSick() || this.isImmune() || this.isDead()){
      return
    }
    this.leftInfections = 2;
    document.humanStatesCount[this.state]--;
    this.state = HumanStates.SICK;
    document.humanStatesCount[this.state]++;
    this.timeUntilCured = sickTime;
  }

  setHealthy(){
    document.humanStatesCount[this.state]--;
    this.state = HumanStates.HEALTHY;
    document.humanStatesCount[this.state]++;
  }

  setDead() {
    document.humanStatesCount[this.state]--;
    this.state = HumanStates.DEAD;
    document.humanStatesCount[this.state]++;
    this.xSpeed = 0;
    this.ySpeed = 0;
  }

  setImmune(){
    document.humanStatesCount[this.state]--;
    this.state = HumanStates.IMMUNE;
    document.humanStatesCount[this.state]++;

    this.xSpeed = random(-2,2);
    this.ySpeed = random(-1,1.5);
  }

  collideHumans(human1, human2){
    let dx = human1.x - human2.x;
    let dy = human1.y - human2.y;
    let angle = Math.atan2(dy, dx);
    let minDist = human1.r + human2.r;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if(distance > minDist){
      return
    }
    let targetX = human1.x + Math.cos(angle) * minDist;
    let targetY = human1.y + Math.sin(angle) * minDist;
    let ax = (targetX - human1.x) * spring;
    let ay = (targetY - human2.y) * spring;

    human1.xSpeed += ax;
    human1.ySpeed += ay;
    human2.xSpeed -= ax;
    human2.ySpeed -= ay;
  }

  simulateEncounter(humans) {
    const infectionDistance = getInfectionDistance();
    humans.forEach(element =>{
      let dis = this.sk.dist(this.x,this.y,element.x,element.y);
        if ( dis < infectionDistance && (this.isSick() || element.isSick()) ) {
          element.setSick();
          this.setSick();
        }
      let minDist = this.r + element.r;
      if ( dis < minDist && !this.isDead() && !element.isDead() ){
        this.collideHumans(this, element)
      }

    });
  }

}

export default Human
