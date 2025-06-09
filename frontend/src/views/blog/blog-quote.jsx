import React, { Fragment } from 'react'

// widget
import BlogDetail from '../../components/widgets/BlogDetail'
import BreadCrumb from '../../components/partial/BreadCrumb'

//json
import {blogs} from '../../staticData/blogData'

export default function BlogQuote() {
  return (
    <Fragment>
      <BreadCrumb title="A Revolutionary Change in Paediatric Healthcare" />
      {blogs.slice(6, 7).map((item, index) => (
        <BlogDetail key={index} isTag={true} blogImage={item.blogImage} blogAuthor={item.blogAuthod} blogPublishDate={item.blogPublishDate} blogCategory={item.blogCategory} blogTag={item.blogTag} />
      ))}      
    </Fragment>
  )
}
