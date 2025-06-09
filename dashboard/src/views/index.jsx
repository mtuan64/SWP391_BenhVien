import React,{ useState, useEffect, memo, Fragment } from 'react'

// react-botstrap
import { Row,Col, Button } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";

// Redux Selector / Action
import { useSelector } from 'react-redux';

// Import selectors & action from setting store
import * as SettingSelector from '../store/setting/selectors'

// react-router
import { Link } from "react-router-dom";

// Components
import Card from '../components/bootstrap/card'
import TopNav from "../components/widget/top-nav";

//Apexcharts
import Chart from "react-apexcharts";

// img
import img1 from '/assets/images/dashboard/dr-dashboard.png';
import imgfinance from '/assets/images/dashboard/finance.png';
import imghandhold from '/assets/images/dashboard/hand-holding-heart.png';
import img2 from '/assets/images/dashboard/draminelouis.png';
import img3 from '/assets/images/dashboard/drKeinoshine.png';
import img4 from '/assets/images/dashboard/drMaxwellena.png';
import img5 from '/assets/images/dashboard/angle-jonas.png';
import img6 from '/assets/images/dashboard/alexa-zander.png';
import img7 from '/assets/images/dashboard/angle-jonas.png';
import img8 from '/assets/images/table/10.png';
import img9 from '/assets/images/table/11.png';
import img10 from '/assets/images/table/12.png';
import { type } from 'jquery';


