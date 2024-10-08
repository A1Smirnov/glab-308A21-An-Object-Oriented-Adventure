console.log(`Testing Part 7`);

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

    takeDamage(damage) {
        this.health -= damage;
        if (this.health < 0) this.health = 0;
    }

    isAlive() {
        return this.health > 0;
    }

    useItem() {
        for (const item of this.inventory) {
            if (item instanceof Potion && this.health < 50) {
                item.use(this);
                this.inventory = this.inventory.filter(i => i !== item);
                this.updateLog(`${this.name} used a potion.`);
                break;
            }
        }
    }

    attack(opponent) {
        const damage = this.roll() + 5; 
        opponent.takeDamage(damage);
        this.updateLog(`${this.name} attacks ${opponent.name}, dealing ${damage} damage. ${opponent.name}'s health: ${opponent.health}`);
    }

    updateLog(message) {
        const combatLog = document.getElementById("combatLog");
        combatLog.innerHTML += `<p>${message}</p>`;
    }
}

class Adventurer extends Character {
    constructor(name, role) {
        super(name);
        this.role = role;
        this.inventory.push(new Potion());
    }

    levelUp(skill) {
        skill.levelUp();
    }

    duel(opponent) {
        this.updateLog(`Duel between ${this.name} and ${opponent.name} begins!`);
        while (this.health > 0 && opponent.health > 0) {
            this.attack(opponent);
            if (opponent.isAlive()) {
                opponent.attack(this);
            }
            this.useItem();
            opponent.useItem();
        }
        const winner = this.health > 0 ? this : opponent;
        this.updateLog(`${winner.name} wins the duel!`);
    }
}

class Enemy extends Character {
    constructor(name, type) {
        super(name);
        this.type = type;
    }

    attack(opponent) {
        const damage = this.roll() + 3;
        opponent.takeDamage(damage);
        this.updateLog(`${this.name} (Enemy) attacks ${opponent.name}, dealing ${damage} damage. ${opponent.name}'s health: ${opponent.health}`);
    }
}

class Potion {
    constructor() {
        this.healAmount = 50;
    }

    use(character) {
        character.health += this.healAmount;
        if (character.health > Character.MAX_HEALTH) character.health = Character.MAX_HEALTH;
        this.updateLog(`${character.name} uses a potion and restores ${this.healAmount} health. Current health: ${character.health}`);
    }

    updateLog(message) {
        const combatLog = document.getElementById("combatLog");
        combatLog.innerHTML += `<p>${message}</p>`;
    }
}

class Skill {
    constructor(name, level = 1) {
        this.name = name;
        this.level = level;
    }

    levelUp() {
        this.level += 1;
        this.updateLog(`${this.name} has leveled up to level ${this.level}`);
    }
}

class Sword {
    constructor() {
        this.damage = 30;
    }

    use(character, opponent) {
        const damage = Math.floor(Math.random() * this.damage) + 1;
        opponent.takeDamage(damage);
        this.updateLog(`${character.name} slashes ${opponent.name}, dealing ${damage} damage. ${opponent.name}'s health: ${opponent.health}`);
    }

    updateLog(message) {
        const combatLog = document.getElementById("combatLog");
        combatLog.innerHTML += `<p>${message}</p>`;
    }
}

class Combat {
    constructor(playerParty, enemyParty) {
        this.playerParty = playerParty;
        this.enemyParty = enemyParty;
        this.turnOrder = [...playerParty, ...enemyParty].sort(() => Math.random() - 0.5);
        this.currentTurn = 0;
    }

    start() {
        this.updateLog("Combat starts!");
        this.nextTurn();
    }

    nextTurn() {
        const character = this.turnOrder[this.currentTurn];
        const target = character instanceof Adventurer
            ? this.enemyParty.find(e => e.isAlive())
            : this.playerParty.find(p => p.isAlive());

        if (target && character.isAlive()) {
            character.attack(target);
            character.useItem();
        }

        if (this.playerParty.some(p => p.isAlive()) && this.enemyParty.some(e => e.isAlive())) {
            this.currentTurn = (this.currentTurn + 1) % this.turnOrder.length;
            setTimeout(() => this.nextTurn(), 2000);
        } else {
            const winner = this.playerParty.some(p => p.isAlive()) ? "Player Party" : "Enemy Party";
            this.updateLog(`${winner} wins the battle!`);
        }
    }

    updateLog(message) {
        const combatLog = document.getElementById("combatLog");
        combatLog.innerHTML += `<p>${message}</p>`;
    }
}

const player1 = new Adventurer("Knight", "Fighter");
const player2 = new Adventurer("Mage", "Wizard");
const player3 = new Adventurer("Rogue", "Thief");

const enemy1 = new Enemy("Goblin", "Goblin");
const enemy2 = new Enemy("Orc", "Orc");
const enemy3 = new Enemy("Dragon", "Dragon");

const playerParty = [player1, player2, player3];
const enemyParty = [enemy1, enemy2, enemy3];

const combat = new Combat(playerParty, enemyParty);
combat.start();
