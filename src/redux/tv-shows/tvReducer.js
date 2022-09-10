/* eslint-disable no-fallthrough */
/* eslint-disable import/no-anonymous-default-export */
import {
  GET_DETAILS_F,
  GET_DETAILS_S,
  GET_SEASON,
  GET_SEASON_F,
  GET_TV_F,
  GET_TV_S,
  LOADING_DET,
  LOADING_SE,
  LOADING_TV,
} from "./tvTypes";

const intialState = {
  popular: [],
  details: {},
  season: {},
  loading: false,
  loadingSe: false,
  loadingDet: false,
};

export default function (state = intialState, action) {
  switch (action.type) {
    case LOADING_TV:
      return { ...state, popular: [], loading: true };
    case GET_TV_S:
      return { ...state, popular: [...action.payload], loading: false };
    case GET_TV_F:

    case LOADING_DET:
      return { ...state, popular: [], loadingDet: true };
    case GET_DETAILS_S:
      return { ...state, details: { ...action.payload }, loadingDet: false };
    case GET_DETAILS_F:

    case LOADING_SE:
      return { ...state, season: {}, loadingSe: true };
    case GET_SEASON:
      return { ...state, season: { ...action.payload }, loadingSe: false };
    case GET_SEASON_F:

    default:
      return state;
  }
}
