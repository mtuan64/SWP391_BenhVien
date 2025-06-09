import React, { Fragment, useEffect, useRef } from 'react'
import { Container, Row, Col, Nav, Tab } from 'react-bootstrap'

// widgets
import BreadCrumb from '../components/partial/BreadCrumb';
import PricingTab from '../components/widgets/PricingTab';


export default function PricingPlanTwo() {

  const sliderRef = useRef(null);

  useEffect(() => {
    const element = sliderRef.current;

    const createSliderThumbIfNeeded = () => {
      let thumb = element.querySelector('.nav-slider-thumb');
      if (!thumb) {
        thumb = document.createElement('div');
        thumb.classList.add('nav-slider-thumb', 'position-absolute', 'nav-link');
        element.appendChild(thumb);
      }
      return thumb;
    };

    const init = (element) => {
      element.classList.add('nav-slider');
      createSliderThumbIfNeeded();
      resetSlider(element);
      mouseClick(element);
      resize(element);
      updateRTL(element);
    };

    const resetSlider = (element) => {
      const sliderThumb = element.querySelector('.nav-slider-thumb');
      sliderThumb.style.padding = '0px';
      sliderThumb.style.width = element.querySelector('.nav-item:nth-child(1)').offsetWidth + 'px';
      sliderThumb.style.height = element.querySelector('.nav-item:nth-child(1)').offsetHeight + 'px';
      sliderThumb.style.transform = 'translate3d(0px, 0px, 0px)';
      sliderThumb.style.transition = '300ms ease-in-out';
    };

    const mouseClick = (element) => {
      element.onclick = (event) => {
        const target = getEventTarget(event);
        const item = target.closest('.nav-item');
        const items = Array.from(element.children);
        const index = items.indexOf(item) + 1;
        if (item !== null) {
          updateSlide(element, item, items, index);
        }
      };
    };

    const updateSlide = (element, item, items, index, cb = undefined) => {
      const sliderThumb = element.querySelector('.nav-slider-thumb');
      const prevItem = element.querySelectorAll('.nav-item');
      let elem;
      Array.from(prevItem, (elem) => {
        elem.querySelector('.nav-link').classList.remove('active');
      });
      let sum = 0;
      if (element.classList.contains('flex-column')) {
        let j = 1;
        for (j; j <= items.indexOf(item); j++) {
          sum += element.querySelector('li:nth-child(' + j + ')').offsetHeight;
        }
        sliderThumb.style.transform = 'translate3d(0px,' + sum + 'px, 0px)';
        elem = element.querySelector('.nav-item:nth-child(' + j + ')');
        elem.querySelector('.nav-link').classList.add('active');
        sliderThumb.style.height = elem.offsetHeight;
        sliderThumb.style.width = '100%';
      } else {
        let j = 1;
        for (j; j <= items.indexOf(item); j++) {
          sum += element.querySelector('.nav-item:nth-child(' + j + ')').offsetWidth;
        }
        if (document.querySelector('html').getAttribute('dir') === 'rtl') {
          sliderThumb.style.transform = 'translate3d(-' + sum + 'px, 0px, 0px)';
        } else {
          sliderThumb.style.transform = 'translate3d(' + sum + 'px, 0px, 0px)';
        }
        elem = element.querySelector('.nav-item:nth-child(' + index + ')');
        elem.querySelector('.nav-link').classList.add('active');
        sliderThumb.style.width = element.querySelector('.nav-item:nth-child(' + index + ')').offsetWidth + 'px';
      }
      if (cb !== null && cb !== undefined && typeof cb === 'function') {
        cb(elem);
      }
    };

    const getEventTarget = (event) => {
      event = event || window.event;
      return event.target || event.srcElement;
    };

    const resize = (element) => {
      window.addEventListener('resize', (event) => {
        const target = element.querySelector('.active');
        const item = target.closest('.nav-item');
        const items = Array.from(element.children);
        const index = items.indexOf(item) + 1;
        updateSlide(element, item, items, index);
      });
    };

    const updateRTL = (element) => {
      const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          if (mutation.type === 'attributes') {
            if (mutation.attributeName === 'dir') {
              const target = element.querySelector('.active');
              const item = target.closest('.nav-item');
              const items = Array.from(element.children);
              const index = items.indexOf(item) + 1;
              updateSlide(element, item, items, index);
            }
          }
        });
      });
      observer.observe(document.querySelector('html'), {
        attributes: true
      });
    };

    if (element) {
      init(element);
    }

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  const PriceTableData = [
    {
      pricingTitle: "Explore",
      priceValue: "$12.29",
      priceValueYear: "$147.48",
      priceSubTitle: "Price Per Session",
      priceDescription: "discuss your issues & create a plan with your talk therapist",
      list1: "2 Weeks Of Chat Access",
      list2: "30 Min Online Follow Up",
      list3: "24hour Emergency",
      list4: "Evidence Based Theraphy",
    },
    {
      pricingTitle: "First Steps",
      priceValue: "$33.17",
      priceValueYear: "$398",
      priceSubTitle: "Price Per Session",
      priceDescription: "Identify thought patterns, break negative thought loops & initiate positive ones",
      list1: "2 Weeks Of Chat Access",
      list2: "30 Min Online Follow Up",
      list3: "24hour Emergency",
      list4: "Evidence Based Theraphy",
    },
    {
      pricingTitle: "Mind Your Mind",
      priceValue: "$117.98",
      priceValueYear: "$1415",
      priceSubTitle: "Price Per Session",
      priceDescription: "Initiate behavioural changes, learn how to manage your thoughts and emotions",
      list1: "2 Weeks Of Chat Access",
      list2: "30 Min Online Follow Up",
      list3: "24hour Emergency",
      list4: "Evidence Based Theraphy",
    }
  ]

  return (
    <Fragment>
      <BreadCrumb title="Pricing Plan 2" />
      <div className="section-padding">
        <Container>
          <div className="iq-pricetable-tabs">
            <Tab.Container id="left-tabs-example" defaultActiveKey="month">
              <div className="text-center">
                <Nav variant="pills" className="nav-tabs nav-tunnel bg-primary-subtle text-body border-0 d-inline-flex rounded-pill justify-content-between" data-toggle="slider-tab" ref={sliderRef}>
                  <Nav.Item>
                    <Nav.Link className="d-flex align-items-center" eventKey="month">Month</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className="d-flex align-items-center" eventKey="year">Year</Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
              <Tab.Content className="iq-tab-fade-up mt-5">
                <Tab.Pane eventKey="month">
                  <Row className="gy-5">
                    {PriceTableData.map((item, index) => (
                      <Col lg="4"  md={`${index === PriceTableData.length-1 ? "12" : "6"}`} key={index}>
                        <PricingTab isActive={index == 1} pricingTitle={item.pricingTitle} priceSubTitle={item.priceSubTitle} priceValue={item.priceValue} priceYear={item.priceYear} priceDescription={item.priceDescription} list1={item.list1} list2={item.list2} list3={item.list3} list4={item.list4}/>
                      </Col>
                    ))}
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="year">
                  <Row className="gy-5">
                    {PriceTableData.map((item, index) => (
                      <Col lg="4"  md={`${index === PriceTableData.length-1 ? "12" : "6"}`} key={index}>
                        <PricingTab isActive={index == 1} pricingTitle={item.pricingTitle} priceSubTitle={item.priceSubTitle} priceValue={item.priceValueYear} priceYear={item.priceYear} priceDescription={item.priceDescription} list1={item.list1} list2={item.list2} list3={item.list3} list4={item.list4}/>
                      </Col>
                    ))}
                  </Row>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </div>
        </Container>
      </div>
    </Fragment>
  )
}
