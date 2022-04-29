/* Player class for BlackJack */
class Player {
	constructor() {
		this.cards = [];
		this.sum = 0;
		this.#getInitialCards();
	}

	// private method to get initial cards
	#getInitialCards() {
		for (let i = 0; i < 2; i++) {
			this.cards.push(generateCard());
			this.sum += this.cards[i];
		}
	}

	// returns true if sum of cards is less than 21
	isAlive() {
		return this.sum < 21;
	}

	// returns true if the sum of cards is equal to 21
	hasBlackJack() {
		return this.sum === 21;
	}

	// adds another card to player's set and update sum
	getAnotherCard() {
		this.cards.push(generateCard());
		this.sum += this.cards[this.cards.length - 1];
	}

	// prints card values from player's set
	printCards() {
		message = '';
		for (let card of this.cards) {
			message += " " + card;
		}
		return message;
	}

}

/* Game class for BlackJack game*/
class Game {
	constructor() {
		this.player = new Player();
		this.message = "";
		this.updateGame();
	}

	// updates game message based on player status
	updateGame() {
		if (this.player.isAlive()) {
			this.message = "Do you want to draw another card?";
		} else if (this.player.hasBlackJack()) {
			this.message = "Wohoo! You've got BlackJack!";
			newCard.disabled = true; // disable new card generation
		} else {
			this.message = "You're out of the game!";
			newCard.disabled = true;
		}
	}
}


/* UI class for the BlackJack game*/
class UI {
	constructor() {
		this.game;
		this.messageEl = document.getElementById('message');
		this.cardsEl = document.getElementById('cards');
		this.sumEl = document.getElementById('sum');
	}

	// updates message, card values and sum of cards
	updateMessages() {
		this.messageEl.textContent = this.game.message;
		this.cardsEl.textContent = this.game.player.printCards();
		this.sumEl.textContent = ` ${this.game.player.sum}`;
	}

	getNewCard() {
		this.game.player.getAnotherCard();
		this.game.updateGame();
		this.updateMessages();
	}

	playGame() {
		this.game = new Game();
		this.updateMessages();
	}
}

/* Main body of the program. Adds event handlers to buttons
for starting a new game and adding more cards*/

// new UI
let ui;
// start the game by clicking 'START GAME' button
const startButton = document.getElementById('start-game');
startButton.addEventListener('click', playGame);

// button handler for adding a new card
const newCard = document.querySelector('#new-card');
newCard.addEventListener('click', playAnotherCard);

// helper function to start the game and add new card
function playGame() {
	ui = new UI();
	ui.playGame();
}

function playAnotherCard() {
	ui.getNewCard();
}


// helper functions for generating random cards

function generateCard() {
	return randomInt(2, 11);
}

// produces a random integer in range [m, n]
function randomInt(m, n) {
	return Math.floor(Math.random() * (n - m + 1)) + m;
}

