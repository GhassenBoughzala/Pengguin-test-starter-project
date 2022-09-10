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
import { motion } from "framer-motion";
import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { AllPopular } from "redux/tv-shows/tvActions";
import "../../styles/loading.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "components/Header";

const Home = ({ ...props }) => {
  useEffect(() => {
    props.AllPo();
  }, []);
  let nav = useNavigate();
  const data = props.ListPo;
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
              `No results for your query ${SearchIn}`}
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
                                nav(`show/${tv.id}`);
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
