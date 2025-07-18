import React, { Fragment, useEffect } from 'react';
import '../assets/css/ServicePage.css';

// Placeholder images (using Unsplash for demo purposes)
const internalMedicine = 'https://images.unsplash.com/photo-1579684453423-f84349ef60b0';
const pediatrics = 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7';
const obgyn = 'https://images.unsplash.com/photo-1559839914-17aae19cec71';
const imaging = 'https://images.unsplash.com/photo-1605721911519-3d63e7812345';
const surgery = 'https://images.unsplash.com/photo-1579154396358-90c2b29340bf';
const lab = 'https://images.unsplash.com/photo-1538108149393-fbbd81895907';
const emergency = 'https://images.unsplash.com/photo-1585435465945-bef5a93d1df1';
const checkup = 'https://images.unsplash.com/photo-1584982751601-97dcc096659c';
const pharmacy = 'https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d';

const FancyBox = ({ fancyboxImage, fancyboxTitle, fancyboxDesc, buttonUrl }) => (
  <div className="fancybox">
    <div className="fancybox-content">
      <div className="fancybox-image-container">
        <img 
          src={fancyboxImage} 
          alt={fancyboxTitle} 
          className="fancybox-image"
        />
      </div>
      <h3 className="fancybox-title">{fancyboxTitle}</h3>
      <p className="fancybox-desc">{fancyboxDesc}</p>
      <a
        href={buttonUrl}
        className="fancybox-button"
      >
        Tìm Hiểu Thêm
      </a>
    </div>
  </div>
);

const ServicePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fancyBoxData = [
    {
      fancyboxImage: internalMedicine,
      fancyboxTitle: "Khám Nội Tổng Quát",
      fancyboxDesc: "Đánh giá toàn diện sức khỏe với đội ngũ bác sĩ nội khoa giàu kinh nghiệm.",
      buttonUrl: "/service/internal-medicine"
    },
    {
      fancyboxImage: pediatrics,
      fancyboxTitle: "Nhi Khoa",
      fancyboxDesc: "Chăm sóc sức khỏe trẻ em từ sơ sinh đến tuổi thiếu niên với sự tận tâm.",
      buttonUrl: "/service/pediatrics"
    },
    {
      fancyboxImage: obgyn,
      fancyboxTitle: "Phụ Sản",
      fancyboxDesc: "Dịch vụ chăm sóc sức khỏe phụ nữ, từ thai kỳ đến sinh nở và sau sinh.",
      buttonUrl: "/service/obgyn"
    },
    {
      fancyboxImage: imaging,
      fancyboxTitle: "Chẩn Đoán Hình Ảnh",
      fancyboxDesc: "Hệ thống X-quang, CT, MRI hiện đại hỗ trợ chẩn đoán chính xác.",
      buttonUrl: "/service/imaging"
    },
    {
      fancyboxImage: surgery,
      fancyboxTitle: "Phẫu Thuật Ngoại Khoa",
      fancyboxDesc: "Thực hiện các ca phẫu thuật phức tạp với công nghệ tiên tiến.",
      buttonUrl: "/service/surgery"
    },
    {
      fancyboxImage: lab,
      fancyboxTitle: "Xét Nghiệm Y Khoa",
      fancyboxDesc: "Phòng xét nghiệm tự động cung cấp kết quả nhanh chóng và đáng tin cậy.",
      buttonUrl: "/service/laboratory"
    },
    {
      fancyboxImage: emergency,
      fancyboxTitle: "Cấp Cứu 24/7",
      fancyboxDesc: "Dịch vụ cấp cứu khẩn cấp với đội ngũ y tế sẵn sàng mọi lúc.",
      buttonUrl: "/service/emergency"
    },
    {
      fancyboxImage: checkup,
      fancyboxTitle: "Khám Sức Khỏe Định Kỳ",
      fancyboxDesc: "Gói khám tổng quát giúp phát hiện sớm và phòng ngừa bệnh tật.",
      buttonUrl: "/service/checkup"
    },
    {
      fancyboxImage: pharmacy,
      fancyboxTitle: "Nhà Thuốc KiwiCare",
      fancyboxDesc: "Cung cấp thuốc chất lượng cao với tư vấn từ dược sĩ chuyên môn.",
      buttonUrl: "/service/pharmacy"
    }
  ];

  return (
    <Fragment>
      {/* Hero Section */}
      <div id="heroCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="4000">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://xdcs.cdnchinhphu.vn/446259493575335936/2024/1/13/bv-1705119640880430272769.jpg"
              className="d-block w-100"
              alt="KiwiCare Banner"
              style={{ objectFit: 'cover', height: '80vh', borderRadius: '8px' }}
            />
            <div
              className="carousel-caption d-flex flex-column justify-content-center align-items-center"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                position: 'absolute',
                borderRadius: '8px'
              }}
            >
              <h1 className="display-3 fw-bold text-white mb-3">Dịch Vụ Y Tế KiwiCare</h1>
              <p className="text-white fs-5">Chăm sóc sức khỏe toàn diện với các chuyên khoa hàng đầu</p>
            </div>
          </div>
        </div>
      </div>

      <div className="service-section">
        <div className="service-container">
          <div className="service-header">
            <h2 className="service-header-title">Khám Phá Dịch Vụ Của KiwiCare</h2>
            <p className="service-header-desc">Giải pháp y tế toàn diện, cá nhân hóa cho mọi nhu cầu sức khỏe</p>
          </div>
          <div className="service-grid">
            {fancyBoxData.map((item, index) => (
              <div key={index} className="service-grid-item">
                <FancyBox
                  fancyboxImage={item.fancyboxImage}
                  fancyboxTitle={item.fancyboxTitle}
                  fancyboxDesc={item.fancyboxDesc}
                  buttonUrl={item.buttonUrl}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ServicePage;