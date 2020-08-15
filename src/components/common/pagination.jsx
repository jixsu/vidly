import React, { Component } from "react";

class Pagination extends Component {
  handleClassName = (page, currentPage, totalPages) => {
    if (page === "Prev") {
      if (currentPage === 1) return "page-item disabled";
    } else if (page === "Next") {
      if (currentPage === totalPages) return "page-item disabled";
    } else if (typeof page === "number") {
      if (page === currentPage) return "page-item active";
    }
    return "page-item";
  };

  handleButton = (page, currentPage) => {
    const { onClick } = this.props;
    if (page === currentPage) {
      return <span className="page-link">{page}</span>;
    }
    return (
      <a className="page-link" href="#" onClick={() => onClick(page)}>
        {page}
      </a>
    );
  };

  generatePages = (data, currentPage, pageSize) => {
    let pageArray = ["Prev", "Next"];

    const totalPages = Math.ceil(data.length / pageSize);

    if (totalPages === 1) return;

    for (let page = 1; page <= totalPages; page++) {
      pageArray.splice(page, 0, page);
    }

    return (
      <div>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {pageArray.map((page) => (
              <li
                key={page}
                className={this.handleClassName(page, currentPage, totalPages)}
              >
                {this.handleButton(page, currentPage)}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );
  };

  render() {
    const { data, currentPage, pageSize } = this.props;
    return (
      <React.Fragment>
        {this.generatePages(data, currentPage, pageSize)}
      </React.Fragment>
    );
  }
}

export default Pagination;
