/* eslint-disable no-fallthrough */
/* eslint-disable import/no-anonymous-default-export */
import {
  GET_DETAILS_F,
  GET_DETAILS_S,
  GET_IMAGES,
  GET_TV_F,
  GET_TV_S,
  LOADING_TV,
} from "./tvTypes";

const intialState = {
  popular: [],
  backdrops: [],
  details: {},
  loading: false,
};

export default function (state = intialState, action) {
  switch (action.type) {
    case LOADING_TV:
      return { ...state, popular: [], loading: true };
    case GET_TV_S:
      return { ...state, popular: [...action.payload], loading: false };
    case GET_TV_F:

    case GET_DETAILS_S:
      return { ...state, details: { ...action.payload } };
    case GET_DETAILS_F:

    case GET_IMAGES:
      return { ...state, backdrops: [...action.payload] };

    default:
      return state;
  }
}
