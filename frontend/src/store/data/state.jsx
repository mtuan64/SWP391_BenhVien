import {blogs} from '../../staticData/blogData'
import {clientData} from "../../staticData/clientData"
import { faqData } from '../../staticData/faqData'
import { productData } from '../../staticData/productData'
import { serviceData } from '../../staticData/serviceData'
import { socialData } from '../../staticData/socialMediaData'
import { teamData } from '../../staticData/team'
import { tesimonialData } from '../../staticData/testimonial'

export const state = {
    blogs_data: blogs,   
    clients_data: clientData,
    faq_data: faqData,
    products_data: productData,
    services_data: serviceData,
    social_media_data: socialData,
    team_data: teamData,
    testimonial_data: tesimonialData,
}