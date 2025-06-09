import React, { Fragment, useLayoutEffect } from 'react'

// Components
import PaediatricianBanner from '../components/section/paediatrician/PaediatricianBanner';
import PaediatricianCare from '../components/section/paediatrician/PaediatricianCare';
import PaediatricianAbout from '../components/section/paediatrician/PaediatricianAbout';
import PaediatricianService from '../components/section/paediatrician/PaediatricianService';
import PaediatricianWhyChoose from '../components/section/paediatrician/PaediatricianWhyChoose';
import GlobalTeamStandard from '../components/section/global/GlobalTeamStandard';
import PaediatricianVideoPopup from '../components/section/paediatrician/PaediatricianVideoPopup';
import PaediatricianFaq from '../components/section/paediatrician/PaediatricianFaq';
import ProductTestimonial from '../components/section/producthome/ProductTestimonial';
import GlobalBlogMetaDesign from '../components/section/global/GlobalBlogMetaDesign';
import PaediatricianContact from '../components/section/paediatrician/PaediatricianContact';

export default function Paediatrician() {
  
  const css = `
  :root {
    --bs-primary: #da8566;
    --bs-primary-bg-subtle: #f7efeb;
    --bs-primary-rgb: 218, 133,102;
    --bs-primary-shade-20: #93504f;
    --bs-secondary: #111a31;
    --bs-secondary-bg-subtle: #e3e4e6;
    --bs-secondary-rgb: 17,26, 49;
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
      <PaediatricianBanner />

      {/* SpecialCare */}
      <PaediatricianCare />

      {/* about-us */}
      <PaediatricianAbout />

      {/* our service */}
      <PaediatricianService />

      {/* choose us */}
      <PaediatricianWhyChoose />

      {/* team */}
      <GlobalTeamStandard />

      {/* video popup */}
      <PaediatricianVideoPopup />

      {/* faq */}
      <PaediatricianFaq />

      {/* testimonial */}
      <ProductTestimonial />

      {/* blog */}
      <GlobalBlogMetaDesign />

      {/* schedule */}
      <PaediatricianContact />

    </Fragment>
  )
}
