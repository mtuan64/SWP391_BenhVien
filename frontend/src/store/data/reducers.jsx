import { createSlice } from '@reduxjs/toolkit'
import {state} from './state'

export const dataSlice = createSlice({
    name: "data",
    initialState: state,
    reducers: { 
        blogs_data: (state,action) =>{
            state.blogs_data = action.payload
        },
        client_data: (state,action) =>{
            state.clients_data = action.payload
        },
        faq_data: (state,action) =>{
            state.faq_data = action.payload
        },
        products_data: (state,action) =>{
            state.products_data = action.payload
        },
        services_data: (state,action) =>{
            state.services_data = action.payload
        },
        social_media_data: (state,action) =>{
            state.social_media_data = action.payload
        },
        team_data: (state,action) =>{
            state.team_data = action.payload
        },
        testimonial_data: (state,action) =>{
            state.testimonial_data = action.payload
        }
    }
})


export default dataSlice.reducer;