const container = document.querySelector(".gif");
const button = document.querySelector("button");
const croupier = document.querySelector('#croupier');
const bg = document.querySelectorAll('.bg');

class Cards {
  constructor(cont, btn, croupier, bgc) {
    this.container = cont;
    this.button = btn;
    this.croupier = croupier
    this.background = bgc
    this.images = [
        "./img/1.jpg",
        "./img/2.png",
        "./img/3.jpg",
        "./img/4.jpg",
        "./img/5.jpeg",
        "./img/6.jpg"
    ];
    this.index = 0;
    this.timeout = 1000;
    this.init();
  }

  get getCard() {
    const generatedNumber = this.generateRandomNums().next().value;
    return { image: this.images[generatedNumber], number: generatedNumber };
  }

  *generateRandomNums() {
    yield Math.floor(Math.random() * this.images.length);
  }

  loadCardImage() {
    this.reset();

    for (let i = 0; i < 3; i++) {
      const cardContainer = document.createElement("div");
      cardContainer.classList.add("div-container");

      const card = document.createElement("img");
      card.src = "./img/funy_cat.gif";

      cardContainer.appendChild(card);
      this.container.appendChild(cardContainer);
    }

    this.revealCards();
  }

  revealCards() {
    const cards = this.container.querySelectorAll("img");

    cards.forEach((card, index) => {
      setTimeout(() => {
        const { image, number } = this.getCard;
        card.setAttribute("data-number", number);
        card.src = image;
        index === 2 && this.checkCards(cards);
      }, this.timeout * (index + 1));
    });
  }

  checkCards(cards) {
    if (
      cards[0].dataset.number == cards[1].dataset.number &&
      cards[0].dataset.number == cards[2].dataset.number
    ) {
      this.background.forEach(e => {
        e.style.display = 'block';
      });
      this.croupier.src = 'img/saul.png';
    }
  }

  reset() {
    this.index = 0;
    this.container.textContent = "";
  }

  init() {
    this.button.addEventListener("click", () => {
      this.loadCardImage();
    });
  }
}

const cards = new Cards(container, button, croupier, bg);