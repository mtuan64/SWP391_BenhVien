import React from 'react'
import { Fragment } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'

// Component
import Logo from '../../components/widget/logo'

import { Link } from 'react-router-dom'

// images
import authbg from '/assets/images/dashboard/sign-in.jpg'

const ConfirmMail = () => {
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
                                    <h2 className="mt-3">Success !</h2>
                                    <p className="cnf-mail mb-1">An email has been sent to
                                        youremail@domain.com. Please check for an
                                        email from the company and click on the included
                                        link to reset your password.</p>
                                    <div className="d-inline-block w-100">
                                        <Link to="/" className="btn btn-primary mt-3 w-100">
                                            Back to Home
                                        </Link>
                                        {/* <a href="{{path}}index.html" className="btn btn-primary mt-3 w-100">Back to Home</a> */}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Fragment>
    )
}

export default ConfirmMail
