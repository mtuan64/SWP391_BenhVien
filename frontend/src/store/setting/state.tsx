import { SettingState, SettingDefaultState } from './interface'

// Initial Setting State
export const initialState: SettingState = {
    "saveLocal": 'sessionStorage',
    "setting": {
      "theme_scheme_direction": {
        "value": "ltr"
      }
    }
  };
  
  // Default Setting State
  export const defaultState: SettingDefaultState = {
    "saveLocal": 'sessionStorage',
    "setting": {
      theme_scheme_direction: {
        target: "html",
        choices: ["ltr", "rtl"],
        type: "layout_design",
        value: "ltr",
      },
    }
  }