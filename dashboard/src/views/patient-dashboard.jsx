import { useState, useEffect, memo, Fragment } from 'react'
// react-botstrap
import { Button, Col, Row, Table } from 'react-bootstrap';
import { Dropdown } from "react-bootstrap";

// Redux Selector / Action
import { useSelector } from 'react-redux';

// Import selectors & action from setting store
import * as SettingSelector from '../store/setting/selectors'

//Flatpicker
import Flatpickr from "react-flatpickr";

//Apexcharts
import Chart from "react-apexcharts";

// Components
import Card from '../components/bootstrap/card'

// Images
import img1 from '/assets/images/patient-dashboard/skin-treatment.svg';
import img2 from '/assets/images/patient-dashboard/heart-cardiogram.svg';
import img3 from '/assets/images/patient-dashboard/dental.svg';
import img4 from '/assets/images/dashboard/draminelouis.png';
import img5 from '/assets/images/dashboard/drKeinoshine.png';
import img6 from '/assets/images/dashboard/drMaxwellena.png';

const PatientDashboard = memo((props) => {
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
        name: "series1",
        data: [40, 30, 35, 40, 35, 55, 60, 50, 60, 40, 51, 60, 70, 50],
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true,
        },
      },
      colors: ["#f68685"],
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
        lines: {
          show: false
        },
        grid: {
          show: false,
        },
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
  const chart2 = {
    series: [
      {
        name: "series1",
        data: [40, 30, 35, 40, 35, 55, 60, 50, 60, 40, 51, 60, 70, 50],
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true,
        },
      },
      colors: ["#7093E5"],
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
        lines: {
          show: false
        },
        grid: {
          show: false,
        },
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
  const chart3 = {
    series: [
      {
        name: "series1",
        data: [40, 30, 35, 40, 35, 55, 60, 50, 60, 40, 51, 60, 70, 50],
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true,
        },
      },
      colors: ["#f68685"],
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
        lines: {
          show: false
        },
        grid: {
          show: false,
        },
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
  const chart4 = {
    series: [
      {
        name: "series1",
        data: [40, 30, 35, 40, 35, 55, 60, 50, 60, 40, 51, 60, 70, 50],
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true,
        },
      },
      colors: ["#7093E5"],
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
        lines: {
          show: false
        },
        grid: {
          show: false,
        },
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

  const weightData = [
    { month: "January", weight: 60, unit: "kg" },
    { month: "February", weight: 65, unit: "kg" },
    { month: "March", weight: 70, unit: "kg" },
    { month: "April", weight: 75, unit: "kg" },
    { month: "May", weight: 70, unit: "kg" },
    { month: "June", weight: 65, unit: "kg" },
    { month: "July", weight: 60, unit: "kg" },
  ];
  const labels = weightData.map(data => data.month);
  const data = weightData.map(data => data.weight);
  const patientWeight = {

    series: [{
      name: "Weight",
      data: data,
    }],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true,
        }
      },
      colors: ["#7093E5"],
      plotOptions: {
        bar: {
          columnWidth: '8%',
          distributed: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      xaxis: {
        categories: labels,
        labels: {
          show: false,
        }
      },
      yaxis: {
        labels: {
          show: false,
        }
      }
    }
  }

  const patientHeight = {

    series: [{
      name: "Weight",
      data: data,
    }],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true,
        }
      },
      plotOptions: {
        bar: {
          columnWidth: '8%',
          distributed: true,
        }
      },
      colors: ["#7093E5"],
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      xaxis: {
        categories: labels,
        labels: {
          show: false,
        }
      },
      yaxis: {
        labels: {
          show: false,
        }
      }
    }
  }

  const patientActivityStatus = {
    series: [
      {
        name: "Walking",
        data: [5, 5.8, 9, 6, 7, 3, 6],
      },
      {
        name: "Exercise",
        data: [4, 6, 5.8, 5.5, 5.3, 4.3, 4],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
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
      colors: colors,
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun"],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            // Custom y-axis label formatting
            if (value === 2) return "00";
            if (value === 4) return "20";
            if (value === 6) return "40";
            if (value === 8) return "60";
            if (value === 10) return "80";
            return value;
          },
          offsetX: -15
        },
      },
    }
  }

  const patientWaterLevel = {
    series: [75],
    options: {
      chart: {
        type: 'radialBar',
        height: 300,
        offsetY: -20,
        sparkline: {
          enabled: true
        },
      },
      colors: colors,
      plotOptions: {
        radialBar: {
          track: {
            background: colors[0] + '1a',
            show: true,
            startAngle: undefined,
            endAngle: undefined,
            strokeWidth: '97%',
            opacity: 1,
            margin: 5,
            dropShadow: {
              enabled: false,
              top: 0,
              left: 0,
              blur: 3,
              opacity: 0.5
            }
          },
          dataLabels: {
            name: {
              fontSize: '20px',
              fontWeight: '600',
              color: 'var(--bs-primary-shade-80)',
              offsetY: 140,
            },
            value: {
              offsetY: -10,
              fontSize: '25px',
              fontWeight: '700',
              color: 'var(--bs-primary-shade-80)',
              formatter: function (val) {
                return val + "%";
              }
            },

          }
        }
      },
      labels: [' '],
    }
  }

  const tableData = [
    {
      SrNo: "1",
      userImg: img4,
      userName: "Dr.Amine Louis",
      userEmail: "amine@gmail.com",
      specialist: "Skin Specialist",
      visit: "03"
    },
    {
      SrNo: "2",
      userImg: img5,
      userName: "Dr.Keino Shine",
      userEmail: "keino@gmail.com",
      specialist: "Tooth Cleaning",
      visit: "05"
    },
    {
      SrNo: "3",
      userImg: img6,
      userName: "Dr.Maxwell Ena",
      userEmail: "maxwell@gmail.com",
      specialist: "Skin Whitening",
      visit: "02"
    }
  ]

  return (
    <Fragment>
      <h1 className="mt-5">Hello! Amine Steward</h1>
      <span className="mb-4">Have a nice day. don’t forget to take care of your self.</span>
      <Row className="pt-5">
        <Col lg="9">
          <Row>
            <Col xl="3" md="6">
              <Card>
                <Card.Body className="p-0">
                  <div className="d-flex align-items-center gap-4  patient-card px-5 pt-5">
                    <div className="img-area bg-secondary-subtle text-center f-none">
                      <svg className="icon-40 text-secondary" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M28.0092 15.8066H31.2729C31.4099 15.8066 31.5044 15.9494 31.4463 16.0738C31.0075 17.011 30.4081 17.8641 29.6752 18.5946L17.4216 30.8278C17.1904 31.059 16.8096 31.059 16.5784 30.8278L4.32481 18.5946C4.08048 18.3504 3.85049 18.0922 3.63597 17.8214C3.61351 17.7937 3.59935 17.7602 3.59514 17.7248C3.59092 17.6893 3.59682 17.6534 3.61214 17.6212C3.62747 17.589 3.6516 17.5618 3.68175 17.5427C3.7119 17.5236 3.74683 17.5134 3.78251 17.5134H9.51321C9.81639 17.5153 10.114 17.4317 10.3719 17.2724C10.6299 17.1131 10.8378 16.8843 10.9718 16.6124L11.7031 15.1494C11.7275 15.1007 11.7645 15.0594 11.8103 15.0299C11.856 15.0005 11.9089 14.9838 11.9633 14.9818C12.0177 14.9797 12.0716 14.9923 12.1195 15.0183C12.1673 15.0442 12.2073 15.0826 12.2352 15.1293L16.3268 21.9742C16.4662 22.202 16.7144 22.3448 16.9796 22.3448C16.9898 22.3448 17 22.3414 17.0102 22.3414C17.2856 22.3312 17.5372 22.1714 17.6596 21.9232L18.8496 19.5466C18.9516 19.3392 19.1624 19.21 19.397 19.21H21.3418C22.0116 19.21 22.6066 18.8088 22.8548 18.1866L25.1481 12.446C25.2532 12.1835 25.6285 12.1944 25.7179 12.4627L26.4588 14.688C26.5666 15.0139 26.7744 15.2975 27.0528 15.4984C27.3312 15.6992 27.6659 15.8071 28.0092 15.8066Z"
                          fill="currentColor" />
                        <path
                          d="M31.976 14.6469C31.9646 14.6871 31.9403 14.7226 31.9069 14.7478C31.8736 14.773 31.8329 14.7866 31.791 14.7866H28.0092C27.8806 14.7868 27.7553 14.7465 27.6509 14.6714C27.5466 14.5964 27.4685 14.4903 27.4278 14.3684L26.2004 10.6828C26.0984 10.3768 25.823 10.1694 25.5 10.1626C25.3442 10.1562 25.1904 10.1987 25.0599 10.284C24.9295 10.3694 24.829 10.4933 24.7724 10.6386L21.9096 17.8058C21.8645 17.9195 21.7862 18.0169 21.6849 18.0855C21.5837 18.154 21.4641 18.1904 21.3418 18.19H19.397C18.7748 18.19 18.2138 18.5368 17.935 19.091L16.9592 21.0426L12.5868 13.7258C12.5169 13.6081 12.4165 13.5115 12.2962 13.4463C12.1759 13.381 12.0402 13.3495 11.9034 13.3552C11.6246 13.3654 11.3764 13.5252 11.2506 13.7734L10.0606 16.1568C9.9552 16.3642 9.7478 16.4934 9.5132 16.4934H2.88048C2.84536 16.4934 2.81091 16.4837 2.78085 16.4656C2.75078 16.4474 2.72622 16.4214 2.7098 16.3904C0.952678 13.0166 1.4909 8.75637 4.3248 5.91941C7.7622 2.48541 13.294 2.42081 16.8062 5.72901C16.915 5.83101 17.085 5.83101 17.1938 5.72901C20.706 2.42081 26.2378 2.48541 29.6752 5.91941C32.0389 8.28309 32.8035 11.6392 31.976 14.6469Z"
                          fill="currentColor" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-secondary mb-0">78 Bpm</h3>
                      <span>Heart Rate</span>
                    </div>
                  </div>
                  <Chart options={chart1.options} series={chart1.series} height="100" type="area" />
                </Card.Body>
              </Card>
            </Col>
            <Col xl="3" md="6">
              <Card>
                <Card.Body className="p-0">
                  <div className="d-flex align-items-center gap-4  patient-card px-5 pt-5">
                    <div className="img-area bg-primary-subtle text-center f-none">
                      <svg className="icon-40 text-primary" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M4.25 13.2629C4.25 8.95395 7.10876 4.95831 11.0234 4.95831C13.74 4.95831 15.7557 6.75102 17 9.29409C18.2442 6.75118 20.2599 4.95831 22.9766 4.95831C26.8917 4.95831 29.75 8.95466 29.75 13.2629C29.75 14.0269 29.6625 14.7726 29.502 15.4977C28.1383 13.8211 26.0588 12.75 23.7292 12.75C19.6215 12.75 16.2917 16.0799 16.2917 20.1875C16.2917 23.1297 18 25.6728 20.479 26.8791C18.5041 28.2683 17 29.0416 17 29.0416C17 29.0416 4.25 22.8823 4.25 13.2629Z"
                          fill="currentColor" />
                        <path
                          d="M25.5 20.5416C25.5 21.3241 24.8657 21.9583 24.0833 21.9583C23.3009 21.9583 22.6667 21.3241 22.6667 20.5416C22.6667 20.4575 22.674 20.3751 22.688 20.295L20.9743 18.5813L21.9761 17.5795L23.6045 19.2079C23.754 19.1542 23.9152 19.125 24.0833 19.125C24.8657 19.125 25.5 19.7592 25.5 20.5416Z"
                          fill="currentColor" />
                        <path fillRule="evenodd" clipRule="evenodd"
                          d="M29.75 20.1875C29.75 23.5127 27.0544 26.2084 23.7292 26.2084C20.404 26.2084 17.7083 23.5127 17.7083 20.1875C17.7083 16.8623 20.404 14.1667 23.7292 14.1667C27.0544 14.1667 29.75 16.8623 29.75 20.1875ZM28.3333 20.1875C28.3333 22.7304 26.272 24.7917 23.7292 24.7917C21.1863 24.7917 19.125 22.7304 19.125 20.1875C19.125 17.6447 21.1863 15.5834 23.7292 15.5834C26.272 15.5834 28.3333 17.6447 28.3333 20.1875Z"
                          fill="currentColor" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-primary mb-0">102/72 mmHg</h3>
                      <span>Blood Pressure</span>
                    </div>
                  </div>
                  <Chart options={chart2.options} series={chart2.series} height="100" type="area" />
                </Card.Body>
              </Card>
            </Col>
            <Col xl="3" md="6">
              <Card>
                <Card.Body className="p-0">
                  <div className="d-flex align-items-center gap-4  patient-card px-5 pt-5">
                    <div className="img-area bg-secondary-subtle text-center f-none">
                      <svg className="icon-40 text-secondary" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M17 31.1666C13.7653 31.1666 11.0677 30.0569 8.9073 27.8375C6.74688 25.618 5.66667 22.8555 5.66667 19.55C5.66667 17.1889 6.60521 14.6212 8.4823 11.8469C10.3594 9.07255 13.1986 6.06804 17 2.83331C20.8014 6.06804 23.6406 9.07255 25.5177 11.8469C27.3948 14.6212 28.3333 17.1889 28.3333 19.55C28.3333 22.8555 27.2531 25.618 25.0927 27.8375C22.9323 30.0569 20.2347 31.1666 17 31.1666ZM12.75 24.7916H21.25V22.6666H12.75V24.7916ZM15.9375 21.25H18.0625V18.0625H21.25V15.9375H18.0625V12.75H15.9375V15.9375H12.75V18.0625H15.9375V21.25Z"
                          fill="currentColor" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-secondary mb-0">80 Mg/Dl</h3>
                      <span>Blood Sugar</span>
                    </div>
                  </div>
                  <Chart options={chart3.options} series={chart3.series} height="100" type="area" />
                </Card.Body>
              </Card>
            </Col>
            <Col xl="3" md="6">
              <Card>
                <Card.Body className="p-0">
                  <div className="d-flex align-items-center gap-4  patient-card px-5 pt-5">
                    <div className="img-area bg-primary-subtle text-center f-none">
                      <svg className="icon-40 text-primary" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M21.8291 27.9916C21.8087 28.6705 21.6531 29.3386 21.3713 29.9566C21.0896 30.5746 20.6873 31.1302 20.1881 31.5908C19.6889 32.0514 19.1028 32.4078 18.4641 32.639C17.8255 32.8703 17.1471 32.9718 16.4687 32.9375C13.7541 32.8525 11.4962 30.7169 11.4112 28.1563C11.3903 27.086 11.7164 26.0377 12.3407 25.1682C12.9651 24.2987 13.8542 23.6547 14.875 23.3325V9.85471H18.3547V23.3325C19.3505 23.6445 20.2225 24.2628 20.8464 25.0994C21.4702 25.936 21.8141 26.9481 21.8291 27.9916ZM18.3547 2.18877C18.3506 2.03667 18.3165 1.88687 18.2544 1.74793C18.1924 1.609 18.1036 1.48365 17.9931 1.37906C17.8825 1.27447 17.7525 1.19268 17.6104 1.13836C17.4682 1.08405 17.3168 1.05828 17.1647 1.06252H16.0597C15.7534 1.05538 15.4568 1.16989 15.2347 1.38098C15.0127 1.59206 14.8833 1.88252 14.875 2.18877V8.64877H18.3547V2.18877Z"
                          fill="currentColor" />
                        <path d="M13.1378 2.16217H8.5V3.26186H13.1378V2.16217Z" fill="currentColor" />
                        <path d="M13.1378 8.755H8.5V9.85469H13.1378V8.755Z" fill="currentColor" />
                        <path d="M13.1325 4.36157H10.8163V5.46126H13.1325V4.36157Z" fill="currentColor" />
                        <path d="M13.1325 6.56091H10.8163V7.6606H13.1325V6.56091Z" fill="currentColor" />
                        <path d="M13.1378 15.3531H8.5V16.4528H13.1378V15.3531Z" fill="currentColor" />
                        <path d="M13.1325 17.5472H10.8163V18.6469H13.1325V17.5472Z" fill="currentColor" />
                        <path d="M13.1325 19.7466H10.8163V20.8463H13.1325V19.7466Z" fill="currentColor" />
                        <path d="M13.1325 10.9543H10.8163V12.054H13.1325V10.9543Z" fill="currentColor" />
                        <path d="M13.1325 13.1537H10.8163V14.2534H13.1325V13.1537Z" fill="currentColor" />
                        <path
                          d="M26.1375 3.80908H23.3166C22.9323 3.8005 22.5602 3.94427 22.2815 4.20902C22.0028 4.47376 21.8402 4.83799 21.8291 5.22221V9.30752H27.625V5.22221C27.6202 5.03173 27.5779 4.84407 27.5005 4.66995C27.4231 4.49583 27.3122 4.33866 27.174 4.20743C27.0359 4.0762 26.8733 3.97347 26.6954 3.90512C26.5175 3.83677 26.328 3.80414 26.1375 3.80908ZM26.4669 7.10815H25.3087V8.3619H24.1453V7.10815H22.9872V6.00846H24.1453V5.08408H25.3087V6.00846H26.4669V7.10815ZM21.8291 10.5453V13.3875C21.8402 13.7717 22.0028 14.136 22.2815 14.4007C22.5602 14.6655 22.9323 14.8092 23.3166 14.8006H26.1375C26.328 14.8056 26.5175 14.773 26.6954 14.7046C26.8733 14.6363 27.0359 14.5335 27.174 14.4023C27.3122 14.2711 27.4231 14.1139 27.5005 13.9398C27.5779 13.7657 27.6202 13.578 27.625 13.3875V10.5453H21.8291ZM26.4669 13.2813H22.9872V12.1816H26.4669V13.2813Z"
                          fill="currentColor" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-primary mb-0">36,6 ℃</h3>
                      <span>Temperature</span>
                    </div>
                  </div>
                  <Chart options={chart4.options} series={chart4.series} height="100" type="area" />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col lg="3">
          <Card>
            <Card.Body className="p-5">
              <h4 className="mb-5">Body Measurement</h4>
              <Row>
                <Col md="6">
                  <div className="bg-primary-subtle p-3 mb-5 mb-lg-0 mb-md-0">
                    <h6 className="text-body">Weight</h6>
                    <Chart series={patientWeight.series} options={patientWeight.options} height="52" type="bar" />
                  </div>
                </Col>
                <Col md="6">
                  <div className="bg-primary-subtle p-3 mb-5 mb-lg-0 mb-md-0">
                    <h6 className="text-body">Height</h6>
                    <Chart series={patientHeight.series} options={patientWeight.options} height="52" type="bar" />
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xl="6">
          <Card>
            <Card.Header>
              <h4 className="card-title">Activity Status</h4>
              <div className="d-flex align-items-center">
                <Dropdown>
                  <Dropdown.Toggle className="arrow  dropdown btn btn-light-subtle border text-body py-2 px-3" id="dropdownMenuAppoinmentToday">
                    <span className="fw-500">Week</span>{' '}
                    <svg width="8" className="ms-2 transform-up" viewBox="0 0 12 8" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd"
                        d="M6 5.08579L10.2929 0.792893C10.6834 0.402369 11.3166 0.402369 11.7071 0.792893C12.0976 1.18342 12.0976 1.81658 11.7071 2.20711L6.70711 7.20711C6.31658 7.59763 5.68342 7.59763 5.29289 7.20711L0.292893 2.20711C-0.0976311 1.81658 -0.0976311 1.18342 0.292893 0.792893C0.683418 0.402369 1.31658 0.402369 1.70711 0.792893L6 5.08579Z"
                        fill="currentColor" />
                    </svg>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="dropdown-menu dropdown-menu-soft-primary sub-dropdown">
                    <Dropdown.Item className='active' href="#">Monday - Wednesday</Dropdown.Item>
                    <Dropdown.Item href="#">Wednesday - Friday</Dropdown.Item>
                    <Dropdown.Item href="#">Friday - Sunday</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Card.Header>
            <Card.Body className="pt-0">
              <Chart series={patientActivityStatus.series} options={patientActivityStatus.options} height="350" type="line" />
            </Card.Body>
          </Card>
        </Col>
        <Col xl="6">
          <Card>
            <Card.Header>
              <h3 className="mb-0">Upcoming Appointment</h3>
            </Card.Header>
            <Card.Body className="pt-0">
              <Row>
                <Col md="6">
                  <div className="course-picker pe-0 pe-lg-4">
                    <Flatpickr
                      className="d-none"
                      options={{ inline: true, minDate: "today" }}
                    />
                  </div>
                </Col>
                <Col md="6">
                  <ul className="list-inline m-0 ps-4 mt-5 mt-md-0 mt-lg-0">
                    <li className="d-flex mb-4 align-items-center pb-5 mb-5 border-bottom">
                      <div>
                        <div className="bg-primary-subtle p-3">
                          <img className="img-fluid" src={img1} alt="image" loading="lazy" />
                        </div>
                      </div>
                      <div className="ms-4 flex-grow-1">
                        <h5>Skin Treatment</h5>
                        <ul className="list-inline m-0 p-0 d-flex gap-2 align-items-center flex-wrap">
                          <li><h6 className="mb-0 text-body fw-normal">11:00 AM</h6></li>
                          <li className="bg-light rounded p-1"></li>
                          <li><h6 className="mb-0 text-body fw-normal">Dr.Amine Louis</h6></li>
                        </ul>
                      </div>
                      <div>
                        <button className="dropdown btn border-0 p-0">
                          <svg width="15" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5"
                              strokeLinecap="round" strokeLinejoin="round"></path>
                          </svg>
                        </button>
                      </div>
                    </li>
                    <li className="d-flex mb-4 align-items-center pb-5 mb-5 border-bottom">
                      <div>
                        <div className="bg-primary-subtle p-3">
                          <img className="img-fluid" src={img2} alt="image" loading="lazy" />
                        </div>
                      </div>
                      <div className="ms-4 flex-grow-1">
                        <h5>Cardiologist</h5>
                        <ul className="list-inline m-0 p-0 d-flex gap-2 align-items-center flex-wrap">
                          <li><h6 className="mb-0 text-body fw-normal">01:30 PM</h6></li>
                          <li className="bg-light rounded p-1"></li>
                          <li><h6 className="mb-0 text-body fw-normal">Dr.Keino shine</h6></li>
                        </ul>
                      </div>
                      <div>
                        <button className="dropdown btn border-0 p-0">
                          <svg width="15" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5"
                              strokeLinecap="round" strokeLinejoin="round"></path>
                          </svg>
                        </button>
                      </div>
                    </li>
                    <li className="d-flex mb-4 align-items-center">
                      <div>
                        <div className="bg-primary-subtle p-3">
                          <img className="img-fluid" src={img3} alt="image" loading="lazy" />
                        </div>
                      </div>
                      <div className="ms-4 flex-grow-1">
                        <h5>Dentist</h5>
                        <ul className="list-inline m-0 p-0 d-flex gap-2 align-items-center flex-wrap">
                          <li><h6 className="mb-0 text-body fw-normal">04:00 PM</h6></li>
                          <li className="bg-light rounded p-1"></li>
                          <li><h6 className="mb-0 text-body fw-normal">Dr.Olivia Wilson</h6></li>
                        </ul>
                      </div>
                      <div>
                        <button className="dropdown btn border-0 p-0">
                          <svg width="15" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5"
                              strokeLinecap="round" strokeLinejoin="round"></path>
                          </svg>
                        </button>
                      </div>
                    </li>
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg="5" md="6">
          <Card>
            <Card.Header className='flex-wrap gap-2 mb-3'>
              <div>
                <h4 className="mb-0">Visited Doctors</h4>
              </div>
              <Dropdown className="text-end">
                <Dropdown.Toggle as='span' className="dropdown btn border-0 p-0" id="dropdownMenuAppoinmentToday" bsPrefix=' '>
                  <span className="fw-500">View All</span>{' '}
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
                <Table className="table py-3 mb-0" role="grid" data-toggle="appointment_admin">
                  <thead className="bg-primary-subtle">
                    <tr className="text-dark">
                      <th className="border-bottom">No.</th>
                      <th className="border-bottom">Names</th>
                      <th className="border-bottom">Email</th>
                      <th className="border-bottom">Specialist</th>
                      <th className="border-bottom">Visits</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((item, index) => (
                      <tr key={index}>
                        <td>{item.SrNo}</td>
                        <td>
                          <div className="d-flex align-items-center gap-3">
                            <img className="img-fluid flex-shrink-0 icon-40 object-fit-cover"
                              src={item.userImg} alt="draminelouis" />
                            <h5 className="mb-0">{item.userName}</h5>
                          </div>
                        </td>
                        <td>{item.userEmail}</td>
                        <td>{item.specialist}</td>
                        <td>{item.visit}</td>
                      </tr>
                    ))}

                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg="3" md="6">
          <Card>
            <Card.Body>
              <Chart series={patientWaterLevel.series} options={patientWaterLevel.options} height="300" type="radialBar" />
              <h2 className="text-center mb-0">Water Level</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col lg="4">
          <Card>
            <Card.Header className='flex-wrap gap-2'>
              <div>
                <h4 className="mb-0">Payments</h4>
              </div>
              <Dropdown className="text-end">
                <Dropdown.Toggle as='span' className="dropdown btn border-0 p-0" id="dropdownMenuAppoinmentToday" bsPrefix=' '>
                  <span className="fw-500">View All</span>{' '}
                  <svg width="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                    className="transform-icon transform-down">
                    <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu dropdown-menu-soft-primary sub-dropdown">
                  <Dropdown.Item href="#">View</Dropdown.Item>
                  <Dropdown.Item href="#">Edit</Dropdown.Item>
                  <Dropdown.Item href="#">Print</Dropdown.Item>
                  <Dropdown.Item href="#">Download</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Card.Header>
            <Card.Body className="pt-0">
              <ul className="list-inline m-0 p-0">
                <li className="d-flex flex-sm-row flex-column align-items-sm-center align-items-start justify-content-between flex-wrap gap-1 mb-4 bg-primary-subtle py-3 px-4 rounded">
                  <div className="d-flex flex-sm-row flex-column align-items-sm-center align-items-start flex-wrap gap-4">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_483_2650)">
                        <path
                          d="M22 11C22 10.7348 22.1054 10.4804 22.2929 10.2929C22.4804 10.1054 22.7348 10 23 10H27C27.2652 10 27.5196 10.1054 27.7071 10.2929C27.8946 10.4804 28 10.7348 28 11V13C28 13.2652 27.8946 13.5196 27.7071 13.7071C27.5196 13.8946 27.2652 14 27 14H23C22.7348 14 22.4804 13.8946 22.2929 13.7071C22.1054 13.5196 22 13.2652 22 13V11Z"
                          fill="currentColor" />
                        <path
                          d="M4 4C2.93913 4 1.92172 4.42143 1.17157 5.17157C0.421427 5.92172 0 6.93913 0 8L0 24C0 25.0609 0.421427 26.0783 1.17157 26.8284C1.92172 27.5786 2.93913 28 4 28H28C29.0609 28 30.0783 27.5786 30.8284 26.8284C31.5786 26.0783 32 25.0609 32 24V8C32 6.93913 31.5786 5.92172 30.8284 5.17157C30.0783 4.42143 29.0609 4 28 4H4ZM30 8V18H2V8C2 7.46957 2.21071 6.96086 2.58579 6.58579C2.96086 6.21071 3.46957 6 4 6H28C28.5304 6 29.0391 6.21071 29.4142 6.58579C29.7893 6.96086 30 7.46957 30 8ZM28 26H4C3.46957 26 2.96086 25.7893 2.58579 25.4142C2.21071 25.0391 2 24.5304 2 24V22H30V24C30 24.5304 29.7893 25.0391 29.4142 25.4142C29.0391 25.7893 28.5304 26 28 26Z"
                          fill="currentColor" />
                      </g>
                      <defs>
                        <clipPath id="clip0_483_2650">
                          <rect width="32" height="32" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <div>
                      <h5 className="mb-0">Dr.Amine Louis</h5>
                      <h6 className="text-body fw-normal mb-0 mt-2">22 May At 11:00 AM</h6>
                    </div>
                  </div>
                  <h5 className="mb-0 text-primary mt-sm-0 mt-3">$300.50</h5>
                  <div className="dropdown text-end">
                    <button className="dropdown btn border-0 p-0">
                      <svg width="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5"
                          strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </button>
                  </div>
                </li>
                <li className="d-flex flex-sm-row flex-column align-items-sm-center align-items-start justify-content-between flex-wrap gap-1 mb-4 bg-primary-subtle py-3 px-4 rounded">
                  <div className="d-flex flex-sm-row flex-column align-items-sm-center align-items-start flex-wrap gap-4">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_483_26502)">
                        <path
                          d="M22 11C22 10.7348 22.1054 10.4804 22.2929 10.2929C22.4804 10.1054 22.7348 10 23 10H27C27.2652 10 27.5196 10.1054 27.7071 10.2929C27.8946 10.4804 28 10.7348 28 11V13C28 13.2652 27.8946 13.5196 27.7071 13.7071C27.5196 13.8946 27.2652 14 27 14H23C22.7348 14 22.4804 13.8946 22.2929 13.7071C22.1054 13.5196 22 13.2652 22 13V11Z"
                          fill="currentColor" />
                        <path
                          d="M4 4C2.93913 4 1.92172 4.42143 1.17157 5.17157C0.421427 5.92172 0 6.93913 0 8L0 24C0 25.0609 0.421427 26.0783 1.17157 26.8284C1.92172 27.5786 2.93913 28 4 28H28C29.0609 28 30.0783 27.5786 30.8284 26.8284C31.5786 26.0783 32 25.0609 32 24V8C32 6.93913 31.5786 5.92172 30.8284 5.17157C30.0783 4.42143 29.0609 4 28 4H4ZM30 8V18H2V8C2 7.46957 2.21071 6.96086 2.58579 6.58579C2.96086 6.21071 3.46957 6 4 6H28C28.5304 6 29.0391 6.21071 29.4142 6.58579C29.7893 6.96086 30 7.46957 30 8ZM28 26H4C3.46957 26 2.96086 25.7893 2.58579 25.4142C2.21071 25.0391 2 24.5304 2 24V22H30V24C30 24.5304 29.7893 25.0391 29.4142 25.4142C29.0391 25.7893 28.5304 26 28 26Z"
                          fill="currentColor" />
                      </g>
                      <defs>
                        <clipPath id="clip0_483_26500">
                          <rect width="32" height="32" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <div>
                      <h5 className="mb-0">Dr.Paige Turner</h5>
                      <h6 className="text-body fw-normal mb-0 mt-2">22 May At 11:00 AM</h6>
                    </div>
                  </div>
                  <h5 className="mb-0 text-primary mt-sm-0 mt-3">$250.50</h5>
                  <div className="dropdown text-end">
                    <button className="dropdown btn border-0 p-0">
                      <svg width="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5"
                          strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </button>
                  </div>
                </li>
                <li className="d-flex flex-sm-row flex-column align-items-sm-center align-items-start justify-content-between flex-wrap gap-1 mb-4 bg-primary-subtle py-3 px-4 rounded">
                  <div className="d-flex flex-sm-row flex-column align-items-sm-center align-items-start flex-wrap gap-4">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_483_26502)">
                        <path
                          d="M22 11C22 10.7348 22.1054 10.4804 22.2929 10.2929C22.4804 10.1054 22.7348 10 23 10H27C27.2652 10 27.5196 10.1054 27.7071 10.2929C27.8946 10.4804 28 10.7348 28 11V13C28 13.2652 27.8946 13.5196 27.7071 13.7071C27.5196 13.8946 27.2652 14 27 14H23C22.7348 14 22.4804 13.8946 22.2929 13.7071C22.1054 13.5196 22 13.2652 22 13V11Z"
                          fill="currentColor" />
                        <path
                          d="M4 4C2.93913 4 1.92172 4.42143 1.17157 5.17157C0.421427 5.92172 0 6.93913 0 8L0 24C0 25.0609 0.421427 26.0783 1.17157 26.8284C1.92172 27.5786 2.93913 28 4 28H28C29.0609 28 30.0783 27.5786 30.8284 26.8284C31.5786 26.0783 32 25.0609 32 24V8C32 6.93913 31.5786 5.92172 30.8284 5.17157C30.0783 4.42143 29.0609 4 28 4H4ZM30 8V18H2V8C2 7.46957 2.21071 6.96086 2.58579 6.58579C2.96086 6.21071 3.46957 6 4 6H28C28.5304 6 29.0391 6.21071 29.4142 6.58579C29.7893 6.96086 30 7.46957 30 8ZM28 26H4C3.46957 26 2.96086 25.7893 2.58579 25.4142C2.21071 25.0391 2 24.5304 2 24V22H30V24C30 24.5304 29.7893 25.0391 29.4142 25.4142C29.0391 25.7893 28.5304 26 28 26Z"
                          fill="currentColor" />
                      </g>
                      <defs>
                        <clipPath id="clip0_483_26501">
                          <rect width="32" height="32" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <div>
                      <h5 className="mb-0">Dr.Harriet Upp</h5>
                      <h6 className="text-body fw-normal mb-0 mt-2">22 May At 11:00 AM</h6>
                    </div>
                  </div>
                  <h5 className="mb-0 text-primary mt-sm-0 mt-3">$150.50</h5>
                  <div className="dropdown text-end">
                    <button className="dropdown btn border-0 p-0">
                      <svg width="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5"
                          strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </button>
                  </div>
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  )
}
)

PatientDashboard.displayName = "PatientDashboard"
export default PatientDashboard
