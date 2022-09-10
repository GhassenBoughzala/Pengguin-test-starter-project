/* eslint-disable no-unused-expressions */
import { axiosTMDB } from "utils/axios";
import { toast } from "react-toastify";
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
        res.status !== 200 && toast.error("Something went wrong !");
      })
      .catch((err) => console.log(err), GET_TV_F);
    1000;
  });
};

export const FetchOne = (id) => axiosTMDB.get(`tv/` + id);
export const GetDetails = (id) => (dispatch) => {
  dispatch({ type: LOADING_DET });
  setTimeout(() => {
    FetchOne(id)
      .then((res) => {
        dispatch({
          type: GET_DETAILS_S,
          payload: res.data,
        });
        res.status !== 200 && toast.warn("Something went wrong !");
      })
      .catch((err) => console.log(err), GET_DETAILS_F);
    1000;
  });
};

export const FetchSeason = (id, num) =>
  axiosTMDB.get(`tv/` + id + `/season/` + num);
export const GetSeason = (id, num) => (dispatch) => {
  dispatch({ type: LOADING_SE });
  setTimeout(() => {
    FetchSeason(id, num)
      .then((res) => {
        dispatch({
          type: GET_SEASON,
          payload: res.data,
        });
        res.status !== 200 && toast.warn("Something went wrong !");
      })
      .catch((err) => console.log(err), GET_SEASON_F);
    1000;
  });
};
