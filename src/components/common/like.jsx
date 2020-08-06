import React, { Component } from "react";

class Like extends Component {
  toggleHeart = () => {
    const { movie } = this.props;
    if (movie.liked) return "fa fa-heart";
    return "fa fa-heart-o";
  };
  render() {
    const { movie, onClick } = this.props;
    return (
      <i
        onClick={() => onClick(movie)}
        style={{ cursor: "pointer" }}
        className={this.toggleHeart()}
        aria-hidden="true"
      ></i>
    );
  }
}

export default Like;
