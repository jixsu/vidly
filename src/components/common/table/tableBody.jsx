import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  state = {};

  renderCellContent = (column, item) => {
    if (column.path === "title") {
      return column.content(item);
    }
    return _.get(item, column.path);
  };

  render() {
    const { data, column } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {column.map((column) => (
              <td key={item._id + (column.key || column.path)}>
                {this.renderCellContent(column, item)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
