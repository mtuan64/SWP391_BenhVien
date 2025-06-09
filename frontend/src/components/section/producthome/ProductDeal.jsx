import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

// Widgets
import Title from '../../widgets/Title';
import ButtonBox from '../../widgets/ButtonBox';
import CountDown from '../../widgets/CountDown';

// Images
import Dealoftheday1 from '/assets/images/product-home/Deal-of-the-day-1.jpg'

export default function ProductDeal() {
  return (
    <div className="section-padding rtl-image-flip" style={{background: `url(${Dealoftheday1})`, backgroundRepeat: `no-repeat`, backgroundPosition: `center center`, backgroundSize: `cover`}}>
      <Container className="rtl-image-flip-container">
        <Row>
          <Col lg="5" md={5}>
            <Title subTitle="Product" rightText="Deal of " leftText="The Week" titleDescription="At vero eos et accusamus et iusto odio dignissimos ducimus qui" />
            <CountDown timeDuration="30-05-2025" />
            <div className="button-primary mt-xl-5">
              <ButtonBox buttonText="Shop Home" buttonUrl="/shop/shop" />
            </div>
          </Col>
          <Col lg="5" className="d-lg-block d-none">
          </Col>
        </Row>
      </Container>
    </div>
  )
}
