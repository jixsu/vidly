import React, { Component } from "react";
import MovieTable from "./components/movieTable";
import { getMovies } from "./services/fakeMovieService";
import { getGenres } from "./services/fakeGenreService";
import Pagination from "./components/common/pagination";
import ListGroup from "./components/common/listGroup";

class App extends Component {
  state = {
    movies: getMovies(),
    genres: getGenres(),
    selectedGenre: "",
    selectedMovies: [],
    paginatedMovies: [],
    page: 1,
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

  handleHeader = () => {
    const { length } = this.state.selectedMovies;
    return length !== 0 ? (
      <p>Showing {length} movies in the database</p>
    ) : (
      <p>There are no movies in the database.</p>
    );
  };

  handleDelete = (movie) => {
    const selectedMovies = this.state.selectedMovies.filter(
      (mov) => mov._id !== movie._id
    );
    const movies = this.state.movies.filter((mov) => mov._id !== movie._id);
    this.setState({ selectedMovies, movies });
  };

  handlePages = (page, movies, pageSize) => {
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

  paginateMovies = (movies, page, pageSize) => {
    const divisions = Math.ceil(movies.length / pageSize);
    let paginatedMovies;
    if (divisions === page) {
      paginatedMovies = movies.slice((page - 1) * pageSize, movies.length);
    } else {
      paginatedMovies = movies.slice((page - 1) * pageSize, page * pageSize);
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
      <div className="row">
        <div className="col-2 m-2">
          <ListGroup
            genres={this.state.genres}
            selectedGenre={this.state.selectedGenre}
            onClick={this.handleGenre}
          />
        </div>
        <div className="col m-2">
          {this.handleHeader()}
          <MovieTable
            onLikeClick={this.handleLikeClick}
            movies={this.state.selectedMovies}
            page={this.state.page}
            pageSize={this.state.pageSize}
            onDelete={this.handleDelete}
          />
          <Pagination
            onClick={this.handlePages}
            page={this.state.page}
            movies={this.state.selectedMovies}
            pageSize={this.state.pageSize}
          />
        </div>
      </div>
    );
  }
}

export default App;
