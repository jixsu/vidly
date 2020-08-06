import React, { Component } from "react";

class Pagination extends Component {
  generatePages = (movies, currentPage, pageSize) => {
    const divisions = Math.ceil(movies.length / pageSize);

    let arrayOfPages = [];
    for (let x = 1; x < divisions + 1; x++) {
      if (x === currentPage) {
        arrayOfPages[x - 1] = (
          <li key={x} className="page-item active" aria-current="page">
            <span className="page-link">
              {x}
              <span className="sr-only">(current)</span>
            </span>
          </li>
        );
      } else {
        arrayOfPages[x - 1] = (
          <li key={x} className="page-item">
            <a
              className="page-link"
              href="#"
              onClick={() => this.props.onClick(x)}
            >
              {x}
            </a>
          </li>
        );
      }
    }

    return arrayOfPages;
  };

  togglePrev = () => {
    if (this.props.page === 1) {
      return "page-item disabled";
    }
    return "page-item";
  };

  toggleNext = () => {
    const divisions = Math.ceil(this.props.movies.length / this.props.pageSize);
    if (this.props.page === divisions) {
      return "page-item disabled";
    }
    return "page-item";
  };

  render() {
    return (
      <div>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className={this.togglePrev()}>
              <a
                className="page-link"
                href="#"
                onClick={() => this.props.onClick("-")}
              >
                Previous
              </a>
            </li>
            {this.generatePages(
              this.props.movies,
              this.props.page,
              this.props.pageSize
            )}

            <li className={this.toggleNext()}>
              <a
                className="page-link"
                href="#"
                onClick={() => this.props.onClick("+")}
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Pagination;
