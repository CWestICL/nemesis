function SharedFunctions() {
  return (null);
}

export default SharedFunctions;

function getDieFaces(ability_value) {
  return (4 + (2 * (ability_value - 1)));
}

function getAbilityScore(ability_value) {
  if (ability_value > 0) {
    return 'D' + getDieFaces(ability_value);
  }
  return '0';
}

function rollDie(faces) {
  return Math.floor((Math.random() * faces) + 1)
}

function rollAbility(ability_value) {
  let faces = getDieFaces(ability_value);
  return rollDie(faces);
}

function aOrAn(number) {
  let a = 'a';
  if (number == 8 || number == 11 || number == 18) {
    a = 'an';
  }
  return a;
}

  export { getAbilityScore, rollDie, rollAbility, aOrAn };