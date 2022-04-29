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

	getAnotherCard() {
		this.cards.push(generateCard());
		this.sum += this.cards[this.cards.length - 1];
	}

	printCards() {
		message = '';
		for (let card of this.cards) {
			message += " " + card;
		}
		return message;
	}

}

class Game {
	constructor() {
		this.player = new Player();
		this.message = "";
		this.updateGame();
	}

	updateGame() {
		if (this.player.isAlive()) {
			this.message = "Do you want to draw another card?";
		} else if (this.player.hasBlackJack()) {
			this.message = "Wohoo! You've got BlackJack!";
			newCard.disabled = true;
		} else {
			this.message = "You're out of the game!";
			newCard.disabled = true;
		}
	}
}

// UI

class UI {
	constructor() {
		this.game;
		this.messageEl = document.getElementById('message');
		this.cardsEl = document.getElementById('cards');
		this.sumEl = document.getElementById('sum');
	}

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

// new UI
let ui;
const startButton = document.getElementById('start-game');
startButton.addEventListener('click', playGame);
const newCard = document.querySelector('#new-card');
newCard.addEventListener('click', playAnotherCard);

function playGame() {
	ui = new UI();
	ui.playGame();
}

function playAnotherCard() {
	ui.getNewCard();
}


// card helper functions

function generateCard() {
	return randomInt(2, 11);
}

// produces a random integer in range [m, n]
function randomInt(m, n) {
	return Math.floor(Math.random() * (n - m + 1)) + m;
}

