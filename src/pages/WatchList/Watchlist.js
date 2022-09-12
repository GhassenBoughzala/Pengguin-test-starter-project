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
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
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

const WatchList = ({ ...props }) => {
  useEffect(() => {
    props.AllPo();
  }, []);
  let nav = useNavigate();

  const [LocalWatch] = useState(() => {
    const saved = localStorage.getItem("watchlist");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
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

  const RemoveShow = async (e) => {
    const filtered = data.filter((item, index) => index !== e);
    localStorage.setItem("watchlist", JSON.stringify(filtered));
    window.location.reload();
  };

  const uniqueIds = [];
  const data = LocalWatch.filter((element) => {
    const isDuplicate = uniqueIds.includes(element.id);
    if (!isDuplicate) {
      uniqueIds.push(element.id);
      return true;
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(data));
  }, [LocalWatch]);

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
            {!SearchIn && filtered.length !== 0 && "Watch List"}
            {!SearchIn && data.length === 0 && "Your watch list is empty"}
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
                {data.map((tv, index) => {
                  return (
                    <Fragment key={index}>
                      <Grid item xs={2} lg={3} key={tv.id}>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Card
                            sx={{
                              width: 270,
                              height: 510,
                              mb: 1,
                              display: "flex",
                              justiyContent: "space-between",
                              flexDirection: "column",
                            }}
                          >
                            <CardActionArea
                              onClick={() => {
                                nav(`/show/${tv.id}`);
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
                                sx={{
                                  height: 40,
                                  width: 230,
                                  justifyContent: "center",
                                }}
                                color="inherit"
                                variant="text"
                                onClick={() => RemoveShow(index)}
                                startIcon={<RemoveCircleOutlineIcon />}
                                size="small"
                              >
                                REMOVE FROM WATCHLIST
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
export default connect(mapStateToProps, mapActionsToProps)(WatchList);
