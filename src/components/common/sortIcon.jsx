import React, { Component } from "react";

class sortIcon extends Component {
  renderSortIcon = (sortColumn) => {
    if (sortColumn.order === "asc") {
      return "fa fa-sort-up";
    }
    return "fa fa-sort-down";
  };

  render() {
    const { sortColumn } = this.props;
    return <i className={this.renderSortIcon(sortColumn)}></i>;
  }
}

export default sortIcon;
