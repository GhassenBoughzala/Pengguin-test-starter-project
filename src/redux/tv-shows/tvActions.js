/* eslint-disable no-unused-expressions */
import { axiosTMDB } from "utils/axios";
import { GET_TV_F, GET_TV_S, LOADING_TV } from "./tvTypes";


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
      .catch((err) => console.log(err), GET_TV_F)
      500;
  });
};
