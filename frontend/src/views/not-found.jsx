import React from 'react'
import { Container, Row, Image } from 'react-bootstrap'

// Widget
import ButtonBox from '../components/widgets/ButtonBox'

// Images
import notFound from '/assets/images/pages/404.png'
import errorBg5 from '/assets/images/pages/error-bg-5.png'
import errorBg2 from '/assets/images/pages/error-bg-2.png'
import errorBg3 from '/assets/images/pages/error-bg-3.png'
import errorBg6 from '/assets/images/pages/error-bg-6.png'

export default function NotFound() {
  return (
    <div className="bg-primary-subtle vh-100 position-relative">
      <Container className="text-center">
        <Row className="flex-column justify-content-center align-items-center vh-100">
          <div style={{zIndex:`1`}}>
            <Image src={notFound} alt="404" className="img-fluid mb-5" /> 
            <p className="mt-5 text-center text-body">The Page You Requested Could Not Be Found Please Go Back To Homepage</p>
            <div className="button-primary">
              <ButtonBox buttonText="Back to Home" buttonUrl="/" />
            </div>
          </div>
        </Row>
      </Container>
      <div>
        <Image src={errorBg5} alt="img" className="position-absolute top-0 start-0 rtl-image-flip" />
        <Image src={errorBg2} alt="img" className="position-absolute error-bg-one rtl-image-flip" />
        <Image src={errorBg3} alt="img" className="position-absolute error-bg-two rtl-image-flip" />
        <Image src={errorBg6} alt="img" className="position-absolute bottom-0 end-0 rtl-image-flip" />
    </div>
    </div>
  )
}
