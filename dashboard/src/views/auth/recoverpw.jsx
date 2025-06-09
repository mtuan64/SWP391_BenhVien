import React from 'react'
import { Fragment } from 'react'
import { Card, Col, Container, Row, Form, Button } from 'react-bootstrap'

// Component
import Logo from '../../components/widget/logo'

import { Link } from 'react-router-dom'

// images
import authbg from '/assets/images/dashboard/sign-in.jpg'

const RecoverPwd = () => {
    return (
        <Fragment>
            <div className="login-content" style={{ background: `url(${authbg})`, backgroundRepeat: 'no-repeat', position: 'relative', backgroundSize: 'cover' }}>
                <Container>
                    <Row className="align-items-center justify-content-center vh-100 w-100 m-0">
                        <Col lg={5} md={12} className="align-self-center">
                            <Card className="p-0 mb-0">
                                <Card.Body className="auth-card">
                                    <div className="logo-img">
                                        <Link to="/" className="navbar-brand d-flex align-items-center justify-content-center mb-5">
                                            <Logo />
                                        </Link>
                                    </div>
                                    <p className="mb-5"> Your Personal Data Will Be Used To Support Your Experience Throughout
                                        This Website, To Manage Access To Your Account, And For Other Purposes Described In Our <Link
                                            to="/extra/privacy-policy"> Privacy Policy</Link>. 
                                    </p>
                                    <Form>
                                        <div className="custom-form-field">
                                            <Form.Group className="custom-form-field">
                                                <Form.Control type="email" className="mb-3 mb-md-5" placeholder="Enter Username or Email *"></Form.Control>
                                            </Form.Group>                                                                                        
                                        </div>
                                            <Button href="#">
                                                <span className="text d-inline-block align-middle">Reset Password</span>{" "}
                                                <span className="icon d-inline-block align-middle ms-1 ps-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                                        <path
                                                            d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z"
                                                            fill="currentColor" />
                                                    </svg>
                                                </span>
                                            </Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>                    
                </Container>
            </div>
        </Fragment>
    )
}

export default RecoverPwd
