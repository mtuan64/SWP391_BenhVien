import SimpleLayout from "../layout/SimpleLayout";
import IndexLayout from "../layout/IndexLayout";
import Index from "../views/index";
import EyeCare from "../views/eye-care";
import SkinSpecialist from "../views/skin-specialist";
import FertilityClinic from "../views/fertility-clinic";
import EntClinic from "../views/ent-clinic";
import ProductHome from "../views/product-home";
import Psychiatrist from "../views/psychiatrist";
import Dentist from "../views/dentist";
import Paediatrician from "../views/paediatrician";
import Cardiac from "../views/cardiac";
import Orthopedics from "../views/orthopedics";
import Laboratory from "../views/laboratory";
import TabTwoColumn from "../views/tab-two-column";
import TabThreeColumn from "../views/tab-three-column";
import DoctorDetails from "../views/doctor-details";
import AboutUs from "../views/about-us";
import ClientPage from "../views/client-page";
import PricingPlanOne from "../views/pricing-plan-one";
import PricingPlanTwo from "../views/pricing-plan-two";
import NotFound from "../views/not-found";
import ContactUs from "../views/contact-us";
import ComingSoon from "../views/coming-soon";
import Service1 from "../views/service/service1";
import Audiologist from "../views/service/audiologist";
import Cardiologist from "../views/service/cardiologist";
import EntSpecialist from "../views/service/entspecialist";
import Neurologist from "../views/service/neurologist";
import Oncologist from "../views/service/oncologist";
import Psychiatrists from "../views/service/psychiatrists";
import BlogLists from "../views/blog/blog-lists";
import BlogMasonry from "../views/blog/blog-masonry";
import BlogTwoColumn from "../views/blog/blog-two-column";
import BlogThreeColumn from "../views/blog/blog-three-column";
import BlogThreeColumnFullWidth from "../views/blog/blog-three-column-fullwidth";
import BlogFourColumn from "../views/blog/blog-four-column";
import LeftSidebarGridOne from "../views/blog/leftsidebar-grid-one";
import LeftSidebarGridTwo from "../views/blog/leftsidebar-grid-two";
import RightSidebarGridOne from "../views/blog/rightsidebar-grid-one";
import RightSidebarGridTwo from "../views/blog/rightsidebar-grid-two";
import BlogDetails from "../views/blog/blog-details";
import BlogStandard from "../views/blog/blog-standard";
import BlogVideo from "../views/blog/blog-video";
import BlogGallary from "../views/blog/blog-gallary";
import BlogAudio from "../views/blog/blog-audio";
import BlogLink from "../views/blog/blog-link";
import BlogQuote from "../views/blog/blog-quote";
import BlogAuthor from "../views/blog/blog-author";
import BlogCategory from "../views/blog/blog-category";
import BlogDate from "../views/blog/blog-date";
import BlogTag from "../views/blog/blog-tag";
import Shop from "../views/shop/shop";
import ShopLeftSidebar from "../views/shop/shop-left-sidebar";
import ShopRightSidebar from "../views/shop/shop-right-sidebar";
import ShopNoSidebar from "../views/shop/shop-no-sidebar";
import Cart from "../views/shop/cart";
import Checkout from "../views/shop/checkout";
import Wishlist from "../views/shop/wishlist";
import MyAccount from "../views/shop/my-account";
import TrackOrder from "../views/shop/track-order";
import ProductStandard from "../views/shop/product-standard";
import ProductNew from "../views/shop/product-new";
import ProductSale from "../views/shop/product-sale";
import OrderReceived from "../views/shop/order-received";
import Login from "../views/auth/login";
import Registration from "../views/auth/registration";
import ResetPassword from "../views/auth/reset-password";
import Service2 from "../views/service/service2";
import Appointment from "../views/appointment";
import ServiceDetail from "../views/service/service-detail";
import FaqPage from "../views/faq-page";

