export default () => {
  document.getElementById("healthyCount").innerHTML = document.humanStatesCount.healthy;
  document.getElementById("sickCount").innerHTML = document.humanStatesCount.sick;
  document.getElementById("immuneCount").innerHTML = document.humanStatesCount.immune;
  document.getElementById("deadCount").innerHTML = document.humanStatesCount.dead;
  document.getElementById("mortalityRateValue").innerHTML = document.getElementById("mortalityRate").value;
  document.getElementById("infectionDistanceValue").innerHTML = Math.round(document.getElementById("infectionDistance").value / 20 *100)/100;
}
