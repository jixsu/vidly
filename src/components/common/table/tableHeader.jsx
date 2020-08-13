import React, { Component } from "react";
import SortIcon from "../sortIcon";

class TableHeader extends Component {
  renderSortIcon = (sortColumn, column) => {
    if (sortColumn.path === column.path) {
      return <SortIcon sortColumn={sortColumn} />;
    }
    return null;
  };

  render() {
    const { column, onSort, sortColumn } = this.props;
    return (
      <thead>
        <tr>
          {column.map((column) =>
            column.path ? (
              <th onClick={() => onSort(column.path)} key={column.path}>
                {column.label}
                {this.renderSortIcon(sortColumn, column)}
              </th>
            ) : (
              <th key={column.key}>{""}</th>
            )
          )}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
