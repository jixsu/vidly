import React, { Component } from "react";
import MovieTable from "./movieTable";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import SearchBar from "./common/searchBar";
import _ from "lodash";
import { Link } from "react-router-dom";

class Movies extends Component {
  state = {
    movies: getMovies(),
    genres: getGenres(),
    selectedGenre: "",
    searchQuery: "",
    page: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" },
  };

  constructor() {
    super();

    this.state.genres.unshift({ _id: "all", name: "All Genres" });
    // this.state.selectedGenre = "All Genres";
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
    } else if (page === "Prev") {
      const newPage = this.state.page - 1;
      this.setState({ page: newPage });
    } else if (page === "Next") {
      const newPage = this.state.page + 1;
      this.setState({ page: newPage });
    }
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleGenre = (selectedGenre) => {
    this.setState({ selectedGenre, page: 1, searchQuery: "" });
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
      //for some reason, (genre === "All Genres" || null) does not return true
      return movies;
    } else if (!genre) {
      return movies;
    } else {
      return movies.filter((movie) => movie.genre.name === genre);
    }
  };

  filterBySearch = (searchQuery, movies) => {
    return movies.filter((movie) =>
      movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  };

  filterSearchOrGenre = (moviesBySearch, moviesByGenre) => {
    return moviesBySearch ? moviesBySearch : moviesByGenre;
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
      searchQuery,
    } = this.state;

    const moviesByGenre = this.filterByGenre(selectedGenre, movies);

    const moviesBySearch = this.filterBySearch(searchQuery, movies);

    const moviesAfterFilter = this.filterSearchOrGenre(
      moviesBySearch,
      moviesByGenre
    );

    const moviesByPath = this.filterByPath(sortColumn, moviesAfterFilter);
    const moviesByPage = this.filterByPage(page, pageSize, moviesByPath);

    return (
      <div className="row">
        <div className="col-2 m-2">
          <ListGroup
            filters={genres}
            selectedFilter={selectedGenre}
            onClick={this.handleGenre}
          />
        </div>
        <div className="col m-2">
          <Link to="/movies/new" className="btn btn-primary">
            New Movie
          </Link>
          {this.handleHeader(moviesAfterFilter)}
          <SearchBar value={searchQuery} onChange={this.handleSearch} />
          <MovieTable
            onLikeClick={this.handleLikeClick}
            movies={moviesByPage}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            onClick={this.handlePages}
            currentPage={page}
            data={moviesAfterFilter}
            pageSize={pageSize}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
