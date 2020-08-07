import React, { Component } from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

class Table extends Component {
  paginateMovies = (page, pageSize, movies) => {
    const paginatedMovies = movies.slice(
      (page - 1) * pageSize,
      page * pageSize || movies.length
    );
    return paginatedMovies;
  };
  render() {
    const { page, pageSize, movies } = this.props;
    return (
      <table className="table">
        <TableHeader column={this.props.column} />
        <TableBody
          column={this.props.column}
          data={this.paginateMovies(page, pageSize, movies)}
        />
      </table>
    );
  }
}

export default Table;
