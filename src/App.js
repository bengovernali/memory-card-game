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
    let newDeck = this.state.deck.map(card => {
      return {...card}
    });
    
    if (newDeck[cardIndex].isFlipped) return;
    newDeck[cardIndex].isFlipped = true;
    
    let newPickedCards = this.state.pickedCards.concat(cardIndex);

    if (newPickedCards.length === 2) {
      let card1Index = newPickedCards[0];
      let card2Index = newPickedCards[1];
      let card1 = newDeck[card1Index];
      let card2 = newDeck[card2Index];
      if ( card1.symbol !== card2.symbol ) {
        // unflip both cards
        setTimeout(()=>{
          this.unflipCards(card1Index, card2Index);
        }, 1000 );
      } 
      newPickedCards = [];
    }

    this.setState({
      deck: newDeck,
      pickedCards: newPickedCards
    });
  }

  unflipCards (card1Index, card2Index) {
    let newDeck = this.state.deck.map((card) => {
      return {...card}
    });

    newDeck[card1Index].isFlipped = false;
    newDeck[card2Index].isFlipped = false;

    this.setState({
      deck: newDeck
    })
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
