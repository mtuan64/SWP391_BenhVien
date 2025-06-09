import React from 'react'
import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom';

// react-botstrap
import { Button, Form, Table } from "react-bootstrap";
import Offcanvas from 'react-bootstrap/Offcanvas';
// import Pagination from 'react-bootstrap/Pagination';

// Sweetalert
import Swal from "sweetalert2";

// Components
import Card from '../components/bootstrap/card'
import TopNav from "../components/widget/top-nav";

import ChoicesJs from '../components/choices'

//select
const options = [
    { value: 'Select', label: 'Select' },
    { value: 'Medical Equipment', label: 'Medical Equipment' },
    { value: 'Home Equipment', label: 'Home Equipment' },
    { value: 'Disease', label: 'Disease' },
    { value: 'Physical', label: 'Physical' },
]
const options2 = [
    { value: 'Medical Equipment', label: 'Medical Equipment' },
    { value: 'Health Care', label: 'Health Care' },
    { value: 'Home Equipment', label: 'Home Equipment' },
    { value: 'Disease', label: 'Disease' },
    { value: 'Physical', label: 'Physical' },
]


const Product = () => {
    const [inputValue, setInputValue] = useState("");
    const [value, setValue] = useState([]);

    const handleKeyDown = (event) => {
        if (!inputValue) return;
        switch (event.key) {
            case "Enter":
            case "Tab":
                setValue((prev) => [...prev, createOption(inputValue)]);
                setInputValue("");
                event.preventDefault();
                break;
            default:
        }
    };

    function deleteBtn() {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this item",
            icon: "error",
            confirmButtonColor: `rgb(192, 50, 33)`,
            showCancelButton: true,
            backdrop: `rgba(60,60,60,0.8)`,
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Deleted!", "Your item has been deleted.", "success");
            }
        });
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    const ProductList = [
        {
            SrNo: 1,
            Id: "#14356",
            ProductName: "Asthma Inhaler",
            Category: "Health Care",
            Price: "$67.90",
            Stock: "23",
            Discount: "15%",
            Sale: "173"
        },
        {
            SrNo: 2,
            Id: "#14678",
            ProductName: "Contact Lenses",
            Category: "Medical Equipment",
            Price: "$50.00",
            Stock: "45",
            Discount: "20%",
            Sale: "189"
        },
        {
            SrNo: 3,
            Id: "#12431",
            ProductName: "Dental Equipment",
            Category: "Medical Equipment",
            Price: "$280",
            Stock: "12",
            Discount: "12%",
            Sale: "923"
        },
        {
            SrNo: 4,
            Id: "#21356",
            ProductName: "Electric Toothbrush",
            Category: "Home Equipment",
            Price: "$370",
            Stock: "09",
            Discount: "09%",
            Sale: "875"
        },
        {
            SrNo: 5,
            Id: "#65783",
            ProductName: "Hand Sanitizer",
            Category: "Physical",
            Price: "$460",
            Stock: "18",
            Discount: "10%",
            Sale: "456"
        },
        {
            SrNo: 6,
            Id: "#12567",
            ProductName: "Glucose Meter Set",
            Category: "Medical Equipment",
            Price: "$220",
            Stock: "18",
            Discount: "05%",
            Sale: "100"
        },
        {
            SrNo: 7,
            Id: "#15342",
            ProductName: "Handgloves",
            Category: "Medical Equipment",
            Price: "$390",
            Stock: "34",
            Discount: "25%",
            Sale: "23"
        }
    ]

    return (
        <Fragment>
            <TopNav title="Products" />
            <Card>
                <Card.Header className="flex-wrap gap-3">
                    <div>
                        <h4>All Product</h4>
                        <span>More Than 400+ New Products</span>
                    </div>
                    <Button variant="primary" onClick={handleShow}>
                        <span className="btn-inner">
                            <span className="text d-inline-block align-middle">Add Product</span>{" "}
                            <span className="icon d-inline-block align-middle ms-1 ps-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                    <path
                                        d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z"
                                        fill="currentColor" />
                                </svg>
                            </span>
                        </span>
                    </Button>
                </Card.Header>
                <Card.Body className="pt-0">
                    <div className="table-responsive">
                        <Table className="table border-end border-start align-middle mb-0 rounded">
                            <thead className="table-dark">
                                <tr>
                                    <th>No.</th>
                                    <th>ID</th>
                                    <th>Product Name</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>In Stock</th>
                                    <th>Discount</th>
                                    <th>Sale</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ProductList.map((item, index) => (
                                    <tr data-item="list" key={index}>
                                        <th scope="row">{item.SrNo}</th>
                                        <td>{item.Id}</td>
                                        <td>
                                            <h6 className="mb-0 text-body fw-normal">{item.ProductName}</h6>
                                        </td>
                                        <td>{item.Category}</td>
                                        <td>{item.Price}</td>
                                        <td>{item.Stock}</td>
                                        <td>{item.Discount} Off</td>
                                        <td>{item.Sale} Sold</td>
                                        <td>
                                            <a variant="" className='d-inline-block pe-2' onClick={handleShow1}>
                                                <span className="text-success">
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M9.31055 14.3321H14.75" stroke="currentColor"
                                                            strokeWidth="1.5" strokeLinecap="round"
                                                            strokeLinejoin="round" />
                                                        <path fillRule="evenodd" clipRule="evenodd"
                                                            d="M8.58501 1.84609C9.16674 1.15084 10.2125 1.04889 10.9222 1.6188C10.9614 1.64972 12.2221 2.62909 12.2221 2.62909C13.0017 3.10039 13.244 4.10233 12.762 4.86694C12.7365 4.90789 5.60896 13.8234 5.60896 13.8234C5.37183 14.1192 5.01187 14.2938 4.62718 14.298L1.89765 14.3323L1.28265 11.7292C1.1965 11.3632 1.28265 10.9788 1.51978 10.683L8.58501 1.84609Z"
                                                            stroke="currentColor" strokeWidth="1.5"
                                                            strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M7.26562 3.50073L11.3548 6.64108" stroke="currentColor"
                                                            strokeWidth="1.5" strokeLinecap="round"
                                                            strokeLinejoin="round" />
                                                    </svg>
                                                </span>
                                            </a>{" "}
                                            <Link href="#" className="d-inline-block ps-2 delete-btn" onClick={deleteBtn}>
                                                <span className="text-danger">
                                                    <svg width="15" height="16" viewBox="0 0 15 16" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M12.4938 6.10107C12.4938 6.10107 12.0866 11.1523 11.8503 13.2801C11.7378 14.2963 11.1101 14.8918 10.0818 14.9106C8.12509 14.9458 6.16609 14.9481 4.21009 14.9068C3.22084 14.8866 2.60359 14.2836 2.49334 13.2853C2.25559 11.1388 1.85059 6.10107 1.85059 6.10107"
                                                            stroke="currentColor" strokeWidth="1.5"
                                                            strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M13.5312 3.67969H0.812744" stroke="currentColor"
                                                            strokeWidth="1.5" strokeLinecap="round"
                                                            strokeLinejoin="round" />
                                                        <path
                                                            d="M11.0804 3.67974C10.4917 3.67974 9.98468 3.26349 9.86918 2.68674L9.68693 1.77474C9.57443 1.35399 9.19343 1.06299 8.75918 1.06299H5.58443C5.15018 1.06299 4.76918 1.35399 4.65668 1.77474L4.47443 2.68674C4.35893 3.26349 3.85193 3.67974 3.26318 3.67974"
                                                            stroke="currentColor" strokeWidth="1.5"
                                                            strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </span>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Card.Body>
                <Card.Footer className="pt-0">
                    <div className="d-flex justify-content-between align-items-center gap-3 flex-wrap">
                        <ul className="page-number m-0 p-0 list-unstyled d-flex gap-2">
                            <li className="text-center bg-primary text-white rounded">1</li>
                            <li className="text-center bg-primary-subtle text-dark rounded">2</li>
                            <li className="text-center text-dark rounded">...</li>
                            <li className="text-center bg-primary-subtle text-dark rounded">6</li>
                        </ul>
                        <div>
                            <Button className="btn-secondary text-white me-3" type="button">
                                <span className="btn-inner">
                                    <span className="text d-inline-block align-middle">Previous</span>{" "}
                                    <span className="icon d-inline-block align-middle ms-1 ps-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                            <path d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
                                </span>
                            </Button>{" "}
                            <Button className="btn-primary me-3" type="button">
                                <span className="btn-inner">
                                    <span className="text d-inline-block align-middle">Next</span>{" "}
                                    <span className="icon d-inline-block align-middle ms-1 ps-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                            <path d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
                                </span>
                            </Button>
                        </div>
                    </div>
                </Card.Footer>
            </Card>
            {/* Add offcanvas */}
            <Offcanvas show={show} placement={'end'} onHide={handleClose}>
                <Offcanvas.Header closeButton className='border-bottom'>
                    <Offcanvas.Title as="h3">Add Product</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="form-group col-md-12">
                        <Form.Group className="mb-3">
                            <Form.Label>Product Id  <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" className="form-control" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Name <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" className="form-control" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Category <span className="text-danger">*</span></Form.Label>
                            <ChoicesJs options={options} className="js-choice" select="one" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Price <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" className="form-control" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>In Stock <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" className="form-control" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Discount <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" className="form-control" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Sale <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" className="form-control" />
                        </Form.Group>
                    </div>
                </Offcanvas.Body>
                <div className="offcanvas-footer border-top">
                    <div className="d-grid d-md-flex gap-3 p-3">
                        <Button variant='primary' type="submit" className="d-block">
                            <span className="btn-inner">
                                <span className="text d-inline-block align-middle">Save</span>{" "}
                                <span className="icon d-inline-block align-middle ms-1 ps-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                        <path d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z" fill="currentColor" />
                                    </svg>
                                </span>
                            </span>
                        </Button>
                        <Button variant='secondary' className="d-block" type="button" aria-label="Close" onClick={handleClose}>
                            <span className="btn-inner">
                                <span className="text d-inline-block align-middle">Close</span>{" "}
                                <span className="icon d-inline-block align-middle ms-1 ps-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                        <path d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z" fill="currentColor" />
                                    </svg>
                                </span>
                            </span>
                        </Button>
                    </div>
                </div>
            </Offcanvas>

            {/* Edit offcanvas */}
            <Offcanvas show={show1} placement={'end'} onHide={handleClose1}>
                <Offcanvas.Header closeButton className='border-bottom'>
                    <Offcanvas.Title as="h3">Edit Product</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="form-group col-md-12">
                        <Form.Group className="mb-3">
                            <Form.Label>Product Id  <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" className="form-control" defaultValue="#14356" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Product Name <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" className="form-control" defaultValue="Asthma Inhaler" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Category <span className="text-danger">*</span></Form.Label>
                            <ChoicesJs options={options2} className="js-choice" select="one" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Price <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" className="form-control" defaultValue="$67.90" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>In Stock <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" className="form-control" defaultValue="23" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Discount <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" className="form-control" defaultValue="15% Off" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Sale <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" className="form-control" defaultValue="173 Sold" />
                        </Form.Group>
                    </div>
                </Offcanvas.Body>
                <div className="offcanvas-footer border-top">
                    <div className="d-grid d-md-flex gap-3 p-3">
                        <Button type="submit" className="btn btn-primary d-block">
                            <span className="btn-inner">
                                <span className="text d-inline-block align-middle">Update</span>{" "}
                                <span className="icon d-inline-block align-middle ms-1 ps-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                        <path d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z" fill="currentColor" />
                                    </svg>
                                </span>
                            </span>
                        </Button>
                        <Button className="btn btn-secondary d-block" type="button" aria-label="Close" onClick={handleClose1}>
                            <span className="btn-inner">
                                <span className="text d-inline-block align-middle">Close</span>{" "}
                                <span className="icon d-inline-block align-middle ms-1 ps-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                        <path d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z" fill="currentColor" />
                                    </svg>
                                </span>
                            </span>
                        </Button>
                    </div>
                </div>
            </Offcanvas>
        </Fragment>
    )
}

export default Product
