import React, { Fragment } from 'react'

// widgets
import BreadCrumb from '../../components/partial/BreadCrumb'
import ProductDetail from '../../components/widgets/ProductDetail'

// Images
import product3 from '/assets/images/shop/product-10.webp'

export default function ProductNew() {
  return (
    <Fragment>
      <BreadCrumb title="Orange Carrot" />
      <ProductDetail isSale={true} productImage={product3} productTitle="Orange Carrot" ratting="5" productPrice="$41.00" productDescription="The plaque-removing efficacy when using waxed dental floss and three interdental brushes was compared in an intraindividual clinical trial." productSku="kivicare-product" productCategories="Health Care, Physical" productTag="#treatment, #medicine" />
    </Fragment>
  )
}
