/* eslint-disable no-unused-expressions */
import { axiosTMDB } from "utils/axios";
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

export const FetchPopular = () => axiosTMDB.get(`tv/popular`);
export const AllPopular = () => (dispatch) => {
  dispatch({ type: LOADING_TV });
  setTimeout(() => {
    FetchPopular()
      .then((res) => {
        dispatch({
          type: GET_TV_S,
          payload: res.data.results,
        });
      })
      .catch((err) => console.log(err), GET_TV_F);
    1000;
  });
};

export const FetchOne = (id) => axiosTMDB.get(`tv/` + id);
export const GetDetails = (id) => (dispatch) => {
  dispatch({ type: LOADING_TV });
  setTimeout(() => {
    FetchOne(id)
      .then((res) => {
        dispatch({
          type: GET_DETAILS_S,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err), GET_DETAILS_F);
    1000;
  });
};

export const FetchImages = (id) => axiosTMDB.get(`tv/` + id + `/images`);
export const GetImages = (id) => (dispatch) => {
  dispatch({ type: LOADING_IMG });
  setTimeout(() => {
    FetchImages(id)
      .then((res) => {
        dispatch({
          type: GET_IMAGES,
          payload: res.data.backdrops,
        });
      })
      .catch((err) => console.log(err), GET_IMAGES_F);
    1000;
  });
};
