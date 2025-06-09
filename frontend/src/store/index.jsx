import { configureStore } from "@reduxjs/toolkit";

// redure
import settingReducer from "./setting/reducers";
import dataReducer from "./data/reducers";

export const store = configureStore({
    reducer: {
        setting: settingReducer,
        data: dataReducer
    }
})