// header
import HeaderDentist from "../components/partial/header/headerDentist";
import HeaderEyeCare from "../components/partial/header/headerEyecare";
import HeaderSkinSpecialist from "../components/partial/header/headerSkinSpecialist";
import HeaderProductHome from "../components/partial/header/headerProductHome";
import HeaderPsychiatrist from "../components/partial/header/headerPsychiatrist";
import HeaderLaboratory from "../components/partial/header/headerLaboratory";
// footer
import FooterDentist from "../components/partial/footer/footerDentist";
import FooterEyecare from "../components/partial/footer/footerEyecare";
import FooterSkinSpecialist from "../components/partial/footer/footerSkinSpecialist";
import FooterFertilityClinic from "../components/partial/footer/footerFertilityClinic";
import FooterEntClinic from "../components/partial/footer/footerEntClinic";
import FooterProduct from "../components/partial/footer/footerProduct";
import FooterPsychiatrist from "../components/partial/footer/footerPsychiatrist";
import FooterCardiac from "../components/partial/footer/footerCardiac";
import FooterOrthopedics from "../components/partial/footer/footerOrthopedics";
import FooterLaboratory from "../components/partial/footer/footerLaboratory";
import FooterPaediatrician from "../components/partial/footer/footerPaediatrician";

// logo Image
import logoDefault from "/assets/images/logo/logo.png"
import logoDentist from "/assets/images/logo/logo-skyblue.png"
import logoEyeCare from "/assets/images/logo/logo-green.png"
import logoSkinSpecialist from "/assets/images/logo/logo-pink.png"
import logoEntClinic from "/assets/images/logo/logo-orange.png"
import logoPsychiatrist from "/assets/images/logo/logo-yellow.png"
import logoCardiac from "/assets/images/logo/logo-red.png"
import logoOrthopedics from "/assets/images/logo/logo-blue.png"
import logoPaediatrician from "/assets/images/logo/logo-neviblue.png"
import PrivacyPolicy from "../views/privacy-policy";
import TermsConditions from "../views/terms-conditions";

