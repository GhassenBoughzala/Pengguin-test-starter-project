/* eslint-disable no-fallthrough */
/* eslint-disable import/no-anonymous-default-export */
import { toast } from "react-toastify";
import {
  GET_DETAILS_F,
  GET_DETAILS_S,
  GET_IMAGES,
  GET_IMAGES_F,
  GET_TV_F,
  GET_TV_S,
  LOADING_IMG,
  LOADING_TV,
} from "./tvTypes";

const intialState = {
  popular: [],
  backdrops: [],
  details: {},
  loading: false,
  loadingBg: false,
};

export default function (state = intialState, action) {
  switch (action.type) {
    case LOADING_TV:
      return { ...state, popular: [], loading: true };
    case GET_TV_S:
      return { ...state, popular: [...action.payload], loading: false };
    case GET_TV_F:
      return toast.error("Something went wrong !");

    case GET_DETAILS_S:
      return { ...state, details: { ...action.payload }, loading: false };
    case GET_DETAILS_F:
      return toast.error("Details: Something went wrong !");

    case LOADING_IMG:
      return { ...state, backdrops: [], loadingBg: false };
    case GET_IMAGES:
      return { ...state, backdrops: [...action.payload], loadingBg: false };
    case GET_IMAGES_F:
      return toast.error("Images: Something went wrong !");

    default:
      return state;
  }
}
