import React from "react";
import { Link, useHistory } from "react-router-dom";

const CardForm = ({ handleSubmit, handleChange, newCardData, deckId }) => {
  const history = useHistory();
  return (
    <div>
      {/* handle submit for card form */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            onChange={handleChange}
            value={newCardData.front}
            type="text"
            name="front"
            placeholder="Deck Name"
            style={{ width: "100%" }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            onChange={handleChange}
            value={newCardData.back}
            name="back"
            placeholder="Brief description of the Deck"
            style={{ width: "100%" }}
            maxLength="200"
          />
        </div>
        <Link to={`/decks/${deckId}`} className="mr-2">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => history.push(`/decks/${deckId}`)}
          >
            Done
          </button>
        </Link>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
};

export default CardForm;
