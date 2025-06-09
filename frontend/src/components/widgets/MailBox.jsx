import React, { Fragment } from 'react'
import {  Form } from 'react-bootstrap'

export default function MailBox({ isStyleBordered }) {
  return (
    <Fragment>
      {isStyleBordered === true ? (
      <div className="custom-form-field">
        <div className="mail-box style-bordered position-relative">
          <Form.Group className="mb-3">
            <Form.Control type="email" placeholder="Enter your Email" required />
          </Form.Group>
          <button type="submit" className="btn-submit position-absolute bg-primary border-0 rounded-0 text-white" defaultValue="Sign up">
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="19">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0 0.000366211H18V18.0004H0V0.000366211Z" fill="currentColor"></path>
                </mask>
                <g>
                  <path fillRule="evenodd" clipRule="evenodd" d="M8.12802 10.9092L11.5039 16.3861C11.6516 16.6261 11.8824 16.6234 11.9756 16.6104C12.0688 16.5975 12.2932 16.5403 12.3744 16.268L16.5958 2.0103C16.6697 1.75829 16.534 1.58659 16.4731 1.52566C16.414 1.46474 16.2451 1.33458 16.0004 1.40381L1.73262 5.58187C1.46214 5.66126 1.40306 5.88835 1.39014 5.98158C1.37722 6.07667 1.37352 6.31206 1.61261 6.46253L7.15228 9.92702L12.0467 4.98092C12.3153 4.70952 12.7538 4.70675 13.0261 4.97538C13.2984 5.24401 13.3003 5.68341 13.0317 5.95481L8.12802 10.9092ZM11.9036 18.0007C11.2611 18.0007 10.6722 17.6739 10.3251 17.1127L6.74614 11.3053L0.878763 7.63589C0.246423 7.23987 -0.0840551 6.5346 0.0184117 5.79334C0.119955 5.05207 0.628597 4.46311 1.34309 4.25356L15.6109 0.0755041C16.2672 -0.116506 16.9707 0.0653497 17.4544 0.547221C17.9381 1.03371 18.1181 1.74451 17.9224 2.40362L13.701 16.6604C13.4896 17.3776 12.8988 17.8844 12.1593 17.9832C12.0726 17.9943 11.9886 18.0007 11.9036 18.0007V18.0007Z" fill="currentColor"></path>
                </g>
            </svg>
          </button>
        </div>
      </div>
    ) : (
      <div className="custom-form-field">
        <div className="mail-box position-relative">
          <Form.Group className="">
            <Form.Control type="email" className="bg-white" placeholder="Enter your Email" required />
          </Form.Group>
          <button type="submit" className="btn-submit position-absolute bg-primary border-0 rounded-0 text-white" defaultValue="Sign up">
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="19">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0 0.000366211H18V18.0004H0V0.000366211Z" fill="currentColor"></path>
                </mask>
                <g>
                  <path fillRule="evenodd" clipRule="evenodd" d="M8.12802 10.9092L11.5039 16.3861C11.6516 16.6261 11.8824 16.6234 11.9756 16.6104C12.0688 16.5975 12.2932 16.5403 12.3744 16.268L16.5958 2.0103C16.6697 1.75829 16.534 1.58659 16.4731 1.52566C16.414 1.46474 16.2451 1.33458 16.0004 1.40381L1.73262 5.58187C1.46214 5.66126 1.40306 5.88835 1.39014 5.98158C1.37722 6.07667 1.37352 6.31206 1.61261 6.46253L7.15228 9.92702L12.0467 4.98092C12.3153 4.70952 12.7538 4.70675 13.0261 4.97538C13.2984 5.24401 13.3003 5.68341 13.0317 5.95481L8.12802 10.9092ZM11.9036 18.0007C11.2611 18.0007 10.6722 17.6739 10.3251 17.1127L6.74614 11.3053L0.878763 7.63589C0.246423 7.23987 -0.0840551 6.5346 0.0184117 5.79334C0.119955 5.05207 0.628597 4.46311 1.34309 4.25356L15.6109 0.0755041C16.2672 -0.116506 16.9707 0.0653497 17.4544 0.547221C17.9381 1.03371 18.1181 1.74451 17.9224 2.40362L13.701 16.6604C13.4896 17.3776 12.8988 17.8844 12.1593 17.9832C12.0726 17.9943 11.9886 18.0007 11.9036 18.0007V18.0007Z" fill="currentColor"></path>
                </g>
            </svg>
          </button>
        </div>
      </div>
    )}
    </Fragment>
  )
}
