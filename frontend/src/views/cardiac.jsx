import React, { Fragment, useLayoutEffect }  from 'react'

// Components
import CardiacBanner from '../components/section/cardiac/CardiacBanner';
import CardiacAbout from '../components/section/cardiac/CardiacAbout';
import CardiacService from '../components/section/cardiac/CardiacService';
import CardiacCounter from '../components/section/cardiac/CardiacCounter';
import CardiacWhyChoose from '../components/section/cardiac/CardiacWhyChoose';
import CardiacGallary from '../components/section/cardiac/CardiacGallary';
import CardiacTeam from '../components/section/cardiac/CardiacTeam';
import CardiacPanel from '../components/section/cardiac/CardiacPanel';
import CardiacContact from '../components/section/cardiac/CardiacContact';
import CardiacTestimonial from '../components/section/cardiac/CardiacTestimonial';
import GlobalClientSlider from '../components/section/global/GlobalClientSlider';
import GlobalBlogColumnGrid from '../components/section/global/GlobalBlogColumnGrid';

export default function Cardiac() {
  const css = `
  :root {
    --bs-primary: #e63946;
    --bs-primary-rgb: 230, 57, 70;
    --bs-primary-shade-20: #ce2f3b;
    --bs-secondary: #1d3557;
    --bs-secondary-rgb: 29, 53, 87;
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
      <CardiacBanner />

      {/* About us */}
      <CardiacAbout />

      {/* Services */}
      <CardiacService />

      {/* Counter */}
      <CardiacCounter />

      {/* Why choose us */}
      <CardiacWhyChoose />

      {/* gallary */}
      <CardiacGallary />

      {/* Team */}
      <CardiacTeam />

      {/* Book */}
      <CardiacPanel />

      {/* Contact us */}
      <CardiacContact />

      {/* Testimonial */}
      <CardiacTestimonial />

      {/* client */}
      <div className="client-bg ">
        <GlobalClientSlider />
      </div>      

      {/* Blog */}
      <GlobalBlogColumnGrid />

    </Fragment>
  )
}
