import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readCard, updateCard, readDeck } from "../../utils/api";
import CardForm from "./CardForm";

const EditCard = () => {
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const initialCardState = {
    id: "",
    front: "",
    back: "",
    deckId: "",
  };

  const [deck, setDeck] = useState({});
  const [editCard, setEditCard] = useState(initialCardState);

  useEffect(() => {
    async function loadDeck() {
      try {
        const loadedDeck = await readDeck(deckId);
        setDeck(loadedDeck);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      }
    }
    loadDeck();
  }, [deckId]);

  useEffect(() => {
    async function loadCard() {
      try {
        const loadedCard = await readCard(cardId);
        setEditCard(loadedCard);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      }
    }
    loadCard();
  }, [cardId]);

  const handleChange = (event) =>
    setEditCard({ ...editCard, [event.target.name]: event.target.value });

  async function handleSubmit(event) {
    event.preventDefault();
    await updateCard(editCard);
    setEditCard(initialCardState);
    history.push(`/decks/${deckId}`);
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/"}> Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>Edit {deck.name}</Link>
          </li>

          <li className="breadcrumb-item active">Edit Card {cardId}</li>
        </ol>
      </nav>
      <h1 className="text-center">Edit Card</h1>
      <CardForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        newCardData={editCard}
        deckId={deckId}
      />
    </div>
  );
};

export default EditCard;
