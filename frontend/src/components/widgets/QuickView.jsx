import React, { Fragment, useState } from 'react'
import { Image, Modal, Row, Col } from 'react-bootstrap'

import CounterButton from './counterButton';
import ButtonBox from './ButtonBox';

export default function QuickView({IsNew, IsSale, productData, ...props}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Fragment>
      <Modal id="woosq-popup" centered show={props.showModal} onHide={()=>props.closeModal()}>
        <Modal.Header closeButton className="border-0 position-absolute end-0 top-0 z-1">
        </Modal.Header>
        <Modal.Body className="p-0">
          <Row className="align-items-center">
              <Col md="6">
                <Image src={productData.productImage} alt="shop-img" className="img-fluid" />                
              </Col>
              <Col md="6">
                <div className="px-2 py-3 p-md-4">
                    <h3>{productData.productTitle}</h3>
                    <h5 className="fw-semibold mb-2">{productData.priceValue}</h5>
                    <p className="mb-0 line-count-2"> {productData.productDesc} </p>
                    <ul className="list-inline m-0 p-0 d-flex align-items-center gap-3 flex-wrap pt-0 pt-md-4 pb-5">
                      <li>
                        <CounterButton />
                      </li>
                      <li>
                        <ButtonBox buttonUrl="/shop/cart" buttonText="Add to Cart" />                        
                      </li>
                    </ul>
                    <div className="d-flex align-items-center">
                        <span>Categories :</span>
                        <h6 className="d-inline text-primary mb-0">{productData.productCategory}</h6>
                     </div>
                </div>
              </Col>
          </Row>
        </Modal.Body>
      </Modal>      
    </Fragment>
    
  )
}
