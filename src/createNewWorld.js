import Human from "./Human";

let getPopulationSize= () => Math.round(window.innerWidth * window.innerHeight / 5000 * document.getElementById('populationDensity').value);

export default (sk) =>{
  const populationSize = getPopulationSize();
  document.humanStatesCount = {
    total: 0,
    healthy: 0,
    sick: 0,
    immune: 0,
    dead: 0,
  };

  const humans = [];

  for ( let i = 0; i < populationSize; i++ ) {
    humans.push(new Human(sk))
  }
  humans[0].setSick();
  document.getElementById("totalCount").innerHTML = document.humanStatesCount.total;

  return humans;
};
