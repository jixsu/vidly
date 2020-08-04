import React, { Component } from "react";
import { Movie } from "./movie";

export class Movies extends Component {
  filterMovies = (movies, page, pageSize) => {
    const divisions = Math.ceil(movies.length / pageSize);
    let filteredMovies;
    if (divisions === page) {
      filteredMovies = movies.slice((page - 1) * pageSize, movies.length);
    } else {
      filteredMovies = movies.slice((page - 1) * pageSize, page * pageSize);
    }
    return filteredMovies.map((movie) => (
      <Movie
        onClick={this.props.onClick}
        movie={movie}
        onDelete={this.props.onDelete}
        key={movie._id}
      />
    ));
  };

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Stock</th>
            <th>Rate</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.filterMovies(
            this.props.movies,
            this.props.page,
            this.props.pageSize
          )}
        </tbody>
      </table>
    );
  }
}
