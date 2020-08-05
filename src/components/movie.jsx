import React, { Component } from "react";
import Like from "./common/like";

export class Movie extends Component {
  render() {
    return (
      <tr>
        <th>{this.props.movie.title}</th>
        <th>{this.props.movie.genre.name}</th>
        <th>{this.props.movie.numberInStock}</th>
        <th>{this.props.movie.dailyRentalRate}</th>
        <th>
          <Like movie={this.props.movie} onClick={this.props.onLikeClick} />
        </th>
        <th>
          <button
            className="btn btn-primary btn-sm m-2"
            onClick={() => this.props.onDelete(this.props.movie)}
          >
            Delete
          </button>
        </th>
      </tr>
    );
  }
}
