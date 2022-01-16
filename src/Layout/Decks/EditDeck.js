import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api";

const EditDeck = () => {
  // useParams established to plug in which deckId will
  // be edited into url
    const { deckId } = useParams();
  //useHistory established to have screen go back to 
  //certain page once done editing or cancel editing
    const history = useHistory();
  //initialDeckState used for inital state of editing form
    const initialDeckState = {
      name: "",
      description: "",
    };
    //useState established to have editDeck show up on page with initial form state
        const [editDeck, setEditDeck] = useState(initialDeckState);

        //useEffect established to call readDeck function from api
    useEffect(() => {
      async function loadDeck() {
        try {
          const loadedDeck = await readDeck(deckId);
          setEditDeck(loadedDeck);
        } catch (error) {
          if (error.name !== "AbortError") {
            console.error(error);
          }
        }
      }
      loadDeck();
    }, [deckId]);

//update deck once submit is clicked
  async function handleSubmit(event) {
    event.preventDefault();
    const response = await updateDeck(editDeck);
    history.push(`/decks/${response.id}`);
  }

  const handleChange = (event) =>
    setEditDeck({ ...editDeck, [event.target.name]: event.target.value });

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{editDeck.name}</Link>
          </li>

          <li className="breadcrumb-item active">Edit Deck</li>
        </ol>
      </nav>
      <form>
        <h1 className="my-4 text-center">Edit Deck</h1>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            name="name"
            id="name"
            className="form-control form-control-lg"
            type="text"
            placeholder="Deck Name"
            onChange={handleChange}
            value={editDeck.name}
            required
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="5"
            placeholder="Brief description of the deck"
            onChange={handleChange}
            value={editDeck.description}
            required
          ></textarea>
        </div>
        <Link to="/" className="mr-2">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => history.push(`/decks/${deckId}`)}
          >
            Cancel
          </button>
        </Link>
        <button
          type="submit"
          className="btn btn-primary"
          onSubmit={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div> 
  )
}

export default EditDeck;
