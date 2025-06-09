import React from 'react'
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';

export default function BlogOverdetailStyleTwo(props) {
  return (
    <div className="blog-overdetail-style2">
      <div className="iq-blog-image pe-0 pe-md-5">
          <Link to="/blog/blog-details" className="blog-image d-block overflow-hidden">
            <Image src={props.blogImage} alt="blog-image" className="img-fluid w-100" loading="lazy" />
          </Link>
      </div>   
      <div className="iq-post-details bg-white p-3 p-md-4 position-relative shadow">
          <div className="iq-blog-meta mb-3">
            <ul className="list-inline">
                <li className="list-inline-item fw-500 iq-blog-cat me-4">
                  <Link to="/blog/blog-category">{props.blogCategory}</Link>
                </li>
                <li className="list-inline-item fw-500">
                  <Link to="/blog/blog-date" className="text-body">{props.blogPublishDate}</Link>
                </li>
            </ul>
          </div>
          <div className="blog-title">
            <Link to="/blog/blog-details">
                <h5 className="text-capitalize">{props.blogTitle}</h5>
            </Link>
          </div>
      </div>
    </div>
  )
}
