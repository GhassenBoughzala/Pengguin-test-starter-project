/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-labels */
/* eslint-disable no-unused-labels */
import {
  Button,
  CardActions,
  Box,
  Container,
  CardContent,
  CardActionArea,
  Grid,
} from "@mui/material";
//import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { GetDetails, GetImages } from "redux/tv-shows/tvActions";
import "../../styles/loading.css";
import Header from "components/Header";
import { useParams } from "react-router-dom";

const Details = ({ ...props }) => {
  useEffect(() => {
    props.One(showId);
  }, []);

  useEffect(() => {
    props.Images(showId);
  }, []);

  let { showId } = useParams();
  const tv = props.Show;
  const b = props.Bg;

  return (
    <>
      <Header />
      <Container>
        {props.isLoading ? (
          <div>
            <div id="loading"></div>
          </div>
        ) : (
          <>
            <Box sx={{ height: "100vh", pt: 2 }}>
              <Card>
                {props.isLoadingBg ? (
                  <div>
                    <div id="small-loading"></div>
                  </div>
                ) : (
                  <CardMedia
                    component="img"
                    height="400"
                    //image={`https://image.tmdb.org/t/p/original${b[1].file_path}`}
                    alt=""
                  />
                )}
              </Card>
            </Box>
          </>
        )}
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  Show: state.tvshows.details,
  Bg: state.tvshows.backdrops,
  isLoading: state.tvshows.loading,
  isLoadingBg: state.tvshows.loadingBg,
});
const mapActionsToProps = {
  One: GetDetails,
  Images: GetImages,
};
export default connect(mapStateToProps, mapActionsToProps)(Details);
