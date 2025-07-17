import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import MilestoneSection from "../components/MilestoneSection";
import "../assets/css/HomePage.css";

// Hardcoded doctor data
const doctors = [
  {
    _id: "1",
    userId: { fullname: "Nguyễn Văn An" },
    ProfileImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d",
    Specialty: "Nội Tổng Quát",
    Status: "active",
  },
  {
    _id: "2",
    userId: { fullname: "Trần Thị Bình" },
    ProfileImage: "https://images.unsplash.com/photo-1594824476967-48c8b964273f",
    Specialty: "Nhi Khoa",
    Status: "active",
  },
  {
    _id: "3",
    userId: { fullname: "Lê Minh Châu" },
    ProfileImage: "https://images.unsplash.com/photo-1598257006626-48b0c252070d",
    Specialty: "Phụ Sản",
    Status: "active",
  },
  {
    _id: "4",
    userId: { fullname: "Phạm Quốc Đạt" },
    ProfileImage: "https://nhakhoaviethan.vn/wp-content/uploads/2021/12/BS-QUAN.png",
    Specialty: "Ngoại Khoa",
    Status: "active",
  },
  {
    _id: "5",
    userId: { fullname: "Hoàng Thị Mai" },
    ProfileImage: "https://images.unsplash.com/photo-1594824476967-48c8b964273f",
    Specialty: "Chẩn Đoán Hình Ảnh",
    Status: "active",
  },
];

// Hardcoded services data
const services = [
  {
    id: "1",
    title: "Khám Nội Tổng Quát",
    description: "Đánh giá toàn diện sức khỏe với các bác sĩ nội khoa giàu kinh nghiệm.",
    icon: "fa fa-stethoscope",
  },
  {
    id: "2",
    title: "Nhi Khoa",
    description: "Chăm sóc sức khỏe trẻ em từ sơ sinh đến tuổi thiếu niên.",
    icon: "fa fa-child",
  },
  {
    id: "3",
    title: "Phụ Sản",
    description: "Hỗ trợ chăm sóc sức khỏe phụ nữ, thai kỳ và sau sinh.",
    icon: "fa fa-female",
  },
  {
    id: "4",
    title: "Chẩn Đoán Hình Ảnh",
    description: "Sử dụng công nghệ CT, MRI tiên tiến để chẩn đoán chính xác.",
    icon: "fa fa-x-ray",
  },
  {
    id: "5",
    title: "Phẫu Thuật Ngoại Khoa",
    description: "Thực hiện các ca phẫu thuật với trang thiết bị hiện đại.",
    icon: "fa fa-scalpel",
  },
  {
    id: "6",
    title: "Khám Sức Khỏe Định Kỳ",
    description: "Gói khám tổng quát giúp phát hiện và phòng ngừa bệnh tật.",
    icon: "fa fa-heartbeat",
  },
];

