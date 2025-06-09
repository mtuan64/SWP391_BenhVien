import React, { Fragment, useRef, useEffect, useState } from 'react';
import { Form, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';

// widgets
import FilterRating from './FilterRating'

// Json
import {productData} from '../../staticData/productData'

export default function ShopSidebar() {

  const sliderRef = useRef(null);
  const [lowerValue, setLowerValue] = useState(50);
  const [upperValue, setUpperValue] = useState(2000);

  useEffect(() => {
    if (sliderRef.current) {
      const slider = noUiSlider.create(sliderRef.current, {
        start: [50, 2000],
        connect: true,
        range: {
          min: 0,
          '10%': [50, 50],
          max: 2000,
        },
      });

      slider.on('update', (values, handle) => {
        if (handle === 0) {
          setLowerValue(Number(values[handle]).toFixed(0));
        } else {
          setUpperValue(Number(values[handle]).toFixed(0));
        }
      });

      return () => {
        if (sliderRef.current && sliderRef.current.noUiSlider) {
          sliderRef.current.noUiSlider.destroy();
        }
      };
    }
  }, []);

  return (
    <Fragment>
      <div className="widget bg-primary-subtle p-3 p-md-4 mb-5">
        <div className="custom-form-field shop-search position-relative">
          <Form.Control type="text" placeholder="Search Products..." className="mb-5 bg-white border" />
          <Button type="submit" className="position-absolute  end-0 top-0 text-body p-0 border-0 bg-transparent cursor-pointer">
            <svg className="icon-20" width="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11.7669" cy="11.7666" r="8.98856" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                    strokeLinejoin="round"></circle>
                <path d="M18.0186 18.4851L21.5426 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                    strokeLinejoin="round"></path>
              </svg>
          </Button>
        </div>
        <div>
          <h4 className="product-title mb-4">Product Categories</h4>
          <ul className="p-0 mb-5 list-unstyled">
            <li className="shop-cat-item border-0 pb-0">
              <a href="" className="position-relative text-uppercase letter-spacing-2">Disease</a>{" "}
              <span className="archiveCount fw-500 ms-1">(2)</span>
            </li>
            <li className="shop-cat-item border-0 pb-0">
              <a href="" className="position-relative text-uppercase letter-spacing-2">eye care</a>{" "}
              <span className="archiveCount fw-500 ms-1">(1)</span>
            </li>
            <li className="shop-cat-item border-0 pb-0">
              <a href="" className="position-relative text-uppercase letter-spacing-2">Health Care</a>{" "}
              <span className="archiveCount fw-500 ms-1">(4)</span>
            </li>
            <li className="shop-cat-item border-0 pb-0">
              <a href="" className="position-relative text-uppercase letter-spacing-2">Medical Equipment</a>{" "}
              <span className="archiveCount fw-500 ms-1">(17)</span>
            </li>
            <li className="shop-cat-item border-0 pb-0">
              <a href="" className="position-relative text-uppercase letter-spacing-2">Physical</a>{" "}
              <span className="archiveCount fw-500 ms-1">(5)</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="product-title mb-4">Price Filter</h4>
          <div className="collapse show mb-5" id="iq-product-filter-01">
              <div className="form-group mt-3 product-range">
                <div ref={sliderRef} className="range-slider" id="product-price-range"></div>
              </div>
              <small className="text-body">Price: </small>
            <small className="text-body" id="lower-value">${lowerValue} </small>
              <small className="text-body">-</small>
            <small className="text-body" id="upper-value"> ${upperValue}</small>
          </div>
        </div>
        <div>
          <h4 className="product-title mb-4">Product Size</h4>
          <ul className="productsize p-0 mb-0 list-unstyled d-flex align-items-center gap-2">
              <li className="d-inline border mb-0"><a href="">S</a></li>
              <li className="d-inline border mb-0"><a href="">M</a></li>
              <li className="d-inline border mb-0"><a href="">L</a></li>
          </ul>
        </div>
      </div>

      <div className="product-list-widget p-3 p-md-4 bg-primary-subtle mb-5">
        <h4 className="product-title mb-4">Top Rated Products</h4>
        <ul className="p-0 m-0">
          {productData.slice(0, 3).map((item, index, slicedArray) => (
            <li className={`d-flex align-items-center gap-3 border-0 ${index === slicedArray.length-1 ? "" : "mb-4"}`} key={index}>
              <div className="img-holder">
                <Image src={item.productImage} alt="product-img" className="img-fluid avatar-100 rounded-0" />
              </div>
              <div className="post-blog">
                <Link className="new-link d-block" to="/shop/product-standard">
                  <h6 className="post-title fw-500 mb-0 text-capitalize">{item.productTitle}</h6>
                </Link>
                <FilterRating rating={item.ratting} />
                <span className="">{item.priceValue}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="widget widget_tags p-3 p-md-4 bg-primary-subtle">
        <h4 className="product-title mb-4">Tags</h4>
        <ul className="p-0 m-0 list-unstyled">
            <li className="cat-item mb-0 pb-0 border-0 d-inline">
              <Link to="" className="position-relative">Hospital</Link>
            </li>{" "}
            <li className="cat-item mb-0 pb-0 border-0 d-inline">
              <Link to="" className="position-relative">laboratory</Link>
            </li>{" "}
            <li className="cat-item mb-0 pb-0 border-0 d-inline">{" "}
              <Link to="" className="position-relative">Medicine</Link>
            </li>{" "}
            <li className="cat-item mb-0 pb-0 border-0 d-inline">
              <Link to="" className="position-relative">nutrition</Link>
            </li>{" "}
            <li className="cat-item mb-0 pb-0 border-0 d-inline">
              <Link to="" className="position-relative">Startup</Link>
            </li>{" "}
            <li className="cat-item mb-0 pb-0 border-0 d-inline">
              <Link to="" className="position-relative">Treatment</Link>
            </li>
        </ul>
      </div>
    </Fragment>
  )
}
