import React, { Component } from "react";

class TableHeader extends Component {
  render() {
    const { column } = this.props;
    return (
      <thead>
        <tr>
          {column.map((column) => (
            <th key={column.path || column.key}>{column.label || ""}</th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
