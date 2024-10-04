// Part 1: Humble Beginnings
const adventurer = {
    name: "Robin",
    health: 10,
    inventory: ["sword", "potion", "artifact"],
    companion: {
        name: "Leo",
        type: "Cat",
        companion: {
            name: "Frank",
            type: "Flea",
            inventory: ["small hat", "sunglasses"]
        }
    },
    roll(mod = 0) {
        const result = Math.floor(Math.random() * 20) + 1 + mod;
        console.log(`${this.name} rolled a ${result}.`);
    }
};

// Log each item in Robin's inventory
adventurer.inventory.forEach(item => {
    console.log(item);
});

// Test the roll method
adventurer.roll();
adventurer.roll(2);

// Part 2: Class Fantasy
class Character {
    constructor(name) {
        this.name = name;
        this.health = 100;
        this.inventory = [];
    }

    roll(mod = 0) {
        const result = Math.floor(Math.random() * 20) + 1 + mod;
        console.log(`${this.name} rolled a ${result}.`);
    }
}

// Create Robin using the Character class
const robin = new Character("Robin");
robin.inventory = ["sword", "potion", "artifact"];
robin.companion = new Character("Leo");
robin.companion.type = "Cat";
robin.companion.companion = new Character("Frank");
robin.companion.companion.type = "Flea";
robin.companion.companion.inventory = ["small hat", "sunglasses"];

// Test roll method for companions
robin.roll();
robin.companion.roll();
robin.companion.companion.roll();

// Part 3: Class Features
class Adventurer extends Character {
    constructor(name, role) {
        super(name);
        this.role = role;
        this.inventory.push("bedroll", "50 gold coins");
    }

    scout() {
        console.log(`${this.name} is scouting ahead...`);
        super.roll();
    }
}

class Companion extends Character {
    constructor(name, type) {
        super(name);
        this.type = type;
    }

    assist() {
        console.log(`${this.name} the ${this.type} is assisting!`);
    }
}

// Re-create Robin and the companions using the new classes
const robinAdventurer = new Adventurer("Robin", "Warrior");
robinAdventurer.inventory = ["sword", "potion", "artifact"];
robinAdventurer.companion = new Companion("Leo", "Cat");
robinAdventurer.companion.companion = new Companion("Frank", "Flea");
robinAdventurer.companion.companion.inventory = ["small hat", "sunglasses"];

// Test the methods
robinAdventurer.scout();
robinAdventurer.roll();
robinAdventurer.companion.roll();
robinAdventurer.companion.assist();
robinAdventurer.companion.companion.roll();
