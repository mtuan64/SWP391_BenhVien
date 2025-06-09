interface ObjectMap {
    [key: string]: string,
  }
  
  interface SettingValueMap {
    value: String | null | ''
  }
  interface SettingArrValueMap {
    value: Array<String>,
  }
  interface DefaultMap {
    target: String | Element,
    choices: Array<String>,
    type: String,
  }
  
  interface DefaultVStringMap extends DefaultMap, SettingValueMap { }
  
  
  export interface SettingState {
    saveLocal: String,
    setting: {
      theme_scheme_direction: SettingValueMap,
    }
  }
  
  export interface SettingDefaultState {
    saveLocal: String,
    setting: {
      theme_scheme_direction: DefaultVStringMap,
    }
  }
  