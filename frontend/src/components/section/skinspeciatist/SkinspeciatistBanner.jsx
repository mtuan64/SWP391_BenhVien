import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'

// Widgets
import Title from '../../widgets/Title'
import ScrollingText from '../../widgets/ScrollingText'
import ButtonBox from '../../widgets/ButtonBox'
import FilterRating from '../../widgets/FilterRating'

// Images
import skinSpecialistBanner from '/assets/images/skin-specialist/skin-specialist-banner.webp'

export default function SkinspeciatistBanner() {
  return (
    <div className="skin-specialist-banner position-relative overflow-hidden">
      <Container fluid>
        <Row className="align-items-center gy-3">
          <Col lg="5">
            <div className="no-sub-title big-font py-lg-5">
              <Title rightText="The Quest To Have" leftText=" The Best Skin Is Here" titleDescription="It is a long established fact that a reader will
              be distracted by the readable content of a page when looking at its layout." />
              <div className="row align-items-center">
                <div className="col-xl-4 col-sm-6 pe-sm-2">
                    <div className="banner-btn text-lg-start text-sm-end text-center">
                      <div className="button-primary">
                          <ButtonBox buttonText="Read More" buttonUrl="/about-us" />
                      </div>
                    </div>
                </div>
                <div className="col-xl-5 col-sm-6 ps-sm-2 mt-sm-0 mt-4">
                    <div className="d-flex align-items-center justify-content-sm-start justify-content-center">
                      <h2 className="mb-0">4.5</h2>
                      <div className="ps-3">
                          <FilterRating rating={5} />
                          <h6 className="mt-1">201 Reviews</h6>
                      </div>
                    </div>
                </div>
                <div className="col-xl-3 d-xl-block d-none">
                </div>
              </div>
            </div>
          </Col>
          <Col lg="1"></Col>
          <Col lg="6">
            <div className="banner-image">
              <Image src={skinSpecialistBanner} alt="banner" className="img-fluid rtl-image-flip" />
            </div>
            <div className="banner-right-text">
              <ScrollingText scrollTitle="beauty" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
