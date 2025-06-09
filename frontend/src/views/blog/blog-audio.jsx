import React, { Fragment } from 'react'

// widget
import BlogDetail from '../../components/widgets/BlogDetail'
import BreadCrumb from '../../components/partial/BreadCrumb'

//json
import {blogs} from '../../staticData/blogData'

export default function BlogAudio() {
  return (
    <Fragment>
      <BreadCrumb title="Is it okay to cleanse your body by fasting from time to time?" />
      {blogs.slice(6, 7).map((item, index) => (
        <BlogDetail key={index} isAudio={true} isTag={true} blogImage={item.blogImage} blogAuthor={item.blogAuthod} blogPublishDate={item.blogPublishDate} blogCategory={item.blogCategory} blogTag={item.blogTag} />
      ))}      
    </Fragment>
  )
}
