import React from 'react'
import { Link } from 'react-router-dom'
import { Image } from 'react-bootstrap'

export default function BlogWithAuthor({isDesc, ...props}) {
  return (
    <div className="iq-blog shadow image-hover">
      <Link to="/blog/blog-details" className="blog-image d-block overflow-hidden">
          <Image src={props.blogImage} alt="blog-image" className="img-fluid w-100" loading="lazy" />
      </Link>
      <div className="p-4">
          <div className="iq-blog-meta d-flex align-items-center flex-wrap mb-2 gap-2 gap-md-3">
            <div className="iq-blog-cat text-uppercase letter-spacing-2">
                <span className="iq-cat-name">
                  <Link to="/blog/blog-category" className="text-primary">{props.blogCategory} </Link>
                </span>
            </div>
            <div className="list-inline-item">
                <span className="screen-reader-text text-uppercase letter-spacing-1 fw-500">
                  <Link to="/blog/blog-date">{props.blogPublishDate}</Link>
                </span>
            </div>
          </div>
          <div className="blog-title">
            <Link to="/blog/blog-details"><h5 className="text-capitalize">{props.blogTitle}</h5></Link>
          </div>
          {isDesc === true && (
            <p className="overflow-hidden mt-2 mb-0">{props.blogDescription}</p>
          )}
          <ul className="border-top p-0 pt-4 mt-4">
            <li className="d-flex align-items-center gap-3">
                <Image src="assets/images/blog/blog-author.webp" alt="blog-author" className="blog-author img-fluid avatar-30 rounded-pill" loading="lazy" />
                <div>
                  <span>Written By </span>
                  <Link to="/blog/blog-author" className="text-dark fw-500">{props.blogAuthor}</Link>
                </div>
            </li>
          </ul>
      </div>
    </div>
  )
}
