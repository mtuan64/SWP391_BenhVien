import React from 'react'
import { Fragment } from 'react'
import { Card, Col, Container, Row, Form, Button } from 'react-bootstrap'

// Component
import Logo from '../../components/widget/logo'

import { Link } from 'react-router-dom'

// images
import authbg from '/assets/images/dashboard/sign-in.jpg'
import user from '/assets/images/avatars/01.png'

const LockScreen = () => {
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
                                    <img className="img-fluid rounded avatar-80 mb-3" src={user} alt="user" loading="lazy" />
                                    <h2 className="mb-2">Hi ! Ruben Dokidis</h2>
                                    <p>Enter Your Password To Access The Admin.</p>
                                    <Form>
                                        <Row>
                                            <Col lg={12}>
                                                <Form.Group className="floating-label form-group">
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control type="password" placeholder=""></Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Button className="w-100">
                                            <span className="text d-inline-block align-middle">Login</span>
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

export default LockScreen
