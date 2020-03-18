const sickTime = 400;
const spring = 0.03;
const friction = 0.999;

class Particle {
// setting the co-ordinates, radius and the
// speed of a particle in both the co-ordinates axes.

  constructor(sk){
    this.sk = sk;
    this.x = sk.random(0,sk.width);
    this.y = sk.random(0,sk.height);

    this.r = 6;
    this.isSick = false;
    this.isCured = false;
    this.timeUntilCured = 0;
    this.xSpeed = sk.random(-2,2);
    this.ySpeed = sk.random(-1,1.5);
  }

// creation of a particle.
  createParticle() {
    if (this.isSick){
      this.timeUntilCured--;
      this.xSpeed += this.sk.random(-0.1,0.1);
      this.ySpeed -= this.sk.random(-0.1,0.1);
      if(this.timeUntilCured === 0 ){
        this.isCured = true;
        this.isSick = false;
        this.xSpeed = this.sk.random(-2,2);
        this.ySpeed = this.sk.random(-1,1.5);
      }
    }
    if(!this.isCured){
      if (this.r> 6 ){
        this.r -= 0.02
      }
    }
    if(this.isCured){
      if (this.r< 12 ){
        this.r += 0.02
      }else {
        this.isCured = false
      }
    }
  }

// setting the particle in motion.
  moveParticle() {
    if  (this.isSick && this.timeUntilCured < sickTime/2){
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
    if(this.isSick || this.isCured){
      return
    }

    this.isSick = true;
    this.timeUntilCured = sickTime;

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

  simulateEncounter(particles) {
    particles.forEach(element =>{

      let dis = this.sk.dist(this.x,this.y,element.x,element.y);
        if ( dis < 40 && (this.isSick || element.isSick) ) {
          element.setSick();
          this.setSick();
        }
      let minDist = this.r + element.r;
      if ( dis < minDist){
        this.collideHumans(this, element)
      }

    });
  }

}

export default Particle
