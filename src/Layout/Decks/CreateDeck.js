import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api";

const CreateDeck = () => {
  const [newDeck, setNewDeck] = useState({ name: "", description: "" });
  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await createDeck(newDeck);
    history.push(`/decks/${response.id}`);
  }

  const handleChange = (event) =>
    setNewDeck({ ...newDeck, [event.target.name]: event.target.value });

  return (
    <div className="col-9 mx-auto">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item" aria-current="page">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>

      <div className="container">
        <div className="row">
          <h1>Create Deck</h1>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <br />
          <input
            name="name"
            type="text"
            placeholder="Deck Name"
            value={newDeck.name}
            onChange={handleChange}
            style={{ width: "100%" }}
            required
          />
          <div className="row"></div>
          <br />
          <label htmlFor="description">Description</label>
          <br />
          <textarea
            onChange={handleChange}
            name="description"
            placeholder="Brief description of the Deck"
            style={{ width: "100%" }}
            maxLength="200"
          />
        </div>
        <br />
        <Link to="/" className="btn btn-secondary mr-3">
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateDeck;
