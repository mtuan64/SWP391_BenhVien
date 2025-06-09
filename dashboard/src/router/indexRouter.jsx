import DefaultLayout from "../layout/defaultLayout";
import IndexLayout from "../layout/indexLayout";
import SimpleLayout from "../layout/simple";
import Appointment from "../views/appointment";
import Report from "../views/report";

import Index from "../views/index";
import PrivacyPolicy from "../views/extra/privacy-policy";
import TermsOfService from "../views/extra/terms-of-service";
import PatientDashboard from "../views/patient-dashboard";
import Doctors from "../views/doctors";
import Patient from "../views/patient";
import Category from "../views/category";
import Product from "../views/products";
import Payment from "../views/payment";
import HelpSupport from "../views/helpsupport";
import Setting from "../views/setting";
import { Component } from "react";
import UiComponent from "../views/component";
import Color from "../views/color";
import SignIn from "../views/auth/sign-in";
import SignUp from "../views/auth/sign-up";
import ConfirmMail from "../views/auth/confirm-mail";
import RecoverPwd from "../views/auth/recoverpw";
import LockScreen from "../views/auth/lock-screen";
import UserProfile from "../views/app/user-profile";
import AddUser from "../views/app/user-add";
import UserList from "../views/app/user-list";
import UserProfileSetting from "../views/app/user-privacy-setting";
import Maintenance from "../views/errors/maintenance";
import Error404 from "../views/errors/error404";
import Error500 from "../views/errors/error500";
import WidgetBasic from "../views/widget/widgetbasic";
import WidgetChart from "../views/widget/widgetchart";
import WidgetCard from "../views/widget/widgetcard";
import MapGoogle from "../views/maps/google";
import MapVector from "../views/maps/vector";
import FormElement from "../views/form/form-element";
import FormValidation from "../views/form/form-validation";
import IconDual from "../views/icons/dual-tone";
import IconOutline from "../views/icons/outline";
import IconSolid from "../views/icons/solid";
import TableFixed from "../views/table/fixed-table";
import TableFancy from "../views/table/fancy-table";
import TableBorder from "../views/table/border-table";
import TableData from "../views/table/table-data";
import TableBootstrap from "../views/table/bootstrap-table";
import HorizontalLayout from "../layout/horizontal";
import PatientAppointment from "../views/patient-appointment";
import PatientEncounters from "../views/patient-encounters";
import PatientDoctor from "../views/patient-doctors";
import PatientPayment from "../views/patient-payment";

export const IndexRouter = [
    {
        path: '',
        element: <IndexLayout/>,
        children : [
            {
                path: '',
                element: <Index />
            },
            {
                path: 'appointment',
                element: <Appointment />
            },            
            {
                path: 'report',
                element: <Report />
            },
            {
                path: 'doctors',
                element: <Doctors />
            },
            {
                path: 'patient',
                element: <Patient />
            },
            {
                path: 'category',
                element: <Category />
            },
            {
                path: 'products',
                element: <Product />
            },
            {
                path: 'payment',
                element: <Payment />
            },
            {
                path: 'helpsupport',
                element: <HelpSupport />
            },
            {
                path: 'setting',
                element: <Setting />
            }
        ]
    },
    {
        path: '/',
        element: <DefaultLayout/>,
        children : [
           
            {
                path: 'component',
                element: <UiComponent />
            }, 
            {
                path: 'color',
                element: <Color />
            }, 
            
            // User
            {
                path: 'app/user-profile',
                element: <UserProfile />
            },
            {
                path: 'app/user-add',
                element: <AddUser />
            },
            {
                path: 'app/user-list',
                element: <UserList />
            },
            {
                path: 'app/user-privacy-setting',
                element: <UserProfileSetting />
            },
            // Widgets
            {
                path: 'widget/widgetbasic',
                element: <WidgetBasic />
            },
            {
                path: 'widget/widgetchart',
                element: <WidgetChart />
            },
            {
                path: 'widget/widgetcard',
                element: <WidgetCard />
            },
            // Map
            {
                path: 'maps/google',
                element: <MapGoogle />
            },
            {
                path: 'maps/vector',
                element: <MapVector />
            },
            // Form
            {
                path: 'form/form-element',
                element: <FormElement />
            },
            {
                path: 'form/form-validation',
                element: <FormValidation />
            },
            // Table
            {
                path: 'table/bootstrap-table',
                element: <TableBootstrap />
            },
            {
                path: 'table/table-data',
                element: <TableData />
            },
            {
                path: 'table/border-table',
                element: <TableBorder />
            },
            {
                path: 'table/fancy-table',
                element: <TableFancy />
            },
            {
                path: 'table/fixed-table',
                element: <TableFixed />
            },
            // Icons
            {
                path: 'icons/solid',
                element: <IconSolid />
            },
            {
                path: 'icons/outline',
                element: <IconOutline />
            },
            {
                path: 'icons/dual-tone',
                element: <IconDual />
            },
            {
                path: 'extra/privacy-policy',
                element: <PrivacyPolicy />
            },
            {
                path: 'extra/terms-of-service',
                element: <TermsOfService />
            },

        ]
    },
    {
        path: '/',
        element: <HorizontalLayout />,
        children: [
            {
                path: 'patient-dashboard',
                element: <PatientDashboard />
            },
            {
                path: 'patient-appointment',
                element: <PatientAppointment />
            },
            {
                path: 'patient-encounters',
                element: <PatientEncounters />
            },
            {
                path: 'patient-doctors',
                element: <PatientDoctor />
            },
            {
                path: 'patient-payments',
                element: <PatientPayment />
            }
        ]
    },
    {
        path: '/',
        element: <SimpleLayout />,
        children: [
            // Auth screen
            {
                path: 'auth/sign-in',
                element: <SignIn />
            }, 
            {
                path: 'auth/sign-up',
                element: <SignUp />
            }, 
            {
                path: 'auth/confirm-mail',
                element: <ConfirmMail />
            },
            {
                path: 'auth/recoverpw',
                element: <RecoverPwd />
            },
            {
                path: 'auth/lock-screen',
                element: <LockScreen />
            },
             // Utilities
             {
                path: 'errors/maintenance',
                element: <Maintenance />            
            },
            {
                path: 'errors/error404',
                element: <Error404 />
            },
            {
                path: 'errors/error500',
                element: <Error500 />
            },            
        ]
    }
]