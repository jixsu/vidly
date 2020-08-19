import React, { Component } from "react";
import MovieTable from "./movieTable";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import SearchBar from "./common/searchBar";
import _ from "lodash";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    selectedGenre: "",
    searchQuery: "",
    page: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const genres = await getGenres();
    genres.unshift({ _id: "all", name: "All Genres" });

    const movies = await getMovies();
    this.setState({ genres, movies });
  }

  handleLikeClick = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !this.state.movies[index].liked;
    this.setState({ movies });
  };

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = this.state.movies.filter((mov) => mov._id !== movie._id);

    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      this.setState({ movies: originalMovies });
      toast.error("movie has already been deleted");
    }
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
    if (searchQuery === "") return null;
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

    const { user } = this.props;

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
          {user && (
            <Link to="/movies/new" className="btn btn-primary">
              New Movie
            </Link>
          )}
          {this.handleHeader(moviesAfterFilter)}
          <SearchBar value={searchQuery} onChange={this.handleSearch} />
          <MovieTable
            onLikeClick={this.handleLikeClick}
            movies={moviesByPage}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
            user={user}
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
