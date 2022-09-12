import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import CenterContainer from "components/containers/CenterContainer";
import { HOME } from "constants/routes";
//const Header = lazy(() => import("components/Header"));
const Home = lazy(() => import("pages/Home"));
const Details = lazy(() => import("pages/Details"));
const Watch = lazy(() => import("pages/WatchList"));

const RouterConfig = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path={HOME} element={<Home />} />
        <Route exact path="/show/:showId" element={<Details />} />
        <Route exact path="/watchlist" element={<Watch />} />
      </Routes>
    </Suspense>
  );
};

const Loader = () => (
  <CenterContainer>
    <CircularProgress />
  </CenterContainer>
);

export default RouterConfig;
