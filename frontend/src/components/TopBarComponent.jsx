import React from "react";
import { Row, Col } from "react-bootstrap";

const TopBarComponent = () => (
    <div className="bg-light py-3 px-5 border-bottom shadow-sm">
        <Row className="align-items-center justify-content-between">
            <Col md={6} className="text-start">
                <small className="text-muted">
                    <i className="far fa-clock text-primary me-2"></i>
                    Opening Hours: Mon - Sat : 7.00 am - 8.00 pm, Sunday 9.00 am - 5.00 pm
                </small>
            </Col>
            <Col md={6} className="text-end">
          <small>
              <i className="fa fa-phone-alt text-primary me-2"></i>
 <a href="https://www.google.com/maps?q=Trường+Đại+học+FPT+Hà+Nội" target="_blank" rel="noopener noreferrer"
    style={{ textDecoration: 'none',  }}>
  📍 Đại học FPT Hà Nội
</a>



            </small>
            <small className="me-4">
              <i className="fa fa-envelope-open text-primary me-2"></i>
              <a href="mailto:ngochiine@gmail.com"
              rel="noopener noreferrer"
    style={{ textDecoration: 'none' }}>
  📩 kiwicare@gmail.com
</a>

            </small>
            <small>
  <i className="fa fa-phone-alt text-primary me-2"></i>
  <a
    href="https://zalo.me/0941458055"
    target="_blank"
    rel="noopener noreferrer"
    style={{ textDecoration: 'none' }}
  >
    📞 0941458055
  </a>
</small>

          </Col>
        </Row>
      </div>
);

export default TopBarComponent;