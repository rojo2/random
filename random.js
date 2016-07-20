/** This module uses a Linear Congruential Generator to generate random numbers */

/** Increment used in the lcg */
const INCREMENT = 12345;

/** Multiplier used in the lcg */
const MULTIPLIER = 1103515245;

/** Modulus used in the lcg */
const MODULUS = 2147483648;

/** Regular dice constant */
const REGULAR_DICE = "d";

/** Fudge dice constant */
const FUDGE_DICE = "f";

/** Random seed */
let seed = 0;

/** Helper function used to call multiple times a function */
function times(count, fn, ...args) {
  const result = [];
  for (let index = 0; index < count; index++) {
    const value = fn(...args);
    if (value !== undefined) {
      result.push(value);
    }
  }
  return result;
}

/** Linear Congruential Generator */
function lcg(value,increment,multiplier,modulus) {
  return ((value + increment) * multiplier) % modulus;
}

/**
 * Generates a pseudo-random number using a Linear Congruential Generator
 * between 0 and 1.
 * 
 * @return {Number} Random value between 0 and 1
 */
function value() {
  seed = lcg(seed, INCREMENT, MULTIPLIER, MODULUS);
  return seed / MODULUS;
}

/** 
 * Generates multiple pseudo-random numbers between 0 and 1.
 * 
 * @return {Array} List of numbers between 0 and 1
 */
function values(count) {
  return times(count, value);
}

/**
 * Modifies the current seed.
 *
 * @return {Number} The new seed
 */
function reset(newSeed) {
  return seed = newSeed;
}

/**
 * Generates a pseudo-random number between min and max.
 *
 * @param {Number} min
 * @param {Number} max
 * @return {Number} Random value between min and max.
 */
function between(min, max) {
  return (value() * (max - min)) + min;
}

/**
 * Generates a pseudo-random integer between min and max.
 *
 * @param {Number} min
 * @param {Number} max
 * @return {Number} Random integer between min and max
 */
function intBetween(min, max) {
  return Math.round(between(min, max));
}

/**
 * Returns a random index between 0 and list.length
 *
 * @param {Array} list List of values
 * @return {Number} Index between 0 and list.length
 */
function index(list) {
  return intBetween(0, Math.max(0, list.length - 1));
}

/**
 * Returns a random value from the list
 * 
 * @param {Array} list List of values
 * @return {mixed} Random value from list
 */
function pickOne(list) {
  return list[index(list)];
}

/**
 * Removes a random value from the list
 *
 * @param {Array} list List of values
 * @return {mixed} Random value from list
 */
function takeOne(list) {
  const [removed] = list.splice(index(list), 1);
  return removed;
}

/**
 * Returns multiple random values from the list.
 *
 * @param {Array} list List of values
 * @param {Number} count Number of items to return from the list
 * @return {Array} List of random values returned from the list passed as parameter
 */
function pick(list, count = 1) {
  return times(count, pickOne, list);
}

/**
 * Removes multiple random values from the list.
 *
 * @param {Array} list List of values
 * @param {Number} count Number of items to remove from the list
 * @return {Array} List of random values removed from the list passed as parameter
 */
function take(list, count = 1) {
  return times(count, takeOne, list);
}

/**
 * Shuffles a list
 *
 * @param {Array} list List of values to be shuffled
 * @return {Array} The shuffled list of values
 */
function shuffle(list) {
	let index = list.length;
	while (index > 0) {
		index--;

		const randomIndex = intBetween(0, index);
		const randomValue = list[randomIndex];

		list[randomIndex] = list[index];
		list[index] = randomValue;	
	}
	return list;
}

/**
 * Returns a value -1, 0, 1 from a fudge dice
 *
 * @return {Number} Fudge dice random value
 */
function fudgeDice() {
	return intBetween(-1, 1);
}

/**
 * Returns multiple values (-1, 0, 1) from a fudge dice
 *
 * @param {Number} count Number of dices to throw
 * @return {Array} Fudge dice random value
 */
function fudgeDices(count) {
  return times(count, fudgeDice);
}

/**
 * Returns a value from a regular dice.
 *
 * @param {Number} sides Number of dice sides (By default is 6)
 * @return {Number} Regular dice random value
 */
function regularDice(sides = 6) {
  if (typeof sides !== "number") {
    throw new TypeError("Invalid sides type");
  }
	return intBetween(1, sides);
}

/**
 * Returns a value from a regular dice.
 *
 * @param {Number} count Number of dices to throw
 * @param {Number} sides Number of dice sides (By default is 6)
 * @return {Array} Regular dice random values
 */
function regularDices(count, sides = 6) {
  return times(count, regularDice, sides);
}

/**
 * Returns a dice value (it could be a fudge dice or a regular one)
 *
 * @param {String} type Dice type. It could be FUDGE_DICE or REGULAR DICE
 * @param {Number} sides Number of dice sides
 * @return {Number} Random value
 */
function dice(type, sides) {
  if (type === REGULAR_DICE) {
    return regularDice(sides);
  } else if (type === FUDGE_DICE) {
    return fudgeDice();
  } else {
    throw new TypeError("Invalid dice type");
  }
}

/**
 * Returns multiple dice values
 *
 * @param {Array} values
 * @return {Array}
 */
function dices(values) {
  const result = [];
  for (let value of values) {
    const [count, type, sides] = value;
    result.push(times(count, dice, type, sides));
  }
  return result;
}

/**
 * Generates a list of pseudo-random numbers using the dice expressions passed
 * as arguments.
 *
 * @param {Array|String} dices List of dice expressions (like "1d6,2d4" or ["1d6","2d4"])
 * @return {Array} List of values returned by this function
 */
function roll(dices) {
  const re = /^([0-9]+)(d[0-9]+|f)$/;
  if (!(dices instanceof Array) && !(typeof dices === "string" || dices instanceof String)) {
    throw new TypeError("Invalid dices type");
  }
  const values = (typeof dices === "string" || dices instanceof String) ? dices.split(",") : dices;
  return values.map((expression) => {
    if (!re.test(expression)) {
      throw new TypeError("Invalid dice expression");
    }
    const [fullMatch, count, value] = expression.match(re);
    const type = value.substr(0,1);
    const sides = parseInt(value.substr(1), 10);
    return times(count, dice, type, sides);
  });
}

module.exports = {
  FUDGE_DICE,
  REGULAR_DICE,
	reset,
	value,
  values,
	between,
	intBetween,
	pickOne,
	takeOne,
	pick,
	take,
	shuffle,
	fudgeDice,
  fudgeDices,
  regularDice,
  regularDices,
	dice,
  dices,
	roll
};
