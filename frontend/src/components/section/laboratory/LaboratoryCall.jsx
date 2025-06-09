import React from 'react'
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function LaboratoryCall() {
  return (
    <div className="bg-primary margin-negative-400">
        <Container>
          <div className="pt-md-5 pt-4 text-center">
              <h5 className="mt-md-5 mt-4 mb-3 text-secondary">Or Just Give Us A Call</h5>
              <h2>
                <Link to="tel:+08002466721" className="text-white d-inline-block pb-4 mb-5 border-bottom">+ 0800 24 66 721</Link>
              </h2>
              <h6 className="mb-md-5 mb-4"><i>24/7, 365 Days A Year Always Open For You</i></h6>
          </div>
        </Container>
      </div>
  )
}
