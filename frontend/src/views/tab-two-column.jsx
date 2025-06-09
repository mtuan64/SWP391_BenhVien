import React, { Fragment } from 'react'
import { Container, Tab, Tabs } from 'react-bootstrap'

// widget
import TeamOverdetail from '../components/widgets/TeamOverdetail';
import BreadCrumb from '../components/partial/BreadCrumb';

// json
import {teamData} from '../staticData/team'

export default function TabTwoColumn() {
  return (
    <Fragment>
      <BreadCrumb title="Doctor Grid Two Column" />
      <div className="section-padding">
        <Container>
          <div className="tab-bottom-bordered border-0">
            <Tabs
              defaultActiveKey="doc-all-tab"
              id="justify-tab-example"
              className="justify-content-center mb-5 bg-transparent pe-0"
            >
              <Tab eventKey="doc-all-tab" title="All">
                <div className="row row-cols-sm-2 row-cols-1">
                  {teamData.map((item, index) => (
                    <div className="col mb-5" key={index}>
                        <TeamOverdetail teamImage={item.teamImage} teamMemberName={item.teamMemberName} teamSpecialized={item.teamSpecialized} />
                    </div>
                   ))}  
                </div>
              </Tab>
              <Tab eventKey="cardiologist-tab" title="Cardiologist">
                <div className="row row-cols-sm-2 row-cols-1">
                  {teamData.slice(0, 3).map((item, index) => (
                    <div className="col mb-5" key={index}>
                        <TeamOverdetail teamImage={item.teamImage} teamMemberName={item.teamMemberName} teamSpecialized={item.teamSpecialized} />
                    </div>
                   ))}  
                </div>
              </Tab>
              <Tab eventKey="fertility-consultant-tab" title="Fertility Consultant">
                <div className="row row-cols-sm-2 row-cols-1">
                  {teamData.slice(0, 4).map((item, index) => (
                    <div className="col mb-5" key={index}>
                        <TeamOverdetail teamImage={item.teamImage} teamMemberName={item.teamMemberName} teamSpecialized={item.teamSpecialized} />
                    </div>
                   ))}  
                </div>
              </Tab>
              <Tab eventKey="generalsurgeon-tab" title="General Surgeon">
                <div className="row row-cols-sm-2 row-cols-1">
                  {teamData.slice(3, 6).map((item, index) => (
                    <div className="col mb-5" key={index}>
                        <TeamOverdetail teamImage={item.teamImage} teamMemberName={item.teamMemberName} teamSpecialized={item.teamSpecialized} />
                    </div>
                   ))}  
                </div>
              </Tab>
              <Tab eventKey="gynecologist-tab" title="Gynecologist">
                <div className="row row-cols-sm-2 row-cols-1">
                  {teamData.slice(0, 2).map((item, index) => (
                    <div className="col mb-5" key={index}>
                        <TeamOverdetail teamImage={item.teamImage} teamMemberName={item.teamMemberName} teamSpecialized={item.teamSpecialized} />
                    </div>
                   ))}  
                </div>
              </Tab>
            </Tabs>
          </div>
        
        </Container>
      </div>
    </Fragment>
  )
}
