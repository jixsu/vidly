import React from "react";

const ListGroup = (props) => {
  const { filters, selectedFilter, onClick } = props;

  return (
    <div className="list-group">
      {filters.map((filter) => (
        <a
          key={filter._id}
          href="#"
          onClick={() => onClick(filter.name)}
          className={
            filter.name === selectedFilter
              ? "list-group-item list-group-item-action active"
              : "list-group-item list-group-item-action"
          }
        >
          {filter.name}
        </a>
      ))}
    </div>
  );
};

export default ListGroup;
