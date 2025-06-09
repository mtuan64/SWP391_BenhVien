import React,{ useState, useEffect, memo, Fragment } from 'react'

// react-botstrap
import { Row, Col, Dropdown } from "react-bootstrap";

//Apexcharts
import Chart from "react-apexcharts";

// Redux Selector / Action
import { useSelector } from 'react-redux';
// Import selectors & action from setting store
import * as SettingSelector from '../store/setting/selectors'

// Components
import Card from '../components/bootstrap/card'
import TopNav from "../components/widget/top-nav";

import img1 from '/assets/images/dashboard/apex-henry.png'
import img2 from '/assets/images/dashboard/leena-steward.png'
import img3 from '/assets/images/dashboard/saline-bell.png'

const Report = memo((props) => {

    useSelector(SettingSelector.theme_color)

    const getVariableColor = () => {
        let prefix = getComputedStyle(document.body).getPropertyValue('--prefix') || 'bs-';
        if (prefix) {
            prefix = prefix.trim()
        }
        const color1 = getComputedStyle(document.body).getPropertyValue(`--${prefix}primary`);
        const color2 = getComputedStyle(document.body).getPropertyValue(`--${prefix}secondary`);
        const color3 = getComputedStyle(document.body).getPropertyValue(`--${prefix}danger`);
        const color4 = getComputedStyle(document.body).getPropertyValue(`--${prefix}success`);
        return {
            primary: color1.trim(),
            secondary: color2.trim(),
            success: color4.trim(),
            danger: color3.trim(),
        };
    }
    const variableColors = getVariableColor();
    const [checked, setChecked] = useState(true);
    const colors = [variableColors.primary, variableColors.secondary, variableColors.success, variableColors.danger];
    useEffect(() => {
        return () => colors
    })

    const staffDetail = [
        {
            No: "1",
            Profile: img1,
            Name: "Apex Henry",
            Email: "apex@gmail.com",
            JoinDate: "22 Mar, 2023",
            Designation: "Compounder",
            WorkingDays: "24 Days Work Out Of 30"
        },
        {
            No: "2",
            Profile: img2,
            Name: "Leena Steward",
            Email: "leena@gmail.com",
            JoinDate: "16 June, 2023",
            Designation: "Supervisor",
            WorkingDays: "20 Days Work Out Of 30"
        },
        {
            No: "3",
            Profile: img3,
            Name: "Saline Bell",
            Email: "saline@gmail.com",
            JoinDate: "18 May, 2023",
            Designation: "Receptionist",
            WorkingDays: "26 Days Work Out Of 30"
        }
    ]

    const patientOverviewLineChart = {
        series: [
            {
              name: "Old Patient",
              data: [7, 4, 9, 4, 7, 3, 8],
            },
            {
              name: "New Patient",
              data: [3, 5, 3, 7, 4, 6, 9],
            },
        ],
        options: {
            chart: {
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            colors:colors,
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
                categories: ["80", "70", "60", "50", "40", "30", "20", "10"],
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
        }
    }

    const paymentHistory = {
        series: [
          {
            name: 'Online',
            data: [30, 50, 35, 60, 40, 60, 60, 30]
          }, {
            name: 'Offline',
            data: [40, 50, 55, 50, 30, 80, 30, 40]
          }
        ],
        options: {
            chart: {
                stacked: true,
                toolbar: {
                    show: false
                }
            },
              colors: colors,
            plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '50%',
                endingShape: 'rounded',
                borderRadius: 10,
            },
            },
            legend: {
            show: false
            },
            dataLabels: {
            enabled: false
            },
            stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
            },
            xaxis: {
            categories: ['80', '70', '60', '50', '40', '30', '20', '10'],
            labels: {
                minHeight: 20,
                maxHeight: 20,
                style: {
                colors: "#8A92A6",
                },
            }
            },
            yaxis: {
            title: {
                text: ''
            },
            labels: {
                minWidth: 19,
                maxWidth: 19,
                style: {
                colors: "#8A92A6",
                },
                offsetX: -5,
            }
            },
            fill: {
            opacity: 1
            },
            tooltip: {
            y: {
                formatter: function (val) {
                return "$ " + val + " thousands"
                }
            }
            }
        }
    }

    const monthlyProgressDonutChart = {
        series: [44, 55, 13, 33],
        options: {
            labels: ['January', 'February', 'March', 'April'],
            colors: colors,
            dataLabels: {
              enabled: false
            },
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                      width: 200,
                    type: 'donut',
                },
                legend: {
                  show: false
                }
              }
            }],
            legend: {
              position: 'right',
              offsetY: 0,
              height: 230,
            }
        }
    }

    return (
        <>
            <TopNav title="Report" />
            <Row>
                <Col lg="6">
                    <Card>
                        <Card.Header>
                            <h3 className="mb-0">Patient Overview</h3>
                            <Dropdown>
                                <Dropdown.Toggle className="arrow dropdown btn btn-light-subtle border text-body py-2 px-3" id="dropdownMenuAppoinmentToday">
                                    <span>Week</span>{' '}
                                    <svg width="8" className="ms-2 transform-up" viewBox="0 0 12 8" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd"
                                            d="M6 5.08579L10.2929 0.792893C10.6834 0.402369 11.3166 0.402369 11.7071 0.792893C12.0976 1.18342 12.0976 1.81658 11.7071 2.20711L6.70711 7.20711C6.31658 7.59763 5.68342 7.59763 5.29289 7.20711L0.292893 2.20711C-0.0976311 1.81658 -0.0976311 1.18342 0.292893 0.792893C0.683418 0.402369 1.31658 0.402369 1.70711 0.792893L6 5.08579Z"
                                            fill="currentColor" />
                                    </svg>
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="dropdown-menu dropdown-menu-soft-primary sub-dropdown">
                                    <Dropdown.Item href="#">Monday - Wednesday</Dropdown.Item>
                                    <Dropdown.Item href="#">Wednesday - Friday</Dropdown.Item>
                                    <Dropdown.Item href="#">Friday - Sunday</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Card.Header>
                        <Card.Body className="pt-0">
                            <Chart options = {patientOverviewLineChart.options} series = {patientOverviewLineChart.series} height={230} type="line" />
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg="6">
                    <Card>
                        <Card.Header>
                            <h3 className="mb-0">Payment History</h3>
                            <Dropdown>
                                <Dropdown.Toggle className="arrow dropdown btn btn-light-subtle border text-body py-2 px-3" id="dropdownMenuAppoinmentToday">
                                    <span>Movie</span>{' '}
                                    <svg width="8" className="ms-2 transform-up" viewBox="0 0 12 8" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd"
                                            d="M6 5.08579L10.2929 0.792893C10.6834 0.402369 11.3166 0.402369 11.7071 0.792893C12.0976 1.18342 12.0976 1.81658 11.7071 2.20711L6.70711 7.20711C6.31658 7.59763 5.68342 7.59763 5.29289 7.20711L0.292893 2.20711C-0.0976311 1.81658 -0.0976311 1.18342 0.292893 0.792893C0.683418 0.402369 1.31658 0.402369 1.70711 0.792893L6 5.08579Z"
                                            fill="currentColor" />
                                    </svg>
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="dropdown-menu dropdown-menu-soft-primary sub-dropdown">
                                    <Dropdown.Item href="#">Monthly Payment</Dropdown.Item>
                                    <Dropdown.Item href="#">By Movie Genre</Dropdown.Item>
                                    <Dropdown.Item href="#">By Theater</Dropdown.Item>
                                    <Dropdown.Item href="#">By Movie Release Date</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Card.Header>
                        <Card.Body className="pt-0">
                            <Chart series={paymentHistory.series} options={paymentHistory.options} height={230} type="bar" />
                            <div id="payment-history"></div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col lg="4">
                    <Card>
                        <Card.Header>
                            <h3 className="mb-0">Monthly Progress</h3>
                        </Card.Header>
                        <Card.Body className="pt-0">
                            <Chart series={monthlyProgressDonutChart.series} options={monthlyProgressDonutChart.options} width={380} type="donut" />
                            <div id="monthly-progress-donut-chart"></div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg="8">
                    <Card>
                        <Card.Header className='flex-wrap gap-3 mb-3'>
                            <h3 className="mb-0">Staff Member</h3>
                            <Dropdown>
                                <Dropdown.Toggle className="arrow dropdown btn btn-light-subtle border text-body py-2 px-3" id="dropdownMenuAppoinmentToday">
                                    <span>Month</span>{' '}
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
                        </Card.Header>
                        <Card.Body className="pt-0">
                            <div className="table-responsive">
                                <table className="table mb-0">
                                    <thead className="bg-primary-subtle">
                                        <tr className="text-dark">
                                            <th className="border-bottom">No.</th>
                                            <th className="border-bottom">Names</th>
                                            <th className="border-bottom">Email</th>
                                            <th className="border-bottom">Join Date</th>
                                            <th className="border-bottom">Designation</th>
                                            <th className="border-bottom">Working Days</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {staffDetail.map((item, index) => (
                                            <tr key={index} className={`${index === staffDetail.length - 1 && 'border-0'}`}>
                                                <td className={`${index === staffDetail.length - 1 && 'border-0'}`}>{item.No}</td>
                                                <td className={`${index === staffDetail.length - 1 && 'border-0'}`}>
                                                    <div className="d-flex align-items-center gap-3">
                                                        <img className="img-fluid" src={item.Profile}
                                                            alt="Courtney Henry" loading="lazy" />
                                                        <h5 className="mb-0">{item.Name}</h5>
                                                    </div>
                                                </td>
                                                <td className={`${index === staffDetail.length - 1 && 'border-0'}`}>{item.Email}</td>
                                                <td className={`${index === staffDetail.length - 1 && 'border-0'}`}>{item.JoinDate}</td>
                                                <td className={`${index === staffDetail.length - 1 && 'border-0'}`}>{item.Designation}</td>
                                                <td className={`${index === staffDetail.length - 1 && 'border-0'}`}>{item.WorkingDays}</td>
                                            </tr>
                                        ))}
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

Report.displayName = "Report"
export default Report;