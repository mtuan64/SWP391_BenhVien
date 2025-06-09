import React, { Fragment } from 'react'
import { Container, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

// widgets
import BreadCrumb from '../../components/partial/BreadCrumb'

// Images
import product2 from '/assets/images/shop/product-2.webp'
import product5 from '/assets/images/shop/product-5.webp'
import product9 from '/assets/images/shop/product-9.webp'

export default function Wishlist() {
  
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

  const wishlistData = [
    {
      productImage: product2,
      productTitle: "Medical Box",
      unitPrice: "$92.00",
      stockStatus: "In Stock",
    },
    {
      productImage: product5,
      productTitle: "Stethoscope",
      unitPrice: "$72.00",
      stockStatus: "In Stock",
    },
    {
      productImage: product9,
      productTitle: "Asthma Inhaler",
      unitPrice: "$45.00",
      stockStatus: "Out of Stock",
    }
  ]
  return (
    <Fragment>
      <BreadCrumb title="Wishlist" />
      <div className="wishlist-page section-padding">
          <Container>
            <h3 className="mb-5">Your Wishlist</h3>
            <div className="table-responsive">
              <div className="table-responsive">
                  <table className="table cart-table">
                      <thead className="border-bottom">
                        <tr>
                            <th scope="col" className="fw-bold fs-5 text-primary"></th>
                            <th scope="col" className="fw-bold fs-5 text-primary px-3">Product Name</th>
                            <th scope="col" className="fw-bold fs-5 text-primary px-3">Unit Price</th>
                            <th scope="col" className="fw-bold fs-5 text-primary px-3">Stock Status</th>
                            <th scope="col" className="fw-bold fs-5 text-primary"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {wishlistData.map((item, index) => (
                          <tr data-item="list" key={index}>
                              <td>
                                <button className="btn btn-icon btn-danger btn-sm delete-btn bg-transparent text-primary border-0" onClick={(event) => handleDeleteClick(event)}>
                                  <span className="btn-inner fs-5">
                                    <i className="far fa-trash-alt"></i>
                                  </span>
                                </button>
                              </td>
                              <td>
                                <div className="product-thumbnail">
                                    <Link className="mb-2 me-3" to="">
                                      <Image className="avatar-80" src={item.productImage} alt="" />
                                    </Link>
                                    <span className="mt-2 text-primary">{item.productTitle}</span>
                                </div>
                              </td>
                              <td>
                                <span className="fs-5 fw-500">{item.unitPrice}</span>
                              </td>
                              <td>
                                <span className="text-success">{item.stockStatus}</span>
                              </td>
                              <td>
                                <Link to="/shop/checkout">
                                  <i className="fas fa-shopping-cart"></i>
                                </Link>
                              </td>
                          </tr>
                        ))}                      
                      </tbody>
                  </table>
              </div>
            </div>
            <div className="product-social-share mt-5">
              <h5 className="mb-3">Share:</h5>
              <ul className="list-inline m-0 p-0 d-flex flex-wrap align-items-center gap-2">
                  <li className="flex-shrink-0">
                    <Link to="https://www.facebook.com/" className="d-inline-block border-radius rounded-circle bg-primary text-white text-center" target="_blank">
                      <i className="fab fa-facebook-f"></i>
                    </Link>
                  </li>
                  <li className="flex-shrink-0">
                    <Link to="https://twitter.com/" className="d-inline-block border-radius rounded-circle bg-info text-white text-center" target="_blank">
                      <i className="fab fa-twitter"></i>
                    </Link>
                  </li>
                  <li className="flex-shrink-0">
                    <Link to="https://in.pinterest.com/" className="d-inline-block border-radius rounded-circle bg-danger text-white text-center" target="_blank">
                      <i className="fab fa-pinterest-p"></i>
                    </Link>
                  </li>
                  <li className="flex-shrink-0">
                    <Link to="https://iqonic.design/" className="d-inline-block border-radius rounded-circle bg-warning text-white text-center" target="_blank">
                      <i className="far fa-envelope"></i>
                    </Link>
                  </li>
                  <li className="flex-shrink-0">
                    <Link to="https://www.whatsapp.com/" className="d-inline-block border-radius rounded-circle bg-success text-white text-center" target="_blank">
                      <i className="fab fa-whatsapp"></i>
                    </Link>
                  </li>
              </ul>
            </div>
          </Container>
      </div>
    </Fragment>
  )
}
