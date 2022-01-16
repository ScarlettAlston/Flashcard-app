import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listDecks } from "../utils/api";
import DeckList from "./Decks/DeckList";

function Home() {
  //create use state to have decks upload to page
  const [decks, setDecks] = useState([]);

  //created use effect to call listDecks api
  useEffect(() => {
    async function getDeck() {
      try {
        const deckFromApi = await listDecks();
        setDecks(deckFromApi);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      }
    }
    getDeck();
  }, []);

  return (
    <div>
      <div className="row mx-auto">
        {/* link to create new deck */}
        <Link to="/decks/new" className="btn btn-secondary mb-3">
          {/* plus circle icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fillRule="currentColor"
            className="bi bi-plus-circle m-2"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          Create Deck
        </Link>
      </div>
      {/* map out decks to show decklist on homepage */}
      <div className="row w-100 mx-auto">
        {decks.map((deck) => (
          <DeckList deck={deck} key={deck.id} />
        ))}
      </div>
    </div>
  );
}

export default Home;
