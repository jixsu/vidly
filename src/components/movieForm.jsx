import React from "react";
import Form from "./common/form";
import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "../services/fakeMovieService";
const Joi = require("@hapi/joi");

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().max(100).min(0).label("Number in Stock"),
    dailyRentalRate: Joi.number().max(10).min(0).label("Rate"),
  };

  componentDidMount = () => {
    const { match, history } = this.props;
    const genres = getGenres();
    this.setState({ genres });

    const movieId = match.params.id;
    if (movieId === "new") return;

    const movie = getMovie(movieId);
    console.log(movie);
    if (!movie) return history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(movie) });
  };

  mapToViewModel = (movie) => {
    const data = {};
    data._id = movie._id;
    data.title = movie.title;
    data.genreId = movie.genre._id;
    data.numberInStock = movie.numberInStock;
    data.dailyRentalRate = movie.dailyRentalRate;
    return data;
  };

  doSubmit = () => {
    const { history } = this.props;
    const { data } = this.state;
    saveMovie(data);
    history.push("/movies");

    //Call server
    console.log("Submitted");
  };

  render() {
    const { match } = this.props;
    const { genres } = this.state;
    return (
      <div>
        <h1>Movie Form</h1>

        <form onSubmit={this.handleSubmit}>
          {this.renderInputField("title", "Title")}
          {this.renderSelectField("genreId", "Genre", genres)}
          {this.renderInputField("numberInStock", "Number in Stock")}
          {this.renderInputField("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
