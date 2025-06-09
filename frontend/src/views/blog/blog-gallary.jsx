import React, { Fragment } from 'react'

// widget
import BlogDetail from '../../components/widgets/BlogDetail'
import BreadCrumb from '../../components/partial/BreadCrumb'

//json
import {blogs} from '../../staticData/blogData'

export default function BlogGallary() {
  return (
    <Fragment>
      <BreadCrumb title="A World With Only Optimized Experiences Is Just Boring" />
      <div className="blog-gallery">
        {blogs.slice(6, 7).map((item, index) => (
          <BlogDetail key={index} isGallery={true} isTag={true} blogImage={item.blogImage} blogAuthor={item.blogAuthod} blogPublishDate={item.blogPublishDate} blogCategory={item.blogCategory} blogTag={item.blogTag} />
        ))}  
      </div>          
    </Fragment>
  )
}
