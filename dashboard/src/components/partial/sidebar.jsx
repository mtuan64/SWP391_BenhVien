import React,{memo,Fragment, useEffect} from 'react'

// router
import { Link } from "react-router-dom";

// components
import Logo from '../widget/logo'; 
import VerticalNav from './vertical-nav';

//scrollbar
import Scrollbar from "smooth-scrollbar";

// Import selectors & action from setting store
import * as SettingSelector from "../../store/setting/selectors";

// Redux Selector / Action
import { useSelector } from "react-redux";

const Sidebar = memo(() => {
    const sidebarColor = useSelector(SettingSelector.sidebar_color);
    const sidebarHide = useSelector(SettingSelector.sidebar_show); // array
    const sidebarType = useSelector(SettingSelector.sidebar_type); // array
    const sidebarMenuStyle = useSelector(SettingSelector.sidebar_menu_style);

    const minisidebar = () => {
        document.getElementsByTagName("ASIDE")[0].classList.toggle("sidebar-mini");
    };

    useEffect(() =>{
        Scrollbar.init(document.querySelector("#my-scrollbar"));
        window.addEventListener("resize", () => {
            const tabs = document.querySelectorAll(".nav");
            const sidebarResponsive = document.querySelector(
              '[data-sidebar="responsive"]'
            );
            if (window.innerWidth < 1025) {
              Array.from(tabs, (elem) => {
                if (
                  !elem.classList.contains("flex-column") &&
                  elem.classList.contains("nav-tabs") &&
                  elem.classList.contains("nav-pills")
                ) {
                  elem.classList.add("flex-column", "on-resize");
                }
                return elem.classList.add("flex-column", "on-resize");
              });
              if (sidebarResponsive !== null) {
                if (!sidebarResponsive.classList.contains("sidebar-mini")) {
                  sidebarResponsive.classList.add("sidebar-mini", "on-resize");
                }
              }
            } else {
              Array.from(tabs, (elem) => {
                if (elem.classList.contains("on-resize")) {
                  elem.classList.remove("flex-column", "on-resize");
                }
                return elem.classList.remove("flex-column", "on-resize");
              });
              if (sidebarResponsive !== null) {
                if (
                  sidebarResponsive.classList.contains("sidebar-mini") &&
                  sidebarResponsive.classList.contains("on-resize")
                ) {
                  sidebarResponsive.classList.remove("sidebar-mini", "on-resize");
                }
              }
            }
          });
    })
  return (
    <Fragment>
        <aside
            className={` ${sidebarColor} ${sidebarType.join( " " )} ${sidebarMenuStyle} ${sidebarHide.join( " " ) ? 'sidebar-none' : 'sidebar'}   sidebar-base  ` }
            data-sidebar="responsive"
            data-toggle="main-sidebar"
        >
            <div className="sidebar-header d-flex align-items-center justify-content-start position-relative">
                <Link to="" className="navbar-brand">
                    <Logo />
                </Link>
                <div className="sidebar-toggle" data-toggle="sidebar" data-active="true" onClick={minisidebar}>
                    <i className="icon">               
                        <svg className="icon-20 icon-arrow" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.5 19L8.5 12L15.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>                            
                    </i>
                </div>
            </div>

            <div className="sidebar-body pt-0 data-scrollbar" id="my-scrollbar">
                <div className="sidebar-list">
                    <VerticalNav />
                </div>
            </div>

            <div className="sidebar-footer"></div>

        </aside>
    </Fragment>
  )
})

Sidebar.displayName = "Sidebar"
export default Sidebar