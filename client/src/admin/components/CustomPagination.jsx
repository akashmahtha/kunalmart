import { Pagination } from "react-bootstrap";

const CustomPagination = ({

    totalItems,
    itemsPerPage,
    currentPage,
    setCurrentPage,
}) => {

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (totalPages <= 1) return null;

    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (

        <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap">

            <div className="text-muted mb-2">

                Showing{" "}

                <strong>
                    {(currentPage - 1) * itemsPerPage + 1}
                </strong>

                {" "}to{" "}

                <strong>
                    {Math.min(currentPage * itemsPerPage, totalItems)}
                </strong>

                {" "}of{" "}

                <strong>{totalItems}</strong>

                {" "}entries

            </div>

            <Pagination>

                <Pagination.First
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(1)}
                />

                <Pagination.Prev
                    disabled={currentPage === 1}
                    onClick={() =>
                        setCurrentPage(currentPage - 1)
                    }
                />

                {pages.map((page) => (

                    <Pagination.Item
                        key={page}
                        active={page === currentPage}
                        onClick={() =>
                            setCurrentPage(page)
                        }
                    >
                        {page}
                    </Pagination.Item>

                ))}

                <Pagination.Next
                    disabled={currentPage === totalPages}
                    onClick={() =>
                        setCurrentPage(currentPage + 1)
                    }
                />

                <Pagination.Last
                    disabled={currentPage === totalPages}
                    onClick={() =>
                        setCurrentPage(totalPages)
                    }
                />

            </Pagination>

        </div>

    );

};

export default CustomPagination;