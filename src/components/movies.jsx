import React, { Component } from "react";
import MovieTable from "./movieTable";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: getMovies(),
    genres: getGenres(),
    selectedGenre: "",
    page: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" },
  };

  constructor() {
    super();

    this.state.genres.unshift({ _id: "all", name: "All Genres" });
    this.state.selectedMovies = this.state.movies;
    this.state.selectedGenre = "All Genres";
  }

  handleLikeClick = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !this.state.movies[index].liked;
    this.setState({ movies });
  };

  handleDelete = (movie) => {
    const selectedMovies = this.state.selectedMovies.filter(
      (mov) => mov._id !== movie._id
    );
    const movies = this.state.movies.filter((mov) => mov._id !== movie._id);

    this.setState({ selectedMovies, movies });
  };

  handlePages = (page) => {
    if (typeof page == "number") {
      this.setState({ page });
    } else if (page === "-") {
      const newPage = this.state.page - 1;
      this.setState({ page: newPage });
    } else if (page === "+") {
      const newPage = this.state.page + 1;
      this.setState({ page: newPage });
    }
  };

  handleGenre = (selectedGenre) => {
    this.setState({ selectedGenre });

    this.setState({ page: 1 });
  };

  handleSort = (path) => {
    const { sortColumn } = this.state;
    let newOrder;
    if (path === sortColumn.path) {
      sortColumn.order === "asc" ? (newOrder = "desc") : (newOrder = "asc");
    } else {
      newOrder = "asc";
    }

    this.setState({ sortColumn: { path, order: newOrder } });
  };

  handleHeader = (movies) => {
    const { length } = movies;
    return length !== 0 ? (
      <p>Showing {length} movies in the database</p>
    ) : (
      <p>There are no movies in the database.</p>
    );
  };

  filterByGenre = (genre, movies) => {
    if (genre === "All Genres") {
      return movies;
    } else {
      return movies.filter((movie) => movie.genre.name === genre);
    }
  };

  filterByPath = (column, movies) => {
    return _.orderBy(movies, [column.path], [column.order]);
  };

  filterByPage = (page, pageSize, movies) => {
    return movies.slice(
      (page - 1) * pageSize,
      page * pageSize || movies.length
    );
  };

  render() {
    const {
      movies,
      selectedGenre,
      page,
      pageSize,
      genres,
      sortColumn,
    } = this.state;

    const moviesByGenre = this.filterByGenre(selectedGenre, movies);
    const moviesByPath = this.filterByPath(sortColumn, moviesByGenre);
    const moviesByPage = this.filterByPage(page, pageSize, moviesByPath);

    return (
      <div className="row">
        <div className="col-2 m-2">
          <ListGroup
            genres={genres}
            selectedGenre={selectedGenre}
            onClick={this.handleGenre}
          />
        </div>
        <div className="col m-2">
          {this.handleHeader(moviesByGenre)}
          <MovieTable
            onLikeClick={this.handleLikeClick}
            movies={moviesByPage}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            onClick={this.handlePages}
            page={page}
            movies={moviesByGenre}
            pageSize={pageSize}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
