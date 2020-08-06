import React, { Component } from "react";
import { Movie } from "./movie";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";
import Like from "./common/like";

export default class MovieTable extends Component {
  column = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      content: (movie) => (
        <Like onClick={this.props.onLikeClick} movie={movie} />
      ),
      key: "like",
    },
    {
      content: (movie) => (
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
    const { movies } = this.props;
    return (
      <table className="table">
        <TableHeader column={this.column} />
        <TableBody column={this.column} data={movies} />
        {/* <tbody>
          {this.filterMovies(
            this.props.movies,
            this.props.page,
            this.props.pageSize
          )}
        </tbody> */}
      </table>
    );
  }
}
