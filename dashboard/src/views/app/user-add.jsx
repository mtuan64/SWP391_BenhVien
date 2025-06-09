import React from 'react'
import { Fragment } from 'react'

//react-bootstrap
import { Row, Col, Image, Form, Button } from 'react-bootstrap'

//components
import Card from '../../components/bootstrap/card'

import ChoicesJs from '../../components/choices'

//router
import { Link } from 'react-router-dom'

// img
import avatars1 from '/assets/images/avatars/01.png'
import avatars2 from '/assets/images/avatars/avtar_1.png'
import avatars3 from '/assets/images/avatars/avtar_2.png'
import avatars4 from '/assets/images/avatars/avtar_3.png'
import avatars5 from '/assets/images/avatars/avtar_4.png'
import avatars6 from '/assets/images/avatars/avtar_5.png'

const AddUser = () => {
    const options1 = [
        { value: 'Select', label: 'Select' },
        { value: 'Web Designer', label: 'Web Designer' },
        { value: 'Web Developer', label: 'Web Developer' },
        { value: 'Tester', label: 'Tester' },
        { value: 'Php Developer', label: 'Php Developer' },
        { value: 'Ios Developer', label: 'Ios Developer' }
    ]

    const options2 = [
        { value: 'Select Country', label: 'Select Country' },
        { value: 'Caneda', label: 'Caneda' },
        { value: 'Noida', label: 'Noida' },
        { value: 'USA', label: 'USA' },
        { value: 'India', label: 'India' },
        { value: 'Africa', label: 'Africa' }
    ]

    return (
        <Fragment>
            <Row>
                <Col xl="3" lg="4" className="">
                    <Card>
                        <Card.Header className="d-flex justify-content-between mb-0">
                            <div className="header-title">
                                <h4 className="card-title">Add New User</h4>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group className="form-group">
                                    <div className="profile-img-edit position-relative">
                                        <Image className="theme-color-default-img  profile-pic rounded avatar-100" src={avatars1} alt="profile-pic" />
                                        <Image className="theme-color-purple-img profile-pic rounded avatar-100" src={avatars2} alt="profile-pic" />
                                        <Image className="theme-color-blue-img profile-pic rounded avatar-100" src={avatars3} alt="profile-pic" />
                                        <Image className="theme-color-green-img profile-pic rounded avatar-100" src={avatars5} alt="profile-pic" />
                                        <Image className="theme-color-yellow-img profile-pic rounded avatar-100" src={avatars6} alt="profile-pic" />
                                        <Image className="theme-color-pink-img profile-pic rounded avatar-100" src={avatars4} alt="profile-pic" />
                                        <div className="upload-icone bg-primary">
                                            <svg className="upload-button icon-14" width="14" height="14" viewBox="0 0 24 24">
                                                <path fill="#ffffff" d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" />
                                            </svg>
                                            <Form.Control className="file-upload" type="file" accept="image/*" />
                                        </div>
                                    </div>
                                    <div className="img-extension mt-3">
                                        <div className="d-inline-block align-items-center">
                                            <span>Only</span>{' '}
                                            <Link to="#">.jpg</Link>{' '}
                                            <Link to="#">.png</Link>{' '}
                                            <Link to="#">.jpeg</Link>{' '}
                                            <span>allowed</span>
                                        </div>
                                    </div>
                                </Form.Group>
                                <Form.Group className="form-group">
                                    <Form.Label>User Role:</Form.Label>
                                    <ChoicesJs options={options1} className="js-choice" select="one" />
                                </Form.Group>
                                <Form.Group className="form-group">
                                    <Form.Label htmlFor="furl">Facebook URL:</Form.Label>
                                    <Form.Control type="text" id="furl" placeholder="Facebook URL" />
                                </Form.Group>
                                <Form.Group className="form-group">
                                    <Form.Label htmlFor="turl">Twitter URL:</Form.Label>
                                    <Form.Control type="text" id="turl" placeholder="Twitter URL" />
                                </Form.Group>
                                <Form.Group className="form-group">
                                    <Form.Label htmlFor="instaurl">Instagram URL:</Form.Label>
                                    <Form.Control type="text" id="instaurl" placeholder="Instagram URL" />
                                </Form.Group>
                                <Form.Group className="mb-0 form-group">
                                    <Form.Label htmlFor="lurl">Linkedin URL:</Form.Label>
                                    <Form.Control type="text" id="lurl" placeholder="Linkedin URL" />
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl="9" lg="8">
                    <Card>
                        <Card.Header className="d-flex justify-content-between mb-0">
                            <div className="header-title">
                                <h4 className="card-title">New User Information</h4>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div className="new-user-info">
                                <Form>
                                    <div className="row">
                                        <Form.Group className="col-md-6 form-group">
                                            <Form.Label htmlFor="fname">First Name:</Form.Label>
                                            <Form.Control type="text" id="fname" placeholder="First Name" />
                                        </Form.Group>
                                        <Form.Group className="col-md-6 form-group">
                                            <Form.Label htmlFor="lname">Last Name:</Form.Label>
                                            <Form.Control type="text" id="lname" placeholder="Last Name" />
                                        </Form.Group>
                                        <Form.Group className="col-md-6 form-group">
                                            <Form.Label htmlFor="add1">Street Address 1:</Form.Label>
                                            <Form.Control type="text" id="add1" placeholder="Street Address 1" />
                                        </Form.Group>
                                        <Form.Group className="col-md-6 form-group">
                                            <Form.Label htmlFor="add2">Street Address 2:</Form.Label>
                                            <Form.Control type="text" id="add2" placeholder="Street Address 2" />
                                        </Form.Group>
                                        <Form.Group className="col-md-12 form-group">
                                            <Form.Label htmlFor="cname">Company Name:</Form.Label>
                                            <Form.Control type="text" id="cname" placeholder="Company Name" />
                                        </Form.Group>
                                        <Form.Group className="col-sm-12 form-group">
                                            <Form.Label>Country:</Form.Label>
                                            <ChoicesJs options={options2} className="js-choice" select="one" />
                                        </Form.Group>
                                        <Form.Group className="col-md-6  form-group">
                                            <Form.Label htmlFor="mobno">Mobile Number:</Form.Label>
                                            <Form.Control type="text" id="mobno" placeholder="Mobile Number" />
                                        </Form.Group>
                                        <Form.Group className="col-md-6  form-group">
                                            <Form.Label htmlFor="altconno">Alternate Contact:</Form.Label>
                                            <Form.Control type="text" id="altconno" placeholder="Alternate Contact" />
                                        </Form.Group>
                                        <Form.Group className="col-md-6  form-group">
                                            <Form.Label htmlFor="email">Email:</Form.Label>
                                            <Form.Control type="email" id="email" placeholder="Email" />
                                        </Form.Group>
                                        <Form.Group className="col-md-6 form-group">
                                            <Form.Label htmlFor="pno">Pin Code:</Form.Label>
                                            <Form.Control type="text" id="pno" placeholder="Pin Code" />
                                        </Form.Group>
                                        <Form.Group className="col-md-12 form-group">
                                            <Form.Label htmlFor="city">Town/City:</Form.Label>
                                            <Form.Control type="text" id="city" placeholder="Town/City" />
                                        </Form.Group>
                                    </div>
                                    <hr />
                                    <h5 className="mb-3">Security</h5>
                                    <div className="row">
                                        <Form.Group className="col-md-12 form-group">
                                            <Form.Label htmlFor="uname">User Name:</Form.Label>
                                            <Form.Control type="text" id="uname" placeholder="User Name" />
                                        </Form.Group>
                                        <Form.Group className="col-md-6 form-group">
                                            <Form.Label htmlFor="pass">Password:</Form.Label>
                                            <Form.Control type="password" id="pass" placeholder="Password" />
                                        </Form.Group>
                                        <Form.Group className="col-md-6 form-group">
                                            <Form.Label htmlFor="rpass">Repeat Password:</Form.Label>
                                            <Form.Control type="password" id="rpass" placeholder="Repeat Password " />
                                        </Form.Group>
                                    </div>
                                    <div className="checkbox">
                                        <label className="form-label mb-3">
                                            <input type="checkbox" className="me-2 form-check-input" defaultValue="" id="flexCheckChecked" />Enable Two-Factor-Authentication
                                        </label>
                                    </div>
                                    <Button type="submit" variant="primary">
                                        <span className="text d-inline-block align-middle">Add New User</span>{" "}
                                        <span className="icon d-inline-block align-middle ms-1 ps-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                                <path d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z" fill="currentColor"></path>
                                            </svg>
                                        </span>
                                    </Button>
                                </Form>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    )
}

export default AddUser
