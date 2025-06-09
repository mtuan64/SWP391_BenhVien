import React from 'react'
import { Fragment } from 'react'
import { Row, Col, Card, Form, Button } from 'react-bootstrap'

const FormElement = () => {
    return (
        <Fragment>
            <div>
                <Row>
                    <Col sm={12} lg="6">
                        <Card>
                            <Card.Header>
                                <div className="header-title">
                                    <h4 className="card-title">Basic Form</h4>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group className="form-group">
                                        <Form.Label htmlFor="email1101">Email Address:</Form.Label>
                                        <Form.Control type="email" id="email1101" />
                                    </Form.Group>
                                    <Form.Group className="form-group">
                                        <Form.Label htmlFor="pwd">Password:</Form.Label>
                                        <Form.Control type="password" id="pwd" />
                                    </Form.Group>
                                    <div className="checkbox mb-3">
                                        <Form.Check className="form-check">
                                            <Form.Check.Input type="checkbox" defaultValue="" />
                                            <Form.Check.Label>Remember me</Form.Check.Label>
                                        </Form.Check>
                                    </div>
                                    <Button type="button" variant='primary'>Submit</Button>{" "}
                                    <Button type="button" variant='danger'>Cancel</Button>
                                </Form>
                            </Card.Body>
                        </Card>

                        <Card>
                            <Card.Header>
                                <div className="header-title">
                                    <h4 className="card-title">Form Grid</h4>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Row>
                                        <Col>
                                            <Form.Control type="text" placeholder="First Name" />
                                        </Col>
                                        <Col>
                                            <Form.Control type="text" placeholder="Last Name" />
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Card>

                        <Card>
                            <Card.Header>
                                <div className="header-title">
                                    <h4 className="card-title">Input</h4>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="exampleInputText1">Input Text</Form.Label>
                                        <Form.Control type="text" id="exampleInputText1" defaultValue="Mark Jhon" placeholder="Enter Name" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="exampleInputEmail3">Email Input</Form.Label>
                                        <Form.Control type="email" id="exampleInputEmail3" defaultValue="markjhon@gmail.com" placeholder="Enter Email" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="exampleInputurl">URL Input</Form.Label>
                                        <Form.Control type="url" id="exampleInputurl" defaultValue="https://getbootstrap.com" placeholder="Enter Url" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="exampleInputurl">Teliphone Input</Form.Label>
                                        <Form.Control type="tel" id="exampleInputnumber" defaultValue="1-(555)-555-5555" placeholder="1-(555)-555-5555" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="exampleInputphone">Number Input</Form.Label>
                                        <Form.Control type="url" id="exampleInputphone" defaultValue="2356" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="exampleInputPassword3">Password Input</Form.Label>
                                        <Form.Control type="password" id="exampleInputPassword3" defaultValue="markjhon123" placeholder="Enter Password" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="exampleInputdate">Date Input</Form.Label>
                                        <Form.Control type="date" id="exampleInputdate" defaultValue="2019-12-18" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="exampleInputmonth">Month Input</Form.Label>
                                        <Form.Control type="month" id="exampleInputmonth" defaultValue="2019-12" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="exampleInputweek">Week Input</Form.Label>
                                        <Form.Control type="week" id="exampleInputweek" defaultValue="2019-W46" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="exampleInputtime">Time Input</Form.Label>
                                        <Form.Control type="time" id="exampleInputtime" defaultValue="13:45" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="exampleInputdatetime">Date and Time Input</Form.Label>
                                        <Form.Control type="datetime-local" id="exampleInputdatetime" defaultValue="2019-12-19T13:45:00" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="exampleFormControlTextarea1">Example textarea</Form.Label>
                                        <Form.Control as="textarea" id="exampleFormControlTextarea1" rows="3" />
                                    </Form.Group>
                                    <Button type="button" variant='primary'>Submit</Button>{" "}
                                    <Button type="button" variant='danger'>Cancel</Button>
                                </Form>
                            </Card.Body>
                        </Card>

                        <Card>
                            <Card.Header>
                                <div className="header-title">
                                    <h4 className="card-title">Input Size</h4>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="colFormLabelSm">Small</Form.Label>
                                        <Form.Control type="email" className="form-control-sm" id="colFormLabelSm" placeholder="form-control-sm" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="colFormLabel">Default</Form.Label>
                                        <Form.Control type="email" id="colFormLabel" placeholder="form-control" />
                                    </Form.Group>
                                    <Form.Group className="mb-0">
                                        <Form.Label htmlFor="colFormLabellg">Large</Form.Label>
                                        <Form.Control type="email" className="form-control-lg" id="colFormLabellg" placeholder="form-control-lg" />
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>

                        <Card>
                            <Card.Header>
                                <div className="header-title">
                                    <h4 className="card-title">Select Size</h4>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Small</Form.Label>
                                        <Form.Select className="form-select-sm mb-3 shadow-none">
                                            <option defaultValue="">Open this select menu</option>
                                            <option defaultValue="1">One</option>
                                            <option defaultValue="2">Two</option>
                                            <option defaultValue="3">Three</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Default</Form.Label>
                                        <Form.Select className="form-select mb-3 shadow-none">
                                            <option defaultValue="">Open this select menu</option>
                                            <option defaultValue="1">One</option>
                                            <option defaultValue="2">Two</option>
                                            <option defaultValue="3">Three</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-0">
                                        <Form.Label>Large</Form.Label>
                                        <Form.Select className="form-select-lg shadow-none">
                                            <option defaultValue="" >Open this select menu</option>
                                            <option defaultValue="1">One</option>
                                            <option defaultValue="2">Two</option>
                                            <option defaultValue="3">Three</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={12} lg="6">
                        <Card>
                            <Card.Header>
                                <div className="header-title">
                                    <h4 className="card-title">Horizontal Form</h4>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <Form className="form-horizontal">
                                    <Form.Group className="mb-3">
                                        <Row className="align-items-center">
                                            <Col sm="3">
                                                <Form.Label className="control-label m-0" htmlFor="email11">Email:</Form.Label>
                                            </Col>
                                            <Col sm="9">
                                                <Form.Control type="email" id="email11" placeholder="Enter Your Email" />
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Row className="align-items-center">
                                            <Col sm="3">
                                                <Form.Label className="control-label m-0" htmlFor="pwd2">Password:</Form.Label>
                                            </Col>
                                            <Col sm="9">
                                                <Form.Control type="password" id="pwd2" placeholder="Enter Your Password" />
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <div className="checkbox mb-3">
                                            <Form.Check className="form-check">
                                                <Form.Check.Input type="checkbox" defaultValue="" />
                                                <Form.Check.Label>Remember me</Form.Check.Label>
                                            </Form.Check>
                                        </div>
                                    </Form.Group>
                                    <Button type="button" variant='primary'>Submit</Button>{" "}
                                    <Button type="button" variant='danger'>Cancel</Button>
                                </Form>
                            </Card.Body>
                        </Card>

                        <Card>
                            <Card.Header>
                                <div className="header-title">
                                    <h4 className="card-title">Form row</h4>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <Form className="form-horizontal">
                                    <Row className="align-items-center">
                                        <Col>
                                            <Form.Control type="text" placeholder="First Name" />
                                        </Col>
                                        <Col>
                                            <Form.Control type="text" placeholder="Last Name" />
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Card>

                        <Card>
                            <Card.Header>
                                <div className="header-title">
                                    <h4 className="card-title">Input</h4>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="exampleInputDisabled1">Disabled Input</Form.Label>
                                        <Form.Control type="text" id="exampleInputDisabled1" disabled defaultValue="Mark Jhon" />
                                    </Form.Group>
                                </Form>
                                <Card.Body>
                                    <Form className="form-horizontal">
                                        <Row className='form-group'>
                                            <Form.Label className="control-label col-sm-3 align-self-center mb-0" htmlFor="email">Email:</Form.Label>
                                            <Col sm={9}>
                                                <Form.Control type="email" placeholder="Enter Your Email" />
                                            </Col>
                                        </Row>
                                        <Row className='form-group'>
                                            <Form.Label className="control-label col-sm-3 align-self-center mb-0" htmlFor="pwd1">Password:</Form.Label>
                                            <Col sm={9}>
                                                <Form.Control type="password" id="pwd1" placeholder="Enter Your Password" />
                                            </Col>
                                        </Row>
                                        <Form.Group className="form-group">
                                            <div className="checkbox mb-3">
                                                <Form.Check className="form-check">
                                                    <Form.Check.Input type="checkbox" defaultValue="" />
                                                    <Form.Check.Label>Remember me</Form.Check.Label>
                                                </Form.Check>
                                            </div>
                                        </Form.Group>
                                        <Form.Group className="form-group">
                                            <Button type="button" variant='primary'>Submit</Button>{" "}
                                            <Button type="button" variant='danger'>Cancel</Button>
                                        </Form.Group>
                                    </Form>
                                </Card.Body>
                            </Card.Body>
                            <Card>
                                <Card.Header>
                                    <div className="header-title">
                                        <h4 className="card-title">Form row</h4>
                                    </div>
                                </Card.Header>
                                <Card.Body>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="exampleInputReadonly">Readonly</Form.Label>
                                            <Form.Control type="text" id="exampleInputReadonly" readOnly defaultValue="Mark Jhon" />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="exampleInputcolor">Input Color</Form.Label>
                                            <input type="color" className="form-control" id="exampleInputcolor" defaultValue="#50b5ff" style={{ padding: '.5rem 1rem' }} />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="exampleFormControlSelect1">Select Input</Form.Label>
                                            <Form.Select id="exampleFormControlSelect1" >
                                                <option defaultValue="" disabled="">Select Your Age</option>
                                                <option defaultValue="">0-18</option>
                                                <option defaultValue="">18-26</option>
                                                <option defaultValue="">26-46</option>
                                                <option defaultValue="">46-60</option>
                                                <option defaultValue="">Above 60</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="choices-single-default">Select Input New</Form.Label>
                                            <Form.Select data-trigger id="choices-single-default" >
                                                <option defaultValue="">This is a placeholder</option>
                                                <option defaultValue="Choice 1">Choice 1</option>
                                                <option defaultValue="Choice 2">Choice 2</option>
                                                <option defaultValue="Choice 3">Choice 3</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="choices-multiple-default">Default</Form.Label>
                                            <Form.Select data-trigger id="choices-multiple-default" multiple >
                                                <option defaultValue="Choice 1">Choice 1</option>
                                                <option defaultValue="Choice 2">Choice 2</option>
                                                <option defaultValue="Choice 3">Choice 3</option>
                                                <option defaultValue="Choice 4" disabled>Choice 4</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="exampleFormControlSelect2">Example Multiple Select</Form.Label>
                                            <Form.Select data-trigger id="exampleFormControlSelect2" multiple >
                                                <option defaultValue="">select-1</option>
                                                <option defaultValue="">select-2</option>
                                                <option defaultValue="">select-3</option>
                                                <option defaultValue="">select-4</option>
                                                <option defaultValue="">select-5</option>
                                                <option defaultValue="">select-6</option>
                                                <option defaultValue="">select-7</option>
                                                <option defaultValue="">select-8</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="customRange1">Range Input</Form.Label>
                                            <input type="range" id="customRange1" className="form-range" />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <div className="form-check d-block">
                                                <Form.Check id="flexCheckDefault11" />
                                                <Form.Check.Label htmlFor="flexCheckDefault11">Default checkbox</Form.Check.Label>
                                            </div>
                                            <div className="form-check d-block">
                                                <Form.Check id="flexCheckChecked11" defaultChecked />
                                                <Form.Check.Label htmlFor="flexCheckChecked11">Checked checkbox</Form.Check.Label>
                                            </div>
                                            <div className="form-check d-block">
                                                <Form.Check id="flexCheckDisabled" disabled />
                                                <Form.Check.Label htmlFor="flexCheckDisabled">Disabled checkbox</Form.Check.Label>
                                            </div>
                                            <div className="form-check d-block">
                                                <Form.Check id="flexCheckCheckedDisabled" disabled defaultChecked />
                                                <Form.Check.Label htmlFor="flexCheckCheckedDisabled">Disabled checked checkbox</Form.Check.Label>
                                            </div>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <div className="form-check d-block">
                                                <Form.Check.Input type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                                <Form.Check.Label htmlFor="flexRadioDefault1">
                                                    Default radio
                                                </Form.Check.Label>
                                            </div>
                                            <div className="form-check d-block">
                                                <Form.Check.Input type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked />
                                                <Form.Check.Label htmlFor="flexRadioDefault2">
                                                    Default checked radio
                                                </Form.Check.Label>
                                            </div>
                                            <div className="form-check d-block">
                                                <Form.Check.Input type="radio" name="flexRadioDisabled" id="flexRadioDisabled" disabled />
                                                <Form.Check.Label htmlFor="flexRadioDisabled">
                                                    Disabled radio
                                                </Form.Check.Label>
                                            </div>
                                            <div className="form-check d-block">
                                                <Form.Check.Input type="radio" name="flexRadioCheckedDisabled" id="flexRadioCheckedDisabled" disabled checked />
                                                <Form.Check.Label htmlFor="flexRadioCheckedDisabled">
                                                    Disabled checked radio
                                                </Form.Check.Label>
                                            </div>
                                            <div className="form-check d-block">
                                                <Form.Check.Input type="radio" name="customRadio5" id="customRadio5" disabled checked />
                                                <Form.Check.Label htmlFor="customRadio5">
                                                    Selected and  disabled radio
                                                </Form.Check.Label>
                                            </div>
                                        </Form.Group>
                                        <Form.Group className="form-group">
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <input type="radio" id="customRadio6" name="customRadio1" className="custom-control-input me-1" />{' '}
                                                <label className="custom-control-label" for="customRadio6"> Default radio</label>
                                            </div>
                                            <Form.Group className="form-group">
                                                <Form.Check className="d-block">
                                                    <Form.Check.Input type="checkbox" defaultValue="" id="flexCheckDefault2" />
                                                    <Form.Check.Label htmlFor="flexCheckDefault2">
                                                        Default checkbox
                                                    </Form.Check.Label>
                                                </Form.Check>
                                                <Form.Check className="d-block">
                                                    <Form.Check.Input type="checkbox" defaultValue="" id="flexCheckChecked" defaultChecked />
                                                    <Form.Check.Label htmlFor="flexCheckChecked">
                                                        Checked checkbox
                                                    </Form.Check.Label>
                                                </Form.Check>
                                                <Form.Check className="d-block">
                                                    <Form.Check.Input type="checkbox" defaultValue="" id="flexCheckDisabled" disabled />
                                                    <Form.Check.Label htmlFor="flexCheckDisabled">
                                                        Disabled checkbox
                                                    </Form.Check.Label>
                                                </Form.Check>
                                                <Form.Check className="d-block">
                                                    <Form.Check.Input type="checkbox" defaultValue="" id="flexCheckCheckedDisabled" defaultChecked disabled />
                                                    <Form.Check.Label htmlFor="flexCheckCheckedDisabled">
                                                        Disabled checked checkbox
                                                    </Form.Check.Label>
                                                </Form.Check>
                                            </Form.Group>
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <input type="radio" id="customRadio8" name="customRadio6" className="custom-control-input me-1" defaultChecked />{' '}
                                                <label className="custom-control-label" for="customRadio8"> Selected radio</label>
                                            </div>
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <input type="radio" id="customRadio9" name="customRadio7" className="custom-control-input me-1" disabled />{' '}
                                                <label className="custom-control-label" for="customRadio9"> disabled radio</label>
                                            </div>
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <input type="radio" id="customRadio10" name="customRadio8" className="custom-control-input me-1" disabled defaultChecked />{' '}
                                                <label className="custom-control-label" for="customRadio10"> Selected and  disabled radio</label>
                                            </div>
                                        </Form.Group>
                                        <Form.Group className="form-group">
                                            <div className="form-check form-switch">
                                                <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                                                <label className="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label>
                                            </div>
                                            <Form.Label className="custom-file-input">Choose File</Form.Label>
                                            <Form.Control type="file" id="customFile1" />
                                        </Form.Group>
                                        <Form.Group className="form-group mb-3">
                                            <Form.Label className="custom-file-input">Example File Input</Form.Label>
                                            <Form.Control type="file" id="customFile1" />
                                        </Form.Group>
                                        <Form.Group className="mb-3 form-group">
                                            <Form.Label className="custom-file-input">Choose File</Form.Label>
                                            <Form.Control type="file" id="customFile" />
                                        </Form.Group>
                                        <Button type="button" variant='primary'>Submit</Button>{" "}
                                        <Button type="button" variant='danger'>Cancel</Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Fragment>
    )
}

export default FormElement
