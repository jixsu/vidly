import React, { Component } from "react";

export class Movie extends Component {
  toggleHeart = () => {
    if (this.props.movie.liked) return "fa fa-heart";
    return "fa fa-heart-o";
  };

  render() {
    return (
      <tr>
        <th>{this.props.movie.title}</th>
        <th>{this.props.movie.genre.name}</th>
        <th>{this.props.movie.numberInStock}</th>
        <th>{this.props.movie.dailyRentalRate}</th>
        <th>
          <i
            onClick={() => this.props.onClick(this.props.movie)}
            style={{ cursor: "pointer" }}
            className={this.toggleHeart()}
            aria-hidden="true"
          ></i>
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
