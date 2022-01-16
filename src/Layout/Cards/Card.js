import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Card({ cards }) {
  //useState to change cardId
  const [cardId, setCardId] = useState(1);
  //useState to change from front to back of card
  const [frontSide, setFrontSide] = useState(true);
  //useHistory to revert page back to prior screen once
  //cards have been flipped through
  const history = useHistory();

  //handles front and back sides of card
  function flipHandler() {
    setFrontSide(() => !frontSide);
  }

  //handles going to the next card and flipping the next card
  function nextHandler() {
    setCardId(cardId + 1);
    setFrontSide(!frontSide);
    //if cardId reaches last card, pop up window will ask
    //to restart cards
    if (cardId >= cards.length) {
      if (window.confirm("Restart Cards?")) {
        //if restarted, will go back to first card
        history.go(0);
        //if not restarted, goes back to home
      } else {
        history.push("/");
      }
    }
  }

  //wait for cards to fetch from api
  if (cards) {
    //if more than 2 cards, will display cards in deck
    if (cards.length > 2) {
      return (
        //bootstrap card display
        <div className="card w-75 mb-4">
          <div className="card-body">
            <div className="row px-3">
              {/* title */}
              <h6>
                Card {cardId} of {cards.length}
              </h6>
            </div>
            {/* front side of card text */}
            <p className="card-text">
              {frontSide ? cards[cardId - 1].front : cards[cardId - 1].back}
            </p>
            {/*flip button*/}
            <div className="row px-3">
              <button onClick={flipHandler} className="btn btn-secondary m-2 ">
                Flip
              </button>
              {/* next button shows if backside of card shown */}
              {!frontSide ? (
                <button onClick={nextHandler} className="btn btn-primary">
                  Next
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      );
      //if less than 3 cards in deck, will not display cards in deck
    } else {
      return (
        <div>
          <h2>Not Enough Cards</h2>
          <p>
            You need at least 3 cards to study. There are {cards.length} cards
            in this deck.
          </p>
        </div>
      );
    }
    //loading screen if deck isn't fetched
  } else {
    return <h5>Loading...</h5>;
  }
}

export default Card;
