import * as typeName from "../actions/elementListActions";

const initialState = {
  loading: false,
  error: false,
  elements: [],
  elementSecret: {},
};

export default function elementList(state = initialState, action) {
  switch (action.type) {
    case typeName.LOADING:
      return { ...state, loading: true };
    case typeName.LOADED_SUCCESS:
      return {
        ...state,
        elements: action.payload.elementList,
        loading: false,
        error: false,
      };
    case typeName.LOADED_FAILURE:
      return { ...state, loading: false, error: true };
    case typeName.SET_SECRET_ELEMENT:
      return { ...state, elementSecret: action.payload };
    default:
      return state;
  }
}
