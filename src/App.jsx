import React, { Component } from "react";
import { Movies } from "./components/movieTable";
import { getMovies } from "./services/fakeMovieService";
import { getGenres, genres } from "./services/fakeGenreService";
import Pagination from "./components/common/pagination";
import ListGroup from "./components/common/listGroup";

class App extends Component {
  state = {
    movies: getMovies(),
    genres: getGenres(),
    activeGenre: "",
    activeMovies: [],
    page: 1,
    pageSize: 4,
  };

  constructor() {
    super();
    this.state.genres.unshift({ _id: "all", name: "All Genres" });
    this.state.activeMovies = this.state.movies;
    this.state.activeGenre = "All Genres";
  }

  handleLikeClick = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !this.state.movies[index].liked;
    this.setState({ movies });
  };

  handleHeader = () => {
    const { length } = this.state.activeMovies;
    return length !== 0 ? (
      <p>Showing {length} movies in the database</p>
    ) : (
      <p>There are no movies in the database.</p>
    );
  };

  handleDelete = (movie) => {
    const activeMovies = this.state.activeMovies.filter(
      (mov) => mov._id !== movie._id
    );
    const movies = this.state.movies.filter((mov) => mov._id !== movie._id);
    this.setState({ activeMovies, movies });
  };

  handlePage = (page) => {
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

  handleGenre = (activeGenre) => {
    this.setState({ activeGenre });
    let activeMovies;
    if (activeGenre === "All Genres") {
      activeMovies = this.state.movies;
    } else {
      activeMovies = this.state.movies.filter(
        (movie) => movie.genre.name === activeGenre
      );
    }
    this.setState({ activeMovies });
    this.setState({ page: 1 });
  };

  render() {
    return (
      <div className="row">
        <div className="col-2 m-2">
          <ListGroup
            genres={this.state.genres}
            activeGenre={this.state.activeGenre}
            onClick={this.handleGenre}
          />
        </div>
        <div className="col m-2">
          {this.handleHeader()}
          <Movies
            onLikeClick={this.handleLikeClick}
            movies={this.state.activeMovies}
            page={this.state.page}
            pageSize={this.state.pageSize}
            onDelete={this.handleDelete}
          />
          <Pagination
            onClick={this.handlePage}
            page={this.state.page}
            movies={this.state.activeMovies}
            pageSize={this.state.pageSize}
          />
        </div>
      </div>
    );
  }
}

export default App;
