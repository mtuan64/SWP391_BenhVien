import React from 'react'
import { Col, Container, Row, Image } from 'react-bootstrap'

// Widgets
import Title from '../../widgets/Title'
import ButtonBox from '../../widgets/ButtonBox'

// Images
import banner1 from '/assets/images/fertility-clinic/banner-1.webp'
import banner2 from '/assets/images/fertility-clinic/banner-2.webp'
import banner3 from '/assets/images/fertility-clinic/banner-3.webp'

export default function FertilityBanner() {
  return (
    <div className="frtility-clinic-banner">
      <Container fluid className="p-0">
        <div className="section-top">
          <h1 className="iq-title text-white fw-light">Dreaming of Parenthood?</h1>
        </div>
      </Container>
      <Container fluid className="px-xxl-0 px-md-5">
        <Row className="align-items-xxl-end banner-margin-top">
          <Col xxl="9" sm="6">
            <Row>
              <Col xxl="6" className="pe-xxl-5">
                <div className="pe-xxl-5">
                  <Image src={banner1} alt="banner-img"
                  className="img-fluid w-100 pe-xxl-5" />
                </div>
              </Col>
              <Col xxl="4" className="align-self-end py-5 px-3">
                <Title subTitle="WELCOME TO" rightText="KiviCare IVF" leftText=" Clinic" titleDescription="We are among the largest service providers in fertility
                treatment. KiviCare aims to make parenthood spell immeasurable amount of LOVE." />
                <div className="button-primary">
                  <ButtonBox buttonUrl="/appointment" buttonText="appointment" />
                </div>
              </Col>
              <Col xxl="2"></Col>
            </Row>
          </Col>
          <Col xxl="3" sm="6" className='d-sm-block d-none'>
            <div className="px-xxl-5">
              <Image src={banner2} alt="" className="img-fluid w-100 " />
              <Image src={banner3} alt="" className="img-fluid w-100 pt-5" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
