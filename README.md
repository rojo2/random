# Random
![Travis CI](https://travis-ci.org/rojo2/random.svg?branch=master)

```javascript
const random = require("rojo2-random");

// reset random seed
random.reset(0);

// get random value between 0 and 1
random.value();

// get random value between min and max
random.between(min, max);

// get random index between 0 and list.length - 1
random.index(list);

// get a random value from [1,2,3]
random.pickOne([1,2,3]);

// take a random value from [1,2,3]
// after calling this function
// if the returned value is 2
// the array is going to be [1,3]
random.takeOne([1,2,3]);

random.fudgeDice();
random.fudgeDices();

random.regularDice();
random.regularDices();

random.dice();
random.dices();

random.roll(["2d6","4d12","1d2"]);
random.roll("2d6,4d12,1d2");
```

**NOTE**: This library uses an [LCG](https://en.wikipedia.org/wiki/Linear_congruential_generator),
probably the most simple and basic pseudo-random number generator. **DON'T USE
THIS TO GENERATE CRYPTOGRAPHIC RANDOM NUMBERS!**

Made with ❤ by ROJO 2 (http://rojo2.com)
