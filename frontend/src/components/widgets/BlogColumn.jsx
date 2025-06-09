import React from 'react'
import { Link } from "react-router-dom";

export default function BlogColumn(props) {
  return (
    <div className="iq-blog blog-standard blog-column">
      <div className="row flex-lg-row flex-column-reverse m-0">
          <div className="col-lg-7 p-0">
            <div className="iq-post-details bg-white p-4">
                <div className="iq-blog-cat bg-primary text-white d-inline">
                  <Link to="/blog/blog-category" className="text-white">
                    {props.blogCategory}
                  </Link>
                </div>
                <div className="iq-blog-meta mt-3">
                  <ul className="list-inline">
                      <li className="list-inline-item text-uppercase">
                        <Link to="/blog/blog-date">
                          <i className="far fa-calendar-alt me-2" aria-hidden="true"></i>{" "}
                          <span>{props.blogPublishDate}</span>
                        </Link>
                      </li>{" "}
                      <li className="list-inline-item text-uppercase">
                        <Link to="/blog/blog-author">
                          <i className="far fa-user me-1" aria-hidden="true"></i>{" "}
                          <span>{props.blogAuthor}</span>
                        </Link>
                      </li>
                  </ul>
                </div>
                <div className="blog-title">
                  <Link to="/blog/blog-details">
                      <h5 className="text-capitalize">{props.blogTitle}</h5>
                  </Link>
                </div>
                <div className="blog-butto mt-3">
                  <div className="iq-btn-container">
                      <Link className="iq-button iq-btn-link text-capitalize" to="/blog/blog-details">
                        Read More{" "}
                        <span className="btn-link-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 8 8" fill="none">
                              <path d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z" fill="currentColor"></path>
                            </svg>
                        </span>
                      </Link>
                  </div>
                </div>
            </div>
          </div>
          <div className="col-lg-5 p-0">
            <Link to="/blog/blog-details" className="blog-image overflow-hidden h-100">
              <img src={props.blogImage} alt="blog-image" className="img-fluid w-100 h-100" loading="lazy" />
            </Link>
          </div>
      </div>
    </div>
  )
}
