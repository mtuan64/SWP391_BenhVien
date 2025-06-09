import React, { Fragment } from 'react'
import { Container, Button, Image, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

// Widgets
import BreadCrumb from '../../components/partial/BreadCrumb'
import CounterButton from '../../components/widgets/counterButton'

// Json
import {productData} from '../../staticData/productData'
import ButtonBox from '../../components/widgets/ButtonBox'

export default function Cart() {

  const handleDeleteClick = (event) => {
    const clickedButton = event.currentTarget;
  
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this item",
      icon: 'error',
      showCancelButton: true,
      backdrop: `rgba(60,60,60,0.8)`,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        clickedButton.closest('[data-item="list"]').remove();
        Swal.fire(
          'Deleted!',
          'Your item has been deleted.',
          'success'
        );
      }
    });
  };

  return (
    <Fragment>
      <BreadCrumb title="Cart" />
      <div className="cart-page section-padding">
        <Container>
          <div className="main-cart mb-3 mb-md-5 pb-0 pb-md-5">
            <ul className="cart-page-items d-flex justify-content-center list-inline align-items-center gap-3 gap-md-5 flex-wrap">
              <li className="cart-page-item active">
                <span className="cart-pre-heading badge cart-pre-number bg-primary border-radius rounded-circle me-1"> 1 </span>
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
              <li>
                <span className=" cart-pre-number bg-light border-radius rounded-circle me-1"> 2 </span>
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
          <div className="table-responsive">
            <table className="table cart-table">
              <thead className="border-bottom">
                <tr>
                    <th scope="col" className="fw-bold fs-5 text-primary"></th>
                    <th scope="col" className="fw-bold fs-5 text-primary">Product</th>
                    <th scope="col" className="fw-bold fs-5 text-primary">Price</th>
                    <th scope="col" className="fw-bold fs-5 text-primary">Quantity</th>
                    <th scope="col" className="fw-bold fs-5 text-primary">Subtotal</th>
                </tr>
              </thead>
              <tbody>
              {productData.slice(0, 3).map((item, index) => (
                <tr data-item="list" key={index}>
                    <td>
                    <Button className="btn btn-icon btn-danger btn-sm delete-btn bg-transparent text-primary border-0" onClick={(event) => handleDeleteClick(event)}>
                        <span className="btn-inner">
                          <i className="fas fa-times"></i>
                        </span>
                      </Button>
                    </td>
                    <td>
                      <div className="product-thumbnail">
                          <Link className="d-block mb-2" to="">
                            <Image className="avatar-80" src={item.productImage} alt="" />
                          </Link>
                          <span className="mt-2 text-primary">{item.productTitle}</span>
                      </div>
                    </td>
                    <td>
                      <span className="fs-5 fw-500">{item.priceValue}</span>
                    </td>
                    <td>
                      <CounterButton isSmall={true} />
                    </td>
                    <td>
                      <span className="sub-total fs-5 fw-500">$123</span>
                    </td>
                </tr>
              ))} 
              </tbody>
            </table>
          </div>
          <div className="coupon-main d-flex justify-content-between  gap-5 flex-wrap align-items-center pt-4 pb-5 border-bottom">
            <div className="wrap-coupon d-flex align-items-center gap-3 flex-wrap">
              <label>Coupon :</label>
              <Form.Control type="text" className="d-inline-block w-auto me-2" name="coupon_code" placeholder="Coupon code" />
              <div className=" d-inline-block">
                <ButtonBox buttonText="Apply Coupon" />
              </div>
            </div>
            <div className="button-primary">
                <ButtonBox buttonText="Update Cart" />
            </div>
          </div>
          <div className="cart_totals p-5 bg-primary-subtle">
            <h5 className="mb-3">Cart Totals</h5>
            <div className="css_prefix-woocommerce-cart-box table-responsive">
              <table className="table  border">
                <tbody>
                    <tr className="cart-subtotal">
                      <th className="border-0"><span className="text-dark fw-normal">Subtotal</span></th>
                      <td className="border-0">
                          <span className="fs-5 text-primary">$305</span>
                      </td>
                    </tr>
                    <tr className="order-total">
                      <th className="border-0"><strong>
                          <span className="fs-5 text-dark"> Total </span>      
                          </strong> 
                      </th>
                      <td className="border-0">
                          <span className="fs-5 text-primary">$305</span>
                      </td>
                    </tr>
                </tbody>
              </table>
              <div className="button-primary">
                <ButtonBox buttonText="Proceed to checkout" buttonUrl="/shop/checkout" />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Fragment>
  )
}
