console.log(`Testing Part 7`);

// Character Classes
class Character {
    static MAX_HEALTH = 100;

    constructor(name) {
        this.name = name;
        this.health = Character.MAX_HEALTH;
        this.inventory = [];
    }

    roll(mod = 0) {
        return Math.floor(Math.random() * 20) + 1 + mod;
    }
// Take damage, if hp<0 then equal hp=0 and it will be dead, cuz not Alive
    takeDamage(damage) {
        this.health -= damage;
        if (this.health < 0) this.health = 0;
    }
// If health >0 then Alive, if its equal or less 0 - then dead 
    isAlive() {
        return this.health > 0;
    }
// Mechanic of use iteam, make some logic to drink potion when health lower then 50 hp
    useItem() {
        for (const item of this.inventory) {
            if (item instanceof Potion && this.health < 50) {
                item.use(this);


// Bugfix #1 - Item's was used without removing from inventory
// Bugfix #2 - Item's in array requires removing using filter option

                this.inventory = this.inventory.filter(i => i !== item);
                break;
            }
        }
    }

    attack(opponent) {
// Make damage as roll + 5 default modifier to faster up the fight
        const damage = this.roll() + 5; 
// Make takeDamage method to absorb damage
        opponent.takeDamage(damage);
// Logging out the fight
        console.log(`${this.name} attacks ${opponent.name}, dealing ${damage} damage. ${opponent.name}'s health: ${opponent.health}`);
    }
}

class Adventurer extends Character {
    constructor(name, role) {
        super(name);
        this.role = role;
// Potion added for testing 
        this.inventory.push(new Potion());
    }
// WORK LATER ON IDEA OF LEVELLING UP AND INCREASED SKILLS
    levelUp(skill) {
        skill.levelUp();
    }

    duel(opponent) {
        console.log(`Duel between ${this.name} and ${opponent.name} begins!`);
        while (this.health > 0 && opponent.health > 0) {
            this.attack(opponent);
            if (opponent.isAlive()) {
                opponent.attack(this);
            }
// Bugfix #0 - Add using of item's out of inventory for me and opponent
            this.useItem();
            opponent.useItem();
        }
        const winner = this.health > 0 ? this : opponent;
        console.log(`${winner.name} wins the duel!`);
    }
}

class Enemy extends Character {
    constructor(name, type) {
        super(name);
        this.type = type;
    }

    attack(opponent) {
// Modifier +3 to damage to balance teams
        const damage = this.roll() + 3;
        opponent.takeDamage(damage);
        console.log(`${this.name} (Enemy) attacks ${opponent.name}, dealing ${damage} damage. ${opponent.name}'s health: ${opponent.health}`);
    }
}
// Potion creating class
class Potion {
    constructor() {
        this.healAmount = 50;
    }
// Method of using Potion by charaters
    use(character) {
        character.health += this.healAmount;
        if (character.health > Character.MAX_HEALTH) character.health = Character.MAX_HEALTH;
// Bugfix #0 - Logging out use of potions
        console.log(`${character.name} uses a potion and restores ${this.healAmount} health. Current health: ${character.health}`);
    }
}

// Skills and Inventory
// Creating new class of Skill/Level

// !!!! WORK ON Leveling up to ? add skills, items, hp, damage and etc
class Skill {
    constructor(name, level = 1) {
        this.name = name;
        this.level = level;
    }

    levelUp() {
        this.level += 1;
        console.log(`${this.name} has leveled up to level ${this.level}`);
    }
}

// Add item "sword" to multiply damage of character that worn it
// !!! Bugifx #5 Sword was removed from knight's items because of multiple using items in one combat round and other bugs
class Sword {
    constructor() {
        this.damage = 30;
    }

    use(character, opponent) {
        const damage = Math.floor(Math.random() * this.damage) + 1;
        opponent.takeDamage(damage);
        console.log(`${character.name} slashes ${opponent.name}, dealing ${damage} damage. ${opponent.name}'s health: ${opponent.health}`);
    }
}

// Combat System as Class with Methods... Here we go again
class Combat {
    constructor(playerParty, enemyParty) {
        this.playerParty = playerParty;
        this.enemyParty = enemyParty;
// For simplifier this system we merge in one new Array allies and enemies
// We mix them for random turn's order instead of previous 'initiative' priority of character's first turn
        this.turnOrder = [...playerParty, ...enemyParty].sort(() => Math.random() - 0.5);
    }

// Making it turn-based we start from 1st round to i until one of the party is not alive
    start() {
        console.log("Combat starts!");
        let round = 1;
        while (this.playerParty.some(p => p.isAlive()) && this.enemyParty.some(e => e.isAlive())) {
            console.log(`Round ${round}:`);
// BugFix #6 with turnOrder now counts and have the random order
            for (const character of this.turnOrder) {
                const target = character instanceof Adventurer
// Logic is attacking any alive enemy from both sides
                    ? this.enemyParty.find(e => e.isAlive())
                    : this.playerParty.find(p => p.isAlive());
// Bugfix #7 checking Alive status of party fighting
                if (target && character.isAlive()) {
                    character.attack(target);
                    character.useItem();
                }
            }
            round += 1;
        }

        const winner = this.playerParty.some(p => p.isAlive()) ? "Player Party" : "Enemy Party";
        console.log(`${winner} wins the battle!`);
    }
}

// Creating envoirnment for testing
// Generate Characters
const player1 = new Adventurer("Knight", "Fighter");
const player2 = new Adventurer("Mage", "Wizard");
const player3 = new Adventurer("Rogue", "Thief");

const enemy1 = new Enemy("Goblin", "Goblin");
const enemy2 = new Enemy("Orc", "Orc");
const enemy3 = new Enemy("Dragon", "Dragon");

const playerParty = [player1, player2, player3];
const enemyParty = [enemy1, enemy2, enemy3];

// Testing Start Combat
const combat = new Combat(playerParty, enemyParty);
combat.start();
