import React, { Fragment, useLayoutEffect } from 'react'

// Components
import SkinspeciatistBanner from '../components/section/skinspeciatist/SkinspeciatistBanner';
import SkinspeciatistIconbox from '../components/section/skinspeciatist/SkinspeciatistIconbox';
import SkinspeciatistAbout from '../components/section/skinspeciatist/SkinspeciatistAbout';
import SkinspeciatistService from '../components/section/skinspeciatist/SkinspeciatistService';
import GlobalTeamOverlap from '../components/section/global/GlobalTeamOverlap';
import SkinspeciatistTestiminial from '../components/section/skinspeciatist/SkinspeciatistTestiminial';
import SkinspeciatistVideo from '../components/section/skinspeciatist/SkinspeciatistVideo';
import SkinspeciatistPricing from '../components/section/skinspeciatist/SkinspeciatistPricing';
import GlobalBlogColumnGrid from '../components/section/global/GlobalBlogColumnGrid';
import SkinspeciatistMap from '../components/section/skinspeciatist/SkinspeciatistMap';

export default function SkinSpecialist() {

  const css = `
    :root {
      --bs-primary: #ff6d9f;
      --bs-primary-bg-subtle: #fbebf1;
      --bs-primary-rgb: 255, 109, 159;
      --bs-primary-shade-20: #e55f8d;
      --bs-secondary: #171c26;
      --bs-secondary-rgb: 23, 28, 38;
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
      {/* banner */}
      <SkinspeciatistBanner />

      {/* Box */}
      <SkinspeciatistIconbox />

      {/* about us */}
      <SkinspeciatistAbout />

      {/* services */}
      <SkinspeciatistService />
     
      {/* team */}
      <GlobalTeamOverlap />
      
      {/* testimonial */}
      <SkinspeciatistTestiminial />

      {/* video */}
      <SkinspeciatistVideo />

      {/* pricing table */}
      <SkinspeciatistPricing />

      {/* Blog */}
      <GlobalBlogColumnGrid />

      {/* location */}
      <SkinspeciatistMap />
      
    </Fragment>
  )
}
