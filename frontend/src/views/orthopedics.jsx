import React, { Fragment, useLayoutEffect } from 'react'

// Components
import OrthopedicsBanner from '../components/section/orthopedics/OrthopedicsBanner';
import OrthopedicsWhyChoose from '../components/section/orthopedics/OrthopedicsWhyChoose';
import OrthopedicsService from '../components/section/orthopedics/OrthopedicsService';
import OrthopedicsGetStarted from '../components/section/orthopedics/OrthopedicsGetStarted';
import OrthopedicsDetailBanner from '../components/section/orthopedics/OrthopedicsDetailBanner';
import GlobalTeamOverlap from '../components/section/global/GlobalTeamOverlap';
import OrthopedicsVideoPopup from '../components/section/orthopedics/OrthopedicsVideoPopup';
import OrthopedicsSpecialCare from '../components/section/orthopedics/OrthopedicsSpecialCare';
import OrthopedicsFaq from '../components/section/orthopedics/OrthopedicsFaq';
import OrthopedicsTestiminoal from '../components/section/orthopedics/OrthopedicsTestiminoal';
import GlobalBlogBoxCard from '../components/section/global/GlobalBlogBoxCard';
import OrthopedicsPayBanner from '../components/section/orthopedics/OrthopedicsPayBanner';

export default function Orthopedics() {

  const css = `
  :root {
    --bs-primary: #00b0d1;
    --bs-primary-bg-subtle: #e2f2f6;
    --bs-primary-rgb: 0, 176, 209;
    --bs-primary-shade-20: #4cc8df;
    --bs-secondary: #004b85;
    --bs-secondary-bg-subtle: #e1e8ee;
    --bs-secondary-rgb: 0, 75, 133;
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
      <OrthopedicsBanner />

      {/* why choose us */}
      <OrthopedicsWhyChoose />

      {/* service */}
      <OrthopedicsService />

      {/* why choose us */}
      <OrthopedicsGetStarted />

      {/* Banner */}
      <OrthopedicsDetailBanner />

      {/* Doctors */}
      <GlobalTeamOverlap />

      {/* video popup */}
      <OrthopedicsVideoPopup />

      {/* specoal care */}
      <OrthopedicsSpecialCare />

      {/* Faq */}
      <OrthopedicsFaq />

      {/* Testimonial */}
      <OrthopedicsTestiminoal />

      {/* Our Blog */}
      <GlobalBlogBoxCard />

      {/* special care */}
      <OrthopedicsPayBanner />
      
    </Fragment>
  )
}
