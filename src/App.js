import React, { Component } from 'react';
import './App.css';
import MemoryCard from './MemoryCard.js'

function generateDeck() {
  const symbols = ['∆', 'ß', '£', '§', '•', '$', '+', 'ø'];
  let deck = [];
  for (let i = 0; i < 16; i++) {
    let newCard = new MemoryCard();
    newCard.isFlipped = false;
    newCard.symbol = symbols[i%8];
    deck.push(newCard);
  }
  shuffle(deck);
  return deck;
}

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
  return a;
}

class App extends Component {
  state = {
    deck: generateDeck(),
    pickedCards: []
  }
  
  pickCard(cardIndex) {
    if (this.state.deck[cardIndex].isFlipped) {
      return
    }
    let cardToFlip = {...this.state.deck[cardIndex] };
    
    cardToFlip.isFlipped = true;
    
    let newPickedCards = this.state.pickedCards.concat(cardIndex);
    let newDeck = this.state.deck.map((card, index) => {
      if (cardIndex === index) {
        return cardToFlip
      }
      return card;
    });

    if (newPickedCards.length === 2) {
      let card1Index = newPickedCards[0];
      let card2Index = newPickedCards[1];
      if (newDeck[card1Index].symbol !== newDeck[card2Index].symbol) {
        this.unflipCards(card1Index, card2Index);
      }
      newPickedCards = [];
    }

    this.setState({deck: newDeck, pickedCards: newPickedCards});
  }

  unflipCards (card1Index, card2Index) {
    const card1 = {...this.state.deck[card1Index]};
    const card2 = {...this.state.deck[card2Index]};
    card1.isFlipped = false;
    card2.isFlipped = false;
    
    let newDeck = this.state.deck.map((card, index) => {
      if (card1Index === index) {
        return card1;
      } else if (card2Index === index) {
        return card2;
      } else {
        return card;
      }
    });
    return newDeck;
  }

  render() {
    let cardsJSX = this.state.deck.map((card, index) => {
      return <MemoryCard symbol={card.symbol} isFlipped={card.isFlipped} key={index} pickCard={this.pickCard.bind(this, index)} />
    });
    return (
      <div className="App">
        <h1>{this.state.title}</h1>
        <header className="App-header">
          <div className="title">Memory Game</div>
          <div className="subtitle">Match cards to win</div>
        </header>
        <div>
          {cardsJSX.slice(0,4)}
        </div>
        <div>
          {cardsJSX.slice(4,8)}
        </div>
        <div>
          {cardsJSX.slice(8,12)}
        </div>
        <div>
          {cardsJSX.slice(12,16)}
        </div>
      </div>
    );
  }
}

export default App;
