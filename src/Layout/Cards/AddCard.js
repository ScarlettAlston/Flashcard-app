import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api";
import CardForm from "./CardForm";

const AddCard = () => {
  //create useParams url knows correct deckId to match
  const { deckId } = useParams();
  //create useState to get correct deck to show
  const [deck, setDeck] = useState([]);
  //create useHistory to revert back to previous page
  const history = useHistory();
  //create initialFormState and useState to update form Data
  const initialFormState = {
    id: "",
    front: "",
    back: "",
    deckId: "",
  };
  const [formData, setFormData] = useState(initialFormState);

  //getting Deck from api
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

  //create handleSubmit so deckId and formData will update and page will know to go
  //back to previous page with history.go once form is complete
  async function handleSubmit(event) {
    event.preventDefault();
    await createCard(deckId, formData);
    setFormData(initialFormState);
    history.go(0);
  }
  //once submit is clicked, change will be made to form
  const handleChange = ({ target }) =>
    setFormData({ ...formData, [target.name]: target.value });

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          {/* breadcrumb link for home*/}

          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>

          {/* breadcrumb link for deck name */}

          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>

          {/* breadcrumb active item for Add Card */}

          <li className="breadcrumb-item active">Add Card</li>
        </ol>
      </nav>
      {/* Title of page */}
      <h1 className="my-4 text-center">{deck.name}: Add Card</h1>
      {/* importing CardForm component and passing in props  */}
      <CardForm
        deckId={deckId}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        newCardData={formData}
      />
    </div>
  );
};

export default AddCard;
