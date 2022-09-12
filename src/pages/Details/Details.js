/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-labels */
/* eslint-disable no-unused-labels */
import {
  Box,
  Container,
  Grid,
  Typography,
  Toolbar,
  InputLabel,
} from "@mui/material";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React, { Fragment, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { GetDetails, GetSeason } from "redux/tv-shows/tvActions";
import "../../styles/loading.css";
import "../../styles/card.scss";
import Header from "components/Header";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
const Soon = require("../../assets/img/ComingSoon.png");

const Details = ({ ...props }) => {
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(GetDetails(params.showId));
  }, []);

  const [selected, setSelected] = useState("");
  const handleChange = (event) => {
    setSelected(event.target.value);
    dispatch(GetSeason(params.showId, event.target.value));
  };

  return (
    <>
      <Header />
      <Container>
        {props.isLoading ? (
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            padding={10}
          >
            <div id="loading"></div>
          </Grid>
        ) : (
          <>
            <Box sx={{ height: "100vh" }}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="movie_card"
                id="bright"
              >
                <div className="info_section">
                  <div className="movie_header">
                    <img
                      className="locandina"
                      src={`https://image.tmdb.org/t/p/w500${props.tv.poster_path}`}
                    />
                    <h1>{props.tv.name}</h1>
                    <h4>
                      {props.tv.first_air_date?.substring(0, 4)},
                      {props.tv.created_by?.map((c) => {
                        return <> {c.name} </>;
                      })}
                    </h4>
                    <p className="type">
                      {props.tv.genres?.map((g, index) => {
                        return (
                          <Fragment key={index}>
                            <span className="minutes">{g.name}</span>
                          </Fragment>
                        );
                      })}
                    </p>
                    <div className="">
                      <h5>{props.tv.overview}</h5>
                    </div>
                  </div>
                </div>
                <div
                  className="blur_back"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${props.tv.backdrop_path})`,
                  }}
                ></div>
              </motion.div>

              <Toolbar sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={2}>
                    <Typography variant="h4">Episodes</Typography>
                  </Grid>
                  <Grid item xs={8}></Grid>
                  <Grid item xs={2} alignContent="flex-end">
                    <FormControl
                      sx={{ minWidth: 200 }}
                      size="small"
                      variant="filled"
                    >
                      <InputLabel id="select-season">Seasons</InputLabel>
                      <Select
                        labelId="select-season"
                        id="demo-select-small"
                        label="Seasons"
                        value={selected}
                        onChange={handleChange}
                      >
                        {props.tv.seasons?.map((s, index) => {
                          return (
                            <MenuItem key={index} value={s.season_number}>
                              {s.name} ({s.episode_count} episodes)
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Toolbar>
              {selected && (
                <List>
                  {props.season.episodes?.map((ep, index) => {
                    return (
                      <Fragment key={index}>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1.5 }}
                        >
                          <>
                            <Grid container spacing={2}>
                              <Grid item xs={1}>
                                <ListItem>
                                  <Typography
                                    variant="h4"
                                    align="center"
                                    margin={4}
                                  >
                                    {ep.episode_number}
                                  </Typography>
                                </ListItem>
                              </Grid>
                              <Grid item xs={2}>
                                <ListItemAvatar sx={{ m: 1 }}>
                                  <img
                                    height="100"
                                    className="locandina"
                                    src={
                                      ep.still_path
                                        ? `https://image.tmdb.org/t/p/w500${ep.still_path}`
                                        : Soon
                                    }
                                  />
                                </ListItemAvatar>
                              </Grid>
                              <Grid item xs={8}>
                                <Typography variant="h5" sx={{mt:1}}>{ep.name}</Typography>
                                <Typography variant={'body1'} color={"GrayText"}>
                                  {ep.overview}
                                </Typography>
                              </Grid>
                            </Grid>
                          </>
                          <Divider variant="middle" />
                        </motion.div>
                      </Fragment>
                    );
                  })}
                </List>
              )}
            </Box>
          </>
        )}
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  tv: state.tvshows.details,
  season: state.tvshows.season,
  isLoading: state.tvshows.loadingDet,
  isLoadingSe: state.tvshows.loadingSe,
});

export default connect(mapStateToProps)(Details);
