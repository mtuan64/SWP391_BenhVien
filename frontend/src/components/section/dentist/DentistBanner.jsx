import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

// widgets
import Title from '../../widgets/Title'
import ButtonBox from '../../widgets/ButtonBox'
import IconboxColumn from '../../widgets/IconboxColumn'

// Images
import dentistBanner from '/assets/images/Dentist-Page/dentist-banner.webp'
import dentistBannerIco from '/assets/images/Dentist-Page/dentist-banner-icon.webp'
import dentistBannerPhone from '/assets/images/Dentist-Page/dentist-banner-phone.webp'

export default function DentistBanner() {
  return (
    <div className="banner-dentist-page">
      <Container fluid className="position-relative">
        <Row className="align-items-center">
          <Col lg="5" md="6">
            <div className="iq-title-box">
              <div className="no-sub-title big-font">
                <Title rightText="enjoy The beauty " leftText="of A Healthy Smile!" titleDescription="Sed ut perspiciatis unde omnis iste natus error sit
                voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                architecto" />
              </div>
              <div className="padding-top-60">
                <ButtonBox buttonUrl="/appointment" buttonText="Get appointment" />
              </div>
            </div>
          </Col>
          <Col lg="5" md="6">
            <div>
              <img src={dentistBanner} alt="" className="img-fluid rtl-image-flip" />
            </div>
          </Col>
          <Col lg="2" md="12">
            <img src={dentistBannerIco} alt=""
              className="img-fluid " />
            <p className="mt-4 text-dark">
              Get upto $25 off on your first appointment you book
            </p>
          </Col>
        </Row>
        <div className="icon-box-right position-absolute">
          <IconboxColumn iconboxImage={dentistBannerPhone} iconboxTitle="24 Hours Service" iconboxDesc="+144 01234 56897" />
        </div>
      </Container>
    </div>
  )
}