import React from 'react'
import { Fragment } from 'react'

// Components
import Card from '../components/bootstrap/card'
import TopNav from "../components/widget/top-nav";
import { Button, Row, Col, Form, Table } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';

const HelpSupport = () => {
    return (
        <Fragment>
            <div className="d-flex align-items-center justify-content-between flex-wrap mb-5 gap-3">
                <div>
                    <h1>Help And Support</h1>
                    <span>When customer have problem they open support ticket</span>
                </div>
            </div>
            <Card>
                <Card.Header>
                    <div>
                        <h4>Create New Ticket</h4>
                        <span>Fill up this information and submit.</span>
                    </div>
                </Card.Header>
                <Card.Body className="pt-0">
                    <Form>
                        <div className="row row-cols-xl-4 row-cols-md-2 row-cols-1">
                            <div className="form-group col">
                                <Form.Label>Your Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    defaultValue="Amine Steward"
                                />
                            </div>
                            <div className="form-group col">
                                <Form.Label>Email<span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="email"
                                    defaultValue="amine@gmail.com"
                                />
                            </div>
                            <div className="form-group col">
                                <Form.Label>Support Text<span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                />
                            </div>
                            <div className="form-group col">
                                <Form.Label>Reason</Form.Label>
                                <Form.Control
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="mt-3">
                            <Button variant='primary' type='button'>
                                <span className="btn-inner">
                                    <span className="text d-inline-block align-middle">Submit Ticket</span>{" "}
                                    <span className="icon d-inline-block align-middle ms-1 ps-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                            <path
                                                d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z"
                                                fill="currentColor" />
                                        </svg>
                                    </span>
                                </span>
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>

            <Row>
                <Col lg="7">
                    <Card>
                        <div className='card-header'>
                            <Row className="align-items-center">
                                <Col sm="6">
                                    <h4>Latest Support History</h4>
                                    <p className="mb-0">Here is your most recent history</p>
                                </Col>
                                <Col sm="6" className="text-sm-end mt-sm-0 mt-4">
                                    <a href="#" className="btn btn-primary" download>
                                        <svg className="icon-20 me-1" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.38948 8.98403H6.45648C4.42148 8.98403 2.77148 10.634 2.77148 12.669V17.544C2.77148 19.578 4.42148 21.228 6.45648 21.228H17.5865C19.6215 21.228 21.2715 19.578 21.2715 17.544V12.659C21.2715 10.63 19.6265 8.98403 17.5975 8.98403L16.6545 8.98403" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M12.0215 2.19044V14.2314" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M9.10645 5.1189L12.0214 2.1909L14.9374 5.1189" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>
                                        Export
                                    </a>
                                </Col>
                            </Row>
                        </div>
                        <Card.Body className="pt-0">
                            <div className="table-responsive">
                                <Table className="table border-end border-start align-middle mb-0 rounded">
                                    <thead className="table-dark">
                                        <tr>
                                            <th scope="col">Support Reguest No</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Support Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>SR#14356</td>
                                            <td>darrell@gmail.com</td>
                                            <td>23/08/2023</td>
                                            <td>
                                                <span className="badge rounded bg-secondary-subtle text-secondary fw-500 px-3 py-2 border-0">Inprogress</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>SR#14678</td>
                                            <td>esther@gmail.com</td>
                                            <td>24/08/2023</td>
                                            <td>
                                                <span className="badge rounded bg-success-subtle text-success fw-500 px-3 py-2 border-0">Approve</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>SR#12431</td>
                                            <td>floyd@gmail.com</td>
                                            <td>09/09/2023</td>
                                            <td>
                                                <span className="badge rounded bg-primary-subtle text-primary fw-500 px-3 py-2 border-0">Submit</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>SR#21356</td>
                                            <td>guy@gmail.com</td>
                                            <td>12/10/2023</td>
                                            <td>
                                                <span className="badge rounded bg-danger-subtle text-danger fw-500 px-3 py-2 border-0">Cancel</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>

                        </Card.Body>
                    </Card>
                </Col>
                <Col lg="5">
                    <Card>
                        <Card.Header>
                            <h4 className="mb-0">Frequenty Asked Questions</h4>
                        </Card.Header>
                        <Card.Body className="pt-0">
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>How to book an appointment? </Accordion.Header>
                                    <Accordion.Body>
                                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                                        alteration in some form, by injected humour, or randomised words which don’t look even
                                        slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure
                                        there isn’t anything.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>What are bed charges?</Accordion.Header>
                                    <Accordion.Body>
                                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                                        alteration in some form, by injected humour, or randomised words which don’t look even slightly
                                        believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn’t
                                        anything.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>What is lasik treatment?</Accordion.Header>
                                    <Accordion.Body>
                                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                                        alteration in some form, by injected humour, or randomised words which don’t look even slightly
                                        believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn’t
                                        anything.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="3">
                                    <Accordion.Header>What is heart surgery?</Accordion.Header>
                                    <Accordion.Body>
                                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                                        alteration in some form, by injected humour, or randomised words which don’t look even slightly
                                        believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn’t
                                        anything.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="4">
                                    <Accordion.Header>Which vegetables to eat?</Accordion.Header>
                                    <Accordion.Body>
                                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                                        alteration in some form, by injected humour, or randomised words which don’t look even slightly
                                        believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn’t
                                        anything.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    )
}

export default HelpSupport
