import React from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { deleteCard } from "../../utils/api";

const CardList = ({ cards = [] }) => {
  const history = useHistory();
  const { url } = useRouteMatch();

  const handleDelete = async (cardId) => {
    const response = window.confirm(
      "Delete this card?\n\nYou will not be able to recover it."
    );
    if (response) {
      await deleteCard(cardId);
      history.go(0);
    }
  };

  if (cards.length > 0) {
    return cards.map((card, index) => (
      <div key={index} className="card">
        <div className="card-body">
          <div className="row d-flex justify-content-between">
            <p className="col-5">{card.front}</p>
            <p className="col-5">{card.back}</p>
          </div>
          <Link to={`${url}/cards/${card.id}/edit`}>
            <button className="btn btn-secondary m-3">
              {/* pencil icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fillRule="currentColor"
                className="bi bi-pencil"
                viewBox="0 0 16 16"
              >
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
              </svg>
              <i className="fas fa-edit"></i> Edit
            </button>
          </Link>
          <button
            onClick={() => handleDelete(card.id)}
            name="delete"
            value={card.id}
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
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
    ));
  }
  return <p>Loading...</p>;
};

export default CardList;
