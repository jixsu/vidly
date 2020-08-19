import React, { Component } from "react";
import Table from "./common/table/table";
import Like from "./common/like";
import { Link } from "react-router-dom";

export default class MovieTable extends Component {
  column = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <React.Fragment>
          <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
        </React.Fragment>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      content: (movie) => (
        <Like onClick={this.props.onLikeClick} item={movie} />
      ),
      key: "like",
    },
    {
      content: (movie) =>
        this.props.user &&
        this.props.user.isAdmin && (
          <button
            className="btn btn-primary btn-sm m-2"
            onClick={() => this.props.onDelete(movie)}
          >
            Delete
          </button>
        ),
      key: "delete",
    },
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        movies={movies}
        column={this.column}
        onSort={onSort}
        sortColumn={sortColumn}
      />
    );
  }
}
