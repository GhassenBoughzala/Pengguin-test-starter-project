/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-labels */
/* eslint-disable no-unused-labels */
import {
  Box,
  Container,
  CardContent,
  Grid,
  IconButton,
  CardActionArea,
  Button,
} from "@mui/material";
//import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import AddIcon from "@mui/icons-material/Add";
import InfoIcon from "@mui/icons-material/Info";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { AllPopular } from "redux/tv-shows/tvActions";
import "../../styles/loading.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "components/Header";
import {
  Image,
  ImageBackdrop,
  ImageButton,
  ImageMarked,
  ImageSrc,
} from "./Home.styles";

const Home = ({ ...props }) => {
  useEffect(() => {
    props.AllPo();
  }, []);
  let nav = useNavigate();
  const data = props.ListPo;
  const [SearchIn, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [hover, sethover] = useState(false);

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
      <Header {...{ SearchIn, setSearch }} />
      <Container>
        <Box sx={{ height: "100vh" }}>
          <Typography
            variant="h5"
            component="div"
            sx={{ p: 4, pb: 4 }}
            textAlign="center"
          >
            {SearchIn &&
              filtered.length === 0 &&
              `No results for your query "${SearchIn}"`}
            {SearchIn &&
              filtered.length !== 0 &&
              `You are searching for "${SearchIn}"`}
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
                          <Card
                            sx={{
                              width: 270,
                              height: 545,
                              mb: 1,
                              display: "flex",
                              justiyContent: "space-between",
                              flexDirection: "column",
                            }}
                          >
                            {/*                             
                            <CardActionArea
                              onMouseOver={() => sethover(true)}
                              onMouseOut={() => sethover(false)}
                              onClick={() => {
                                nav(`show/${tv.id}`);
                              }}
                            >
                              <CardMedia
                                component="img"
                                height="400"
                                image={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                                alt=""
                              ></CardMedia>
                            </CardActionArea> 
                            */}

                            <ImageButton
                              focusRipple
                              key={tv.name}
                              style={{ height: 400 }}
                              onClick={() => {
                                nav(`show/${tv.id}`);
                              }}
                            >
                              <ImageSrc
                                style={{
                                  backgroundImage: `url(https://image.tmdb.org/t/p/w500${tv.poster_path})`,
                                  height: 400,
                                }}
                              />
                              <ImageBackdrop className="MuiImageBackdrop-root">
                                <Grid
                                  container
                                  spacing={1}
                                  direction="row"
                                  justifyContent="center"
                                  alignItems="center"
                                  sx={{ mt: 22, opacity:100 }}
                                >
                                  <InfoIcon fontSize="large" />
                                </Grid>
                                <ImageMarked>
                                  <Typography>SHOW DETAILS</Typography>
                                </ImageMarked>
                              </ImageBackdrop>
                            </ImageButton>
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                              >
                                {tv.name}
                              </Typography>
                              <Button
                                sx={{ height: 40, width: 180, ml: 3, mr: 3 }}
                                color="inherit"
                                variant="text"
                                onClick={() => {
                                  nav(`/`);
                                }}
                                startIcon={<AddIcon />}
                                size="small"
                              >
                                ADD TO WATCHLIST
                              </Button>
                            </CardContent>
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
