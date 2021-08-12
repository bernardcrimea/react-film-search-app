import React from "react";
import "./Pagination.scss";

const Pagination = ({ pages, paginate, carrentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i < Math.ceil(pages / 90); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        {pageNumbers.map((page, index) => (
          <li
            className={carrentPage === page ? "page-item active" : "page-item"}
            key={index}
          >
            <button className="page-link" onClick={() => paginate(page)}>
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
