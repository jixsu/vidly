import React, { Component } from "react";

class Like extends Component {
  toggleHeart = () => {
    if (this.props.movie.liked) return "fa fa-heart";
    return "fa fa-heart-o";
  };
  render() {
    return (
      <i
        onClick={() => this.props.onClick(this.props.movie)}
        style={{ cursor: "pointer" }}
        className={this.toggleHeart()}
        aria-hidden="true"
      ></i>
    );
  }
}

export default Like;