const Index = memo((props) => {
    useSelector(SettingSelector.theme_color)

    const getVariableColor = () => {
        let prefix = getComputedStyle(document.body).getPropertyValue('--prefix') || 'bs-';
        if (prefix) {
            prefix = prefix.trim()
        }
        const color1 = getComputedStyle(document.body).getPropertyValue(`--${prefix}primary`);
        const color2 = getComputedStyle(document.body).getPropertyValue(`--${prefix}secondary`);
        const color3 = getComputedStyle(document.body).getPropertyValue(`--${prefix}primary-tint-20`);
        const color4 = getComputedStyle(document.body).getPropertyValue(`--${prefix}warning`);
        return {
            primary: color1.trim(),
            secondary: color2.trim(),
            warning: color4.trim(),
            primary_light: color3.trim(),
        };
    }
    const variableColors = getVariableColor();
    const [checked, setChecked] = useState(true);
    const colors = [variableColors.primary, variableColors.secondary];
    useEffect(() => {
        return () => colors
    })

    const chart1 = {
        series: [
          {
            name: "Female",
            data: [7, 4, 9, 4, 7, 3, 8],
          },
          {
            name: "Male",
            data: [3, 5, 3, 7, 4, 6, 9],
          },],
        options: {
            height: 200,
            chart: {
                type: "line",
                zoom: {
                  enabled: false,
                },
                toolbar: {
                  show: false,
                },
              },
              colors: colors,
            dataLabels: {
                enabled: false,
              },
              stroke: {
                show: true,
                curve: "smooth",
                lineCap: "butt",
                width: 3,
                dashArray: 0,
              },
              grid: {
                show: true,
                strokeDashArray: 3,
              },
              xaxis: {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July"],
                labels: {
                            minHeight:22,
                            maxHeight:22,
                            show: true,
          
                        },
                axisBorder: {
                  show: false,
                },
                axisTicks: {
                  show: false,
                },
              },
              yaxis: {
                show: true,
                labels: {
                  show: true,
                  offsetX: -15,
                },
              },
          },
    }

    const chart2 ={
        series: [
            {
              name: "series1",
              data: [100, 80, 90, 85, 60, 109, 100, 80, 100, 40, 51, 60, 109, 100],
            },
        ],
        options: {
            chart: {
                height: 125,
                type: "area",
                toolbar: {
                show: false,
                },
                sparkline: {
                enabled: true,
                },
            },
            colors: colors,
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: "smooth",
                width: 1,
            },
            xaxis: {
                labels: {
                show: false,
                },
                type: "datetime",
                categories: [
                "2018-09-19T00:00:00.000Z",
                "2018-09-19T01:30:00.000Z",
                "2018-09-19T02:30:00.000Z",
                "2018-09-19T03:30:00.000Z",
                "2018-09-19T04:30:00.000Z",
                "2018-09-19T05:30:00.000Z",
                "2018-09-19T06:30:00.000Z",
                "2018-09-19T07:00:00.000Z",
                "2018-09-19T08:30:00.000Z",
                "2018-09-19T09:30:00.000Z",
                "2018-09-19T10:30:00.000Z",
                "2018-09-19T11:30:00.000Z",
                "2018-09-19T12:30:00.000Z",
                "2018-09-19T13:30:00.000Z",
                ],
            },
            yaxis: {
                show: false, // Hide the Y-axis line and labels
            },
            tooltip: {
                x: {
                format: "dd/MM/yy HH:mm",
                },
            },
        }
    }


    return (
        <>
            <TopNav title="Dashboard" />
            <Row>
                <Col lg={8}>
                    <div className="d-flex align-items-center justify-content-between flex-sm-row flex-column-reverse">
                        <div>
                            <h1 className="fs-37">
                                <span className="left-text text-capitalize fw-light">Good morning, </span>
                                <span className="right-text text-capitalize">Dr. Christopher </span>
                            </h1>
                            <p className="mb-5">Have a nice day at work. Progress is excellent!</p>
                            <div className="d-flex align-items-center flex-wrap gap-3">
                                <Link className="btn btn-primary">
                                    <span className="btn-inner">
                                        <span className="text d-inline-block align-middle">View Schedule</span>{" "}
                                        <span className="icon d-inline-block align-middle ms-1 ps-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8"
                                                fill="none">
                                                <path
                                                    d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z"
                                                    fill="currentColor" />
                                            </svg>
                                        </span>
                                    </span>
                                </Link>
                                <Link to="/appointment" className="btn btn-secondary">
                                    <span className="btn-inner">
                                        <span className="text d-inline-block align-middle">Appointment</span>{" "}
                                        <span className="icon d-inline-block align-middle ms-1 ps-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8"
                                                fill="none">
                                                <path
                                                    d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z"
                                                    fill="currentColor" />
                                            </svg>
                                        </span>
                                    </span>
                                </Link>
                            </div>
                        </div>
                        <div>
                            <img className="img-fluid" src={img1} alt="dr-profile"
                                loading="lazy" />
                        </div>
                    </div>
                    <Row className="mt-5">
                        <Col md={4}>
                            <Card className="card-block card-stretch card-height overflow-hidden">
                                <Card.Body className="px-0 pb-0 text-center d-flex flex-column justify-content-end">
                                    <h5>Monthly Progress</h5>
                                    <h3 className="text-secondary counter mb-4" style={{visibility: 'visible'}}>56%</h3>
                                    <Chart  options={chart2.options} series={chart2.series}  height={125} type="area"/>
                                    <div id="areachart"></div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="card-block card-stretch card-height overflow-hidden">
                                <Card.Body className="pb-0">
                                    <div className="d-flex justify-content-between">
                                        <h5 className="mb-3">Today Appointment</h5>
                                        <Dropdown className='lh-1'>
                                            <Dropdown.Toggle id="dropdownMenuTodayAppoinment" as="span" bsPrefix=' '>
                                                <svg width="3" height="20" viewBox="0 0 5 20" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg" style={{transform:'rotate(90deg)'}}>
                                                    <circle cx="2.5" cy="3" r="2.5" fill="currentColor" />
                                                    <circle cx="2.5" cy="10" r="2.5" fill="currentColor" />
                                                    <circle cx="2.5" cy="17" r="2.5" fill="currentColor" />
                                                </svg>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="dropdown-menu dropdown-menu-soft-primary sub-dropdown">
                                                <Dropdown.Item href="#">View</Dropdown.Item>
                                                <Dropdown.Item href="#">Delete</Dropdown.Item>
                                                <Dropdown.Item href="#">Edit</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div> 
                                    <div className="d-flex align-items-center gap-3">
                                        <h3 className="text-primary d-inline-block counter mb-0">50</h3>
                                        <span className="badge rounded-pill bg-success-subtle text-success p-2">+25.2%</span>
                                    </div>                                   
                                </Card.Body>   
                                <div className="card-bg position-relative mt-2">
                                    <img className="img-fluid float-end" src={imgfinance} alt="dr-profile" loading="lazy" />
                                </div>                             
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="card-block card-stretch card-height overflow-hidden">
                                <Card.Body className="pb-0">
                                    <div className="d-flex justify-content-between">
                                        <h5 className="mb-3">Total patients</h5>
                                        <Dropdown className='lh-1'>
                                            <Dropdown.Toggle id="dropdownMenuTodayPatient" as="span" bsPrefix=' '>
                                                <svg width="3" height="20" viewBox="0 0 5 20" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg" style={{transform:'rotate(90deg)'}}>
                                                    <circle cx="2.5" cy="3" r="2.5" fill="currentColor" />
                                                    <circle cx="2.5" cy="10" r="2.5" fill="currentColor" />
                                                    <circle cx="2.5" cy="17" r="2.5" fill="currentColor" />
                                                </svg>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="dropdown-menu dropdown-menu-soft-primary sub-dropdown">
                                                <Dropdown.Item href="#">View</Dropdown.Item>
                                                <Dropdown.Item href="#">Delete</Dropdown.Item>
                                                <Dropdown.Item href="#">Edit</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div> 
                                    <div className="d-flex align-items-center gap-3">
                                        <h3 className="text-primary d-inline-block counter mb-0">20M</h3>
                                        <span className="badge rounded-pill bg-success-subtle text-success p-2">+25.2% last week</span>
                                    </div>                                   
                                </Card.Body>   
                                <div className="card-bg position-relative mt-2">
                                    <img className="img-fluid float-end" src={imghandhold} alt="finance" loading="lazy" />
                                </div>                             
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col lg={4}>
                    <Card>
                        <Card.Header className="align-items-start flex-wrap gap-3">
                            <div>
                                <h4>Upcoming Appointment</h4>
                                <p className="mb-0">6 Appointment Today</p>
                            </div>
                            <Dropdown>
                                <Dropdown.Toggle className="arrow dropdown btn border btn-light-subtle text-body py-2 px-3" id="dropdownMenuAppoinmentToday">
                                    <span className="fw-500">Today</span>
                                    {' '}
                                    <svg width="8" className="ms-2 transform-up" viewBox="0 0 12 8" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd"
                                            d="M6 5.08579L10.2929 0.792893C10.6834 0.402369 11.3166 0.402369 11.7071 0.792893C12.0976 1.18342 12.0976 1.81658 11.7071 2.20711L6.70711 7.20711C6.31658 7.59763 5.68342 7.59763 5.29289 7.20711L0.292893 2.20711C-0.0976311 1.81658 -0.0976311 1.18342 0.292893 0.792893C0.683418 0.402369 1.31658 0.402369 1.70711 0.792893L6 5.08579Z"
                                            fill="currentColor" />
                                    </svg>
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="dropdown-menu dropdown-menu-soft-primary sub-dropdown">
                                    <Dropdown.Item className='active' href="#">Monday</Dropdown.Item>
                                    <Dropdown.Item href="#">Tuesday</Dropdown.Item>
                                    <Dropdown.Item href="#">Wednesday</Dropdown.Item>
                                    <Dropdown.Item href="#">Thursday</Dropdown.Item>
                                    <Dropdown.Item href="#">Friday</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Card.Header>
                        <Card.Body className="pt-0">
                            <div className="d-flex align-items-center mb-4 bg-primary-subtle px-3 py-3 px-lg-4 rounded">
                                <h6 className="mb-0 text-primary f-none">10:00 AM</h6>
                                <div className="border-start ps-3 ms-3 flex-grow-1">
                                    <h5>Emily Johnson</h5>
                                    <h6 className="mb-0">Reason: <span className="text-body fw-normal">Acne Treatment</span></h6>
                                </div>
                                <div>
                                    <button className="dropdown btn border-0 p-0">
                                    <svg width="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5"
                                                strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="d-flex align-items-center mb-4 bg-primary-subtle px-3 py-3 px-lg-4 rounded">
                                <h6 className="mb-0 text-primary f-none">10:00 AM</h6>
                                <div className="border-start ps-3 ms-3 flex-grow-1">
                                    <h5>Michael Rodriguez</h5>
                                    <h6 className="mb-0">Reason: <span className="text-body fw-normal">Tooth Cleaning</span></h6>
                                </div>
                                <div>
                                    <button className="dropdown btn border-0 p-0">
                                    <svg width="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5"
                                                strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="d-flex align-items-center bg-primary-subtle px-3 py-3 px-lg-4 rounded">
                                <h6 className="mb-0 text-primary f-none">10:00 AM</h6>
                                <div className="border-start ps-3 ms-3 flex-grow-1">
                                    <h5>Jessica Anderson</h5>
                                    <h6 className="mb-0">Reason: <span className="text-body fw-normal">Skin Whitening</span></h6>
                                </div>
                                <div>
                                    <button className="dropdown btn border-0 p-0">
                                        <svg width="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5"
                                                strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col lg={8}>
                    <Card>
                        <Card.Header className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                            <h4 className="card-title">Revenue</h4>
                            <div className="d-flex align-items-center">
                                <Dropdown className="dropdown text-end">
                                    <Dropdown.Toggle className="arrow dropdown btn btn-light-subtle border text-body py-2 px-3" id="dropdownMenuRevenue">
                                        <span className="fw-500">Month</span>{' '}
                                        <svg width="8" className="ms-2 transform-up" viewBox="0 0 12 8" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                d="M6 5.08579L10.2929 0.792893C10.6834 0.402369 11.3166 0.402369 11.7071 0.792893C12.0976 1.18342 12.0976 1.81658 11.7071 2.20711L6.70711 7.20711C6.31658 7.59763 5.68342 7.59763 5.29289 7.20711L0.292893 2.20711C-0.0976311 1.81658 -0.0976311 1.18342 0.292893 0.792893C0.683418 0.402369 1.31658 0.402369 1.70711 0.792893L6 5.08579Z"
                                                fill="currentColor" />
                                        </svg>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="dropdown-menu dropdown-menu-soft-primary sub-dropdown">
                                        <Dropdown.Item href="#">January</Dropdown.Item>
                                        <Dropdown.Item href="#">February</Dropdown.Item>
                                        <Dropdown.Item href="#">March</Dropdown.Item>
                                        <Dropdown.Item href="#">April</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Card.Header>
                        <Card.Body className="pt-0">
                        <Chart options={chart1.options} series={chart1.series}  height={200} type="line"/>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4}>
                    <Card>
                        <Card.Header className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
                            <h4 className="mb-0">Available Doctors</h4>
                            <Dropdown className="text-end">
                                <Dropdown.Toggle className="dropdown btn border-0 p-0" id="dropdownMenuAvailableDoc" bsPrefix=' '>
                                    <span className="fw-500 d-inline-block align-middle">View All</span>{' '}
                                    <svg width="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                        className="transform-icon transform-down">
                                        <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5"
                                            strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu dropdown-menu-soft-primary sub-dropdown">
                                    <Dropdown.Item href="#">View</Dropdown.Item>
                                    <Dropdown.Item href="#">Appointment</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Card.Header>
                        <Card.Body className="pt-0">
                            <ul className="list-inline m-0 p-0">
                                <li className="d-flex mb-4 align-items-center">
                                    <div>
                                        <img src={img2} alt="Dr-profile" loading="lazy" />
                                    </div>
                                    <div className="ms-4 flex-grow-1">
                                        <h5>Dr.Amine Louis</h5>
                                        <p className="mb-0">Skin Specialist</p>
                                    </div>
                                    <div>
                                        <h6 className="text-primary mb-0">120 patients</h6>
                                    </div>
                                </li>
                                <li className="d-flex mb-4 align-items-center">
                                    <div>
                                        <img src={img3} alt="Dr-profile" loading="lazy" />
                                    </div>
                                    <div className="ms-4 flex-grow-1">
                                        <h5>Dr.Keino Shine</h5>
                                        <p className="mb-0">Cardiologist</p>
                                    </div>
                                    <div>
                                        <h6 className="text-primary mb-0">89 Patients</h6>
                                    </div>
                                </li>
                                <li className="d-flex align-items-center">
                                    <div>
                                        <img src={img4} alt="Dr-profile" loading="lazy" />
                                    </div>
                                    <div className="ms-4 flex-grow-1">
                                        <h5>Dr.Maxwell Ena</h5>
                                        <p className="mb-0">Orthopedics</p>
                                    </div>
                                    <div>
                                        <h6 className="text-primary mb-0">106 patients</h6>
                                    </div>
                                </li>
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col lg={4}>
                    <Card>
                        <Card.Header className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                            <h4 className="mb-0">Transaction History</h4>
                            <Dropdown className="text-end">
                                <Dropdown.Toggle className="dropdown btn border-0 p-0" id="dropdownMenuTransaction" bsPrefix=' '>
                                    <span className="fw-500 d-inline-block align-middle">View All</span>{' '}
                                    <svg width="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                        className="transform-icon transform-down">
                                        <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5"
                                            strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu dropdown-menu-soft-primary sub-dropdown">
                                    <Dropdown.Item href="#">View</Dropdown.Item>
                                    <Dropdown.Item href="#">Delete</Dropdown.Item>
                                    <Dropdown.Item href="#">Edit</Dropdown.Item>
                                    <Dropdown.Item href="#">Print</Dropdown.Item>
                                    <Dropdown.Item href="#">Download</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Card.Header>
                        <Card.Body className="pt-0">
                        <ul className="list-inline m-0 p-0">
                            <li
                                className="d-flex flex-wrap gap-sm-1 gap-3 align-items-center justify-content-between flex-sm-row flex-column text-sm-start text-center bg-primary-subtle p-3 mb-4 rounded">
                                <div className="d-flex gap-3 align-items-center flex-sm-row flex-column">
                                    <img src={img5} alt="Dr-profile" loading="lazy" />
                                    <div>
                                        <h5>Angle Jonas </h5>
                                        <p className="mb-0 text-body">23 May,2023</p>
                                    </div>
                                </div>
                                <h5 className="mb-0">$2.493</h5>
                                <button className="badge bg-success-subtle text-success fw-500 px-3 py-2 border-0 me-sm-2 me-0">Paid</button>
                            </li>
                            <li
                                className="d-flex flex-wrap gap-sm-1 gap-3 align-items-center justify-content-between flex-sm-row flex-column text-sm-start text-center bg-primary-subtle p-3 mb-4 rounded">
                                <div className="d-flex gap-3 align-items-center flex-sm-row flex-column">
                                    <img src={img6} alt="Dr-profile" loading="lazy" />
                                    <div>
                                        <h5>Alexa Zander</h5>
                                        <p className="mb-0 text-body">06 June, 2023</p>
                                    </div>
                                </div>
                                <h5 className="mb-0">$05.69</h5>
                                <button className="badge bg-danger-subtle text-danger fw-500 px-3 py-2 border-0 me-sm-2 me-0">Accept</button>
                            </li>
                            <li
                                className="d-flex flex-wrap gap-sm-1 gap-3 align-items-center justify-content-between flex-sm-row flex-column text-sm-start text-center bg-primary-subtle p-3  rounded">
                                <div className="d-flex gap-3 align-items-center flex-sm-row flex-column">
                                    <img src={img7} alt="Dr-profile" loading="lazy" />
                                    <div>
                                        <h5>Smith Rayan</h5>
                                        <p className="mb-0 text-body">28 June, 2023</p>
                                    </div>
                                </div>
                                <h5 className="mb-0">$20.49</h5>
                                <button className="badge bg-success-subtle text-success fw-500 px-3 py-2 border-0 me-sm-2 me-0">Paid</button>
                            </li>

                        </ul>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={8}>
                    <Card>
                        <Card.Header className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                            <h4 className="mb-0">Appointment Request</h4>
                            <Dropdown className="text-end">
                                <Dropdown.Toggle className="dropdown btn border-0 p-0" id="dropdownMenuAppReq" bsPrefix=' '>
                                    <span className="fw-500 d-inline-block align-middle">View All</span>{' '}
                                    <svg width="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                        className="transform-icon transform-down">
                                        <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5"
                                            strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu dropdown-menu-soft-primary sub-dropdown">
                                    <Dropdown.Item href="#">View</Dropdown.Item>
                                    <Dropdown.Item href="#">Delete</Dropdown.Item>
                                    <Dropdown.Item href="#">Edit</Dropdown.Item>
                                    <Dropdown.Item href="#">Print</Dropdown.Item>
                                    <Dropdown.Item href="#">Download</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Card.Header>
                        <Card.Body className="pt-0">
                            <div className="table-responsive">
                            <table className="table py-3 mb-0" role="grid" data-toggle="appointment_admin">
                                <thead className="bg-primary-subtle">
                                    <tr className="text-dark">
                                        <th className="border-bottom">No.</th>
                                        <th className="border-bottom">Names</th>
                                        <th className="border-bottom">Date</th>
                                        <th className="border-bottom">Reason</th>
                                        <th className="border-bottom">Type</th>
                                        <th className="border-bottom">Staus</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>
                                            <div className="d-flex align-items-center gap-3">
                                                <img src={img8} className="img-fluid flex-shrink-0 icon-40 object-fit-cover" alt="Dr-profile" loading="lazy" />
                                                <h5 className="mb-0">Courtney Henry</h5>
                                            </div>
                                        </td>
                                        <td>22 Mar, 2023</td>
                                        <td>Acne Treatment</td>
                                        <td>New Patient</td>
                                        <td>
                                            <button className="badge bg-success-subtle text-success fw-500 px-3 py-2 border-0 me-2">Accept</button>{" "}
                                            <button className="badge bg-danger-subtle text-danger fw-500 px-3 py-2 border-0 me-2">Cancel</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>
                                            <div className="d-flex align-items-center gap-3">
                                                <img src={img9} className="img-fluid flex-shrink-0 icon-40 object-fit-cover" alt="Dr-profile" loading="lazy" />
                                                <h5 className="mb-0">Jerome Bell</h5>
                                            </div>
                                        </td>
                                        <td>16 June, 2023</td>
                                        <td>Tooth Cleaning</td>
                                        <td>Old Patient</td>
                                        <td>
                                            <button className="badge bg-success-subtle text-success fw-500 px-3 py-2 border-0 me-2">Accept</button>{" "}
                                            <button className="badge bg-danger-subtle text-danger fw-500 px-3 py-2 border-0 me-2">Cancel</button>
                                        </td>
                                    </tr>
                                    <tr className="border-0">
                                        <td className="border-0">3</td>
                                        <td className="border-0">
                                            <div className="d-flex align-items-center gap-3">
                                                <img src={img10} className="img-fluid flex-shrink-0 icon-40 object-fit-cover" alt="Dr-profile" loading="lazy" />
                                                <h5 className="mb-0">Darrell Steward</h5>
                                            </div>
                                        </td>
                                        <td className="border-0">18 May, 2023</td>
                                        <td className="border-0">Skin Whitening</td>
                                        <td className="border-0">Old Patient</td>
                                        <td className="border-0">
                                            <button className="badge bg-success-subtle text-success fw-500 px-3 py-2 border-0 me-2">Accept</button>{" "}
                                            <button className="badge bg-danger-subtle text-danger fw-500 px-3 py-2 border-0 me-2">Cancel</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}
)

Index.displayName = "Index"
export default Index