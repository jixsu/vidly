import React, { Component } from "react";
import Table from "./common/table/table";
import Like from "./common/like";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";

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

  handleHeader = () => {
    const { length } = this.props.movies;
    return length !== 0 ? (
      <p>Showing {length} movies in the database</p>
    ) : (
      <p>There are no movies in the database.</p>
    );
  };

  render() {
    const { page, pageSize, movies } = this.props;
    return (
      <div className="row">
        <div className="col-2 m-2">
          <ListGroup
            genres={this.props.genres}
            selectedGenre={this.props.selectedGenre}
            onClick={this.props.onGenreClick}
          />
        </div>
        <div className="col m-2">
          {this.handleHeader()}
          <Table
            page={page}
            pageSize={pageSize}
            movies={movies}
            column={this.column}
          />
          <Pagination
            onClick={this.props.onPageClick}
            page={this.props.page}
            movies={this.props.movies}
            pageSize={this.props.pageSize}
          />
        </div>
      </div>
    );
  }
}
