import React, { Component } from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

class Table extends Component {
  render() {
    const { movies, column, onSort, sortColumn } = this.props;

    return (
      <table className="table">
        <TableHeader column={column} onSort={onSort} sortColumn={sortColumn} />
        <TableBody column={column} data={movies} />
      </table>
    );
  }
}

export default Table;
