import React from "react";
import Form from "./common/form";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";
import { toast } from "react-toastify";
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

  async componentDidMount() {
    const { match, history } = this.props;
    const genres = await getGenres();
    this.setState({ genres });

    const movieId = match.params.id;
    if (movieId === "new") return;

    try {
      const movie = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response.status == 404) {
        toast.error("Movie url not found");
        return history.replace("/not-found");
      }
      // if (ex.reponse && ex.response.status === 404)
    }
  }

  mapToViewModel = (movie) => {
    const data = {};
    data._id = movie._id;
    data.title = movie.title;
    data.genreId = movie.genre._id;
    data.numberInStock = movie.numberInStock;
    data.dailyRentalRate = movie.dailyRentalRate;
    return data;
  };

  doSubmit = async () => {
    const { history } = this.props;
    const { data } = this.state;
    await saveMovie(data);
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
