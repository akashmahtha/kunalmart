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
}) => {

    const [search, setSearch] = useState("");

    const [showEdit, setShowEdit] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState(null);

    const filteredCategories = categories.filter((category) =>
        category.name
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    // ==========================
    // Edit
    // ==========================

    const editCategory = (category) => {

        setSelectedCategory(category);

        setShowEdit(true);

    };

    // ==========================
    // Delete
    // ==========================

    const deleteCategory = async (id) => {

        const confirmDelete = window.confirm(
            "Delete this category?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/categories/${id}`);

            toast.success("Category Deleted");

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

            <div className="d-flex justify-content-end mb-3">

                <Form.Control
                    style={{ maxWidth: "300px" }}
                    placeholder="Search Category..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

            </div>

            <Table
                bordered
                hover
                responsive
                className="align-middle"
            >

                <thead className="table-success">

                    <tr>

                        <th width="90">

                            Image

                        </th>

                        <th>

                            Name

                        </th>

                        <th>

                            Description

                        </th>

                        <th width="150">

                            Actions

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        filteredCategories.length > 0 ? (

                            filteredCategories.map((category) => (

                                <tr key={category._id}>

                                    <td>

                                        <Image
                                            src={
                                                category.image ||
                                                "https://placehold.co/60x60?text=No+Image"
                                            }
                                            width={60}
                                            height={60}
                                            rounded
                                        />

                                    </td>

                                    <td>

                                        {category.name}

                                    </td>

                                    <td>

                                        {
                                            category.description ||
                                            "-"
                                        }

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
                                    colSpan="4"
                                    className="text-center"
                                >

                                    No Categories Found

                                </td>

                            </tr>

                        )

                    }

                </tbody>

            </Table>

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