const HomePage = () => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [blogCarouselIndex, setBlogCarouselIndex] = useState(0);
  const [newsCarouselIndex, setNewsCarouselIndex] = useState(0);
  const [topViewedBlogs, setTopViewedBlogs] = useState([]);
  const [prioritizedNews, setPrioritizedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Truncate text for titles and excerpts
  const truncateText = (text, maxLength) => {
    if (!text || text.length <= maxLength) return text || "";
    return text.substring(0, maxLength - 3) + "...";
  };

  // Get content summary for blogs
  const getBlogContentSummary = (content) => {
    if (!Array.isArray(content) || content.length === 0)
      return "Không có nội dung";
    const firstItem = content[0];
    return truncateText(firstItem.text, 50);
  };

  // Get content summary for news
  const getNewsContentSummary = (content) => {
    return truncateText(content, 50);
  };

  // Filter active doctors
  const activeDoctors = doctors.filter((doctor) => doctor.Status !== "inactive");

  // Handle carousel navigation for doctors
  const handleNext = () => {
    setCarouselIndex((prevIndex) => (prevIndex + 1) % activeDoctors.length);
  };

  const handlePrev = () => {
    setCarouselIndex((prevIndex) =>
      prevIndex === 0 ? activeDoctors.length - 1 : prevIndex - 1
    );
  };

  // Handle carousel navigation for blogs
  const handleBlogNext = () => {
    setBlogCarouselIndex((prevIndex) => (prevIndex + 1) % topViewedBlogs.length);
  };

  const handleBlogPrev = () => {
    setBlogCarouselIndex((prevIndex) =>
      prevIndex === 0 ? topViewedBlogs.length - 1 : prevIndex - 1
    );
  };

  // Handle carousel navigation for news
  const handleNewsNext = () => {
    setNewsCarouselIndex((prevIndex) => (prevIndex + 1) % prioritizedNews.length);
  };

  const handleNewsPrev = () => {
    setNewsCarouselIndex((prevIndex) =>
      prevIndex === 0 ? prioritizedNews.length - 1 : prevIndex - 1
    );
  };

  // Get the doctors to display based on carouselIndex
  const getVisibleDoctors = () => {
    const visibleDoctors = [];
    for (let i = 0; i < 4; i++) {
      const index = (carouselIndex + i) % activeDoctors.length;
      visibleDoctors.push(activeDoctors[index]);
    }
    return visibleDoctors;
  };

  // Get the blogs to display based on blogCarouselIndex
  const getVisibleBlogs = () => {
    const visibleBlogs = [];
    for (let i = 0; i < 4; i++) {
      const index = (blogCarouselIndex + i) % topViewedBlogs.length;
      visibleBlogs.push(topViewedBlogs[index]);
    }
    return visibleBlogs;
  };

  // Get the news to display based on newsCarouselIndex
  const getVisibleNews = () => {
    const visibleNews = [];
    for (let i = 0; i < 4; i++) {
      const index = (newsCarouselIndex + i) % prioritizedNews.length;
      visibleNews.push(prioritizedNews[index]);
    }
    return visibleNews;
  };

  // Fetch top viewed blogs and prioritized news
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        // Fetch top viewed blogs and prioritized news
        const [blogResponse, newsResponse] = await Promise.all([
          axios.get("http://localhost:9999/api/staff/blogs/top-viewed", { headers }),
          axios.get("http://localhost:9999/api/staff/news/priority", { headers }),
        ]);

        setTopViewedBlogs(blogResponse.data.data || blogResponse.data);
        setPrioritizedNews(newsResponse.data.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu:", err);
        setError(
          err.response?.data?.message ||
          "Không thể tải bài viết hoặc tin tức. Vui lòng kiểm tra API."
        );
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="homepage-loading">Đang tải...</div>;
  }

  if (error) {
    return <div className="homepage-error">Lỗi: {error}</div>;
  }

  return (
    <>
      {/* Topbar */}
      <div className="bg-light py-2 px-5 d-none d-lg-block">
        <Row className="align-items-center justify-content-between">
          <Col md={6} className="text-start">
            <small>
              <i className="far fa-clock text-primary me-2"></i>
              Opening Hours: Mon - Sat : 7.00 am - 8.00 pm, Sunday 9.00 am - 5.00 pm
            </small>
          </Col>
          <Col md={6} className="text-end">
            <small className="me-4">
              <i className="fa fa-envelope-open text-primary me-2"></i>
              contact@kiwicare.com
            </small>
            <small>
              <i className="fa fa-phone-alt text-primary me-2"></i>
              +987 654 3210
            </small>
          </Col>
        </Row>
      </div>

      {/* Hero Carousel */}
      <div
        id="heroCarousel"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d"
              className="d-block w-100"
              alt="KiwiCare Banner"
              style={{ objectFit: "cover", height: "90vh" }}
            />
            <div
              className="carousel-caption d-flex flex-column justify-content-center align-items-center text-center"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                padding: "0 15px",
              }}
            >
              <div className="text-white">
                <h5
                  className="text-uppercase fw-semibold mb-3"
                  style={{ letterSpacing: "2px" }}
                >
                  Chăm Sóc Sức Khỏe Toàn Diện
                </h5>
                <h1 className="display-3 fw-bold mb-4">
                  Dịch Vụ Y Tế Chất Lượng Tại KiwiCare
                </h1>
                <div>
                  <Link
                    to="/appointment"
                    className="btn btn-primary btn-lg px-4 me-3 shadow"
                  >
                    Đặt Lịch Hẹn
                  </Link>
                  <Link
                    to="/contact"
                    className="btn btn-outline-light btn-lg px-4 shadow"
                  >
                    Liên Hệ
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Us */}
      <Container className="py-5">
        <Row className="align-items-center">
          <Col md={6} className="mb-4 mb-md-0">
            <img
              src="https://images.unsplash.com/photo-1579684453423-f84349ef60b0"
              alt="Phòng Khám KiwiCare"
              className="img-fluid rounded shadow-lg"
              style={{ transition: "transform 0.3s ease", transform: "scale(1)" }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            />
          </Col>
          <Col md={6}>
            <h2 className="text-primary fw-bold mb-3 ">Phòng Khám Đa Khoa KiwiCare</h2>
            <p className="text-muted mb-4 fs-5">
              Phòng Khám Đa Khoa KiwiCare tự hào là đơn vị cung cấp dịch vụ y tế toàn diện, với đội ngũ bác sĩ được đào tạo tại các trường đại học y khoa hàng đầu trong và ngoài nước. Chúng tôi chuyên cung cấp các dịch vụ đa chuyên khoa như nội khoa, nhi khoa, phụ sản, và phẫu thuật ngoại khoa, đáp ứng tiêu chuẩn y tế quốc tế. Với sứ mệnh mang đến sức khỏe và sự an tâm, KiwiCare cam kết đồng hành cùng bạn trong mọi nhu cầu chăm sóc sức khỏe.
            </p>
          </Col>
        </Row>
      </Container>

      {/* Tiêu chí phòng khám */}
      <MilestoneSection />

      {/* Cơ sở vật chất */}
      <section className="mb-5">
        <h3 className="text-primary mb-4 fw-bold text-center">Cơ Sở Vật Chất</h3>
        <div id="facilityCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="3000">
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#facilityCarousel"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#facilityCarousel"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#facilityCarousel"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://benhvienungbuoukhanhhoa.vn/uploads/news/2023_05/he-thong-chup-clvt.jpg"
                className="d-block w-100"
                alt="Máy chụp CT"
                data-ascending="true"
                style={{ objectFit: 'cover', height: '50vh', borderRadius: '8px' }}
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
                  borderRadius: '8px',
                  padding: '20px'
                }}
              >
                <h4 className="text-white fw-bold mb-3">Hệ Thống Chẩn Đoán Hình Ảnh</h4>
                <p className="text-white text-center fs-6">
                  Máy chụp CT và MRI tiên tiến, hỗ trợ chẩn đoán chính xác và nhanh chóng.
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="https://vietnamcleanroom.com/vcr-media/22/10/22/phong-mo-hien-dai.jpg"
                className="d-block w-100"
                alt="Phòng phẫu thuật"
                style={{ objectFit: 'cover', height: '50vh', borderRadius: '8px' }}
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
                  borderRadius: '8px',
                  padding: '20px'
                }}
              >
                <h4 className="text-white fw-bold mb-3">Phòng Phẫu Thuật Hiện Đại</h4>
                <p className="text-white text-center fs-6">
                  Trang bị công nghệ tiên tiến, đáp ứng các ca phẫu thuật phức tạp.
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="https://thietbilabhoasinh.com/ckeditor/plugins/fileman/Uploads/tu-an-toan-sinh-hoc-cap-2-xet-nghiem.jpg"
                className="d-block w-100"
                alt="Phòng xét nghiệm"
                style={{ objectFit: 'cover', height: '50vh', borderRadius: '8px' }}
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
                  borderRadius: '8px',
                  padding: '20px'
                }}
              >
                <h4 className="text-white fw-bold mb-3">Phòng Xét Nghiệm</h4>
                <p className="text-white text-center fs-6">
                  Hệ thống xét nghiệm tự động, đảm bảo kết quả nhanh chóng và chính xác.
                </p>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#facilityCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#facilityCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>

      {/* Services Section */}
      <Container fluid className="bg-light py-5">
        <Container>
          <h2 className="text-center text-primary fw-bold mb-5">
            Các Loại Dịch Vụ
          </h2>
          <Row>
            {services.map((service) => (
              <Col md={4} lg={2} key={service.id} className="mb-4">
                <div className="service-item bg-white shadow rounded p-4 text-center">
                  <i className={`${service.icon} fa-3x text-primary mb-3`}></i>
                  <h5>{service.title}</h5>
                  <p className="text-muted">{service.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </Container>

      {/* Priority News Section */}
      <Container fluid className="bg-light py-5">
        <Container>
          <h2 className="text-center text-primary fw-bold mb-5">Tin Tức Phòng Khám</h2>
          {prioritizedNews.length <= 4 ? (
            <Row>
              {prioritizedNews.map((news, index) => (
                <Col key={index} md={6} lg={3} className="mb-4">
                  <div className="news-card bg-white rounded shadow h-100">
                    <Link to={`/news/${news.slug}`}>
                      <img
                        src={news.thumbnail || "https://via.placeholder.com/100x100"}
                        alt={news.title}
                        className="news-image img-fluid w-100"
                        style={{ height: "150px", objectFit: "cover" }}
                        onError={(e) => (e.target.src = "https://via.placeholder.com/100x100")}
                      />
                    </Link>
                    <div className="p-3">
                      <Link
                        to={`/news/${news.slug}`}
                        className="text-decoration-none"
                      >
                        <h5 className="news-title mb-2">
                          {truncateText(news.title, 20)}
                        </h5>
                      </Link>
                      <p className="news-excerpt text-muted mb-2">
                        {getNewsContentSummary(news.content)}
                      </p>
                      <Link
                        to={`/news/${news.slug}`}
                        className="btn btn-outline-primary btn-sm"
                      >
                        Đọc bài viết
                      </Link>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          ) : (
            <div className="news-carousel">
              <Row className="flex-nowrap news-carousel-inner">
                {getVisibleNews().map((news, index) => (
                  <Col key={index} md={6} lg={3} className="mb-4">
                    <div className="news-card bg-white rounded shadow h-100">
                      <Link to={`/news/${news.slug}`}>
                        <img
                          src={news.thumbnail || "https://via.placeholder.com/100x100"}
                          alt={news.title}
                          className="news-image img-fluid w-100"
                          style={{ height: "150px", objectFit: "cover" }}
                          onError={(e) => (e.target.src = "https://via.placeholder.com/100x100")}
                        />
                      </Link>
                      <div className="p-3">
                        <Link
                          to={`/news/${news.slug}`}
                          className="text-decoration-none"
                        >
                          <h5 className="news-title mb-2">
                            {truncateText(news.title, 20)}
                          </h5>
                        </Link>
                        <p className="news-excerpt text-muted mb-2">
                          {getNewsContentSummary(news.content)}
                        </p>
                        <Link
                          to={`/news/${news.slug}`}
                          className="btn btn-outline-primary btn-sm"
                        >
                          Đọc bài viết
                        </Link>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
              <button
                className="carousel-control-prev"
                type="button"
                onClick={handleNewsPrev}
              >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                onClick={handleNewsNext}
              >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          )}
        </Container>
      </Container>

      {/* Most Viewed Blogs Section */}
      <Container className="py-5">
        <h2 className="text-center text-primary fw-bold mb-5">Bài Viết Nổi Bật</h2>
        {topViewedBlogs.length <= 4 ? (
          <Row>
            {topViewedBlogs.map((blog, index) => (
              <Col key={index} md={6} lg={3} className="mb-4">
                <div className="blog-card bg-white rounded shadow h-100">
                  <Link to={`/blog/${blog.slug}`}>
                    <img
                      src={blog.image || "https://via.placeholder.com/100x100"}
                      alt={blog.title}
                      className="blog-image img-fluid w-100"
                      style={{ height: "150px", objectFit: "cover" }}
                      onError={(e) => (e.target.src = "https://via.placeholder.com/100x100")}
                    />
                  </Link>
                  <div className="p-3">
                    <Link
                      to={`/blog/${blog.slug}`}
                      className="text-decoration-none"
                    >
                      <h5 className="blog-title mb-2">
                        {truncateText(blog.title, 20)}
                      </h5>
                    </Link>
                    <p className="blog-excerpt text-muted mb-2">
                      {getBlogContentSummary(blog.content)}
                    </p>
                    <Link
                      to={`/blog/${blog.slug}`}
                      className="btn btn-outline-primary btn-sm"
                    >
                      Đọc bài viết
                    </Link>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        ) : (
          <div className="blogs-carousel">
            <Row className="flex-nowrap blogs-carousel-inner">
              {getVisibleBlogs().map((blog, index) => (
                <Col key={index} md={6} lg={3} className="mb-4">
                  <div className="blog-card bg-white rounded shadow h-100">
                    <Link to={`/blog/${blog.slug}`}>
                      <img
                        src={blog.image || "https://via.placeholder.com/100x100"}
                        alt={blog.title}
                        className="blog-image img-fluid w-100"
                        style={{ height: "150px", objectFit: "cover" }}
                        onError={(e) => (e.target.src = "https://via.placeholder.com/100x100")}
                      />
                    </Link>
                    <div className="p-3">
                      <Link
                        to={`/blog/${blog.slug}`}
                        className="text-decoration-none"
                      >
                        <h5 className="blog-title mb-2">
                          {truncateText(blog.title, 20)}
                        </h5>
                      </Link>
                      <p className="blog-excerpt text-muted mb-2">
                        {getBlogContentSummary(blog.content)}
                      </p>
                      <Link
                        to={`/blog/${blog.slug}`}
                        className="btn btn-outline-primary btn-sm"
                      >
                        Đọc bài viết
                      </Link>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
            <button
              className="carousel-control-prev"
              type="button"
              onClick={handleBlogPrev}
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              onClick={handleBlogNext}
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        )}
      </Container>



      {/* Our Doctors */}
      <Container className="py-5">
        <h2 className="text-center mb-4 fw-bold text-primary">Đội Ngũ Bác Sĩ</h2>
        {activeDoctors.length <= 4 ? (
          <Row>
            {activeDoctors.map((doctor) => (
              <Col key={doctor._id} lg={3} md={6} sm={12} className="mb-4">
                <div
                  className="bg-light rounded shadow h-100"
                  style={{ overflow: "hidden" }}
                >
                  <img
                    src={doctor.ProfileImage}
                    alt={doctor.userId?.fullname || "Doctor"}
                    className="img-fluid w-100"
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <div className="p-3 text-center">
                    <h5 className="mb-1">
                      {doctor.userId
                        ? `Bác sĩ ${doctor.userId.fullname}`
                        : "Bác sĩ không rõ tên"}
                    </h5>
                    <p className="text-muted mb-2">
                      <strong>Chuyên ngành:</strong>{" "}
                      {doctor.Specialty || "Không rõ"}
                    </p>
                    <Link
                      to={`/doctor/${doctor._id}`}
                      className="btn btn-outline-primary btn-sm"
                    >
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        ) : (
          <div className="doctors-carousel">
            <Row className="flex-nowrap doctors-carousel-inner">
              {getVisibleDoctors().map((doctor) => (
                <Col key={doctor._id} lg={3} md={6} sm={12} className="mb-4">
                  <div
                    className="bg-light rounded shadow h-100"
                    style={{ overflow: "hidden" }}
                  >
                    <img
                      src={doctor.ProfileImage}
                      alt={doctor.userId?.fullname || "Doctor"}
                      className="img-fluid w-100"
                      style={{ height: "250px", objectFit: "cover" }}
                    />
                    <div className="p-3 text-center">
                      <h5 className="mb-1">
                        {doctor.userId
                          ? `Bác sĩ ${doctor.userId.fullname}`
                          : "Bác sĩ không rõ tên"}
                      </h5>
                      <p className="text-muted mb-2">
                        <strong>Chuyên ngành:</strong>{" "}
                        {doctor.Specialty || "Không rõ"}
                      </p>
                      <Link
                        to={`/doctor/${doctor._id}`}
                        className="btn btn-outline-primary btn-sm"
                      >
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
            <button
              className="carousel-control-prev"
              type="button"
              onClick={handlePrev}
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              onClick={handleNext}
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        )}
      </Container>
    </>
  );
};

export default HomePage;