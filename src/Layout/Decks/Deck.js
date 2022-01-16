import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, deleteDeck } from "../../utils/api";
import CardList from "../Cards/CardList";

const Deck = () => {
  const [deck, setDeck] = useState([]);
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const findDeck = async () => {
      try {
        const currentDeck = await readDeck(deckId);
        setDeck(() => currentDeck);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      }
    };
    findDeck();
  }, [deckId]);

  const handleDelete = async () => {
    //delete function pops confirmation window and returns to previous page (or just returns w no change)
    if (
      window.confirm(
        `Delete this Deck?${(<p />)}You will not be able to recover it.`
      )
    ) {
      await deleteDeck(deckId);
      history.go(0);
    } else {
      history.go(0);
    }
  };
  console.log(deck);

  if (deck.id) {
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to={"/"}> Home</Link>
            </li>

            <li className="breadcrumb-item active">{deck.name}</li>
          </ol>
        </nav>

        <div>
          <h1>{deck.name}</h1>
          <div>{deck.description}</div>
        </div>

        <div className="row px-3">
          {/* Button to the individual Deck page */}
          <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary ml-3">
            {/* eye icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fillRule="currentColor"
              className="bi bi-pencil"
              viewBox="0 0 16 16"
            >
              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
            </svg>{" "}
            Edit
          </Link>
          {/* Button to the Study page where you will review cards */}
          <Link to={`/decks/${deckId}/study`} className="btn btn-primary ml-3">
            {/* Journal icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fillRule="currentColor"
              className="bi bi-journal-bookmark-fill m-2"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8V1z"
              />
              <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
              <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
            </svg>{" "}
            Study
          </Link>
          {/* Button to the Study page where you will review cards */}
          <Link
            to={`/decks/${deckId}/cards/new`}
            className="btn btn-primary ml-3"
          >
            {/* Journal icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fillRule="currentColor"
              className="bi bi-plus"
              viewBox="0 0 16 16"
            >
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>{" "}
            Add Cards
          </Link>
          {/* Delete button managed by handleDelete function */}
          <button
            onClick={handleDelete}
            name="delete"
            value={deckId}
            className="btn btn-danger ml-auto"
          >
            {/* trash icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fillRule="currentColor"
              className="bi bi-trash-fill"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
            </svg>
          </button>
        </div>
        <h1>Cards</h1>
        <CardList cards={deck.cards} />
      </div>
    );
  }
  return <p>Loading...</p>;
};

export default Deck;
