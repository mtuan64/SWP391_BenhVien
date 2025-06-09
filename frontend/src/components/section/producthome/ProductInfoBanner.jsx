import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

// Widgets
import Title from '../../widgets/Title';
import ButtonBox from '../../widgets/ButtonBox';

// Images
import banner from '/assets/images/product-home/banner.jpg'
import banner2 from '/assets/images/product-home/banner2.jpg'

export default function ProductInfoBanner() {
  return (
    <div className="mt-5">
      <Container fluid>
        <Row className="gy-4">
          <Col lg="6">
            <div className="p-5 rtl-image-flip" style={{background: `url(${banner})`, backgroundRepeat: `no-repeat`, backgroundPosition: `center center`, backgroundSize: `cover`}}>
              <div className="p-lg-5 rtl-image-flip-container">
                <Title subTitle="UPTO 50% OFF" rightText="Super Offer" titleDescription="amazing deals are here . Grab the offer" />
                <div className="button-primary pt-md-5">
                  <ButtonBox buttonText="Order Now" buttonUrl="/shop/shop" />
                </div>
              </div>
            </div>
          </Col>
          <Col lg="6">
            <div className="p-5 rtl-image-flip" style={{background: `url(${banner2})`, backgroundRepeat: `no-repeat`, backgroundPosition: `center center`, backgroundSize: `cover`}}>
              <div className="p-lg-5 rtl-image-flip-container">
                <Title subTitle="Now & Never" rightText="Upto 70% Off" titleDescription="amazing deals are here . Grab the offer" />
                <div className="pt-md-5">
                  <ButtonBox buttonText="Order Now" buttonUrl="/shop/shop" />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
