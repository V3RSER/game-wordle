import * as typeName from "../actions/elementActions";

const initialState = {
  loading: false,
  error: false,
  list: [],
  secret: {},
};

export default function element(state = initialState, action) {
  switch (action.type) {
    case typeName.LOADING:
      return { ...state, loading: true };
    case typeName.LOADED_SUCCESS:
      return {
        ...state,
        list: action.payload.list,
        loading: false,
        error: false,
      };
    case typeName.LOADED_FAILURE:
      return { ...state, loading: false, error: true };
    case typeName.SET_SECRET_ELEMENT:
      console.log("------ Elemento: " + action.payload.name);
      return {
        ...state,
        secret: action.payload,
      };
    case typeName.SET_ELEMENT_LIST:
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
}
