import React, { Fragment, useEffect } from 'react'
import BreadCrumb from '../components/partial/BreadCrumb';
// Components
import AboutIconBox from '../components/section/about/AboutIconBox';
import AboutUsBlock from '../components/section/about/AboutUsBlock';
import AboutTestimonial from '../components/section/about/AboutTestimonial';
import AboutHistory from '../components/section/about/AboutHistory';
import GlobalTeamOverlap from '../components/section/global/GlobalTeamOverlap';
import AboutService from '../components/section/about/AboutService';
import GlobalClientSlider from '../components/section/global/GlobalClientSlider';
import { Container } from 'react-bootstrap';

export default function AboutUs() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Fragment>
      <BreadCrumb title="About Us" />
      {/* box */}
      <AboutIconBox />

      {/* about */}
      <AboutUsBlock />

      {/* testimonial */}
      <AboutTestimonial />

      {/* history */}
      <AboutHistory />

      {/* team */}
      <GlobalTeamOverlap />

      {/* service */}
      <AboutService />

      {/* client */}
      <div className="section-padding">
        <Container>
          <GlobalClientSlider />
        </Container>
      </div>      

    </Fragment>
  )
}
