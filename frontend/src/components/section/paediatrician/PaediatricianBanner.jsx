import React from 'react'
import { Col, Row, Container, Image } from 'react-bootstrap';

// Widgets
import Title from '../../widgets/Title';
import ButtonBox from '../../widgets/ButtonBox';

// Images
import Banner from '/assets/images/paediatrician/banner.webp';

export default function PaediatricianBanner() {
  return (
    <div className="section-padding position-relative overflow-hidden px-0">
      <Container fluid className="position-relative paediatrician-banner">
        <Row className="align-items-center">
          <Col lg="7"></Col>
          <Col lg="5">
            <div className="margin-bottom-165">
              <div className="no-sub-title big-font mb-5 pb-0 pb-lg-3">
                <Title subTitle="why choose us" rightText="A Whole New Way To Treat" leftText=" Your Child" titleDescription="Over a long period of work we have provided 1000’s of clients a better life and helped to
                  overcome mental illness" />
              </div>
              <div className="button-primary">
                <ButtonBox buttonUrl="/about-us" buttonText="Explore More" />
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <div className="d-flex align-items-center gap-2">
                <div>
                  <span>call to ask any question</span>
                  <h5 className="mt-1 fw-500">+144 01234 56897</h5>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="51" viewBox="0 0 50 51" fill="none">
                  <rect y="0.5" width="50" height="50" rx="25" fill="#DA8566" fillOpacity="0.5"></rect>
                  <rect x="5" y="6" width="40" height="40" rx="20" fill="#DA8566" fillOpacity="0.7"></rect>
                  <rect x="10" y="11" width="30" height="30" rx="15" fill="#DA8566"></rect>
                  <path fillRule="evenodd" clipRule="evenodd"
                    d="M24.6882 26.3148C27.3475 28.9734 27.9508 25.8976 29.6441 27.5897C31.2765 29.2217 32.2147 29.5486 30.1465 31.6163C29.8874 31.8245 28.2414 34.3293 22.4567 28.5463C16.6713 22.7625 19.1747 21.1148 19.383 20.8558C21.4562 18.7824 21.7776 19.7261 23.41 21.3581C25.1032 23.0508 22.0288 23.6561 24.6882 26.3148Z"
                    stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="banner-image position-absolute top-0 h-100">
        <Image src={Banner} alt="banner" className="img-fluid w-100 h-100 rtl-image-flip" style={{objectFit: `cover`}}/>
        <div className="background-overlay position-absolute top-0 start-0 w-100 h-100"></div>
      </div>
    </div>
  )
}
