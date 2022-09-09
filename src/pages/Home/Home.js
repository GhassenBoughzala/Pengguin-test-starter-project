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
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import AddIcon from "@mui/icons-material/Add";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { AllPopular } from "redux/tv-shows/tvActions";
import "../../styles/loading.css";

const Home = ({ ...props }) => {
  useEffect(() => {
    props.AllPo();
  }, []);

  return (
    <Container>
      <Box sx={{ height: "100vh" }}>
        <Typography
          variant="h5"
          component="div"
          sx={{ p: 4, pb: 4 }}
          textAlign="center"
        >
          TV Shows
        </Typography>
        <Grid
          container
          xs={4}
          md={8}
          lg={12}
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
              {props.ListPo.map((tv, index) => {
                return (
                  <Fragment key={index}>
                    <Grid xs={2} lg={3} spacing={6}>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5 }}
                      >
                        <Card sx={{ width: 270, height: 530 }}>
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
