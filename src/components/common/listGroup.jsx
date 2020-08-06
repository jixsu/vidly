import React from "react";

const ListGroup = (props) => {
  const { genres, selectedGenre, onClick } = props;

  return (
    <div className="list-group">
      {genres.map((genre) => (
        <a
          key={genre._id}
          href="#"
          onClick={() => onClick(genre.name)}
          className={
            genre.name === selectedGenre
              ? "list-group-item list-group-item-action active"
              : "list-group-item list-group-item-action"
          }
        >
          {genre.name}
        </a>
      ))}
    </div>
  );
};

export default ListGroup;
