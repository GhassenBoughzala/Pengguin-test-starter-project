/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-labels */
/* eslint-disable no-unused-labels */
import {
  Box,
  Container,
  CardContent,
  Grid,
  CardActionArea,
  Button,
} from "@mui/material";
import Card from "@mui/material/Card";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
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
import { toast } from "react-toastify";

const Home = ({ ...props }) => {
  useEffect(() => {
    props.AllPo();
  }, []);
  let nav = useNavigate();
  const data = props.ListPo;
  const [SearchIn, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [WatchList, setWatchList] = useState([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const res = data.filter((i) =>
        i.name.toLowerCase().includes(SearchIn.toLowerCase())
      );
      setFiltered(res);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [SearchIn, filtered]);

  useEffect(() => {
    setWatchList(LocalWatch);
  }, [WatchList]);

  const AddToWatch = (tv) => {
    WatchList.push(tv);
    localStorage.setItem("watchlist", JSON.stringify(WatchList));
    toast.success("Successfully added");
  };

  const [LocalWatch] = useState(() => {
    const saved = localStorage.getItem("watchlist");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

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
            {!SearchIn && filtered.length !== 0 && "Popular TV Shows"}
          </Typography>
          <Grid container spacing={2}>
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
                {filtered.map((tv, index) => {
                  return (
                    <Fragment key={index}>
                      <Grid item xs={12} md={4} lg={3} key={tv.id}>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1 }}
                        >
                          <Card
                            sx={{
                              width: 270,
                              height: 515,
                              mb: 1,
                              display: "flex",
                              justiyContent: "space-between",
                              flexDirection: "column",
                            }}
                          >
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
                            </CardActionArea>
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                              >
                                {tv.name}
                              </Typography>
                              <Button
                                sx={{ height: 40, width: 230 }}
                                color="inherit"
                                variant="text"
                                onClick={() => AddToWatch(tv)}
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
