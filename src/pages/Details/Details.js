/* eslint-disable jsx-a11y/alt-text */
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
  Typography,
  Toolbar,
  AppBar,
} from "@mui/material";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React, { Fragment, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { GetDetails, GetImages } from "redux/tv-shows/tvActions";
import "../../styles/loading.css";
import "../../styles/card.scss";
import Header from "components/Header";
import { useParams } from "react-router-dom";

const Details = ({ ...props }) => {
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(GetDetails(params.showId));
  }, []);

  const [selected, setSelected] = useState(1);
  const handleChange = (event) => {
    setSelected(event.target.value);
  };
  console.log(selected);

  return (
    <>
      <Header />
      <Container>
        {props.isLoading && !props.tv ? (
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
              <div className="movie_card" id="bright">
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
              </div>

              <Toolbar>
                <Grid container spacing={2} justifyItems={"flex-end"}>
                  <Grid item xs={6}>
                    <Typography variant="h4">Episodes</Typography>
                  </Grid>
                  <Grid item xs={6} alignContent="flex-end">
                    <FormControl
                      sx={{ minWidth: 180, paddingLeft: 50 }}
                      size="small"
                    >
                      <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={selected}
                        onChange={handleChange}
                      >
                        {props.tv.seasons?.map((s, index) => {
                          return (
                            <MenuItem key={index} value={s.season_number}>
                              {s.name}({s.episode_count} episodes)
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Toolbar>

              <List>
                <ListItem alignItems="flex-start">
                  <Grid container spacing={2}>
                    <Grid item xs={1}>
                      <ListItem>
                        <Typography variant="h5">1</Typography>
                      </ListItem>
                    </Grid>
                    <Grid item xs={1}>
                      <ListItemAvatar>
                        <img
                          height="100"
                          className="locandina"
                          src={`https://image.tmdb.org/t/p/w500${props.tv.poster_path}`}
                        />
                      </ListItemAvatar>
                    </Grid>
                    <Grid item xs={8}>
                      <ListItemText
                        primary="Brunch this weekend?"
                        secondary=" — I'll be in your neighborhood doing errands this…"
                      />
                    </Grid>
                  </Grid>
                </ListItem>
                <Divider variant="inset" component="li" />
              </List>
            </Box>
          </>
        )}
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  tv: state.tvshows.details,
  Bg: state.tvshows.backdrops,
  isLoading: state.tvshows.loadingDet,
  isLoadingBg: state.tvshows.loadingBg,
});
const mapActionsToProps = {
  One: GetDetails,
  Images: GetImages,
};
export default connect(mapStateToProps, mapActionsToProps)(Details);
