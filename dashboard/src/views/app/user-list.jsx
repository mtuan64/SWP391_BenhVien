import React,{ memo, Fragment,useRef } from "react";

//react-bootstrap
import { Row, Col } from "react-bootstrap";

//components
import Card from "../../components/bootstrap/card";

//Hooks 
import useDataTable from "../../components/hooks/useDatatable";
import $ from "jquery";

// img
import shap1 from "/assets/images/shapes/01.png";
import shap2 from "/assets/images/shapes/02.png";
import shap3 from "/assets/images/shapes/03.png";
import shap4 from "/assets/images/shapes/04.png";
import shap5 from "/assets/images/shapes/05.png";
import shap6 from "/assets/images/shapes/06.png";    

const tableData = ([
    {
      image: shap1,
      name: 'Anna Sthesia',
      contact: '(760) 756 7568',
      email: 'annasthesia@gmail.com',
      country: 'USA',
      status: 'Active',
      company: 'Acme Corporation',
      date: '2019/12/01',
      color:'primary'
    },
    {
      image: shap2,
      name: 'Brock Lee',
      contact: '+62 5689 458 658',
      email: 'brocklee@gmail.com',
      country: 'Indonesia',
      status: 'Active',
      company: 'Soylent Corp',
      date: '2019/12/01',
      color:'primary'
    },
    {
      image: shap3,
      name: 'Dan Druff',
      contact: '+55 6523 456 856',
      email: 'dandruff@gmail.com',
      country: 'Brazil',
      status: 'Pending',
      company: 'Umbrella Corporation',
      date: '2019/12/01',
      color:'warning'
    },
    {
      image: shap4,
      name: 'Hans Olo',
      contact: '+91 2586 253 125',
      email: 'hansolo@gmail.com',
      country: 'India',
      status: 'Inactive',
      company: 'Vehement Capital',
      date: '2019/12/01',
      color:'danger'
    },
    {
      image: shap5,
      name: 'Lynn Guini',
      contact: '+27 2563 456 589',
      email: 'lynnguini@gmail.com',
      country: 'Africa',
      status: 'Active',
      company: 'Massive Dynamic',
      date: '2019/12/01',
      color:'primary'
    },
    {
      image: shap6,
      name: 'Eric Shun',
      contact: '+55 25685 256 589',
      email: 'ericshun@gmail.com',
      country: 'Brazil',
      status: 'Pending',
      company: 'Globex Corporation',
      date: '2019/12/01',
      color:'warning'
    },
    {
      image: shap3,
      name: 'aaronottix',
      contact: '(760) 756 7568',
      email: 'budwiser@ymail.com',
      country: 'USA',
      status: 'Hold',
      company: 'Acme Corporation',
      date: '2019/12/01',
      color:'info'
    },
    {
      image: shap5,
      name: 'Marge Arita',
      contact: '+27 5625 456 589',
      email: 'margearita@gmail.com',
      country: 'Africa',
      status: 'Complite',
      company: 'Vehement Capital',
      date: '2019/12/01',
      color:'success'
    },
    {
      image: shap2,
      name: 'Bill Dabear',
      contact: '+55 2563 456 589',
      email: 'billdabear@gmail.com',
      country: 'Brazil',
      status: 'Active',
      company: 'Massive Dynamic',
      date: '2019/12/01',
      color:'primary'
    }
])

