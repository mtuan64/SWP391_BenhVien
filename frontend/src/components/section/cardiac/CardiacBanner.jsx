import React from 'react'
import { Col, Container, Row, Image } from 'react-bootstrap';

// Widgets
import Title from '../../widgets/Title';
import ButtonBox from '../../widgets/ButtonBox';

// Images
import bannerTruck from '/assets/images/cardiac/banner-truck.svg'
import cardiacBanner from '/assets/images/cardiac/cardiac-banner.webp'
import cardiacBannerPattern from '/assets/images/cardiac/cardiac-banner-pattern.webp'
import bannerCoupen from '/assets/images/cardiac/banner-coupen.svg'

export default function CardiacBanner() {
  return (
    <div className="cardiac-banner position-relative pt-xl-0 pt-5">
      <div className="bg-primary p-4 position-absolute bottom-0 start-0 shape-deliver-truck d-xl-inline-block d-none">
          <div className="ms-5">
              <Image src={bannerTruck} className="img-fluid" alt="banner-coupen" />
          </div>
      </div>
      <Container fluid className="pe-xl-0">
          <Row className="gx-0 h-100 position-relative">
            <Col lg="4" className="align-self-center">
              <div className="py-xl-5 pe-xl-5">
                <div className="no-sub-title big-font">
                  <Title rightText="Healthy Heart Keeps Dancing To " leftText="The Beats" titleDescription="Over a long period of work we have provided 1000’s of
                      clients a better life and helped to overcome mental illness" />
                </div>
              </div>
              <div className="position-absolute bottom-0 start-0 ms-5 ps-5 d-xl-block d-none">
                  <div className="ps-xxl-0 ms-xxl-0 ps-xl-5 ms-xl-5">
                      <p className="mt-0 mb-2 text-uppercase">emergency call</p>
                      <h4 className="mb-2 fw-500"><a href="tel:+2708229077">+ (270) 822-9077</a></h4>
                  </div>
              </div>
              <div className="d-xl-none">
                  <div className="ps-xxl-0 ms-xxl-0 ps-xl-5 ms-xl-5">
                      <p className="mt-0 mb-2 text-uppercase">emergency call</p>
                      <h4 className="mb-2 fw-500"><a href="tel:+2708229077">+ (270) 822-9077</a></h4>
                  </div>
              </div>
            </Col>
            <Col xl="4" sm="6" className="mh-100 mt-xl-0 mt-5">
              <div className="banner-img h-100">
                  <Image src={cardiacBanner} className="img-fluid h-100 object-cover" alt="banner" />
              </div>
            </Col>
            <Col xl="4" sm="6" className="mh-100 mt-xl-0 mt-5">
              <div className="pe-3 bg-secondary position-relative overflow-hidden h-100">
                  <div className="position-absolute top-0 start-0">
                      <Image src={cardiacBannerPattern} className="img-fluid"
                          alt="banner-pattern" />
                  </div>
                  <div className="position-absolute bottom-0 end-0">
                      <Image src={cardiacBannerPattern} className="img-fluid banner-pattern-reverse" alt="banner-pattern" />
                  </div>
                  <div className="d-flex flex-column h-100 p-5 m-md-5 justify-content-center position-relative">
                      <div className="p-xl-5">
                          <div className="mb-5">
                              <Image src={bannerCoupen} className="img-fluid" alt="banner-coupen" />
                          </div>
                          <span className="text-white fs-5"><span className="text-primary">Save $35</span> – Join By Wednesday And Get Offer In Medical Kit Worth For $10</span>
                          <div className="mt-5 pt-xl-5">
                              <div className="button-primary">
                                  <ButtonBox buttonText="Get Started" buttonUrl="/about-us" />
                              </div>
                          </div>
                          <span className="mt-2 d-inline-block text-white fst-italic fw-500 font-size-14">Cancel Anytime, Refund Generated</span>
                      </div>
                  </div>
              </div>
            </Col>
          </Row>
      </Container>
    </div>
  )
}
