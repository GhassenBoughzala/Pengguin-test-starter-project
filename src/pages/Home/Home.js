/* eslint-disable no-unused-expressions */
/* eslint-disable no-labels */
/* eslint-disable no-unused-labels */
import {
  Button,
  CardActions,
  Box,
  Container,
  CardContent,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import AddIcon from "@mui/icons-material/Add";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { AllPopular } from "redux/tv-shows/tvActions";

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
          Tv Shows
        </Typography>
        <Grid
          container
          xs={4}
          md={8}
          lg={12}
          spacing={4}
          justifyContent="center"
          alignItems="center"
        >
          {props.ListPo.map((tv, index) => {
            return (
              <Fragment key={index}>
                <Grid xs={2} lg={3} spacing={4}>
                  <Card sx={{ width: 250, height: 550 }}>
                    <CardMedia
                      component="img"
                      height="350"
                      image={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                      alt=""
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {tv.name}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" startIcon={<AddIcon />}>
                        Add to watchlist
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              </Fragment>
            );
          })}
        </Grid>
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  ListPo: state.tvshows.popular,
});
const mapActionsToProps = {
  AllPo: AllPopular,
};
export default connect(mapStateToProps, mapActionsToProps)(Home);
