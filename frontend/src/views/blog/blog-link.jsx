import React, { Fragment } from 'react'

// widget
import BlogDetail from '../../components/widgets/BlogDetail'
import BreadCrumb from '../../components/partial/BreadCrumb'

//json
import {blogs} from '../../staticData/blogData'

export default function BlogLink() {
  return (
    <Fragment>
      <BreadCrumb title="Are Short Workouts Worth It?" />
      {blogs.slice(6, 7).map((item, index) => (
        <BlogDetail key={index} isLink={true} isTag={true} blogImage={item.blogImage} blogAuthor={item.blogAuthod} blogPublishDate={item.blogPublishDate} blogCategory={item.blogCategory} blogTag={item.blogTag} />
      ))}      
    </Fragment>
  )
}
