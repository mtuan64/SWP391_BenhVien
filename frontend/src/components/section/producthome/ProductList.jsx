import React from 'react'
import { Container } from 'react-bootstrap';

// Widgets
import Title from '../../widgets/Title';
import ScrollingText from '../../widgets/ScrollingText';
import ProductCard from '../../widgets/ProductCard';

// Json
import {productData} from '../../../staticData/productData'

export default function ProductList() {
  return (
    <div className="section-padding pb-xl-5 pb-md-2 pb-4">
      <div className="pb-xl-5">
        <div className="pb-xl-5">
          <Container fluid>
            <div className="position-relative text-center">
              <ScrollingText scrollTitle="Latest Products" />
            </div>
            <div className="text-center">
              <Title subTitle="Product" rightText="All Our Latest " leftText="Products" />
            </div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-5">
              {productData.map((item, index) => (
                <div className="col" key={index}>
                  <ProductCard productImage={item.productImage} productTitle={item.productTitle} priceValue={item.priceValue} productCategory={item.productCategory} rating={item.ratting} productDesc={item.productDesc} IsNew={item.isNew} IsSale={item.isSale} />
                </div>
              ))}                
            </div>
          </Container>
        </div>
      </div>
    </div>
  )
}
