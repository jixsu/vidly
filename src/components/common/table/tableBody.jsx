import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  state = {};
  render() {
    const { data, column } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {column.map((column) => (
              <th key={item._id + (column.key || column.path)}>
                {_.get(item, column.path) || column.content(item)}
              </th>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
