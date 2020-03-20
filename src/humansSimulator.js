export default async (humans) => {
  humans.forEach((human) => {
      human.moveHuman();
  });

  humans.forEach((human, index) => {
      human.simulateEncounter(humans.slice(index+1));
      human.createHuman();
  });
}
