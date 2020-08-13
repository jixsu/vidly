import React, { Component } from "react";

class Like extends Component {
  toggleHeart = () => {
    const { item } = this.props;
    if (item.liked) return "fa fa-heart";
    return "fa fa-heart-o";
  };
  render() {
    const { item, onClick } = this.props;
    return (
      <i
        onClick={() => onClick(item)}
        style={{ cursor: "pointer" }}
        className={this.toggleHeart()}
        aria-hidden="true"
      ></i>
    );
  }
}

export default Like;
