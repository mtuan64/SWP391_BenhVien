import React, {useState} from 'react'
import { Col, Container, Row, Image, Form, FormCheck } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// Images
import avatar from '/assets/images/blog/avatar.webp'
import blogdetai1 from '/assets/images/blog/blogdetai-1.webp'
import blogdetai2 from '/assets/images/blog/blogdetai-2.webp'
import blog1 from '/assets/images/gallery/blog-1.jpg'
import blog2 from '/assets/images/gallery/blog-2.jpg'
import blog3 from '/assets/images/gallery/blog-3.jpg'
import blog4 from '/assets/images/gallery/blog-4.jpg'
import blog5 from '/assets/images/gallery/blog-5.jpg'
import blog6 from '/assets/images/gallery/blog-6.jpg'

// widget
import BlogSidebar from './BlogSidebar'
import ButtonBox from './ButtonBox'

// library
import FsLightbox from "fslightbox-react";
import FormCheckLabel from 'react-bootstrap/esm/FormCheckLabel'
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput'

export default function BlogDetail({isImg, isVideo, isAudio, isGallery, isLink, isTag, ...props}) {
  const [toggler, setToggler] = useState(false);
  const [toggler1, setToggler1] = useState(false);
  const [toggler2, setToggler2] = useState(false);
  const [toggler3, setToggler3] = useState(false);
  const [toggler4, setToggler4] = useState(false);
  const [toggler5, setToggler5] = useState(false);
  return (
    <div className="section-padding">
      <Container>
        <Row>
          <Col xl="8">
            <div className="iq-blog blog-detail position-relative border">
              {isImg === true && (
                <Link to="/blog/blog-details" className="blog-image d-block overflow-hidden">
                  <Image src={props.blogImage} alt="blog-image" className="img-fluid w-100" loading="lazy" />
                </Link>
              )}
              {isVideo === true && (
                <div>
                    <iframe className="elementor-video" allowFullScreen=""
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      title="Iqonic Design - User Reviews | Very Professional Work | Iqonic Design" width="500"
                      height="400"
                      src="https://www.youtube.com/embed/VeDdpy4CdeM?controls=1&amp;rel=0&amp;playsinline=0&amp;modestbranding=0&amp;autoplay=0&amp;enablejsapi=1&amp;origin=https%3A%2F%2Fwordpress.iqonic.design&amp;widgetid=1"
                      id="widget2"></iframe>
                </div>
              )}
              {isAudio === true && (
                <div>
                    <iframe
                      src="https://w.soundcloud.com/player/?visual=false&amp;url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F417751212&amp;show_artwork=true&amp;maxheight=750&amp;maxwidth=720&amp;auto_play=false&amp;buying=true&amp;liking=true&amp;download=true&amp;sharing=true&amp;show_comments=true&amp;show_playcount=true&amp;show_user=true&amp;color"
                      width="500"></iframe>
                </div>
              )}
              {isGallery === true && (
                <div className="row row-cols-xl-3 row-cols-md-2 row-cols-1">
                  <div className="col p-0">
                    <span type="button" data-fslightbox="gallery" className="h-100 gallery-overlay-box" onClick={() => setToggler(!toggler)}>
                      <Image src={blog1} className="p-2 pt-0 img-fluid w-100" alt="profile-image" loading="lazy" />
                      <FsLightbox
                        toggler={toggler}
                        sources={[blog1]}
                      />
                    </span>
                  </div>
                  <div className="col p-0">
                      <span type="button" data-fslightbox="gallery" className="h-100 gallery-overlay-box" onClick={() => setToggler1(!toggler1)}>
                        <Image src={blog2} className="p-2 pt-md-0 img-fluid w-100" alt="profile-image" loading="lazy" />
                        <FsLightbox
                          toggler={toggler1}
                          sources={[blog2]}
                        />
                      </span>
                  </div>
                  <div className="col p-0">
                      <span type="button" data-fslightbox="gallery" className="h-100 gallery-overlay-box" onClick={() => setToggler2(!toggler2)}>
                        <Image src={blog3} className="p-2 pt-xl-0 img-fluid w-100" alt="profile-image" loading="lazy" />
                        <FsLightbox
                          toggler={toggler2}
                          sources={[blog3]}
                        />
                      </span>
                  </div>
                  <div className="col p-0">
                    <span type="button" data-fslightbox="gallery" className="h-100 gallery-overlay-box" onClick={() => setToggler3(!toggler3)}>
                      <Image src={blog4} className="p-2 img-fluid w-100" alt="profile-image" loading="lazy" />
                      <FsLightbox
                        toggler={toggler3}
                        sources={[blog4]}
                      />
                    </span>
                  </div>
                  <div className="col p-0">
                    <span type="button" data-fslightbox="gallery" className="h-100 gallery-overlay-box" onClick={() => setToggler4(!toggler4)}>
                      <Image src={blog5} className="p-2 img-fluid w-100" alt="profile-image" loading="lazy" />
                      <FsLightbox
                        toggler={toggler4}
                        sources={[blog5]}
                      />
                    </span>
                  </div>
                  <div className="col p-0">
                    <span type="button" data-fslightbox="gallery" className="h-100 gallery-overlay-box" onClick={() => setToggler5(!toggler5)}>
                      <Image src={blog6} className="p-2 img-fluid w-100" alt="profile-image" loading="lazy" />
                      <FsLightbox
                        toggler={toggler5}
                        sources={[blog6]}
                      />
                    </span>
                  </div>
              </div>
              )}

              {isLink === true && (
                 <div className="px-3 pt-4 bg-white">
                  <Link to="https://iqonic.design/"><i className="fas fa-link text-primary"></i></Link>
                </div>
              )}
              <div className="iq-post-details bg-white p-4">
                <div className="iq-blog-meta">
                  <ul className="list-inline">
                    <li className="position-relative list-inline-item text-uppercase">
                        <Link to="/blog/blog-author">
                          <i className="far fa-user me-2 text-primary" aria-hidden="true"></i>
                          <span>{props.blogAuthor}</span>
                        </Link>
                    </li>
                    <li className="position-relative list-inline-item text-uppercase">
                        <Link to="/blog/blog-date">
                          <i className="far fa-calendar-alt me-2 text-primary" aria-hidden="true"></i>
                          <span>{props.blogPublishDate}</span>
                        </Link>
                    </li>
                    <li className="position-relative list-inline-item text-uppercase">
                        <span className="iq-blog-cat">
                          <Link to="/blog/blog-category">
                            {props.blogCategory}
                          </Link>
                        </span>
                    </li>
                  </ul>
                </div>
                <p className="pb-3">Dolor sit amet, consectetur adipisicing elit, sed do eiusmod temporincididunt ut labore et
                     dolore magnaaliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                     utaliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit
                     esse cillum dolore eu fugiatnulla pariatur. Excepteur sintoccaecat cupidatat non proident,
                     sunt in culpa qui officia deserunt.
                </p>
                <div className="blogquote position-relative bg-primary-subtle fst-italic">
                    <p className="text-body">
                      Ut enim ad minim veniam, quis nostrud exercitationSed vehicula odio sed velit volutpat
                      aliquet. Sed dignissim enim et venenatis
                    </p>
                    <h6 className="text-primary fw-bolder fst-italic text-uppercase">– Simon Sais</h6>
                    <i aria-hidden="true" className="fas fa-quote-right quote-icon position-absolute"></i>
                </div>
                <h4 className="mt-4">1. Good Nutrition Improves Well-Being</h4>
                <p className="mt-3">
                    Eating a poor diet reduces physical and mental health because eating healthy allows
                    people to be more active. Two-thirds of people who eat fresh fruit and vegetables daily
                    report no mental health issues, as reported by the Mental Health Foundation. Compare
                    this to those who do have some level of mental health problems and have generally
                    reported eating less healthy foods and more unhealthy foods. Feelings of well-being can
                    be protected by ensuring that our diet is full of essential fats, complex carbohydrates,
                    vitamins and minerals.
                </p>
                <h4 className="mt-4">2. It’s Expensive To Be Unhealthy</h4>
                <p className="mt-3">
                    Eating a poor diet reduces physical and mental health because eating healthy allows people
                    to be more active. Two-thirds of people who eat fresh fruit and vegetables daily report no
                    mental health issues, as reported by the Mental Health Foundation. Compare this to those who
                    do have some level of mental health problems and have generally reported eating less healthy
                    foods and more unhealthy foods. Feelings of well-being can be protected by ensuring that our
                    diet is full of essential fats, complex carbohydrates, vitamins and minerals.
                </p>
                <Row className="my-5">
                  <Col md="6">
                    <Image src={blogdetai1} alt="banner" className="img-fluid" style={{transform:`none`}} />
                  </Col>
                  <Col md="6" className="mt-5 mt-lg-0 mt-md-0">
                    <Image src={blogdetai2} alt="banner" className="img-fluid" style={{transform:`none`}} />
                  </Col>
                </Row>
                <h4 className="mt-4">3. Helps You Manage A Healthy Weight</h4>
                <p className="mt-3">
                    Eating a poor diet reduces physical and mental health because eating healthy allows people
                    to be more active. Two-thirds of people who eat fresh fruit and vegetables daily report no
                    mental health issues, as reported by the Mental Health Foundation. Compare this to those who
                    do have some level of mental health problems and have generally reported eating less healthy
                    foods and more unhealthy foods. Feelings of well-being can be protected by ensuring that our
                    diet is full of essential fats, complex carbohydrates, vitamins and minerals.
                </p>
                <h4 className="mt-4">4. Maintains Your Immune System</h4>
                <p className="mt-3">
                    Eating a poor diet reduces physical and mental health because eating healthy allows people
                    to be more active. Two-thirds of people who eat fresh fruit and vegetables daily report no
                    mental health issues, as reported by the Mental Health Foundation. Compare this to those who
                    do have some level of mental health problems and have generally reported eating less healthy
                    foods and more unhealthy foods. Feelings of well-being can be protected by ensuring that our
                    diet is full of essential fats, complex carbohydrates, vitamins and minerals.
                </p>
                {isTag === true && (
                  <ul className="blogtag list-inline mt-5 mb-0">
                    <li className="label d-inline me-2">Tags:</li>
                    <li className="d-inline">
                      <a href="#" className="position-relative">{props.blogTag}</a>
                    </li>
                </ul>
                )}
              </div>
            </div>
            <div className="blog-comment mt-5">
              <h4 className="mb-5">1 Comment</h4>
              <div className="comment-wrap d-flex p-5 border position-relative flex-row flex-column flex-lg-row flex-md-row gap-4">
                <div>
                    <Image src={avatar} alt="author" className="img-fluid" />
                </div>
                <div className="comments-info">
                  <h5>Admin</h5>
                  <p className="my-2">Mind Blowing</p>
                  <div className="list-inline-item">
                    <i aria-hidden="true" className="far fa-calendar-alt me-1 text-primary small"></i>{" "}
                    <Link to="" className="text-uppercase small">March 24, 2022</Link>
                  </div>
                  <ButtonBox buttonUrl="#" buttonText="Reply" />
                </div>
              </div>
              <h4 className="my-5">Leave A Reply</h4>
              <p>Your email address will not be published. Required fields are marked *</p>
              <div className="custom-form-field mt-5">
                <Form.Control as="textarea" placeholder="Comment" required />
              </div>
              <Row className="my-5">
                <Col lg="4" md="6" className="my-5 my-lg-0">
                  <div className="custom-form-field">
                    <Form.Control type="text" placeholder="Name*" required />
                  </div>
                </Col>
                <Col lg="4" md="6" className="my-5 my-lg-0">
                  <div className="custom-form-field">
                    <Form.Control type="email" placeholder="Email*" required />
                  </div>
                </Col>
                <Col lg="4" md="6" className="my-5 my-lg-0">
                  <div className="custom-form-field">
                    <Form.Control type="url" placeholder="Website" required />
                  </div>
                </Col>
              </Row>
              <div className='mb-5 d-flex justify-content-start gap-2'>
              <FormCheckInput
                  type="checkbox"
                  id="01" 
                  className=""
              /> 
              <FormCheckLabel>Your email address will not be published. Required fields are marked. </FormCheckLabel>
              </div>
              <ButtonBox buttonUrl="#" buttonText="post comment" />
            </div>
          </Col>
          <Col xl="4" className="mt-5 mt-xl-0">
            <BlogSidebar />
          </Col>
        </Row>
      </Container>
    </div>
  )
}
