import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

// Widgets
import Title from '../../widgets/Title';
import ButtonBox from '../../widgets/ButtonBox';

// Images
import ProductHomeBanner from '/assets/images/product-home/product-home-banner.png'

export default function ProductBanner() {
  return (
    <div className="product-home-banner section-padding bg-primary-subtle position-relative px-0 rtl-image-flip" style={{background: `url(${ProductHomeBanner})`, backgroundRepeat: `no-repeat`, backgroundPosition: `top right`}}>
        <Container fluid className="h-100 rtl-image-flip-container">
          <Row className="align-items-center h-100">
            <Col lg="5">
              <div className="no-sub-title big-font">
                <Title rightText="Our Prices Make Your Heart" leftText=" Healthy Too" titleDescription="Nulla et aliquam arcu. Sed porttitor pellentesque ultricies. Vestibulum
                  ullamcorper erat eu mi lacinia, id elementum nunc blandit. Morbi sed enim porttitor, porta urna
                  eget, commodo nibh" />
              </div>
              <div className="pt-xl-5">
                <div className="button-primary">
                    <ButtonBox buttonText="Shop Home" buttonUrl="/shop/shop" />
                </div>
              </div>
            </Col>
            <Col lg="7" className="d-lg-block d-none"></Col>
          </Row>
        </Container>
    </div>
  )
}
