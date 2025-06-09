import React, { Fragment, useState } from 'react'
import { Col, Container, Row, Tab, Nav, Collapse, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// widget
import ButtonBox from '../../components/widgets/ButtonBox';
import BreadCrumb from '../../components/partial/BreadCrumb'

export default function MyAccount() {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const orderData = [
    {
        order: "#32604",
        date: "October 28, 2022",
        status: "Cancelled",
        total: "$215.00 For 0 Items"
    },
    {
        order: "#32584",
        date: "October 27, 2022",
        status: "On Hold",
        total: "$522.00 For 0 Items"
    },
    {
        order: "#31756",
        date: "October 19, 2022",
        status: "Processing",
        total: "$243.00 For 0 Items"
    },
    {
      order: "#23663",
      date: "October 7, 2022",
      status: "Completed",
      total: "$123.00 For 0 Items"
    },
    {
      order: "#23612",
      date: "October 7, 2022",
      status: "Completed",
      total: "$64.00 For 0 Items"
    },
    {
      order: "#19243",
      date: "April 1, 2022",
      status: "Completed",
      total: "$159.00 For 0 Items"
    }
  ]
  return (
    <Fragment>
      <BreadCrumb title="My Account" />
      <div className="section-padding service-details">
        <Container>
        <Tab.Container id="left-tabs-example" defaultActiveKey="dashboard">
            <Row>
              <Col lg="3" md="4">
                <div className="bg-primary-subtle p-4 mb-5 mb-lg-0 mb-md-0">
                  <div className="product-menu">
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item className="py-3 border-bottom">
                        <Nav.Link eventKey="dashboard" className="p-0 bg-transparent">
                          <i className="fas fa-tachometer-alt"></i><span className="ms-2">Dashboard</span>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item className="py-3 border-bottom">
                        <Nav.Link eventKey="orders" className="p-0 bg-transparent">
                          <i className="fas fa-list"></i><span className="ms-2">Orders</span>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item className="py-3 border-bottom">
                        <Nav.Link eventKey="downloads" className="p-0 bg-transparent">
                          <i className="fas fa-download"></i><span className="ms-2">Downloads</span>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item className="py-3 border-bottom">
                        <Nav.Link eventKey="address" className="p-0 bg-transparent">
                          <i className="fas fa-map-marker-alt"></i><span className="ms-2">Address</span>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item className="py-3 border-bottom">
                        <Nav.Link eventKey="account-details" className="p-0 bg-transparent">
                          <i className="fas fa-user"></i><span className="ms-2">Account details</span>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item className="pt-3">
                        <Nav.Link eventKey="logout" className="p-0 bg-transparent">
                          <i className="fas fa-sign-out-alt"></i><span className="ms-2">Logout</span>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </div>
                </div>
              </Col>
              <Col lg="9" md="8">
                <Tab.Content>
                  <Tab.Pane eventKey="dashboard">
                    <div className="myaccount-content bg-primary-subtle text-body p-4">
                      <p>Hello goldenmace (not goldenmace? <Link to="/auth/login">Log out</Link>)</p>
                      <p>From your account dashboard you can view your <Link to="javascript:void(0)">recent orders</Link>,
                          manage your <Link to="javascript:void(0)">shipping and billing addresses</Link>, and <Link
                            to="javascript:void(0)">edit your password and account details</Link>.
                      </p>
                    </div>
                  </Tab.Pane>

                  <Tab.Pane eventKey="orders">
                    <div className="orders-table bg-primary-subtle text-body p-4">
                      <div className="table-responsive">
                          <table className="w-100">
                            <thead>
                                <tr className="border-bottom">
                                  <th className="text-primary fw-bolder p-3">Order</th>
                                  <th className="text-primary fw-bolder p-3">Date</th>
                                  <th className="text-primary fw-bolder p-3">Status</th>
                                  <th className="text-primary fw-bolder p-3">Total</th>
                                  <th className="text-primary fw-bolder p-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                              {orderData.map((item, index) => (
                                  <tr className="border-bottom" key={index}>
                                    <td className="text-primary p-3 fs-6">{item.order}</td>
                                    <td className="p-3">{item.date}</td>
                                    <td className="p-3">{item.status}</td>
                                    <td className="p-3">{item.total}</td>
                                    <td className="text-primary p-3 fs-6">View</td>
                                  </tr>
                              ))}
                            </tbody>
                          </table>
                      </div>
                    </div>
                  </Tab.Pane>

                  <Tab.Pane eventKey="downloads">
                    <div className="orders-table bg-primary-subtle text-body p-4">
                      <div className="table-responsive">
                          <table className="w-100">
                            <thead>
                                <tr className="border-bottom">
                                  <th className="text-primary fw-bolder p-3">Product</th>
                                  <th className="text-primary fw-bolder p-3">Downloads Remaining</th>
                                  <th className="text-primary fw-bolder p-3">Expires</th>
                                  <th className="text-primary fw-bolder p-3">Download</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                  <td className="text-primary p-3 fs-6">Electric Toothbrush</td>
                                  <td className="p-3">∞</td>
                                  <td className="p-3 fs-6">Never</td>
                                  <td className="p-3"><Link to="#" className="p-2 bg-primary text-white fs-6" download>Product Demo</Link> </td>
                                </tr>
                            </tbody>
                          </table>
                      </div>
                    </div>
                  </Tab.Pane>

                  <Tab.Pane eventKey="address">
                    <div className="bg-primary-subtle text-body p-4">
                      <p className="my-3">The following addresses will be used on the checkout page by default.</p>
                      <div className="d-flex align-items-center justify-content-between my-5 gap-2 flex-wrap">
                          <h4 className="mb-0">Billing Address.</h4>
                          <Link
                            onClick={() => setOpen(!open)}
                            aria-controls="apply-coupon"
                            aria-expanded={open}
                            className="btn btn-primary"
                          >
                            Edit <i className="fas fa-chevron-right ms-1"></i>
                          </Link>                            
                      </div>
                      <Collapse in={open} id="edit-address-1">
                        <div className="primary-soft-dark p-4 text-body mb-4">
                            <Form>
                              <Form.Label className="mb-1">First name <span className="text-danger">*</span></Form.Label>
                              <Form.Control type="text" name="first-name" defaultValue="John" className="mb-5 rounded-0" required />
                              <Form.Label className="mb-1">Last name <span className="text-danger">*</span></Form.Label>
                              <Form.Control type="text" name="last-name" defaultValue="deo" className="mb-5 rounded-0" required />
                              <Form.Label className="mb-1">Company name (optional) <span className="text-danger">*</span></Form.Label>
                              <Form.Control type="text" name="company-name" defaultValue="Iqonic Design" className="mb-5 rounded-0" required />
                              <Form.Label className="mb-1">Country / Region <span className="text-danger">*</span></Form.Label>
                              <Form.Select aria-label="Default select example" className="mb-5">
                                <option >Choose a country</option>
                                <option value="1" selected>India</option>
                                <option value="2">United Kingdom</option>
                                <option value="3">United States</option>
                                <option value="3">Australia</option>
                                <option value="3">North Corea</option>
                              </Form.Select>
                              <Form.Label className="mb-1">Street address <span className="text-danger">*</span></Form.Label>
                              <Form.Control type="text" name="address" defaultValue="4517 Kentucky" className="mb-3 rounded-0" required />
                              <Form.Control type="text" name="address1" placeholder="Apartment, suite, unit, etc. (optional)" className="mb-5 rounded-0" required />
                              <Form.Label className="mb-1">Town / City <span className="text-danger">*</span></Form.Label>
                              <Form.Control type="text" name="city" defaultValue="Navsari" className="mb-5 rounded-0" required />
                              <Form.Label className="mb-1">State <span className="text-danger">*</span></Form.Label>
                              <Form.Select aria-label="Default select example" className="mb-5">
                                <option >Choose a State</option>
                                <option value="1" selected>Gujarat</option>
                                <option value="2">Delhi</option>
                                <option value="3">Goa</option>
                                <option value="3">Haryana</option>
                                <option value="3">Ladakh</option>
                              </Form.Select>
                              <Form.Label className="mb-1">PIN code <span className="text-danger">*</span></Form.Label>
                              <Form.Control type="text" name="pin code" defaultValue="396321" className="mb-5 rounded-0" required />
                              <Form.Label className="mb-1">Phone <span className="text-danger">*</span></Form.Label>
                              <Form.Control type="text" name="number" defaultValue="1234567890" className="mb-5 rounded-0" required />
                              <Form.Label className="mb-1">Email address <span className="text-danger">*</span></Form.Label>
                              <Form.Control type="email" name="email" defaultValue="johndeo@gmail.com" className="mb-5 rounded-0" required />
                              <div className="iq-btn-container button-primary">
                                <ButtonBox buttonText="Save Address" />
                              </div>
                            </Form>
                        </div>
                      </Collapse>
                      <div className="table-responsive">
                        <table className="edit-address w-100">
                           <tr>
                              <td className="label-name p-2">Name</td>
                              <td className="seprator p-2"><span>:</span></td>
                              <td className="p-2">john deo</td>
                           </tr>
                           <tr>
                              <td className="label-name p-2">Company</td>
                              <td className="seprator p-2"><span>:</span></td>
                              <td className="p-2">Iqonic Design</td>
                           </tr>
                           <tr>
                              <td className="label-name p-2">Country</td>
                              <td className="seprator p-2"><span>:</span></td>
                              <td className="p-2">India</td>
                           </tr>
                           <tr>
                              <td className="label-name p-2">Address</td>
                              <td className="seprator p-2"><span>:</span></td>
                              <td className="p-2">4517 Washington Ave, Manchester.</td>
                           </tr>
                           <tr>
                              <td className="label-name p-2">E-mail</td>
                              <td className="seprator p-2"><span>:</span></td>
                              <td className="p-2">johndeo@gmail.com</td>
                           </tr>
                           <tr>
                              <td className="label-name p-2">Phone</td>
                              <td className="seprator p-2"><span>:</span></td>
                              <td className="p-2">1234567890</td>
                           </tr>
                        </table>
                      </div>
                      <div className="d-flex align-items-center justify-content-between my-5 gap-2 flex-wrap">
                          <h4 className="mb-0">Shipping Address</h4>
                          <Link
                            onClick={() => setOpen1(!open1)}
                            aria-controls="apply-coupon"
                            aria-expanded={open}
                            className="btn btn-primary"
                          >
                            Edit <i className="fas fa-chevron-right ms-1"></i>
                          </Link>
                      </div>
                      <Collapse in={open1} id="edit-address-2">
                      <div className="primary-soft-dark p-4 text-body mb-4">
                            <Form>
                              <Form.Label className="mb-1">First name <span className="text-danger">*</span></Form.Label>
                              <Form.Control type="text" name="first-name" defaultValue="John" className="mb-5 rounded-0" required />
                              <Form.Label className="mb-1">Last name <span className="text-danger">*</span></Form.Label>
                              <Form.Control type="text" name="last-name" defaultValue="deo" className="mb-5 rounded-0" required />
                              <Form.Label className="mb-1">Company name (optional) <span className="text-danger">*</span></Form.Label>
                              <Form.Control type="text" name="company-name" defaultValue="Iqonic Design" className="mb-5 rounded-0" required />
                              <Form.Label className="mb-1">Country / Region <span className="text-danger">*</span></Form.Label>
                              <Form.Select aria-label="Default select example" className="mb-5">
                                <option >Choose a country</option>
                                <option value="1" selected>India</option>
                                <option value="2">United Kingdom</option>
                                <option value="3">United States</option>
                                <option value="3">Australia</option>
                                <option value="3">North Corea</option>
                              </Form.Select>
                              <Form.Label className="mb-1">Street address <span className="text-danger">*</span></Form.Label>
                              <Form.Control type="text" name="address" defaultValue="4517 Kentucky" className="mb-3 rounded-0" required />
                              <Form.Control type="text" name="address1" placeholder="Apartment, suite, unit, etc. (optional)" className="mb-5 rounded-0" required />
                              <Form.Label className="mb-1">Town / City <span className="text-danger">*</span></Form.Label>
                              <Form.Control type="text" name="city" defaultValue="Navsari" className="mb-5 rounded-0" required />
                              <Form.Label className="mb-1">State <span className="text-danger">*</span></Form.Label>
                              <Form.Select aria-label="Default select example" className="mb-5">
                                <option >Choose a State</option>
                                <option value="1" selected>Gujarat</option>
                                <option value="2">Delhi</option>
                                <option value="3">Goa</option>
                                <option value="3">Haryana</option>
                                <option value="3">Ladakh</option>
                              </Form.Select>
                              <Form.Label className="mb-1">PIN code <span className="text-danger">*</span></Form.Label>
                              <Form.Control type="text" name="pin code" defaultValue="396321" className="mb-5 rounded-0" required />
                              <Form.Label className="mb-1">Phone <span className="text-danger">*</span></Form.Label>
                              <Form.Control type="text" name="number" defaultValue="1234567890" className="mb-5 rounded-0" required />
                              <Form.Label className="mb-1">Email address <span className="text-danger">*</span></Form.Label>
                              <Form.Control type="email" name="email" defaultValue="johndeo@gmail.com" className="mb-5 rounded-0" required />
                              <div className="iq-btn-container button-primary">
                                <ButtonBox buttonText="Save Address" />
                              </div>
                            </Form>
                        </div>
                      </Collapse>
                      <div className="table-responsive">
                        <table className="edit-address w-100">
                           <tr>
                              <td className="label-name p-2">Name</td>
                              <td className="seprator p-2"><span>:</span></td>
                              <td className="p-2">john deo</td>
                           </tr>
                           <tr>
                              <td className="label-name p-2">Company</td>
                              <td className="seprator p-2"><span>:</span></td>
                              <td className="p-2">Iqonic Design</td>
                           </tr>
                           <tr>
                              <td className="label-name p-2">Country</td>
                              <td className="seprator p-2"><span>:</span></td>
                              <td className="p-2">India</td>
                           </tr>
                           <tr>
                              <td className="label-name p-2">Address</td>
                              <td className="seprator p-2"><span>:</span></td>
                              <td className="p-2">4517 Washington Ave, Manchester.</td>
                           </tr>
                           <tr>
                              <td className="label-name p-2">E-mail</td>
                              <td className="seprator p-2"><span>:</span></td>
                              <td className="p-2">johndeo@gmail.com</td>
                           </tr>
                           <tr>
                              <td className="label-name p-2">Phone</td>
                              <td className="seprator p-2"><span>:</span></td>
                              <td className="p-2">1234567890</td>
                           </tr>
                        </table>
                     </div>
                    </div>
                  </Tab.Pane>

                  <Tab.Pane eventKey="account-details">
                    <div className="bg-primary-subtle p-4 text-body">
                        <Form>
                          <Form.Label className="mb-1">First name <span className="text-danger">*</span></Form.Label>
                          <Form.Control type="text" name="first-name" defaultValue="John" className="mb-5 rounded-0" required />
                          <Form.Label className="mb-1">Last name <span className="text-danger">*</span></Form.Label>
                          <Form.Control type="text" name="last-name" defaultValue="deo" className="mb-5 rounded-0" required />
                          <Form.Label className="mb-1">Display name <span className="text-danger">*</span></Form.Label>
                          <Form.Control type="text" name="display-name" defaultValue="John" className="mb-1 rounded-0" required />
                          <em className="d-block mb-5">This will be how your name will be displayed in the account section and in reviews</em>
                          <Form.Label className="mb-1">Email address <span className="text-danger">*</span></Form.Label>
                          <Form.Control type="email" name="email" defaultValue="johndeo@gmail.com" className="mb-5 rounded-0" required />
                          <h4 className="fw-normal mb-5">Password change</h4>
                          <Form.Label className="mb-1">Current password (leave blank to leave unchanged) <span className="text-danger">*</span></Form.Label>
                          <Form.Control type="password" name="password" className="mb-5 rounded-0" required />
                          <Form.Label className="mb-1">New password (leave blank to leave unchanged) <span className="text-danger">*</span></Form.Label>
                          <Form.Control type="password" name="password" className="mb-5 rounded-0" required />
                          <Form.Label className="mb-1">Confirm new password <span className="text-danger">*</span></Form.Label>
                          <Form.Control type="password" name="password" className="mb-5 rounded-0" required />
                          <div className="iq-btn-container button-primary">
                            <ButtonBox buttonText="Save changes" />
                          </div>
                        </Form>
                    </div>
                  </Tab.Pane>

                  <Tab.Pane eventKey="logout">
                    <Row>
                      <Col md="6">
                        <h4 className="mb-5 text-primary">Login</h4>
                        <Form method="post">
                          <Form.Control type="text" name="user-name" className="mb-5 rounded-0" placeholder="Username or email address *" required />
                          <Form.Control type="password" name="pwd" className="mb-5 rounded-0" placeholder="Password" required />
                          <Form.Check
                              type="checkbox"
                              id="01"
                              label="Remember me"
                              className="mb-5"
                          />
                          <div className="iq-btn-container button-primary">
                              <ButtonBox buttonText="log in" />
                          </div>
                        </Form>
                        <Link to="/auth/reset-password" className="forgot-pwd text-primary mt-3 d-block">Lost your password?</Link>
                      </Col>
                      <Col md="6">
                        <h4 className="mb-5 mt-5 mt-lg-0 mt-md-0 text-primary">Register</h4>
                        <Form method="post">
                          <Form.Control type="text" name="user-name" className="mb-5 rounded-0" placeholder="Username  *" required />
                          <Form.Control type="email" name="email-address" className="mb-5 rounded-0" placeholder="Email address *" required />
                          <Form.Control type="password" name="pwd" className="mb-5 rounded-0" placeholder="Password *" required />
                          <p className="mb-5"> Your personal data will be used to support your experience
                              throughout this website, to manage access to your account, and for other purposes described in
                              our <Link to="/privacy-policy"> privcy policy</Link>. 
                           </p>
                          <div className="button-primary">
                              <ButtonBox buttonText="register" />
                          </div>
                        </Form>
                      </Col>
                    </Row>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </div>
    </Fragment>
  )
}
