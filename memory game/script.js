const cardImages = [
    "assets/images/card1.png",
    "assets/images/card2.png",
    // ... add more card image paths
];

const cards = [];
const matchedCards = [];
let flippedCards = [];
let numCardFlips = 0;

function createGameBoard() {
    const gameBoard = document.getElementById("game-board");

    for (let i = 0; i < cardImages.length; i++) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.image = cardImages[i];
        card.addEventListener("click", flipCard);
        cards.push(card);
        gameBoard.appendChild(card);
    }

    shuffleCards();
}

// Shuffle card positions
function shuffleCards() {
    cards.forEach(card => {
        const randomIndex = Math.floor(Math.random() * cards.length);
        cards[randomIndex].parentNode.insertBefore(card, cards[randomIndex]);
    });
}

function flipCard() {
    if (this.classList.contains("matched")) {
        return;
    }

    this.classList.add("flipped");
    flippedCards.push(this);
    numCardFlips++;

    if (numCardFlips === 2) {
        checkForMatch();
    }
}

function checkForMatch() {
    if (flippedCards[0].dataset.image === flippedCards[1].dataset.image) {
        matchedCards.push(...flippedCards);
        flippedCards.forEach(card => card.classList.add("matched"));
    } else {
        setTimeout(() => {
            flippedCards.forEach(card => card.classList.remove("flipped"));
            flippedCards = [];
            numCardFlips = 0;
        }, 1000);
    }

    if (matchedCards.length === cards.length) {
        alert("You win!");
    }
}

createGameBoard();
