import { Pagination } from "react-bootstrap";

const PaginationComponent = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {

    if (totalPages <= 1) return null;

    const pages = [];

    for (let i = 1; i <= totalPages; i++) {

        pages.push(

            <Pagination.Item
                key={i}
                active={i === currentPage}
                onClick={() => onPageChange(i)}
            >
                {i}
            </Pagination.Item>

        );

    }

    return (

        <div className="d-flex justify-content-center my-5">

            <Pagination>

                {/* Previous */}

                <Pagination.Prev
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                />

                {/* Page Numbers */}

                {pages}

                {/* Next */}

                <Pagination.Next
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                />

            </Pagination>

        </div>

    );

};

export default PaginationComponent;