import React from 'react'
import { Container } from 'react-bootstrap'

// Images
import aboutLeft from '/assets/images/pages/about-left.webp'

// widgets
import Title from '../components/widgets/Title'
import CountDown from '../components/widgets/CountDown'
import MailBox from '../components/widgets/MailBox'
import SocialMedia from '../components/widgets/SocialMedia'

export default function ComingSoon() {
  return (
    <div className="section-padding vh-100 rtl-image-flip" style={{background:` url(${aboutLeft})`, backgroundSize: `cover`, backgroundRepeat: `no-repeat`, position: `relative`, minHeight:`500px`}}>
      <Container fluid className="h-100 rtl-image-flip-container">
        <div className="d-flex flex-column justify-content-center h-100">
          <Title subTitle="STAY TUNED" rightText="Website " leftText="Coming Soon" titleDescription="We are almost there, if you want to get notifieed when our website goes live subscribe to our newsletter." />
          <CountDown timeDuration="30-05-2025" />
          <div className="mail-box-width pt-5">
            <MailBox />
          </div>
          <SocialMedia isLabelHide={true} customClass="mt-4 mb-3" />
        </div>
      </Container>
    </div>
  )
}
