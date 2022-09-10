/* eslint-disable no-unused-expressions */
import { axiosTMDB } from "utils/axios";
import {
  GET_DETAILS_F,
  GET_DETAILS_S,
  GET_IMAGES,
  GET_TV_F,
  GET_TV_S,
  LOADING_TV,
} from "./tvTypes";
import { toast } from "react-toastify";

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
      .catch(
        (err) => console.log(err),
        GET_TV_F,
        toast.error("Something went wrong !")
      );
    1000;
  });
};

export const FetchOne = (id) => axiosTMDB.get(`tv/` + id);
export const GetDetails = (id) => (dispatch) => {
  FetchOne(id)
    .then((res) => {
      dispatch({
        type: GET_DETAILS_S,
        payload: res.data,
      });
    })
    .catch(
      (err) => console.log(err),
      GET_DETAILS_F,
      toast.error("Something went wrong !")
    );
};

export const FetchImages = (id) => axiosTMDB.get(`tv/` + id + `/images`);
export const GetImages = (id) => (dispatch) => {
  FetchImages(id)
    .then((res) => {
      dispatch({
        type: GET_IMAGES,
        payload: res.data.backdrops,
      });
    })
    .catch(
      (err) => console.log(err),
      GET_DETAILS_F,
      toast.error("Something went wrong !")
    );
};
