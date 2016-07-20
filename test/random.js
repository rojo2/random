const {expect} = require("chai");
const random = require("../random");

describe("Random", function() {

  beforeEach(() => random.reset(0));

  it("should get a pseudo-random value", () => {
    expect(random.value()).to.be.equal(0.6551482998766005);
  });

  it("should get a lot of pseudo-random values", () => {
    for (let index = 0; index < 5000; index++) {
      expect(random.value()).to.be.within(0,1);
    }
  });

  it("should get a set of pseudo-random values", () => {
    expect(random.values(4)).to.be.deep.equal([
      0.6551482998766005,
      0.3048086166381836,
      0.9227445721626282,
      0.2776111364364624
    ]);
  });

  it("should get a lot of pseudo-random values between 0 and 5", () => {    
    for (let index = 0; index < 5000; index++) {
      expect(random.between(0, 5)).to.be.within(0,5);
    }
  });
  
  it("should get a lot of pseudo-random integers between 0 and 5", () => {    
    for (let index = 0; index < 5000; index++) {
      expect(random.intBetween(0, 5)).to.be.within(0,5);
    }
  });

  it("should pick an list item", () => { 
    const list = [1,2,3,4,5];
    expect(random.pickOne(list)).to.be.equal(4);
    expect(random.pickOne(list)).to.be.equal(2);
    expect(random.pickOne(list)).to.be.equal(5);
    expect(random.pickOne(list)).to.be.equal(2);
    expect(random.pickOne(list)).to.be.equal(5);
    expect(random.pickOne(list)).to.be.equal(1);
    expect(random.pickOne(list)).to.be.equal(2);
    expect(random.pickOne(list)).to.be.equal(1);
  });

  it("should pick multiple list items", () => {
    const list = [1,2,3,4,5];
    expect(random.pick(list, 8)).to.be.deep.equal([4,2,5,2,5,1,2,1]);
  });

  it("should take an list item", () => {
    const list = [1,2,3,4,5];
    expect(random.takeOne(list)).to.be.equal(4);
    expect(list).to.be.deep.equal([1,2,3,5]);
    
    expect(random.takeOne(list)).to.be.equal(2);
    expect(list).to.be.deep.equal([1,3,5]);

    expect(random.takeOne(list)).to.be.equal(5);
    expect(list).to.be.deep.equal([1,3]);
    
    expect(random.takeOne(list)).to.be.equal(1);
    expect(list).to.be.deep.equal([3]);
    
    expect(random.takeOne(list)).to.be.equal(3);
    expect(list).to.be.deep.equal([]);
    
    expect(random.takeOne(list)).to.be.equal(undefined);
    expect(list).to.be.deep.equal([]);
  });

  it("should take multiple list items", () => {
    const list = [1,2,3,4,5];
    expect(random.take(list, 25)).to.be.deep.equal([4,2,5,1,3]);
  });

  it("should shuffle a list of items", () => {
    const list = [1,2,3,4,5];
    expect(random.shuffle(list)).to.be.deep.equal([5,1,3,2,4]);
  });

  it("should roll eight fudgeDices", () => {
    expect(random.fudgeDice()).to.be.equal(0);
    expect(random.fudgeDice()).to.be.equal(0);
    expect(random.fudgeDice()).to.be.equal(1);
    expect(random.fudgeDice()).to.be.equal(0);
    expect(random.fudgeDice()).to.be.equal(1);
    expect(random.fudgeDice()).to.be.equal(-1);
    expect(random.fudgeDice()).to.be.equal(0);
  });

  it("should roll eight regularDices (with its default value)", () => {
    expect(random.regularDice()).to.be.equal(4);
    expect(random.regularDice()).to.be.equal(3);
    expect(random.regularDice()).to.be.equal(6);
    expect(random.regularDice()).to.be.equal(2);
    expect(random.regularDice()).to.be.equal(5);
    expect(random.regularDice()).to.be.equal(2);
    expect(random.regularDice()).to.be.equal(2);
    expect(random.regularDice()).to.be.equal(1);
  });
  
  it("should roll eight regularDices (with its default value)", () => {
    expect(random.regularDices(8)).to.be.deep.equal([4,3,6,2,5,2,2,1]);
  });

  it("should roll eight regularDices (12 sides)", () => {
    expect(random.regularDice(12)).to.be.equal(8);
    expect(random.regularDice(12)).to.be.equal(4);
    expect(random.regularDice(12)).to.be.equal(11);
    expect(random.regularDice(12)).to.be.equal(4);
    expect(random.regularDice(12)).to.be.equal(11);
    expect(random.regularDice(12)).to.be.equal(2);
    expect(random.regularDice(12)).to.be.equal(4);
    expect(random.regularDice(12)).to.be.equal(1);
  });

  it("should roll eight regularDices (12 sides)", () => {
    expect(random.regularDices(8,12)).to.be.deep.equal([8,4,11,4,11,2,4,1]);
  });

  it("should roll multiple dices using dice", () => {
    expect(random.dice(random.FUDGE_DICE)).to.be.equal(0);
    expect(random.dice(random.FUDGE_DICE)).to.be.equal(0);
    expect(random.dice(random.FUDGE_DICE)).to.be.equal(1);
    expect(random.dice(random.FUDGE_DICE)).to.be.equal(0);
    expect(random.dice(random.REGULAR_DICE)).to.be.equal(5);
    expect(random.dice(random.REGULAR_DICE)).to.be.equal(2);
    expect(random.dice(random.REGULAR_DICE)).to.be.equal(2);
    expect(random.dice(random.REGULAR_DICE)).to.be.equal(1);
  });
  
  it("should roll multiple dices using dices", () => {
    expect(random.dices([
      [4, random.FUDGE_DICE],
      [4, random.REGULAR_DICE, 6]
    ])).to.be.deep.equal([
      [ 0, -0, 1, -0 ],
      [ 5, 2, 2, 1 ]
    ]);
  });

  it("should roll multiple dices using roll", () => {
    expect(random.roll("4f,4d6,4d5")).to.be.deep.equal([
      [ 0, -0, 1, -0 ],
      [ 5, 2, 2, 1 ],
      [ 3, 4, 2, 1 ]    
    ]);
  });

});
