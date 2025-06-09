import React, { Fragment } from 'react'

// widgets
import BreadCrumb from '../../components/partial/BreadCrumb'
import ProductDetail from '../../components/widgets/ProductDetail'

// Images
import product3 from '/assets/images/shop/product-3.webp'

export default function ProductStandard() {
  return (
    <Fragment>
      <BreadCrumb title="Hand Sanitizer Bottle" />
      <ProductDetail isStandard={true} productImage={product3} productTitle="Hand Sanitizer Bottle" ratting="5" productPrice="$90.00" productDescription="Sahyog Wellness Hot Water Bottle is healthcare accessory that helps in providing relief from all kinds of muscular pain and provides the best heat therapy for the strained and tired muscles." productSku="kivicare-product" productCategories="Health Care, Physical" productTag="#treatment, #medicine" />
    </Fragment>
  )
}
