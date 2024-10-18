import { Button } from "react-daisyui";
import PropTypes from "prop-types";
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  return (
    <div className="mt-4 flex items-center justify-between">
      <div>
        Hiển thị trang {currentPage} / {totalPages}
      </div>
      <div className="flex items-center">
        <Button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="bg-[#2c2c2c] py-1 px-2 text-white"
        >
          Previous
        </Button>

        <div className="flex">
          {currentPage > 1 && (
            <Button
              onClick={() => handlePageChange(1)}
              className="bg-gray-500 text-white"
            >
            </Button>
          )}
          {currentPage > 2 && <span className="mx-1">...</span>}

          {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
            const pageIndex = Math.max(1, currentPage - 2) + index; // Display 5 nearest pages
            if (pageIndex > totalPages) return null;

            return (
              <Button
                key={pageIndex}
                onClick={() => handlePageChange(pageIndex)}
                className={`mx-1 ${
                  currentPage === pageIndex
                    ? "bg-red-600 py-1 px-2 text-white"
                    : "bg-black py-1 px-2 text-red-600"
                }`}
              >
                {pageIndex}
              </Button>
            );
          })}

          {currentPage < totalPages - 1 && <span className="mx-1">...</span>}
          {currentPage < totalPages && (
            <Button
              onClick={() => handlePageChange(totalPages)}
              className="bg-gray-500 text-white"
            >
            </Button>
          )}
        </div>

        <Button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="bg-black py-1 px-2 text-red-600"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
  };

export default Pagination;
