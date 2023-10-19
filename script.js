const container = document.querySelector(".gif");
const button = document.querySelector("button");

class Cards {
  constructor(cont, btn) {
    this.container = cont;
    this.button = btn;
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
    console.group("numbers");
    console.log(cards);
    console.log(cards[0], cards[0].dataset.number);
    console.log(cards[1], cards[1].dataset.number);
    console.log(cards[2], cards[2].dataset.number);
    console.groupEnd();
    if (
      cards[0].dataset.number == cards[1].dataset.number &&
      cards[0].dataset.number == cards[2].dataset.number
    ) {
      const bg = document.querySelectorAll('.bg')
      bg.forEach(element => {
        element.style.display = 'block'
      })
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

const cards = new Cards(container, button);