const UserList = memo(() => {
    const columns = useRef([
        {
          data: null,
          title: 'Profile',
          render: function (row) {
            return `
            <div class="text-center sorting_1">
              <img class="bg-primary-subtle rounded img-fluid avatar-40 me-3" src="${row.image}" alt="profile" loading="lazy">
           </div>`
          }
        },
        { data: 'name', title: 'Name' },
        { data: 'contact', title: 'Contact' },
        { data: 'email', title: 'Email' },
        { data: 'country', title: 'Country' },
        {
          data: null,
          title: 'Status',
          render: function (row) {
            return `
            <span class="badge bg-${row.color}">${row.status}</span>`
          }
        },
        { data: 'company', title: 'Company' },
        { data: 'date', title: 'Join Date' },
        {
          data: null,
          orderable: false,
          searchable: false,
          title: 'Action',
          render: function () {
            return `
            <div class="flex align-items-center list-user-action">
              <a class="text-success pe-2" data-bs-toggle="tooltip" data-bs-placement="top" href="#" aria-label="Add" data-bs-original-title="Add">
                <span class="btn-inner">
                <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M11.9849 15.3462C8.11731 15.3462 4.81445 15.931 4.81445 18.2729C4.81445 20.6148 8.09636 21.2205 11.9849 21.2205C15.8525 21.2205 19.1545 20.6348 19.1545 18.2938C19.1545 15.9529 15.8735 15.3462 11.9849 15.3462Z" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round" strokeLinejoin="round"></path>
                <path fillRule="evenodd" clipRule="evenodd" d="M11.9849 12.0059C14.523 12.0059 16.5801 9.94779 16.5801 7.40969C16.5801 4.8716 14.523 2.81445 11.9849 2.81445C9.44679 2.81445 7.3887 4.8716 7.3887 7.40969C7.38013 9.93922 9.42394 11.9973 11.9525 12.0059H11.9849Z" stroke="currentColor" strokeWidth="1.42857" stroke-linecap="round" strokeLinejoin="round"></path>
            </svg>                                    
                </span>
              </a>
              <a class="text-warning" data-bs-toggle="tooltip" data-bs-placement="top" data-original-title="Edit" href="#" aria-label="Edit" data-bs-original-title="Edit">
                <span class="btn-inner">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.31055 14.3321H14.75" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round" strokeLinejoin="round"></path>
                      <path fillRule="evenodd" clipRule="evenodd" d="M8.58501 1.84609C9.16674 1.15084 10.2125 1.04889 10.9222 1.6188C10.9614 1.64972 12.2221 2.62909 12.2221 2.62909C13.0017 3.10039 13.244 4.10233 12.762 4.86694C12.7365 4.90789 5.60896 13.8234 5.60896 13.8234C5.37183 14.1192 5.01187 14.2938 4.62718 14.298L1.89765 14.3323L1.28265 11.7292C1.1965 11.3632 1.28265 10.9788 1.51978 10.683L8.58501 1.84609Z" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round" strokeLinejoin="round"></path>
                      <path d="M7.26562 3.50073L11.3548 6.64108" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round" strokeLinejoin="round"></path>
                  </svg>
                </span>
              </a>
              <a class="text-danger ps-2" data-bs-toggle="tooltip" data-bs-placement="top" href="#" aria-label="Delete" data-bs-original-title="Delete">
                <span class="btn-inner">
                    <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.4938 6.10107C12.4938 6.10107 12.0866 11.1523 11.8503 13.2801C11.7378 14.2963 11.1101 14.8918 10.0818 14.9106C8.12509 14.9458 6.16609 14.9481 4.21009 14.9068C3.22084 14.8866 2.60359 14.2836 2.49334 13.2853C2.25559 11.1388 1.85059 6.10107 1.85059 6.10107" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round" strokeLinejoin="round"></path>
                      <path d="M13.5312 3.67969H0.812744" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round" strokeLinejoin="round"></path>
                      <path d="M11.0804 3.67974C10.4917 3.67974 9.98468 3.26349 9.86918 2.68674L9.68693 1.77474C9.57443 1.35399 9.19343 1.06299 8.75918 1.06299H5.58443C5.15018 1.06299 4.76918 1.35399 4.65668 1.77474L4.47443 2.68674C4.35893 3.26349 3.85193 3.67974 3.26318 3.67974" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round" strokeLinejoin="round"></path>
                  </svg>
                </span>
              </a>
            </div>`
          }
        }
      ])

    const listtableRef = useRef(null);

    useDataTable({
        tableRef: listtableRef,
        columns: columns.current,
        data: tableData,
      });
    
      if ($.fn.DataTable.isDataTable('#datatable-list')) {
      $('#datatable-list').DataTable().destroy();
    }

    $('#datatable-list').DataTable({
        createdRow: function (row, data, dataIndex) {
           $(row).find('td:eq(1), td:eq(3)').css('text-align', 'center');
        }
    });

    return (
        <Fragment>
            <Row>
                <Col sm="12">
                    <Card>
                        <Card.Header className="d-flex justify-content-between">
                        <div className="header-title">
                            <h4 className="card-title">User List</h4>
                        </div>
                        </Card.Header>
                        <Card.Body className="px-0">
                            <div className="table-responsive">
                                <table id="datatable-list" ref={listtableRef} className="data-tables table custom-table movie_table">
                                </table>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
});

export default UserList
