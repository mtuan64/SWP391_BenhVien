import React, { Fragment, useLayoutEffect, useEffect, useRef } from 'react'

// Components
import PsychiatristBanner from '../components/section/psychiatrist/PsychiatristBanner';
import PsychiatristAbout from '../components/section/psychiatrist/PsychiatristAbout';
import PsychiatristPanel from '../components/section/psychiatrist/PsychiatristPanel';
import PsychiatristWhyChoose from '../components/section/psychiatrist/PsychiatristWhyChoose';
import PsychiatristService from '../components/section/psychiatrist/PsychiatristService';
import GlobalTeamStandard from '../components/section/global/GlobalTeamStandard';
import PsychiatristContact from '../components/section/psychiatrist/PsychiatristContact';
import PsychiatristPricing from '../components/section/psychiatrist/PsychiatristPricing';
import PsychiatristTestimonial from '../components/section/psychiatrist/PsychiatristTestimonial';
import GlobalBlogBoxCard from '../components/section/global/GlobalBlogBoxCard';

export default function Psychiatrist() {

  const css = `
  :root {
    --bs-primary: #f2c078;
    --bs-primary-bg-subtle: #faf5ed;
    --bs-primary-rgb: 242, 192, 120;
    --bs-primary-shade-20: #F9A620;
    --bs-secondary: #186b6b;
    --bs-secondary-bg-subtle: #e3ecec;
    --bs-secondary-rgb: 24, 107, 107;
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
      {/* main Banner */}
      <PsychiatristBanner />

      {/* About Us */}
      <PsychiatristAbout />

      {/* Book */}
      <PsychiatristPanel />

      {/* Why Choose Us */}
      <PsychiatristWhyChoose />

      {/* Service */}
      <PsychiatristService />
      
      {/* Team */}
      <GlobalTeamStandard />

      {/* Contact Us */}
      <PsychiatristContact />

      {/* Price Plan */}
      <PsychiatristPricing />

      {/* Testimonial */}
      <PsychiatristTestimonial />

      {/* Our Blog */}
      <GlobalBlogBoxCard />
      
    </Fragment>
  )
}
