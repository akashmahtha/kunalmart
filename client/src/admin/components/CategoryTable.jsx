import { useState } from "react";
import {
    Table,
    Button,
    Form,
    Image,
} from "react-bootstrap";
import {
    FaEdit,
    FaTrash,
} from "react-icons/fa";
import { toast } from "react-toastify";

import api from "../../services/api";
import EditCategoryModal from "./EditCategoryModal";

const CategoryTable = ({
    categories,
    fetchCategories,
    currentPage,
    itemsPerPage,
}) => {

    const [search, setSearch] = useState("");

    const [showEdit, setShowEdit] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState(null);

    // Search (Current Page)
    const filteredCategories = categories.filter((category) =>
        category.name
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    // ==========================
    // Edit Category
    // ==========================

    const editCategory = (category) => {

        setSelectedCategory(category);

        setShowEdit(true);

    };

    // ==========================
    // Delete Category
    // ==========================

    const deleteCategory = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this category?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/categories/${id}`);

            toast.success("Category Deleted Successfully");

            fetchCategories();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Delete Failed"
            );

        }

    };

    return (

        <>

            {/* Search */}

            <div className="d-flex justify-content-end mb-3">

                <Form.Control
                    style={{
                        maxWidth: "300px",
                    }}
                    placeholder="Search Category..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

            </div>

            {/* Table */}

            <div className="table-responsive">

                <Table
                    bordered
                    hover
                    className="align-middle"
                >

                    <thead className="table-success">

                        <tr>

                            <th width="70">#</th>

                            <th width="90">Image</th>

                            <th>Name</th>

                            <th>Description</th>

                            <th width="150">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredCategories.length > 0 ? (

                                filteredCategories.map((category, index) => (

                                    <tr key={category._id}>

                                        <td>

                                            {(currentPage - 1) * itemsPerPage + index + 1}

                                        </td>

                                        <td>

                                            <Image
                                                src={
                                                    category.image ||
                                                    "https://placehold.co/60x60?text=No+Image"
                                                }
                                                width={60}
                                                height={60}
                                                rounded
                                                style={{
                                                    objectFit: "cover",
                                                }}
                                            />

                                        </td>

                                        <td>


                                            {category.name}


                                        </td>

                                        <td>

                                            {category.description || "-"}

                                        </td>

                                        <td>

                                            <Button
                                                size="sm"
                                                variant="warning"
                                                className="me-2"
                                                onClick={() =>
                                                    editCategory(category)
                                                }
                                            >

                                                <FaEdit />

                                            </Button>

                                            <Button
                                                size="sm"
                                                variant="danger"
                                                onClick={() =>
                                                    deleteCategory(category._id)
                                                }
                                            >

                                                <FaTrash />

                                            </Button>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan={5}
                                        className="text-center py-5"
                                    >

                                        <h5>
                                            No Categories Found
                                        </h5>

                                    </td>

                                </tr>

                            )

                        }

                    </tbody>

                </Table>

            </div>

            {/* Edit Modal */}

            <EditCategoryModal
                show={showEdit}
                handleClose={() =>
                    setShowEdit(false)
                }
                category={selectedCategory}
                fetchCategories={fetchCategories}
            />

        </>

    );

};

export default CategoryTable;