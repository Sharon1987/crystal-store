import React from 'react';
import PropTypes from 'prop-types';

function Pagination({pagination,onChangePage}) { 
  const handleClick = (e,page) => {
    e.preventDefault();
    onChangePage(page);
  }
  return (
   <nav aria-label="Page navigation example">
    {/* {JSON.stringify(pagination)} */}
  <ul className="pagination justify-content-center">
    <li className={`page-item ${!pagination.has_pre ? 'disabled' : ''}`}>
      <a className="page-link" href="#" aria-label="Previous"
      onClick={(e) => handleClick(e,pagination.current_page -1)} 
      >
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    {
        Array.from({ length: pagination.total_pages }, (_, index) => (
         <li 
           className={`page-item ${pagination.current_page === index+1 ? 'active' : ''}`} key={`${index}_page`}>
          <a className="page-link" onClick={(e) => handleClick(e,index+1)} href="#">
            
            {index+1}
        </a>
    </li>      
    ))}

   <li className={`page-item ${!pagination.has_next ? 'disabled' : ''}`}>
      <a className="page-link" href="#" aria-label="Next"
      onClick={(e) => handleClick(e,pagination.current_page +1)} 
      >
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>       );
}

Pagination.propTypes = {
  pagination: PropTypes.shape({
    has_pre: PropTypes.bool.isRequired,
    has_next: PropTypes.bool.isRequired,
    current_page: PropTypes.number.isRequired,
    total_pages: PropTypes.number.isRequired,
  }).isRequired,
  onChangePage: PropTypes.func.isRequired,
};

export default Pagination;