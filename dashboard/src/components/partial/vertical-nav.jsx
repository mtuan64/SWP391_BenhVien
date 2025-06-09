import React,{memo,Fragment,useState,useContext} from 'react'

import { Accordion,OverlayTrigger,Tooltip,AccordionContext,useAccordionButton } from 'react-bootstrap'
import { Link,useLocation } from 'react-router-dom'

// componets
import SidebarMenu from './sidebar/sidebar-menu';

function CustomToggle({ children, eventKey, onClick }) {

    const { activeEventKey } = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(eventKey, (active) => onClick({ state: !active, eventKey: eventKey }));

    const isCurrentEventKey = activeEventKey === eventKey;

    return (
        <Link to="#" aria-expanded={isCurrentEventKey ? 'true' : 'false'} className={`${activeEventKey === eventKey ? 'active' : ''} nav-link`} role="button" onClick={(e) => {
            decoratedOnClick(isCurrentEventKey)
        }}>
            {children}
        </Link>
    );
}

const VerticalNav = memo(() => {
    const [activeMenu, setActiveMenu] = useState(false)
    const [active, setActive] = useState('')
    //location
    let location = useLocation();
    return (
        <Fragment>
            <Accordion as="ul" className="navbar-nav iq-main-menu" id="sidebar-menu">
                <li className="nav-item static-item">
                    <Link className="nav-link static-item disabled text-start" to="#" tabIndex="-1">
                        <span className="default-icon">Home</span>
                        <span className="mini-icon" data-bs-toggle="tooltip" title="Home" data-bs-placement="right">-</span>
                    </Link>
                </li>

                <Accordion.Item as="li" eventKey="dashboard" bsPrefix={`nav-item ${active === 'dashboard' ? 'active' : ''} `} onClick={() => setActive('dashboard')}>
                    <CustomToggle eventKey="dashboard" active={activeMenu === 'dashboard' ? true : false} onClick={(activeKey) => setActiveMenu(activeKey)} >
                        <OverlayTrigger placement="right" overlay={<Tooltip>Menu Style</Tooltip>}>
                            <i className="icon" data-bs-toggle="tooltip" title="Dashboard" data-bs-placement="right">
                                <svg width="20" className="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4"
                                        d="M16.0756 2H19.4616C20.8639 2 22.0001 3.14585 22.0001 4.55996V7.97452C22.0001 9.38864 20.8639 10.5345 19.4616 10.5345H16.0756C14.6734 10.5345 13.5371 9.38864 13.5371 7.97452V4.55996C13.5371 3.14585 14.6734 2 16.0756 2Z"
                                        fill="currentColor"></path>
                                    <path fillRule="evenodd" clipRule="evenodd"
                                        d="M4.53852 2H7.92449C9.32676 2 10.463 3.14585 10.463 4.55996V7.97452C10.463 9.38864 9.32676 10.5345 7.92449 10.5345H4.53852C3.13626 10.5345 2 9.38864 2 7.97452V4.55996C2 3.14585 3.13626 2 4.53852 2ZM4.53852 13.4655H7.92449C9.32676 13.4655 10.463 14.6114 10.463 16.0255V19.44C10.463 20.8532 9.32676 22 7.92449 22H4.53852C3.13626 22 2 20.8532 2 19.44V16.0255C2 14.6114 3.13626 13.4655 4.53852 13.4655ZM19.4615 13.4655H16.0755C14.6732 13.4655 13.537 14.6114 13.537 16.0255V19.44C13.537 20.8532 14.6732 22 16.0755 22H19.4615C20.8637 22 22 20.8532 22 19.44V16.0255C22 14.6114 20.8637 13.4655 19.4615 13.4655Z"
                                        fill="currentColor"></path>
                                </svg>
                            </i>
                        </OverlayTrigger>
                        <span className="item-name">Dashboard</span>
                        <i className="right-icon">
                            <svg className="icon-18" xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </i>
                    </CustomToggle>
                    <Accordion.Collapse eventKey="dashboard">
                    <ul className="sub-nav " >
                        <SidebarMenu isTag="false" staticIcon="false" minititle='AD' pathname='/' title='Admin Dashboard'>
                            <i className="icon" data-bs-toggle="tooltip" title="Admin Dashboard" data-bs-placement="right">
                                <svg className="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.14373 20.7821V17.7152C9.14372 16.9381 9.77567 16.3067 10.5584 16.3018H13.4326C14.2189 16.3018 14.8563 16.9346 14.8563 17.7152V20.7732C14.8562 21.4473 15.404 21.9951 16.0829 22H18.0438C18.9596 22.0023 19.8388 21.6428 20.4872 21.0007C21.1356 20.3586 21.5 19.4868 21.5 18.5775V9.86585C21.5 9.13139 21.1721 8.43471 20.6046 7.9635L13.943 2.67427C12.7785 1.74912 11.1154 1.77901 9.98539 2.74538L3.46701 7.9635C2.87274 8.42082 2.51755 9.11956 2.5 9.86585V18.5686C2.5 20.4637 4.04738 22 5.95617 22H7.87229C8.19917 22.0023 8.51349 21.8751 8.74547 21.6464C8.97746 21.4178 9.10793 21.1067 9.10792 20.7821H9.14373Z" fill="currentColor"></path>
                                </svg>
                            </i>
                        </SidebarMenu>
                            <SidebarMenu isTag="false" staticIcon="false" minititle='P' pathname='/patient-dashboard' title='Patient Dashboard' >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" fill="none">
                                    <path opacity="0.4"
                                        d="M2 4C2 2.89543 2.89543 2 4 2H9C10.1046 2 11 2.89543 11 4V20C11 21.1046 10.1046 22 9 22H4C2.89543 22 2 21.1046 2 20V4Z"
                                        fill="currentColor"></path>
                                    <path
                                        d="M13 4C13 2.89543 13.8954 2 15 2H20C21.1046 2 22 2.89543 22 4V9C22 10.1046 21.1046 11 20 11H15C13.8954 11 13 10.1046 13 9V4Z"
                                        fill="currentColor"></path>
                                    <path
                                        d="M13 15C13 13.8954 13.8954 13 15 13H20C21.1046 13 22 13.8954 22 15V20C22 21.1046 21.1046 22 20 22H15C13.8954 22 13 21.1046 13 20V15Z"
                                        fill="currentColor"></path>
                                </svg>
                            </SidebarMenu>
                    </ul>
                    </Accordion.Collapse>
                </Accordion.Item>

                <SidebarMenu isTag="true" pathname='/appointment' title='Appointments'>
                    <i className="icon" data-bs-toggle="tooltip" title="Appointments" data-bs-placement="right">
                        <svg width="20" className="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                d="M3 16.87V9.25699H21V16.931C21 20.07 19.0241 22 15.8628 22H8.12733C4.99561 22 3 20.03 3 16.87ZM7.95938 14.41C7.50494 14.431 7.12953 14.07 7.10977 13.611C7.10977 13.151 7.46542 12.771 7.91987 12.75C8.36443 12.75 8.72997 13.101 8.73985 13.55C8.7596 14.011 8.40395 14.391 7.95938 14.41ZM12.0198 14.41C11.5653 14.431 11.1899 14.07 11.1701 13.611C11.1701 13.151 11.5258 12.771 11.9802 12.75C12.4248 12.75 12.7903 13.101 12.8002 13.55C12.82 14.011 12.4643 14.391 12.0198 14.41ZM16.0505 18.09C15.596 18.08 15.2305 17.7 15.2305 17.24C15.2206 16.78 15.5862 16.401 16.0406 16.391H16.0505C16.5148 16.391 16.8902 16.771 16.8902 17.24C16.8902 17.71 16.5148 18.09 16.0505 18.09ZM11.1701 17.24C11.1899 17.7 11.5653 18.061 12.0198 18.04C12.4643 18.021 12.82 17.641 12.8002 17.181C12.7903 16.731 12.4248 16.38 11.9802 16.38C11.5258 16.401 11.1701 16.78 11.1701 17.24ZM7.09989 17.24C7.11965 17.7 7.49506 18.061 7.94951 18.04C8.39407 18.021 8.74973 17.641 8.72997 17.181C8.72009 16.731 8.35456 16.38 7.90999 16.38C7.45554 16.401 7.09989 16.78 7.09989 17.24ZM15.2404 13.601C15.2404 13.141 15.596 12.771 16.0505 12.761C16.4951 12.761 16.8507 13.12 16.8705 13.561C16.8804 14.021 16.5247 14.401 16.0801 14.41C15.6257 14.42 15.2503 14.07 15.2404 13.611V13.601Z"
                                fill="currentColor" />
                            <path opacity="0.4"
                                d="M3.00336 9.2569C3.0162 8.6699 3.0656 7.5049 3.15846 7.1299C3.63267 5.0209 5.24298 3.6809 7.54485 3.4899H16.4559C18.738 3.6909 20.3681 5.0399 20.8423 7.1299C20.9342 7.4949 20.9836 8.6689 20.9964 9.2569H3.00336Z"
                                fill="currentColor" />
                            <path
                                d="M8.30486 6.59C8.73955 6.59 9.06556 6.261 9.06556 5.82V2.771C9.06556 2.33 8.73955 2 8.30486 2C7.87017 2 7.54416 2.33 7.54416 2.771V5.82C7.54416 6.261 7.87017 6.59 8.30486 6.59Z"
                                fill="currentColor" />
                            <path
                                d="M15.6949 6.59C16.1197 6.59 16.4556 6.261 16.4556 5.82V2.771C16.4556 2.33 16.1197 2 15.6949 2C15.2603 2 14.9342 2.33 14.9342 2.771V5.82C14.9342 6.261 15.2603 6.59 15.6949 6.59Z"
                                fill="currentColor" />
                        </svg>
                    </i>
                </SidebarMenu>

                <SidebarMenu isTag="true" pathname='/report' title='Report'>
                    <i className="icon" data-bs-toggle="tooltip" title="Report" data-bs-placement="right">
                        <svg className="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.4"
                                d="M16.6756 2H7.33333C3.92889 2 2 3.92889 2 7.33333V16.6667C2 20.0711 3.92889 22 7.33333 22H16.6756C20.08 22 22 20.0711 22 16.6667V7.33333C22 3.92889 20.08 2 16.6756 2Z"
                                fill="currentColor"></path>
                            <path
                                d="M7.36866 9.3689C6.91533 9.3689 6.54199 9.74223 6.54199 10.2045V17.0756C6.54199 17.5289 6.91533 17.9022 7.36866 17.9022C7.83088 17.9022 8.20421 17.5289 8.20421 17.0756V10.2045C8.20421 9.74223 7.83088 9.3689 7.36866 9.3689Z"
                                fill="currentColor"></path>
                            <path
                                d="M12.0352 6.08887C11.5818 6.08887 11.2085 6.4622 11.2085 6.92442V17.0755C11.2085 17.5289 11.5818 17.9022 12.0352 17.9022C12.4974 17.9022 12.8707 17.5289 12.8707 17.0755V6.92442C12.8707 6.4622 12.4974 6.08887 12.0352 6.08887Z"
                                fill="currentColor"></path>
                            <path
                                d="M16.6398 12.9956C16.1775 12.9956 15.8042 13.3689 15.8042 13.8312V17.0756C15.8042 17.5289 16.1775 17.9023 16.6309 17.9023C17.0931 17.9023 17.4664 17.5289 17.4664 17.0756V13.8312C17.4664 13.3689 17.0931 12.9956 16.6398 12.9956Z"
                                fill="currentColor"></path>
                        </svg>
                    </i>
                </SidebarMenu>

                <li>
                    <hr className="hr-horizontal" />
                </li>

                <li className="nav-item static-item">
                    <Link className="nav-link static-item disabled text-start" to="#" tabIndex="-1">
                        <span className="default-icon">Pages</span>
                        <span className="mini-icon" data-bs-toggle="tooltip" title="Pages" data-bs-placement="right">-</span>
                    </Link>
                </li>

                <SidebarMenu isTag="true" pathname='/doctors' title='Doctors'>
                    <i className="icon" data-bs-toggle="tooltip" title="Doctors" data-bs-placement="right">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g opacity="0.4">
                                <path
                                    d="M7.9999 0C6.27589 0 4.87366 1.40261 4.87366 3.12663V4.74646C4.87366 6.4706 6.27589 7.87322 7.9999 7.87322C9.72405 7.87322 11.1262 6.4706 11.1262 4.74646V3.12663C11.1262 1.40261 9.72405 0 7.9999 0Z"
                                    fill="currentColor" />
                            </g>
                            <path
                                d="M14.8945 11.9476C13.8934 10.2416 12.2933 8.97685 10.389 8.38626C10.3448 8.37256 10.297 8.38421 10.2642 8.41672C9.37827 9.29019 8.27748 9.97165 8.00228 10.1363C7.70852 9.94849 6.47116 9.14196 5.73555 8.41672C5.70278 8.38421 5.65465 8.37256 5.61075 8.38626C3.70612 8.97697 2.10614 10.2417 1.10544 11.9477C1.08253 11.9867 1.08253 12.0353 1.10544 12.0743C2.52649 14.4958 5.16826 16 7.99985 16C10.8316 16 13.4735 14.4958 14.8945 12.0743C14.9176 12.0351 14.9176 11.9866 14.8945 11.9476ZM12.2518 12.8802C12.2518 12.9492 12.1862 13.0019 12.1173 13.0019H11.2706C11.2016 13.0019 11.1264 13.0612 11.1264 13.1303V14.0059C11.1264 14.0748 11.0895 14.1274 11.0205 14.1274H10.2601C10.1911 14.1274 10.126 14.0748 10.126 14.0059V13.1303C10.1258 13.0613 10.0787 13.0019 10.0097 13.0019H9.1265C9.05751 13.0019 9.00042 12.949 9.00042 12.8802V12.1263C9.00042 12.0573 9.05751 12.0016 9.1265 12.0016H10.0097C10.0787 12.0016 10.1258 11.9453 10.1258 11.8762V10.9995C10.1258 10.9305 10.1908 10.8761 10.2598 10.8761H11.012C11.0809 10.8761 11.1262 10.9305 11.1262 10.9995V11.8787C11.1262 11.9478 11.193 12.0015 11.2622 12.0015H12.1173C12.1862 12.0015 12.2518 12.0598 12.2518 12.1288V12.8802Z"
                                fill="currentColor" />
                        </svg>
                    </i>
                </SidebarMenu>

                <SidebarMenu isTag="true" pathname='/patient' title='Patient'>
                    <i className="icon" data-bs-toggle="tooltip" title="Patient" data-bs-placement="right">
                        <svg className="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M11.997 15.1746C7.684 15.1746 4 15.8546 4 18.5746C4 21.2956 7.661 21.9996 11.997 21.9996C16.31 21.9996 19.994 21.3206 19.994 18.5996C19.994 15.8786 16.334 15.1746 11.997 15.1746Z"
                                fill="currentColor"></path>
                            <path opacity="0.4"
                                d="M11.9971 12.5838C14.9351 12.5838 17.2891 10.2288 17.2891 7.29176C17.2891 4.35476 14.9351 1.99976 11.9971 1.99976C9.06008 1.99976 6.70508 4.35476 6.70508 7.29176C6.70508 10.2288 9.06008 12.5838 11.9971 12.5838Z"
                                fill="currentColor"></path>
                        </svg>
                    </i>
                </SidebarMenu>

                <SidebarMenu isTag="true" pathname='/category' title='Category'>
                    <i className="icon" data-bs-toggle="tooltip" title="Category" data-bs-placement="right">
                        <svg className="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M10.1528 5.55559C10.2037 5.65925 10.2373 5.77027 10.2524 5.8844L10.5308 10.0243L10.669 12.1051C10.6705 12.3191 10.704 12.5317 10.7687 12.7361C10.9356 13.1326 11.3372 13.3846 11.7741 13.3671L18.4313 12.9316C18.7196 12.9269 18.998 13.0347 19.2052 13.2313C19.3779 13.3952 19.4894 13.6096 19.5246 13.8402L19.5364 13.9802C19.2609 17.795 16.4592 20.9767 12.6524 21.7981C8.84555 22.6194 4.94186 20.8844 3.06071 17.535C2.51839 16.5619 2.17965 15.4923 2.06438 14.389C2.01623 14.0624 1.99503 13.7326 2.00098 13.4026C1.99503 9.31279 4.90747 5.77702 8.98433 4.92463C9.47501 4.84822 9.95603 5.10798 10.1528 5.55559Z"
                                fill="currentColor"></path>
                            <path opacity="0.4"
                                d="M12.8701 2.00082C17.43 2.11683 21.2624 5.39579 22.0001 9.81229L21.993 9.84488L21.9729 9.89227L21.9757 10.0224C21.9652 10.1947 21.8987 10.3605 21.784 10.4945C21.6646 10.634 21.5014 10.729 21.3217 10.7659L21.2121 10.7809L13.5313 11.2786C13.2758 11.3038 13.0214 11.2214 12.8314 11.052C12.6731 10.9107 12.5719 10.7201 12.5433 10.5147L12.0277 2.84506C12.0188 2.81913 12.0188 2.79102 12.0277 2.76508C12.0348 2.55367 12.1278 2.35384 12.2861 2.21023C12.4444 2.06662 12.6547 1.9912 12.8701 2.00082Z"
                                fill="currentColor"></path>
                        </svg>
                    </i>
                </SidebarMenu>

                <SidebarMenu isTag="true" pathname='/products' title='Products'>
                    <i className="icon" data-bs-toggle="tooltip" title="Products" data-bs-placement="right">
                        <svg className="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                d="M7.7688 8.71387H16.2312C18.5886 8.71387 20.5 10.5831 20.5 12.8885V17.8254C20.5 20.1308 18.5886 22 16.2312 22H7.7688C5.41136 22 3.5 20.1308 3.5 17.8254V12.8885C3.5 10.5831 5.41136 8.71387 7.7688 8.71387ZM11.9949 17.3295C12.4928 17.3295 12.8891 16.9419 12.8891 16.455V14.2489C12.8891 13.772 12.4928 13.3844 11.9949 13.3844C11.5072 13.3844 11.1109 13.772 11.1109 14.2489V16.455C11.1109 16.9419 11.5072 17.3295 11.9949 17.3295Z"
                                fill="currentColor"></path>
                            <path opacity="0.4"
                                d="M17.523 7.39595V8.86667C17.1673 8.7673 16.7913 8.71761 16.4052 8.71761H15.7447V7.39595C15.7447 5.37868 14.0681 3.73903 12.0053 3.73903C9.94257 3.73903 8.26594 5.36874 8.25578 7.37608V8.71761H7.60545C7.20916 8.71761 6.83319 8.7673 6.47754 8.87661V7.39595C6.4877 4.41476 8.95692 2 11.985 2C15.0537 2 17.523 4.41476 17.523 7.39595Z"
                                fill="currentColor"></path>
                        </svg>
                    </i>
                </SidebarMenu>

                <SidebarMenu isTag="true" pathname='/payment' title='Payment'>
                    <i className="icon" data-bs-toggle="tooltip" title="Payment" data-bs-placement="right">
                        <svg className="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                d="M21.9964 8.37513H17.7618C15.7911 8.37859 14.1947 9.93514 14.1911 11.8566C14.1884 13.7823 15.7867 15.3458 17.7618 15.3484H22V15.6543C22 19.0136 19.9636 21 16.5173 21H7.48356C4.03644 21 2 19.0136 2 15.6543V8.33786C2 4.97862 4.03644 3 7.48356 3H16.5138C19.96 3 21.9964 4.97862 21.9964 8.33786V8.37513ZM6.73956 8.36733H12.3796H12.3831H12.3902C12.8124 8.36559 13.1538 8.03019 13.152 7.61765C13.1502 7.20598 12.8053 6.87318 12.3831 6.87491H6.73956C6.32 6.87664 5.97956 7.20858 5.97778 7.61852C5.976 8.03019 6.31733 8.36559 6.73956 8.36733Z"
                                fill="currentColor"></path>
                            <path opacity="0.4"
                                d="M16.0374 12.2966C16.2465 13.2478 17.0805 13.917 18.0326 13.8996H21.2825C21.6787 13.8996 22 13.5715 22 13.166V10.6344C21.9991 10.2297 21.6787 9.90077 21.2825 9.8999H17.9561C16.8731 9.90338 15.9983 10.8024 16 11.9102C16 12.0398 16.0128 12.1695 16.0374 12.2966Z"
                                fill="currentColor"></path>
                            <circle cx="18" cy="11.8999" r="1" fill="currentColor"></circle>
                        </svg>
                    </i>
                </SidebarMenu>

                <li>
                    <hr className="hr-horizontal" />
                </li>

                <li className="nav-item static-item">
                    <Link className="nav-link static-item disabled text-start" to="#" tabIndex="-1">
                        <span className="default-icon">Settings</span>
                        <span className="mini-icon" data-bs-toggle="tooltip" title="Setting" data-bs-placement="right">-</span>
                    </Link>
                </li>

                <SidebarMenu isTag="true" pathname='/helpsupport' title='Help & Support'>
                    <i className="icon" data-bs-toggle="tooltip" title="Help_Support" data-bs-placement="right">
                        <svg className="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.4"
                                d="M16.34 1.99976H7.67C4.28 1.99976 2 4.37976 2 7.91976V16.0898C2 19.6198 4.28 21.9998 7.67 21.9998H16.34C19.73 21.9998 22 19.6198 22 16.0898V7.91976C22 4.37976 19.73 1.99976 16.34 1.99976Z"
                                fill="currentColor"></path>
                            <path fillRule="evenodd" clipRule="evenodd"
                                d="M11.1246 8.18921C11.1246 8.67121 11.5156 9.06421 11.9946 9.06421C12.4876 9.06421 12.8796 8.67121 12.8796 8.18921C12.8796 7.70721 12.4876 7.31421 12.0046 7.31421C11.5196 7.31421 11.1246 7.70721 11.1246 8.18921ZM12.8696 11.362C12.8696 10.88 12.4766 10.487 11.9946 10.487C11.5126 10.487 11.1196 10.88 11.1196 11.362V15.782C11.1196 16.264 11.5126 16.657 11.9946 16.657C12.4766 16.657 12.8696 16.264 12.8696 15.782V11.362Z"
                                fill="currentColor"></path>
                        </svg>
                    </i>
                </SidebarMenu>

                <SidebarMenu isTag="true" pathname='/setting' title='Setting'>
                    <i className="icon" data-bs-toggle="tooltip" title="Setting" data-bs-placement="right">
                        <svg className="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12.0122 14.8299C10.4077 14.8299 9.10986 13.5799 9.10986 12.0099C9.10986 10.4399 10.4077 9.17993 12.0122 9.17993C13.6167 9.17993 14.8839 10.4399 14.8839 12.0099C14.8839 13.5799 13.6167 14.8299 12.0122 14.8299Z"
                                fill="currentColor"></path>
                            <path opacity="0.4"
                                d="M21.2301 14.37C21.036 14.07 20.76 13.77 20.4023 13.58C20.1162 13.44 19.9322 13.21 19.7687 12.94C19.2475 12.08 19.5541 10.95 20.4228 10.44C21.4447 9.87 21.7718 8.6 21.179 7.61L20.4943 6.43C19.9118 5.44 18.6344 5.09 17.6226 5.67C16.7233 6.15 15.5685 5.83 15.0473 4.98C14.8838 4.7 14.7918 4.4 14.8122 4.1C14.8429 3.71 14.7203 3.34 14.5363 3.04C14.1582 2.42 13.4735 2 12.7172 2H11.2763C10.5302 2.02 9.84553 2.42 9.4674 3.04C9.27323 3.34 9.16081 3.71 9.18125 4.1C9.20169 4.4 9.10972 4.7 8.9462 4.98C8.425 5.83 7.27019 6.15 6.38109 5.67C5.35913 5.09 4.09191 5.44 3.49917 6.43L2.81446 7.61C2.23194 8.6 2.55897 9.87 3.57071 10.44C4.43937 10.95 4.74596 12.08 4.23498 12.94C4.06125 13.21 3.87729 13.44 3.59115 13.58C3.24368 13.77 2.93709 14.07 2.77358 14.37C2.39546 14.99 2.4159 15.77 2.79402 16.42L3.49917 17.62C3.87729 18.26 4.58245 18.66 5.31825 18.66C5.66572 18.66 6.0745 18.56 6.40153 18.36C6.65702 18.19 6.96361 18.13 7.30085 18.13C8.31259 18.13 9.16081 18.96 9.18125 19.95C9.18125 21.1 10.1215 22 11.3069 22H12.6968C13.872 22 14.8122 21.1 14.8122 19.95C14.8429 18.96 15.6911 18.13 16.7029 18.13C17.0299 18.13 17.3365 18.19 17.6022 18.36C17.9292 18.56 18.3278 18.66 18.6855 18.66C19.411 18.66 20.1162 18.26 20.4943 17.62L21.2097 16.42C21.5776 15.75 21.6083 14.99 21.2301 14.37Z"
                                fill="currentColor"></path>
                        </svg>
                    </i>
                </SidebarMenu>

                <li>
                    <hr className="hr-horizontal" />
                </li>

                <li className="nav-item static-item">
                    <Link className="nav-link static-item disabled text-start" to="#" tabIndex="-1">
                        <span className="default-icon">Special Pages</span>
                        <span className="mini-icon" data-bs-toggle="tooltip" title="Special Pages" data-bs-placement="right">-</span>
                    </Link>
                </li>

                <SidebarMenu isTag="true" pathname='/component' title='Components'>
                    <i className="icon" data-bs-toggle="tooltip" title="Components" data-bs-placement="right">
                        <svg className="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.4"
                                d="M2 11.0786C2.05 13.4166 2.19 17.4156 2.21 17.8566C2.281 18.7996 2.642 19.7526 3.204 20.4246C3.986 21.3676 4.949 21.7886 6.292 21.7886C8.148 21.7986 10.194 21.7986 12.181 21.7986C14.176 21.7986 16.112 21.7986 17.747 21.7886C19.071 21.7886 20.064 21.3566 20.836 20.4246C21.398 19.7526 21.759 18.7896 21.81 17.8566C21.83 17.4856 21.93 13.1446 21.99 11.0786H2Z"
                                fill="currentColor"></path>
                            <path
                                d="M11.2451 15.3843V16.6783C11.2451 17.0923 11.5811 17.4283 11.9951 17.4283C12.4091 17.4283 12.7451 17.0923 12.7451 16.6783V15.3843C12.7451 14.9703 12.4091 14.6343 11.9951 14.6343C11.5811 14.6343 11.2451 14.9703 11.2451 15.3843Z"
                                fill="currentColor"></path>
                            <path fillRule="evenodd" clipRule="evenodd"
                                d="M10.211 14.5565C10.111 14.9195 9.762 15.1515 9.384 15.1015C6.833 14.7455 4.395 13.8405 2.337 12.4815C2.126 12.3435 2 12.1075 2 11.8555V8.38949C2 6.28949 3.712 4.58149 5.817 4.58149H7.784C7.972 3.12949 9.202 2.00049 10.704 2.00049H13.286C14.787 2.00049 16.018 3.12949 16.206 4.58149H18.183C20.282 4.58149 21.99 6.28949 21.99 8.38949V11.8555C21.99 12.1075 21.863 12.3425 21.654 12.4815C19.592 13.8465 17.144 14.7555 14.576 15.1105C14.541 15.1155 14.507 15.1175 14.473 15.1175C14.134 15.1175 13.831 14.8885 13.746 14.5525C13.544 13.7565 12.821 13.1995 11.99 13.1995C11.148 13.1995 10.433 13.7445 10.211 14.5565ZM13.286 3.50049H10.704C10.031 3.50049 9.469 3.96049 9.301 4.58149H14.688C14.52 3.96049 13.958 3.50049 13.286 3.50049Z"
                                fill="currentColor"></path>
                        </svg>
                    </i>
                </SidebarMenu>

                <SidebarMenu isTag="true" pathname='/color' title='UI Color'>
                    <i className="icon" data-bs-toggle="tooltip" title="Colors" data-bs-placement="right">
                        <svg className="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.4"
                                d="M13.7505 9.70303V7.68318C13.354 7.68318 13.0251 7.36377 13.0251 6.97859V4.57356C13.0251 4.2532 12.764 4.00049 12.4352 4.00049H5.7911C3.70213 4.00049 2 5.653 2 7.68318V10.1155C2 10.3043 2.07737 10.4828 2.21277 10.6143C2.34816 10.7449 2.53191 10.8201 2.72534 10.8201C3.46035 10.8201 4.02128 11.3274 4.02128 11.9944C4.02128 12.6905 3.45068 13.2448 2.73501 13.2533C2.33849 13.2533 2 13.5257 2 13.9203V16.3262C2 18.3555 3.70213 19.9995 5.78143 19.9995H12.4352C12.764 19.9995 13.0251 19.745 13.0251 19.4265V17.3963C13.0251 17.0027 13.354 16.6917 13.7505 16.6917V14.8701C13.354 14.8701 13.0251 14.5497 13.0251 14.1655V10.4076C13.0251 10.0224 13.354 9.70303 13.7505 9.70303Z"
                                fill="currentColor"></path>
                            <path
                                d="M19.9787 11.9948C19.9787 12.69 20.559 13.2443 21.265 13.2537C21.6615 13.2537 22 13.5262 22 13.9113V16.3258C22 18.3559 20.3075 20 18.2186 20H15.0658C14.7466 20 14.4758 19.7454 14.4758 19.426V17.3967C14.4758 17.0022 14.1567 16.6921 13.7505 16.6921V14.8705C14.1567 14.8705 14.4758 14.5502 14.4758 14.1659V10.4081C14.4758 10.022 14.1567 9.70348 13.7505 9.70348V7.6827C14.1567 7.6827 14.4758 7.36328 14.4758 6.9781V4.57401C14.4758 4.25366 14.7466 4 15.0658 4H18.2186C20.3075 4 22 5.64406 22 7.6733V10.0407C22 10.2286 21.9226 10.4081 21.7872 10.5387C21.6518 10.6702 21.4681 10.7453 21.2747 10.7453C20.559 10.7453 19.9787 11.31 19.9787 11.9948Z"
                                fill="currentColor"></path>
                        </svg>
                    </i>
                </SidebarMenu>

                <Accordion.Item as="li" eventKey="auth-skins" bsPrefix={`nav-item ${active === 'auth-skins' ? 'active' : ''} `} onClick={() => setActive('auth-skins')}>
                    <CustomToggle eventKey="auth-skins" active={activeMenu === 'auth-skins' ? true : false} onClick={(activeKey) => setActiveMenu(activeKey)} >
                        <OverlayTrigger placement="right" overlay={<Tooltip>Auth Skins</Tooltip>}>
                            <i className="icon" data-bs-toggle="tooltip" title="Auth Skins" data-bs-placement="right">
                                <svg className="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4"
                                        d="M12.0865 22C11.9627 22 11.8388 21.9716 11.7271 21.9137L8.12599 20.0496C7.10415 19.5201 6.30481 18.9259 5.68063 18.2336C4.31449 16.7195 3.5544 14.776 3.54232 12.7599L3.50004 6.12426C3.495 5.35842 3.98931 4.67103 4.72826 4.41215L11.3405 2.10679C11.7331 1.96656 12.1711 1.9646 12.5707 2.09992L19.2081 4.32684C19.9511 4.57493 20.4535 5.25742 20.4575 6.02228L20.4998 12.6628C20.5129 14.676 19.779 16.6274 18.434 18.1581C17.8168 18.8602 17.0245 19.4632 16.0128 20.0025L12.4439 21.9088C12.3331 21.9686 12.2103 21.999 12.0865 22Z"
                                        fill="currentColor"></path>
                                    <path
                                        d="M11.3194 14.3209C11.1261 14.3219 10.9328 14.2523 10.7838 14.1091L8.86695 12.2656C8.57097 11.9793 8.56795 11.5145 8.86091 11.2262C9.15387 10.9369 9.63207 10.934 9.92906 11.2193L11.3083 12.5451L14.6758 9.22479C14.9698 8.93552 15.448 8.93258 15.744 9.21793C16.041 9.50426 16.044 9.97004 15.751 10.2574L11.8519 14.1022C11.7049 14.2474 11.5127 14.3199 11.3194 14.3209Z"
                                        fill="currentColor"></path>
                                </svg>
                            </i>
                        </OverlayTrigger>
                        <span className="item-name">auth skins</span>
                        <i className="right-icon">
                            <svg className="icon-18" xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </i>
                    </CustomToggle>
                    <Accordion.Collapse eventKey="auth-skins">
                        <ul className="sub-nav " >
                            <SidebarMenu isTag="false" staticIcon="false" minititle='SI' pathname='/auth/sign-in' title='Sign In'>
                                <i className="icon">
                                    <svg className="icon-10" width="10" viewBox="0 0 24 24" fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                        </g>
                                    </svg>
                                </i>
                            </SidebarMenu>
                            <SidebarMenu isTag="false" staticIcon="false" minititle='SU' pathname='/auth/sign-up' title='Sign Up' >
                                <i className="icon">
                                    <svg className="icon-10" width="10" viewBox="0 0 24 24" fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                        </g>
                                    </svg>
                                </i>
                            </SidebarMenu>
                            <SidebarMenu isTag="false" staticIcon="false" minititle='CM' pathname='/auth/confirm-mail' title='Email Verified' >
                                <i className="icon">
                                    <svg className="icon-10" width="10" viewBox="0 0 24 24" fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                        </g>
                                    </svg>
                                </i>
                            </SidebarMenu>
                            <SidebarMenu isTag="false" staticIcon="false" minititle='CM' pathname='/auth/recoverpw' title='Reset Password' >
                                <i className="icon">
                                    <svg className="icon-10" width="10" viewBox="0 0 24 24" fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                        </g>
                                    </svg>
                                </i>
                            </SidebarMenu>
                            <SidebarMenu isTag="false" staticIcon="false" minititle='CM' pathname='/auth/lock-screen' title='Lock Screen' >
                                <i className="icon">
                                    <svg className="icon-10" width="10" viewBox="0 0 24 24" fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                        </g>
                                    </svg>
                                </i>
                            </SidebarMenu>
                        </ul>
                    </Accordion.Collapse>
                </Accordion.Item>

                <Accordion.Item as="li" eventKey="sidebar-user" bsPrefix={`nav-item ${active === 'sidebar-user' ? 'active' : ''} `} onClick={() => setActive('sidebar-user')}>
                    <CustomToggle eventKey="sidebar-user" active={activeMenu === 'sidebar-user' ? true : false} onClick={(activeKey) => setActiveMenu(activeKey)} >
                        <OverlayTrigger placement="right" overlay={<Tooltip>User</Tooltip>}>
                            <i className="icon" data-bs-toggle="tooltip" title="Users" data-bs-placement="right">
                                <svg width="20" className="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.9488 14.54C8.49884 14.54 5.58789 15.1038 5.58789 17.2795C5.58789 19.4562 8.51765 20.0001 11.9488 20.0001C15.3988 20.0001 18.3098 19.4364 18.3098 17.2606C18.3098 15.084 15.38 14.54 11.9488 14.54Z" fill="currentColor"></path>
                                    <path opacity="0.4" d="M11.949 12.467C14.2851 12.467 16.1583 10.5831 16.1583 8.23351C16.1583 5.88306 14.2851 4 11.949 4C9.61293 4 7.73975 5.88306 7.73975 8.23351C7.73975 10.5831 9.61293 12.467 11.949 12.467Z" fill="currentColor"></path>
                                    <path opacity="0.4" d="M21.0881 9.21923C21.6925 6.84176 19.9205 4.70654 17.664 4.70654C17.4187 4.70654 17.1841 4.73356 16.9549 4.77949C16.9244 4.78669 16.8904 4.802 16.8725 4.82902C16.8519 4.86324 16.8671 4.90917 16.8895 4.93889C17.5673 5.89528 17.9568 7.0597 17.9568 8.30967C17.9568 9.50741 17.5996 10.6241 16.9728 11.5508C16.9083 11.6462 16.9656 11.775 17.0793 11.7948C17.2369 11.8227 17.3981 11.8371 17.5629 11.8416C19.2059 11.8849 20.6807 10.8213 21.0881 9.21923Z" fill="currentColor"></path>
                                    <path d="M22.8094 14.817C22.5086 14.1722 21.7824 13.73 20.6783 13.513C20.1572 13.3851 18.747 13.205 17.4352 13.2293C17.4155 13.232 17.4048 13.2455 17.403 13.2545C17.4003 13.2671 17.4057 13.2887 17.4316 13.3022C18.0378 13.6039 20.3811 14.916 20.0865 17.6834C20.074 17.8032 20.1698 17.9068 20.2888 17.8888C20.8655 17.8059 22.3492 17.4853 22.8094 16.4866C23.0637 15.9589 23.0637 15.3456 22.8094 14.817Z" fill="currentColor"></path>
                                    <path opacity="0.4" d="M7.04459 4.77973C6.81626 4.7329 6.58077 4.70679 6.33543 4.70679C4.07901 4.70679 2.30701 6.84201 2.9123 9.21947C3.31882 10.8216 4.79355 11.8851 6.43661 11.8419C6.60136 11.8374 6.76343 11.8221 6.92013 11.7951C7.03384 11.7753 7.09115 11.6465 7.02668 11.551C6.3999 10.6234 6.04263 9.50765 6.04263 8.30991C6.04263 7.05904 6.43303 5.89462 7.11085 4.93913C7.13234 4.90941 7.14845 4.86348 7.12696 4.82926C7.10906 4.80135 7.07593 4.78694 7.04459 4.77973Z" fill="currentColor"></path>
                                    <path d="M3.32156 13.5127C2.21752 13.7297 1.49225 14.1719 1.19139 14.8167C0.936203 15.3453 0.936203 15.9586 1.19139 16.4872C1.65163 17.4851 3.13531 17.8066 3.71195 17.8885C3.83104 17.9065 3.92595 17.8038 3.91342 17.6832C3.61883 14.9167 5.9621 13.6046 6.56918 13.3029C6.59425 13.2885 6.59962 13.2677 6.59694 13.2542C6.59515 13.2452 6.5853 13.2317 6.5656 13.2299C5.25294 13.2047 3.84358 13.3848 3.32156 13.5127Z" fill="currentColor"></path>
                                </svg>
                            </i>
                        </OverlayTrigger>
                        <span className="item-name">User</span>
                        <i className="right-icon">
                            <svg className="icon-18" xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </i>
                    </CustomToggle>
                    <Accordion.Collapse eventKey="sidebar-user">
                        <ul className="sub-nav " >
                            <SidebarMenu isTag="false" staticIcon="false" minititle='U' pathname='/app/user-profile' title='User Profile'>
                                <i className="icon">
                                    <svg className="icon-10" width="10" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                        </g>
                                    </svg>
                                </i>
                            </SidebarMenu>
                            <SidebarMenu isTag="false" staticIcon="false" minititle='A' pathname='/app/user-add' title='User Add' >
                                <i className="icon">
                                    <svg className="icon-10" width="10" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                        </g>
                                    </svg>
                                </i>
                            </SidebarMenu>
                            <SidebarMenu isTag="false" staticIcon="false" minititle='UL' pathname='/app/user-list' title='User List' >
                                <i className="icon">
                                    <svg className="icon-10" width="10" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                        </g>
                                    </svg>
                                </i>
                            </SidebarMenu>
                        </ul>
                    </Accordion.Collapse>
                </Accordion.Item>

                <Accordion.Item as="li" eventKey="utilities-error" bsPrefix={`nav-item ${active === 'utilities-error' ? 'active' : ''} `} onClick={() => setActive('utilities-error')}>
                    <CustomToggle eventKey="utilities-error" active={activeMenu === 'utilities-error' ? true : false} onClick={(activeKey) => setActiveMenu(activeKey)} >
                        <OverlayTrigger placement="right" overlay={<Tooltip>Utilities</Tooltip>}>
                            <i className="icon" data-bs-toggle="tooltip" title="Utilities" data-bs-placement="right">
                                <svg width="20" className="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4"
                                        d="M11.9912 18.6215L5.49945 21.864C5.00921 22.1302 4.39768 21.9525 4.12348 21.4643C4.0434 21.3108 4.00106 21.1402 4 20.9668V13.7087C4 14.4283 4.40573 14.8725 5.47299 15.37L11.9912 18.6215Z"
                                        fill="currentColor"></path>
                                    <path fillRule="evenodd" clipRule="evenodd"
                                        d="M8.89526 2H15.0695C17.7773 2 19.9735 3.06605 20 5.79337V20.9668C19.9989 21.1374 19.9565 21.3051 19.8765 21.4554C19.7479 21.7007 19.5259 21.8827 19.2615 21.9598C18.997 22.0368 18.7128 22.0023 18.4741 21.8641L11.9912 18.6215L5.47299 15.3701C4.40573 14.8726 4 14.4284 4 13.7088V5.79337C4 3.06605 6.19625 2 8.89526 2ZM8.22492 9.62227H15.7486C16.1822 9.62227 16.5336 9.26828 16.5336 8.83162C16.5336 8.39495 16.1822 8.04096 15.7486 8.04096H8.22492C7.79137 8.04096 7.43991 8.39495 7.43991 8.83162C7.43991 9.26828 7.79137 9.62227 8.22492 9.62227Z"
                                        fill="currentColor"></path>
                                </svg>
                            </i>
                        </OverlayTrigger>
                        <span className="item-name">Utilities</span>
                        <i className="right-icon">
                            <svg className="icon-18" xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </i>
                    </CustomToggle>
                    <Accordion.Collapse eventKey="utilities-error">
                        <ul className="sub-nav " >
                            <SidebarMenu isTag="false" staticIcon="false" minititle='M' pathname='/errors/maintenance' title='Maintenance'>
                                <i className="icon" data-bs-toggle="tooltip" title="Maintenance" data-bs-placement="right">
                                    <svg className="icon-10" width="10" viewBox="0 0 24 24" fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                        </g>
                                    </svg>
                                </i>
                            </SidebarMenu>
                            <SidebarMenu isTag="false" staticIcon="false" minititle='E' pathname='/errors/error404' title='404' >
                                <i className="icon" data-bs-toggle="tooltip" title="Error 404" data-bs-placement="right">
                                    <svg className="icon-10" width="10" viewBox="0 0 24 24" fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                        </g>
                                    </svg>
                                </i>
                            </SidebarMenu>
                            <SidebarMenu isTag="false" staticIcon="false" minititle='UL' pathname='/errors/error500' title='500' >
                                <i className="icon" data-bs-toggle="tooltip" title="Error 500" data-bs-placement="right">
                                    <svg className="icon-10" width="10" viewBox="0 0 24 24" fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                        </g>
                                    </svg>
                                </i>
                            </SidebarMenu>
                        </ul>
                    </Accordion.Collapse>
                </Accordion.Item>

                <Accordion.Item as="li" eventKey="sidebar-widget" bsPrefix={`nav-item ${active === 'sidebar-widget' ? 'active' : ''} `} onClick={() => setActive('sidebar-widget')}>
                    <CustomToggle eventKey="sidebar-widget" active={activeMenu === 'sidebar-widget' ? true : false} onClick={(activeKey) => setActiveMenu(activeKey)} >
                        <OverlayTrigger placement="right" overlay={<Tooltip>Widgets</Tooltip>}>
                            <i className="icon" data-bs-toggle="tooltip" title="Widgets" data-bs-placement="right">
                                <svg width="20" className="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4"
                                        d="M21.25 13.4764C20.429 13.4764 19.761 12.8145 19.761 12.001C19.761 11.1865 20.429 10.5246 21.25 10.5246C21.449 10.5246 21.64 10.4463 21.78 10.3076C21.921 10.1679 22 9.97864 22 9.78146L21.999 7.10415C21.999 4.84102 20.14 3 17.856 3H6.144C3.86 3 2.001 4.84102 2.001 7.10415L2 9.86766C2 10.0648 2.079 10.2541 2.22 10.3938C2.36 10.5325 2.551 10.6108 2.75 10.6108C3.599 10.6108 4.239 11.2083 4.239 12.001C4.239 12.8145 3.571 13.4764 2.75 13.4764C2.336 13.4764 2 13.8093 2 14.2195V16.8949C2 19.158 3.858 21 6.143 21H17.857C20.142 21 22 19.158 22 16.8949V14.2195C22 13.8093 21.664 13.4764 21.25 13.4764Z"
                                        fill="currentColor"></path>
                                    <path
                                        d="M15.4303 11.5887L14.2513 12.7367L14.5303 14.3597C14.5783 14.6407 14.4653 14.9177 14.2343 15.0837C14.0053 15.2517 13.7063 15.2727 13.4543 15.1387L11.9993 14.3737L10.5413 15.1397C10.4333 15.1967 10.3153 15.2267 10.1983 15.2267C10.0453 15.2267 9.89434 15.1787 9.76434 15.0847C9.53434 14.9177 9.42134 14.6407 9.46934 14.3597L9.74734 12.7367L8.56834 11.5887C8.36434 11.3907 8.29334 11.0997 8.38134 10.8287C8.47034 10.5587 8.70034 10.3667 8.98134 10.3267L10.6073 10.0897L11.3363 8.61268C11.4633 8.35868 11.7173 8.20068 11.9993 8.20068H12.0013C12.2843 8.20168 12.5383 8.35968 12.6633 8.61368L13.3923 10.0897L15.0213 10.3277C15.2993 10.3667 15.5293 10.5587 15.6173 10.8287C15.7063 11.0997 15.6353 11.3907 15.4303 11.5887Z"
                                        fill="currentColor"></path>
                                </svg>
                            </i>
                        </OverlayTrigger>
                        <span className="item-name">Widgets</span>
                        <i className="right-icon">
                            <svg className="icon-18" xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </i>
                    </CustomToggle>
                    <Accordion.Collapse eventKey="sidebar-widget">
                        <ul className="sub-nav " >
                            <SidebarMenu isTag="false" staticIcon="false" minititle='WB' pathname='/widget/widgetbasic' title='Widget Basic'>
                                <i className="icon">
                                    <svg className="icon-10" width="10" viewBox="0 0 24 24" fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                        </g>
                                    </svg>
                                </i>
                            </SidebarMenu>
                            <SidebarMenu isTag="false" staticIcon="false" minititle='WC' pathname='/widget/widgetchart' title='Widget Chart' >
                                <i className="icon">
                                    <svg className="icon-10" width="10" viewBox="0 0 24 24" fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                        </g>
                                    </svg>
                                </i>
                            </SidebarMenu>
                            <SidebarMenu isTag="false" staticIcon="false" minititle='UL' pathname='/widget/widgetcard' title='Widget Card' >
                                <i className="icon">
                                    <svg className="icon-10" width="10" viewBox="0 0 24 24" fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                        </g>
                                    </svg>
                                </i>
                            </SidebarMenu>
                        </ul>
                    </Accordion.Collapse>
                </Accordion.Item>

                <Accordion.Item as="li" eventKey="sidebar-maps" bsPrefix={`nav-item ${active === 'sidebar-maps' ? 'active' : ''} `} onClick={() => setActive('sidebar-maps')}>
                    <CustomToggle eventKey="sidebar-maps" active={activeMenu === 'sidebar-maps' ? true : false} onClick={(activeKey) => setActiveMenu(activeKey)} >
                        <OverlayTrigger placement="right" overlay={<Tooltip>Map</Tooltip>}>
                            <i className="icon" data-bs-toggle="tooltip" title="Maps" data-bs-placement="right">
                                <svg width="20" className="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                        d="M8.53162 2.93677C10.7165 1.66727 13.402 1.68946 15.5664 2.99489C17.7095 4.32691 19.012 6.70418 18.9998 9.26144C18.95 11.8019 17.5533 14.19 15.8075 16.0361C14.7998 17.1064 13.6726 18.0528 12.4488 18.856C12.3228 18.9289 12.1848 18.9777 12.0415 19C11.9036 18.9941 11.7693 18.9534 11.6508 18.8814C9.78243 17.6746 8.14334 16.134 6.81233 14.334C5.69859 12.8314 5.06584 11.016 5 9.13442C4.99856 6.57225 6.34677 4.20627 8.53162 2.93677ZM9.79416 10.1948C10.1617 11.1008 11.0292 11.6918 11.9916 11.6918C12.6221 11.6964 13.2282 11.4438 13.6748 10.9905C14.1214 10.5371 14.3715 9.92064 14.3692 9.27838C14.3726 8.29804 13.7955 7.41231 12.9073 7.03477C12.0191 6.65723 10.995 6.86235 10.3133 7.55435C9.63159 8.24635 9.42664 9.28872 9.79416 10.1948Z"
                                        fill="currentColor"></path>
                                    <ellipse opacity="0.4" cx="12" cy="21" rx="5" ry="1" fill="currentColor"></ellipse>
                                </svg>
                            </i>
                        </OverlayTrigger>
                        <span className="item-name">Map</span>
                        <i className="right-icon">
                            <svg className="icon-18" xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </i>
                    </CustomToggle>
                    <Accordion.Collapse eventKey="sidebar-maps">
                        <ul className="sub-nav " >
                            <SidebarMenu isTag="false" staticIcon="false" minititle='G' pathname='/maps/google' title='Google'>
                                <i className="icon">
                                    <svg className="icon-10" width="10" viewBox="0 0 24 24" fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                        </g>
                                    </svg>
                                </i>
                            </SidebarMenu>
                            <SidebarMenu isTag="false" staticIcon="false" minititle='V' pathname='/maps/vector' title='Vector' >
                                <i className="icon">
                                    <svg className="icon-10" width="10" viewBox="0 0 24 24" fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                        </g>
                                    </svg>
                                </i>
                            </SidebarMenu>
                        </ul>
                    </Accordion.Collapse>
                </Accordion.Item>

                <Accordion.Item as="li" eventKey="sidebar-form" bsPrefix={`nav-item ${active === 'sidebar-form' ? 'active' : ''} `} onClick={() => setActive('sidebar-form')}>
                    <CustomToggle eventKey="sidebar-form" active={activeMenu === 'sidebar-form' ? true : false} onClick={(activeKey) => setActiveMenu(activeKey)} >
                        <OverlayTrigger placement="right" overlay={<Tooltip>Form</Tooltip>}>
                            <i className="icon" data-bs-toggle="tooltip" title="Form" data-bs-placement="right">
                                <svg width="20" className="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4"
                                        d="M16.191 2H7.81C4.77 2 3 3.78 3 6.83V17.16C3 20.26 4.77 22 7.81 22H16.191C19.28 22 21 20.26 21 17.16V6.83C21 3.78 19.28 2 16.191 2Z"
                                        fill="currentColor"></path>
                                    <path fillRule="evenodd" clipRule="evenodd"
                                        d="M8.07996 6.6499V6.6599C7.64896 6.6599 7.29996 7.0099 7.29996 7.4399C7.29996 7.8699 7.64896 8.2199 8.07996 8.2199H11.069C11.5 8.2199 11.85 7.8699 11.85 7.4289C11.85 6.9999 11.5 6.6499 11.069 6.6499H8.07996ZM15.92 12.7399H8.07996C7.64896 12.7399 7.29996 12.3899 7.29996 11.9599C7.29996 11.5299 7.64896 11.1789 8.07996 11.1789H15.92C16.35 11.1789 16.7 11.5299 16.7 11.9599C16.7 12.3899 16.35 12.7399 15.92 12.7399ZM15.92 17.3099H8.07996C7.77996 17.3499 7.48996 17.1999 7.32996 16.9499C7.16996 16.6899 7.16996 16.3599 7.32996 16.1099C7.48996 15.8499 7.77996 15.7099 8.07996 15.7399H15.92C16.319 15.7799 16.62 16.1199 16.62 16.5299C16.62 16.9289 16.319 17.2699 15.92 17.3099Z"
                                        fill="currentColor"></path>
                                </svg>
                            </i>
                        </OverlayTrigger>
                        <span className="item-name">Form</span>
                        <i className="right-icon">
                            <svg className="icon-18" xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </i>
                    </CustomToggle>
                    <Accordion.Collapse eventKey="sidebar-form">
                        <ul className="sub-nav " >
                            <SidebarMenu isTag="false" staticIcon="false" minititle='F' pathname='/form/form-element' title='Elements'>
                                <i className="icon">
                                    <svg className="icon-10" width="10" viewBox="0 0 24 24" fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                        </g>
                                    </svg>
                                </i>
                            </SidebarMenu>
                            <SidebarMenu isTag="false" staticIcon="false" minititle='WC' pathname='/form/form-validation' title='Validation' >
                                <i className="icon">
                                    <svg className="icon-10" width="10" viewBox="0 0 24 24" fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                        </g>
                                    </svg>
                                </i>
                            </SidebarMenu>
                        </ul>
                    </Accordion.Collapse>
                </Accordion.Item>

                <Accordion.Item as="li" eventKey="sidebar-table" bsPrefix={`nav-item ${active === 'sidebar-table' ? 'active' : ''} `} onClick={() => setActive('sidebar-table')}>
                    <CustomToggle eventKey="sidebar-table" active={activeMenu === 'sidebar-table' ? true : false} onClick={(activeKey) => setActiveMenu(activeKey)} >
                        <OverlayTrigger placement="right" overlay={<Tooltip>Table</Tooltip>}>
                            <i className="icon" data-bs-toggle="tooltip" title="Table" data-bs-placement="right">
                                <svg className="icon-20" xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M2 5C2 4.44772 2.44772 4 3 4H8.66667H21C21.5523 4 22 4.44772 22 5V8H15.3333H8.66667H2V5Z"
                                        fill="currentColor" stroke="currentColor" />
                                    <path
                                        d="M6 8H2V11M6 8V20M6 8H14M6 20H3C2.44772 20 2 19.5523 2 19V11M6 20H14M14 8H22V11M14 8V20M14 20H21C21.5523 20 22 19.5523 22 19V11M2 11H22M2 14H22M2 17H22M10 8V20M18 8V20"
                                        stroke="currentColor" />
                                </svg>
                            </i>
                        </OverlayTrigger>
                        <span className="item-name">Table</span>
                        <i className="right-icon">
                            <svg className="icon-18" xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </i>
                    </CustomToggle>
                    <Accordion.Collapse eventKey="sidebar-table">
                        <ul className="sub-nav " >
                            <SidebarMenu isTag="false" staticIcon="false" minititle='BT' pathname='/table/bootstrap-table' title='Bootstrap Table'>
                                <i className="icon">
                                    <svg className="icon-10" width="10" viewBox="0 0 24 24" fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                        </g>
                                    </svg>
                                </i>
                            </SidebarMenu>
                            <SidebarMenu isTag="false" staticIcon="false" minititle='DT' pathname='/table/table-data' title='Data Table' >
                                <i className="icon">
                                    <svg className="icon-10" width="10" viewBox="0 0 24 24" fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                        </g>
                                    </svg>
                                </i>
                            </SidebarMenu>
                            <SidebarMenu isTag="false" staticIcon="false" minititle='BT' pathname='/table/border-table' title='Bordered Table' >
                                <i className="icon">
                                    <svg className="icon-10" width="10" viewBox="0 0 24 24" fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                        </g>
                                    </svg>
                                </i>
                            </SidebarMenu>
                            <SidebarMenu isTag="false" staticIcon="false" minititle='FT' pathname='/table/fancy-table' title='Fancy Table' >
                                <i className="icon">
                                    <svg className="icon-10" width="10" viewBox="0 0 24 24" fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                        </g>
                                    </svg>
                                </i>
                            </SidebarMenu>
                            <SidebarMenu isTag="false" staticIcon="false" minititle='FT' pathname='/table/fixed-table' title='Fixed Table' >
                                <i className="icon">
                                    <svg className="icon-10" width="10" viewBox="0 0 24 24" fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                        </g>
                                    </svg>
                                </i>
                            </SidebarMenu>
                        </ul>
                    </Accordion.Collapse>
                </Accordion.Item>

                <Accordion.Item as="li" eventKey="sidebar-icons" bsPrefix={`nav-item ${active === 'sidebar-icons' ? 'active' : ''} `} onClick={() => setActive('sidebar-icons')}>
                    <CustomToggle eventKey="sidebar-icons" active={activeMenu === 'sidebar-icons' ? true : false} onClick={(activeKey) => setActiveMenu(activeKey)} >
                        <OverlayTrigger placement="right" overlay={<Tooltip>Icons</Tooltip>}>
                            <i className="icon" data-bs-toggle="tooltip" title="Icons" data-bs-placement="right">
                                <svg className="icon-20" xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24"
                                    fill="currentColor">
                                    <path
                                        d="M8 10.5378C8 9.43327 8.89543 8.53784 10 8.53784H11.3333C12.4379 8.53784 13.3333 9.43327 13.3333 10.5378V19.8285C13.3333 20.9331 14.2288 21.8285 15.3333 21.8285H16C16 21.8285 12.7624 23.323 10.6667 22.9361C10.1372 22.8384 9.52234 22.5913 9.01654 22.3553C8.37357 22.0553 8 21.3927 8 20.6832V10.5378Z"
                                        fill="currentColor" />
                                    <rect opacity="0.4" x="8" y="1" width="5" height="5" rx="2.5" fill="currentColor" />
                                </svg>
                            </i>
                        </OverlayTrigger>
                        <span className="item-name">Icons</span>
                        <i className="right-icon">
                            <svg className="icon-18" xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </i>
                    </CustomToggle>
                    <Accordion.Collapse eventKey="sidebar-icons">
                        <ul className="sub-nav " >
                            <SidebarMenu isTag="false" staticIcon="false" minititle='IS' pathname='/icons/solid' title='Solid'>
                                <i className="icon">
                                    <svg className="icon-10" width="10" viewBox="0 0 24 24" fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                        </g>
                                    </svg>
                                </i>
                            </SidebarMenu>
                            <SidebarMenu isTag="false" staticIcon="false" minititle='IO' pathname='/icons/outline' title='Outlined' >
                                <i className="icon">
                                    <svg className="icon-10" width="10" viewBox="0 0 24 24" fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                        </g>
                                    </svg>
                                </i>
                            </SidebarMenu>
                            <SidebarMenu isTag="false" staticIcon="false" minititle='IO' pathname='/icons/dual-tone' title='Dual Tone' >
                                <i className="icon">
                                    <svg className="icon-10" width="10" viewBox="0 0 24 24" fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                        </g>
                                    </svg>
                                </i>
                            </SidebarMenu>
                            <li>
                                <hr className="hr-horizontal" />
                            </li>
                        </ul>
                    </Accordion.Collapse>
                </Accordion.Item>

            </Accordion>
        </Fragment>
    )
})

VerticalNav.displayName ="VerticalNav"
export default VerticalNav