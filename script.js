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
    static MAX_HEALTH = 100; // Static property - Part 4

    constructor(name) {
        this.name = name;
        this.health = Character.MAX_HEALTH; // Pt. 4
        this.inventory = [];
    }

    roll(mod = 0) {
        const result = Math.floor(Math.random() * 20) + 1 + mod;
        console.log(`${this.name} rolled a ${result}.`);
    }
}

// Test Part 4

console.log(`Maximum health for any character is: ${Character.MAX_HEALTH}`);



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
    static ROLES = ["Fighter", "Healer", "Wizard"];  // Static property for valid roles PART 4

    constructor(name, role) {
        super(name);

// Part 4 validation of roles
if (!Adventurer.ROLES.includes(role)) {  // Validate role
    throw new Error(`Invalid role: ${role}. Valid roles are: ${Adventurer.ROLES.join(', ')}`);
}
// End of Part 4 Validation test

        this.role = role;
        this.inventory.push("bedroll", "50 gold coins");
    }

// Part 4. Static method to get available Roles
    static getRoles() {  
        return Adventurer.ROLES;
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

// Re-create Robin and the companions using the new classes + roles (pt4)
const robinAdventurer = new Adventurer("Robin", "Fighter");
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

// Part 4
// Examples of using static properties/methods
console.log(`Maximum health for any character is: ${Character.MAX_HEALTH}`);
console.log(`Available roles: ${Adventurer.getRoles().join(', ')}`);

try {
    const invalidAdventurer = new Adventurer("Robin", "Warrior");  // Invalid role
} catch (e) {
    console.error(e.message);  // Error will be thrown for invalid role
}

//Error got catched