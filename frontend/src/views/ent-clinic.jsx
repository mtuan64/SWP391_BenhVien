import React, { Fragment, useLayoutEffect } from 'react'

// Components
import EntClinicBanner from '../components/section/entclinic/EntclinicBanner';
import EntclinicAbout from '../components/section/entclinic/EntclinicAbout';
import EntclinicTreatment from '../components/section/entclinic/EntclinicTreatment';
import EntclinicFaq from '../components/section/entclinic/EntclinicFaq';
import EntclinicService from '../components/section/entclinic/EntclinicService';
import GlobalTeamStandard from '../components/section/global/GlobalTeamStandard';
import GlobalTestiminialCounter from '../components/section/global/GlobalTestiminialCounter';
import GlobalBlogOverlap from '../components/section/global/GlobalBlogOverlap';
import GlobalClientSlider from '../components/section/global/GlobalClientSlider';
import { Container } from 'react-bootstrap';

export default function EntClinic() {

  const css = `
  :root {
    --bs-primary: #304297;
    --bs-primary-bg-subtle: #e6e8f0;
    --bs-primary-rgb: 48, 66, 151;
    --bs-secondary: #ff6b3b;
    --bs-secondary-rgb: 255, 107, 59;
    --bs-primary-shade-20: #0a2d80;
  }
  `;

  useLayoutEffect(() => {
    // Create a new style element
    const styleElement = document.createElement('style');

    // Set the CSS text of the style element
    styleElement.textContent = css;

    // Append the style element to the head of the document
    let content = document.head.appendChild(styleElement);
    return () => {
      content.remove()
    }
  })
  
  return (
    <Fragment>
      {/* Banner */}
      <EntClinicBanner />

      {/* About Us */}
      <EntclinicAbout />

      {/* Treatments Iconbox */}
      <EntclinicTreatment />

      {/* Faq */}
      <EntclinicFaq />

      {/* Why Choose us */}
      <EntclinicService />

       {/* Team */}
       <GlobalTeamStandard />

       {/* Testimonial */}
       <GlobalTestiminialCounter />

        {/* blog */}
        <GlobalBlogOverlap />

        {/* Brand Logo */}
        <div className="section-padding pt-0">
          <Container>            
            <GlobalClientSlider />
          </Container>
        </div>

    </Fragment>
  )
}
