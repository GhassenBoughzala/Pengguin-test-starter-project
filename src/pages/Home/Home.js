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
import AddIcon from "@mui/icons-material/Add";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import { setThemeMode } from "redux/theme.slice";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { AllPopular } from "redux/tv-shows/tvActions";
import "../../styles/loading.css";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
  MaterialUISwitch,
} from "./Home.styles";
import { useState } from "react";

const Home = ({ ...props }) => {
  useEffect(() => {
    props.AllPo();
  }, []);
  const data = props.ListPo;
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme);
  const [SearchIn, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const res = data.filter((i) =>
        i.name.toLowerCase().includes(SearchIn.toLowerCase())
      );
      setFiltered(res);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [SearchIn, filtered]);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Start searching"
                  inputProps={{ "aria-label": "search" }}
                  onChange={(event) => {
                    setSearch(event.target.value);
                  }}
                />
              </Search>
            </Grid>

            <MaterialUISwitch
              checked={mode.dark}
              onChange={() => dispatch(setThemeMode())}
            />
          </Toolbar>
        </AppBar>
      </Box>
      <Container>
        <Box sx={{ height: "100vh" }}>
          <Typography
            variant="h5"
            component="div"
            sx={{ p: 4, pb: 4 }}
            textAlign="center"
          >
            {filtered.length === 0 && `No results for your query ${SearchIn}`}
            {SearchIn &&
              filtered.length !== 0 &&
              `You are searching for ${SearchIn}`}
            {!SearchIn && filtered.length !== 0 && "TV Shows"}
          </Typography>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            {props.isLoading ? (
              <div>
                <div id="loading"></div>
              </div>
            ) : (
              <>
                {filtered.map((tv, index) => {
                  return (
                    <Fragment key={index}>
                      <Grid item xs={2} lg={3}>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1.5 }}
                        >
                          <Card sx={{ width: 270, height: 530, mb: 2 }}>
                            <CardActionArea
                              onClick={() => {
                                console.log("Hi");
                              }}
                            >
                              <CardMedia
                                component="img"
                                height="380"
                                image={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                                alt=""
                              />
                              <CardContent>
                                <Typography
                                  gutterBottom
                                  variant="h5"
                                  component="div"
                                >
                                  {tv.name}
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                            <CardActions sx={{ position: "absolute" }}>
                              <Button size="small" startIcon={<AddIcon />}>
                                Add to watchlist
                              </Button>
                            </CardActions>
                          </Card>
                        </motion.div>
                      </Grid>
                    </Fragment>
                  );
                })}
              </>
            )}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  ListPo: state.tvshows.popular,
  isLoading: state.tvshows.loading,
});
const mapActionsToProps = {
  AllPo: AllPopular,
};
export default connect(mapStateToProps, mapActionsToProps)(Home);
