import React, { Component } from "react";
import MovieTable from "./components/movieTable";
import { getMovies } from "./services/fakeMovieService";
import { getGenres } from "./services/fakeGenreService";

class App extends Component {
  state = {
    movies: getMovies(),
    genres: getGenres(),
    selectedGenre: "",
    selectedMovies: [],
    page: 3,
    pageSize: 4,
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
    let selectedMovies;
    if (selectedGenre === "All Genres") {
      selectedMovies = this.state.movies;
    } else {
      selectedMovies = this.state.movies.filter(
        (movie) => movie.genre.name === selectedGenre
      );
    }
    this.setState({ selectedMovies });
    this.setState({ page: 1 });
  };

  render() {
    return (
      <MovieTable
        genres={this.state.genres}
        selectedGenre={this.state.selectedGenre}
        onGenreClick={this.handleGenre}
        onLikeClick={this.handleLikeClick}
        onPageClick={this.handlePages}
        movies={this.state.selectedMovies}
        page={this.state.page}
        pageSize={this.state.pageSize}
        onDelete={this.handleDelete}
      />
    );
  }
}

export default App;
