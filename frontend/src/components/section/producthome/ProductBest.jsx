import React from 'react'
import { Container } from 'react-bootstrap';

// Widgets
import Title from '../../widgets/Title';
import ScrollingText from '../../widgets/ScrollingText';
import ProductCard from '../../widgets/ProductCard';

// Json
import {productData} from '../../../staticData/productData'

export default function ProductBest(props) {
  return (
    <div className="section-padding pb-xl-5 pb-md-2 pb-4">
      <div className="pb-xl-5">
        <div className={`${props.padding === false ? "" : "pb-xl-5"}`}>
          <Container fluid>
            <div className="position-relative text-center">
              <ScrollingText scrollTitle="Latest Products" />
            </div>
            <div className="text-center">
                <Title subTitle="Product" rightText="Best selling " leftText="Products" />
            </div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-5">
              {productData.slice(0,5).map((item, index) => (
                <div className="col" key={index}>
                  <ProductCard productImage={item.productImage} productTitle={item.productTitle} priceValue={item.priceValue} rating={item.ratting} productCategory={item.productCategory} productDesc={item.productDesc} IsNew={item.isNew} IsSale={item.isSale} />
                </div>
              ))}                
            </div>
          </Container>
        </div>
      </div>
    </div>
  )
}
