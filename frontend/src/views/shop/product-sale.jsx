import React, { Fragment } from 'react'

// widgets
import BreadCrumb from '../../components/partial/BreadCrumb'
import ProductDetail from '../../components/widgets/ProductDetail'

// Images
import product3 from '/assets/images/shop/product-9.webp'

export default function ProductSale() {
  return (
    <Fragment>
      <BreadCrumb title="Asthma Inhaler" />
      <ProductDetail isSale={true} productImage={product3} productTitle="Asthma Inhaler" ratting="5" productPrice="$45.00" productDescription="An inhaler is a device holding a medicine that you take by breathing in (inhaling). Inhalers are the main treatment for asthma." productSku="kivicare-product" productCategories="Health Care, Physical" productTag="#treatment, #medicine" />
    </Fragment>
  )
}
