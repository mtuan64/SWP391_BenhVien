import React, { Fragment } from 'react'
import ClientGrid from '../components/widgets/ClientGrid'
import { Container } from 'react-bootstrap'
import BreadCrumb from '../components/partial/BreadCrumb'

export default function ClientPage() {
  return (
    <Fragment>
      <BreadCrumb title="Our Clients" />
      <div className="section-padding">
        <Container>
          <div className="px-3">
            <ClientGrid />
          </div>
        </Container>
      </div>
    </Fragment>
    
  )
}
