import React, { Fragment } from 'react'

// Components
import ProductBanner from '../components/section/producthome/ProductBanner';
import ProductList from '../components/section/producthome/ProductList';
import ProductDeal from '../components/section/producthome/ProductDeal';
import ProductInfoBanner from '../components/section/producthome/ProductInfoBanner';
import ProductBest from '../components/section/producthome/ProductBest';
import ProductVideoPopup from '../components/section/producthome/ProductVideoPopup';
import GlobalBlogSimple from '../components/section/global/GlobalBlogSimple';
import ProductTestimonial from '../components/section/producthome/ProductTestimonial';
import ProductIconData from '../components/section/producthome/ProductIconData';
import ProductCardBanner from '../components/section/producthome/ProductCardBanner';

export default function ProductHome() {
  return (
    <Fragment>
      {/* Main Banner */}
      <ProductBanner />

      {/* Product Grid */}
      <ProductList />

      {/* Product Banner */}
      <ProductDeal />

      {/* Banner */}
      <ProductInfoBanner />

      {/* Best Products */}
      <ProductBest padding={false}/>

      {/* Video Popup */}
      <ProductVideoPopup />

      {/* Blog */}
      <GlobalBlogSimple />

      {/* Testimonial */}
      <ProductTestimonial />

      {/* IconBox */}
      <ProductIconData />

      {/* Banner Box */}
      <ProductCardBanner />
      
    </Fragment>
  )
}
