import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../../utils/api";
import Card from "../Cards/Card";

function Study() {
  // established variable with useParams to plug deckId into url for study page
  const { deckId } = useParams();
  // create variable for useState get deck to show up on study page
  const [deck, setDeck] = useState([]);

  //create useEffect to call readDeck funct.
  //in order to read current deck of deck id
  useEffect(() => {
    async function studyDeck() {
      try {
        const currentDeck = await readDeck(deckId);
        setDeck(currentDeck);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      }
    }
    studyDeck();
  }, [deckId]);

  return (
    <div className="col-9 mx-auto">
      {/* breadcrumb navagation on page */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            {/* link to homepage */}
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            {/* link to deck name that user will be studying */}
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          {/* active study page */}
          <li className="breadcrumb-item active">Study</li>
        </ol>
      </nav>
      {/* title of page: study and name of deck */}
      <h1>Study: {deck.name}</h1>
      {/* calling card component to show current card on study page */}
      <Card cards={deck.cards} deck={deck} />
    </div>
  );
}

export default Study;
