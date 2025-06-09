import React from 'react'
import { Container } from 'react-bootstrap';

// Widgets
import Title from '../../widgets/Title';
import ScrollingText from '../../widgets/ScrollingText';
import History from '../../widgets/History';

// Images
import history1 from '/assets/images/pages/history-1.webp'
import history2 from '/assets/images/pages/history-2.webp'
import history3 from '/assets/images/pages/history-3.webp'
import history4 from '/assets/images/pages/history-4.webp'

export default function AboutHistory() {
    const historyData = [
        {
          historyImage: history1,
          historyYear: "2012 – 2013",
          historyDesc: "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using ‘Content here, content here’, making it look like readable English.Many desktop publishing packagesage."
        },
        {
          historyImage: history2,
          historyYear: "2013 – 2014",
          historyDesc: "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using ‘Content here, content here’, making it look like readable English.Many desktop publishing packagesage."
        },
        {
          historyImage: history3,
          historyYear: "2014 – 2015",
          historyDesc: "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using ‘Content here, content here’, making it look like readable English.Many desktop publishing packagesage."
        },
        {
          historyImage: history4,
          historyYear: "2015 – 2020",
          historyDesc: "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using ‘Content here, content here’, making it look like readable English.Many desktop publishing packagesage."
        }
    ]
  return (
    <div className="section-padding bg-secondary-subtle text-body position-relative">
        <Container>
          <div className="text-left position-relative">
              <ScrollingText scrollTitle="Our History" />
          </div>
          <Title subTitle="HISTORY" rightText="Our " leftText="History" />
          <ul className="list-inline m-0">
            {historyData.map((item, index) => (
              <li className={`${index === historyData.length-1 ? "" : "mb-5 pb-5 border-bottom"}`} key={index}>
                <History historyImage={item.historyImage} historyYear={item.historyYear} historyDesc={item.historyDesc} />
              </li>
            ))}              
          </ul>
        </Container>
    </div>
  )
}
