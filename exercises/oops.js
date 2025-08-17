class Car {
  #brand;
  #model;
  // You can set a default value for a property
  // here, or in the constructor. They do the
  // same thing. This is just a shortcut.
  speed = 0;
  isTrunkOpen = false;

  constructor(carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;

    // You can set a default value for a property
    // here or directly in the property above.
    // this.speed = 0;
  }

  getDisplayInfo() {
    return `${this.#brand} ${this.#model} , Speed: ${
      this.speed
    } km/h, Trunkinfo: ${this.isTrunkOpen ? "Opened" : "Closed"}`;
  }

  go() {
    if (!this.isTrunkOpen) {
      if (this.speed <= 195) {
        this.speed += 5;
      }
    }
  }

  break() {
    if (this.speed >= 5) {
      this.speed -= 5;
    }
  }

  openTrunk() {
    if (this.speed === 0) {
      this.isTrunkOpen = true;
    }
  }

  closeTrunk() {
    this.isTrunkOpen = false;
  }
}

const car1 = new Car({ brand: "Toyota", model: "Corolla" });
const car2 = new Car({ brand: "Tesla", model: "Model 3" });

car1.go();
car2.break();
car2.openTrunk();

console.log(car1.getDisplayInfo());
console.log(car2.getDisplayInfo());

car1.go();
car2.go();

console.log(car1.getDisplayInfo());
console.log(car2.getDisplayInfo());

class RaceCar extends Car {
  acceleration;

  constructor(carDetails) {
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }

  go() {
    if (this.speed <= 300 - this.acceleration) {
      this.speed += this.acceleration;
    }
  }

  openTrunk() {
    console.log("Race Car doesn't have the trunk");
  }

  closeTrunk() {
    console.log("Race Car doesn't have the trunk");
  }
}

const raceCar1 = new RaceCar({ brand: "McLaren", model: "F1", acceleration: 20 });

raceCar1.go();
console.log(raceCar1.getDisplayInfo());

