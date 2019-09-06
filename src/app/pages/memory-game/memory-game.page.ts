import { Component, OnInit } from "@angular/core";
import { isNgTemplate } from "@angular/compiler";

@Component({
  selector: "app-memory-game",
  templateUrl: "./memory-game.page.html",
  styleUrls: ["./memory-game.page.scss"]
})
export class MemoryGamePage implements OnInit {
  //  public playcards = [];

  // public cards = [
  //   { id: '1', image: 'img/cards/0.png' },
  //   { id: '1', image: 'img/cards/0.png' },
  //   { id: '2', image: 'img/cards/1.png' },
  //   { id: '2', image: 'img/cards/1.png' },
  //   { id: '3', image: 'img/cards/2.png' },
  //   { id: '3', image: 'img/cards/2.png' },
  //   { id: '4', image: 'img/cards/3.png' },
  //   { id: '4', image: 'img/cards/3.png' },
  //   { id: '5', image: 'img/cards/4.png' },
  //   { id: '5', image: 'img/cards/4.png' },
  //   { id: '6', image: 'img/cards/5.png' },
  //   { id: '6', image: 'img/cards/5.png' },
  //   { id: '7', image: 'img/cards/6.png' },
  //   { id: '7', image: 'img/cards/6.png' },
  //   { id: '8', image: 'img/cards/7.png' },
  //   { id: '8', image: 'img/cards/7.png' }
  // ];

  // public backOfCards = [
  //   { id: '0', image: 'img/cards/fond.jpg' },
  //   { id: '0', image: 'img/cards/fond.jpg' },
  //   { id: '0', image: 'img/cards/fond.jpg' },
  //   { id: '0', image: 'img/cards/fond.jpg' },
  //   { id: '0', image: 'img/cards/fond.jpg' },
  //   { id: '0', image: 'img/cards/fond.jpg' },
  //   { id: '0', image: 'img/cards/fond.jpg' },
  //   { id: '0', image: 'img/cards/fond.jpg' },
  //   { id: '0', image: 'img/cards/fond.jpg' },
  //   { id: '0', image: 'img/cards/fond.jpg' },
  //   { id: '0', image: 'img/cards/fond.jpg' },
  //   { id: '0', image: 'img/cards/fond.jpg' },
  //   { id: '0', image: 'img/cards/fond.jpg' },
  //   { id: '0', image: 'img/cards/fond.jpg' },
  //   { id: '0', image: 'img/cards/fond.jpg' },
  //   { id: '0', image: 'img/cards/fond.jpg' }
  // ];

  // public returnCards = [];

  // private chosenCard;

  public cardList: Array<{
    name: string;
    currentImg: string;
    revealed: boolean;
  }> = [];

  public numberOfDistinctCards = 6;

  public numberOfCardsPerRow = 3;

  private questionMarkUrl = "/assets/img/cards/fond.png";

  private hasRevealCard = false;

  private previousCard;

  public numberOfRevealedCards = 0;
  public previousCardIndex: number;

  ngOnInit() {}

  constructor() {
    this.generateDeck();
  }

  private generateDeck() {
    //  Boucle pour generer une liste de paires de cartes
    for (let i = 0; i < this.numberOfDistinctCards; i++) {
      const imgUrl = "/assets/img/cards/" + i + ".png";
      this.cardList.push({
        name: imgUrl,
        revealed: false,
        currentImg: this.questionMarkUrl
      });
      this.cardList.push({
        name: imgUrl,
        revealed: false,
        currentImg: this.questionMarkUrl
      });
    }
    this.shuffleDeck();
    console.log(this.cardList);
  }
  // Pour mélanger les cartes
  private shuffleDeck() {
    this.cardList.forEach((item, index) => {
      // boucle avec fonction anonyme

      const newPos = Math.floor(Math.random() * this.cardList.length);
      this.cardList[index] = this.cardList[newPos];
      this.cardList[newPos] = item;
    });
  }

  private revealCard(card, index) {
    // Affichage de la carte
    card.currentImg = card.name;
    card.revealed = true;
    this.hasRevealCard = true;

    // test de la carte précédente pour determiner si on a une paire
    if (
      this.previousCard &&
      this.previousCard.name == card.name &&
      index != this.previousCardIndex
    ) {
      this.previousCard.currentImg = card.name;
      this.previousCard.revealed = true;
      this.hasRevealCard = false;

      // A chaque fois qu'on gagne on incrémente le nombre de carte révélées
      this.numberOfRevealedCards++;
    } else {
      // masquage de la carte au bout d'un délai

      setTimeout(() => {
        this.hideCard(card, index);
      }, 400);
    }
  }
  hideCard(card: any, index) {
    card.currentImg = this.questionMarkUrl;
    card.revealed = false;
    this.hasRevealCard = false;
    this.previousCard = card;
    this.previousCardIndex = index;
  }

  // on retourne la carte
  public flipCard(card, index) {
    if (!card.revealed && !this.hasRevealCard) {
      this.revealCard(card, index);
    }
  }

  public playAgain() {
    this.numberOfRevealedCards = 0;
    this.hasRevealCard = false; //ne garde pas en memoire qu'on a révélé des cartes
    this.previousCardIndex = null;
    this.previousCardIndex = null;
    // on réinitialise le tableau a vide et on régénère le jeu

    this.cardList = [];
    this.generateDeck();
  }
}
