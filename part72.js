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

    takeDamage(damage) {
        this.health -= damage;
        if (this.health < 0) this.health = 0;
        this.updateUI(); // UPDATED UI!
    }

    isAlive() {
        return this.health > 0;
    }

    useItem() {
        for (const item of this.inventory) {
            if (item instanceof Potion && this.health < 50) {
                item.use(this);
                this.inventory = this.inventory.filter(i => i !== item);
                this.updateUI(); // Обновление UI после использования предмета
                break;
            }
        }
    }

    attack(opponent) {
        const damage = this.roll() + 5;
        opponent.takeDamage(damage);
        console.log(`${this.name} attacks ${opponent.name}, dealing ${damage} damage. ${opponent.name}'s health: ${opponent.health}`);
    }

    updateUI() {
        // Функция обновления UI для каждого персонажа
        const playerDiv = document.getElementById("playerParty");
        const enemyDiv = document.getElementById("enemyParty");

        if (this instanceof Adventurer) {
            const characterDiv = playerDiv.querySelector(`[data-name="${this.name}"]`);
            if (characterDiv) {
                characterDiv.querySelector(".health").textContent = `${this.health} HP`;
                characterDiv.className = this.isAlive() ? 'character alive' : 'character dead';
            }
        } else if (this instanceof Enemy) {
            const characterDiv = enemyDiv.querySelector(`[data-name="${this.name}"]`);
            if (characterDiv) {
                characterDiv.querySelector(".health").textContent = `${this.health} HP`;
                characterDiv.className = this.isAlive() ? 'character alive' : 'character dead';
            }
        }
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
        console.log(`Duel between ${this.name} and ${opponent.name} begins!`);
        while (this.health > 0 && opponent.health > 0) {
            this.attack(opponent);
            if (opponent.isAlive()) {
                opponent.attack(this);
            }
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
        const damage = this.roll() + 5;
        opponent.takeDamage(damage);
        console.log(`${this.name} (Enemy) attacks ${opponent.name}, dealing ${damage} damage. ${opponent.name}'s health: ${opponent.health}`);
    }
}

class Potion {
    constructor() {
        this.healAmount = 50;
    }

    use(character) {
        character.health += this.healAmount;
        if (character.health > Character.MAX_HEALTH) character.health = Character.MAX_HEALTH;
        console.log(`${character.name} uses a potion and restores ${this.healAmount} health. Current health: ${character.health}`);
    }
}

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

class Combat {
    constructor(playerParty, enemyParty) {
        this.playerParty = playerParty;
        this.enemyParty = enemyParty;
        this.turnOrder = [...playerParty, ...enemyParty].sort(() => Math.random() - 0.5);
    }

    start() {
        console.log("Combat starts!");
        let round = 1;
        while (this.playerParty.some(p => p.isAlive()) && this.enemyParty.some(e => e.isAlive())) {
            console.log(`Round ${round}:`);
            for (const character of this.turnOrder) {
                const target = character instanceof Adventurer
                    ? this.enemyParty.find(e => e.isAlive())
                    : this.playerParty.find(p => p.isAlive());
                if (target && character.isAlive()) {
                    character.attack(target);
                    character.useItem();
                }
            }
            round += 1;
        }
        const winner = this.playerParty.some(p => p.isAlive()) ? "Player Party" : "Enemy Party";
        console.log(`${winner} wins the battle!`);
        this.displayWinner(winner);
    }

    displayWinner(winner) {
        const combatLog = document.getElementById("combatLog");
        combatLog.innerHTML += `<h2>${winner} wins the battle!</h2>`;
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


const playerPartyDiv = document.getElementById("playerParty");
const enemyPartyDiv = document.getElementById("enemyParty");

playerParty.forEach(character => {
    playerPartyDiv.innerHTML += `<div class="character alive" data-name="${character.name}">
        <h3>${character.name} (${character.role})</h3>
        <p class="health">${character.health} HP</p>
    </div>`;
});

enemyParty.forEach(character => {
    enemyPartyDiv.innerHTML += `<div class="character alive" data-name="${character.name}">
        <h3>${character.name} (${character.type})</h3>
        <p class="health">${character.health} HP</p>
    </div>`;
});

const combat = new Combat(playerParty, enemyParty);
combat.start();