export const IndexRouter = [
    {
        path: '',
        element: <IndexLayout logoDynamic={logoDefault} IsMegaMenu={true} />,
        children: [
            {
                path: '/',
                element: <Index />,
                Activelink: 'home'
            },
        ]
    }, 
    {
        path: '',
        element: <IndexLayout Header={HeaderDentist} logoDynamic={logoDentist} Footer={FooterDentist} IsMegaMenu={true} />,
        children: [
            {
                path: '/dentist',
                element: <Dentist />,
                Activelink: 'dentist'
            },
        ]
    },
    {
        path: '',
        element: <IndexLayout Header={HeaderEyeCare} logoDynamic={logoEyeCare} Footer={FooterEyecare} IsMegaMenu={true} />,
        children: [
            {
                path: '/eye-care',
                element: <EyeCare />,
                Activelink: 'eye-care'
            },
        ]
    },
    {
        path: '',
        element: <IndexLayout Header={HeaderSkinSpecialist} logoDynamic={logoSkinSpecialist} Footer={FooterSkinSpecialist} IsMegaMenu={true} />,
        children: [
            {
                path: '/skin-specialist',
                element: <SkinSpecialist />,
                Activelink: 'skin-specialist'
            },
        ]
    },
    {
        path: '',
        element: <IndexLayout logoDynamic={logoSkinSpecialist} IsMegaMenu={true} Footer={FooterFertilityClinic} />,
        children: [
            {
                path: '/fertility-clinic',
                element: <FertilityClinic />,
                Activelink: 'fertility-clinic'
            },
        ]
    },
    {
        path: '',
        element: <IndexLayout logoDynamic={logoEntClinic} IsMegaMenu={true} Footer={FooterEntClinic} />,
        children: [
            {
                path: '/ent-clinic',
                element: <EntClinic />,
                Activelink: 'ent-clinic'
            },
        ]
    },
    {
        path: '',
        element: <IndexLayout Header={HeaderProductHome} logoDynamic={logoDefault} IsMegaMenu={true} Footer={FooterProduct} />,
        children: [
            {
                path: '/product-home',
                element: <ProductHome />,
                Activelink: 'product-home'
            },
        ]
    },
    {
        path: '',
        element: <IndexLayout Header={HeaderPsychiatrist} logoDynamic={logoPsychiatrist} IsMegaMenu={true} Footer={FooterPsychiatrist} />,
        children: [
            {
                path: '/psychiatrist',
                element: <Psychiatrist />,
                Activelink: 'psychiatrist'
            },
        ]
    },
    {
        path: '',
        element: <IndexLayout Header={HeaderSkinSpecialist} logoDynamic={logoCardiac} IsMegaMenu={true} Footer={FooterCardiac} />,
        children: [
            {
                path: '/cardiac',
                element: <Cardiac />,
                Activelink: 'cardiac'
            },
        ]
    },
    {
        path: '',
        element: <IndexLayout Header={HeaderSkinSpecialist} logoDynamic={logoOrthopedics} IsMegaMenu={true} Footer={FooterOrthopedics} />,
        children: [
            {
                path: '/orthopedics',
                element: <Orthopedics />,
                Activelink: 'orthopedics'
            },
        ]
    },
    {
        path: '',
        element: <IndexLayout Header={HeaderLaboratory} logoDynamic={logoOrthopedics} IsMegaMenu={true} Footer={FooterLaboratory} />,
        children: [
            {
                path: '/laboratory',
                element: <Laboratory />,
                Activelink: 'laboratory'
            },
        ]
    },
    {
        path: '',
        element: <IndexLayout Header={HeaderPsychiatrist} logoDynamic={logoPaediatrician} IsMegaMenu={true} Footer={FooterPaediatrician} />,
        children: [
            {
                path: '/paediatrician',
                element: <Paediatrician />,
                Activelink: 'paediatrician'
            },
        ]
    },
    {
        path: '',
        element: <IndexLayout logoDynamic={logoDefault} />,
        children : [
            {
                path: '/tab-two-column',
                element: <TabTwoColumn />,
                Activelink: 'tab-two-column'
            },
            {
                path: '/tab-three-column',
                element: <TabThreeColumn />,
                Activelink: 'tab-three-column'
            },
            {
                path: '/doctor-details',
                element: <DoctorDetails />,
                Activelink: 'doctor-details'
            },
            {
                path: '/about-us',
                element: <AboutUs />,
                Activelink: 'about-us'
            },
            {
                path: '/client-page',
                element: <ClientPage />,
                Activelink: 'client-page'
            },
            {
                path: '/pricing-plan-one',
                element: <PricingPlanOne />,
                Activelink: 'pricing-plan-one'
            },
            {
                path: '/pricing-plan-two',
                element: <PricingPlanTwo />,
                Activelink: 'pricing-plan-two'
            },
            {
                path: '/faq-page',
                element: <FaqPage />,
                Activelink: 'faq-page'
            },
            {
                path: '/contact-us',
                element: <ContactUs />,
                Activelink: 'contact-us'
            },
            
            {
                path: 'appointment',
                element: <Appointment />,
                Activelink: 'appointment'
            },

            {
                path: 'privacy-policy',
                element: <PrivacyPolicy />,
                Activelink: 'privacy-policy'
            },

            {
                path: 'terms-conditions',
                element: <TermsConditions />,
                Activelink: 'terms-conditions'
            },

            {
                path: 'service',
                children : [
                    {
                        path: 'service1',
                        element: <Service1 />,
                        Activelink: 'service1'
                    },
                    {
                        path: 'service2',
                        element: <Service2 />,
                        Activelink: 'service2'
                    },
                    {
                        path: 'audiologist',
                        element: <Audiologist />,
                        Activelink: 'audiologist'
                    },
                    {
                        path: 'cardiologist',
                        element: <Cardiologist />,
                        Activelink: 'cardiologist'
                    },
                    {
                        path: 'entspecialist',
                        element: <EntSpecialist />,
                        Activelink: 'entspecialist'
                    },
                    {
                        path: 'neurologist',
                        element: <Neurologist />,
                        Activelink: 'neurologist'
                    },
                    {
                        path: 'oncologist',
                        element: <Oncologist />,
                        Activelink: 'oncologist'
                    },
                    {
                        path: 'psychiatrists',
                        element: <Psychiatrists />,
                        Activelink: 'psychiatrists'
                    },
                    {
                        path: 'service-detail',
                        element: <ServiceDetail />,
                        Activelink: 'service-detail'
                    }
                ]
            },

            {
                path: 'blog',
                children : [
                    {
                        path: 'blog-lists',
                        element: <BlogLists />,
                        Activelink: 'blog-lists'
                    },
                    {
                        path: 'blog-masonry',
                        element: <BlogMasonry />,
                        Activelink: 'blog-masonry'
                    },
                    {
                        path: 'blog-two-column',
                        element: <BlogTwoColumn />,
                        Activelink: 'blog-two-column'
                    },
                    {
                        path: 'blog-three-column',
                        element: <BlogThreeColumn />,
                        Activelink: 'blog-three-column'
                    },
                    {
                        path: 'blog-three-column-fullwidth',
                        element: <BlogThreeColumnFullWidth />,
                        Activelink: 'blog-three-column-fullwidth'
                    },
                    {
                        path: 'blog-four-column',
                        element: <BlogFourColumn />,
                        Activelink: 'blog-four-column'
                    },
                    {
                        path: 'leftsidebar-grid-one',
                        element: <LeftSidebarGridOne />,
                        Activelink: 'leftsidebar-grid-one'
                    },
                    {
                        path: 'leftsidebar-grid-two',
                        element: <LeftSidebarGridTwo />,
                        Activelink: 'leftsidebar-grid-two'
                    },
                    {
                        path: 'rightsidebar-grid-one',
                        element: <RightSidebarGridOne />,
                        Activelink: 'rightsidebar-grid-one'
                    },
                    {
                        path: 'rightsidebar-grid-two',
                        element: <RightSidebarGridTwo />,
                        Activelink: 'rightsidebar-grid-two'
                    },
                    {
                        path: 'blog-details',
                        element: <BlogDetails />,
                        Activelink: 'blog-details'
                    },
                    {
                        path: 'blog-standard',
                        element: <BlogStandard />,
                        Activelink: 'blog-standard'
                    },
                    {
                        path: 'blog-video',
                        element: <BlogVideo />,
                        Activelink: 'blog-video'
                    },
                    {
                        path: 'blog-gallary',
                        element: <BlogGallary />,
                        Activelink: 'blog-gallary'
                    },
                    {
                        path: 'blog-audio',
                        element: <BlogAudio />,
                        Activelink: 'blog-audio'
                    },
                    {
                        path: 'blog-link',
                        element: <BlogLink />,
                        Activelink: 'blog-link'
                    },
                    {
                        path: 'blog-quote',
                        element: <BlogQuote />,
                        Activelink: 'blog-quote'
                    },
                    {
                        path: 'blog-author',
                        element: <BlogAuthor />,
                        Activelink: 'blog-author'
                    },
                    {
                        path: 'blog-category',
                        element: <BlogCategory />,
                        Activelink: 'blog-category'
                    },
                    {
                        path: 'blog-date',
                        element: <BlogDate />,
                        Activelink: 'blog-date'
                    },
                    {
                        path: 'blog-tag',
                        element: <BlogTag />,
                        Activelink: 'blog-tag'
                    }            
                ]
            },

            {
                path: 'shop',
                children : [
                    {
                        path: 'shop',
                        element: <Shop />,
                        Activelink: 'shop'
                    },
                    {
                        path: 'shop-left-sidebar',
                        element: <ShopLeftSidebar />,
                        Activelink: 'shop-left-sidebar'
                    },
                    {
                        path: 'shop-right-sidebar',
                        element: <ShopRightSidebar />,
                        Activelink: 'shop-right-sidebar'
                    },
                    {
                        path: 'shop-no-sidebar',
                        element: <ShopNoSidebar />,
                        Activelink: 'shop-no-sidebar'
                    },            
                    {
                        path: 'cart',
                        element: <Cart />,
                        Activelink: 'cart'
                    },
                    {
                        path: 'checkout',
                        element:  <Checkout />,
                        Activelink: 'checkout'
                    },
                    {
                        path: 'wishlist',
                        element: <Wishlist />,
                        Activelink: 'wishlist'
                    },
                    {
                        path: 'my-account',
                        element: <MyAccount />,
                        Activelink: 'my-account'
                    },
                   
                    {
                        path: 'product-standard',
                        element: <ProductStandard />,
                        Activelink: 'product-standard'
                    },
                    {
                        path: 'product-new',
                        element: <ProductNew />,
                        Activelink: 'product-new'
                    },
                    {
                        path: 'product-sale',
                        element: <ProductSale />,
                        Activelink: 'product-sale'
                    },
                    {
                        path: 'order-received',
                        element: <OrderReceived />,
                        Activelink: 'order-received'
                    }
                ]
            },
            
        ]
    },
    
    {
        path: 'auth',
        element: <SimpleLayout />,
        children : [
            {
                path: 'not-found',
                element: <NotFound />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'registration',
                element: <Registration />
            },
            {
                path: 'reset-password',
                element: <ResetPassword />
            }
        ]
    },
    {
        path: '',
        element: <SimpleLayout />,
        children : [
            {
                path: 'not-found',
                element: <NotFound />
            },  
            {
                path: 'coming-soon',
                element: <ComingSoon />
            },         
            {
                path: '/shop/track-order',
                element: <TrackOrder />
            },
        ]
    }
]