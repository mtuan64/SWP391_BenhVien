import React, { Fragment, useState } from 'react'
import { Container, Collapse, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom';

// widget
import BreadCrumb from '../../components/partial/BreadCrumb'
import ButtonBox from '../../components/widgets/ButtonBox';

export default function Checkout() {
  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <BreadCrumb title="Checkout" />
      <div className="checkout-page section-padding">
        <Container>
          <div className="main-cart mb-3 mb-md-5 pb-0 pb-md-5">
            <ul className="cart-page-items d-flex justify-content-center list-inline align-items-center gap-3 gap-md-5 flex-wrap">
              <li className="cart-page-item">
                <span className="cart-pre-heading badge cart-pre-number bg-light border-radius rounded-circle me-1"> 1 </span>
                <span className="cart-page-link "> Shopping Cart </span>
              </li>
              <li>
                <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd"
                     d="M12 21.2498C17.108 21.2498 21.25 17.1088 21.25 11.9998C21.25 6.89176 17.108 2.74976 12 2.74976C6.892 2.74976 2.75 6.89176 2.75 11.9998C2.75 17.1088 6.892 21.2498 12 21.2498Z"
                     stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                     strokeLinejoin="round"></path>
                  <path d="M10.5576 15.4709L14.0436 11.9999L10.5576 8.52895" stroke="currentColor"
                     strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </li>
              <li className="active">
                <span className="cart-pre-numberbadge cart-pre-number bg-primary text-white border-radius rounded-circle me-1"> 2 </span>
                <span className="cart-page-link "> Checkout </span>
              </li>
              <li>
                <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                      d="M12 21.2498C17.108 21.2498 21.25 17.1088 21.25 11.9998C21.25 6.89176 17.108 2.74976 12 2.74976C6.892 2.74976 2.75 6.89176 2.75 11.9998C2.75 17.1088 6.892 21.2498 12 21.2498Z"
                      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                      strokeLinejoin="round"></path>
                    <path d="M10.5576 15.4709L14.0436 11.9999L10.5576 8.52895" stroke="currentColor"
                      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </li>
              <li>
                <span className=" cart-pre-number bg-light border-radius rounded-circle me-1"> 3 </span>
                <span className="cart-page-link "> Order Summary </span>
              </li>
            </ul>
          </div>
          <div className="mb-5">
            <div className="px-3 py-3 bg-primary-subtle border-3 border-top border-primary d-flex align-items-center gap-3 flex-wrap">
                <span className="text-primary"><i className="far fa-window-maximize"></i></span>
                <span className="text-body">Have a coupon?</span>
                <Link
                  onClick={() => setOpen(!open)}
                  aria-controls="apply-coupon"
                  aria-expanded={open}
                  className="text-primary"
                >
                  Click here to enter your code
                </Link>
            </div>            
          </div>
          <Collapse in={open}>
            <div id="apply-coupon">
              <Form className="checkout-coupon bg-primary-subtle text-body px-3 py-5 mb-5">
                <p className="mt-0">If you have a coupon code, please apply it below.</p>
                <Form.Control type="text" name="coupon-code" required placeholder="Coupon code" className="rounded-0 mb-3" />
                <div className="iq-btn-container button-primary">
                    <ButtonBox buttonText="APPLY COUPON" />
                </div>
              </Form>
            </div>
          </Collapse>
          <Form action='/shop/order-recived'>
            <h3 className="mb-3">Billing details</h3>
            <Form.Control name="first-name" type="text" required placeholder="First Name" className="rounded-0 mb-3" />
            <Form.Control name="Last-name" type="text" required placeholder="Last Name" className="rounded-0 mb-3" />
            <Form.Control name="billing-company" type="text" required placeholder="Company" className="rounded-0 mb-3" />
            <div className="mb-3">
              <Form.Select aria-label="Default select example">
                <option value="1" selected>India</option>
                <option value="2">United Kingdom</option>
                <option value="3">United States</option>
                <option value="4">Australia</option>
                <option value="5">North Corea</option>
              </Form.Select>
            </div>
            <Form.Control name="billing-address" type="text" required placeholder="House number and street name" className="rounded-0 mb-3" />
            <Form.Control name="billing-address2" type="text" required placeholder="Apartment, suite, unit, etc. (optional)" className="rounded-0 mb-3" />
            <Form.Control name="city" type="text" required placeholder="Town / City" className="rounded-0 mb-3" />
            <div className="mb-3">
              <Form.Select aria-label="Default select example">
                <option value="1" selected>Colorado</option>
                <option value="2">Alaska</option>
                <option value="3">Hawai</option>
                <option value="4">Texas</option>
                <option value="5">Washington</option>
              </Form.Select>
            </div>
            <Form.Control name="postcode" type="text" required placeholder="ZIP Code" className="rounded-0 mb-3" />
            <Form.Control name="phone" type="text" required placeholder="Phone Number" className="rounded-0 mb-3" />
            <Form.Control name="billing-company" type="text" required placeholder="E-mail Address" className="rounded-0 mb-5" />

            <h3 className="mb-3">Additional Information</h3>
            <label>Order notes (optional)</label>
            <div className="mb-5">
              <Form.Control as="textarea" rows={3} name="your-message" placeholder="Your Message" className="mb-5" required />
            </div>

            <h3 className="mb-3">Your Order</h3>
            <div className="checkout-review-order">
              <div className="table-responsive">
                <table className="w-100">
                  <tbody>
                     <tr className="border-bottom">
                        <td className="ps-0 p-3">Contact Lenses QTY: 1</td>
                        <td className="pe-0 p-3 text-end">$19.00</td>
                     </tr>
                     <tr className="border-bottom">
                        <td className="ps-0 p-3">Asthma Inhaler QTY: 1</td>
                        <td className="pe-0 p-3 text-end">$45.00</td>
                     </tr>
                  </tbody>
                  <tfoot>
                     <tr className="border-bottom">
                        <td className="ps-0 p-3 fw-bold text-primary">Subtotal</td>
                        <td className="pe-0 p-3 fw-bold text-end">
                           <h5 className="text-primary mb-0">$64.00</h5>
                        </td>
                     </tr>
                     <tr className="border-bottom">
                        <td className="ps-0 p-3 fw-bold text-primary">Total</td>
                        <td className="pe-0 p-3 fw-bold text-end">
                           <h5 className="text-primary mb-0">$64.00</h5>
                        </td>
                     </tr>
                  </tfoot>
                </table>
                <div className="checkout-payment my-4 py-3">
                    <label>Cash on delivery</label>
                    <div className="payment-box my-3 p-3 bg-primary-subtle text-body position-relative">
                      <p className="mb-0">Pay with cash upon delivery.</p>
                    </div>
                    <hr className="my-5" />
                    <p className="my-3">
                      Your personal data will be used to process your order, support your experience
                      throughout this website, and for other purposes described in our
                    </p>
                    <ButtonBox buttonText="Place Order" />
                </div>
              </div>
            </div>
          </Form>
        </Container>
      </div>
    </Fragment>
  )
}
