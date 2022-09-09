import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
  MaterialUISwitch,
} from "./Header.styles";
import { Grid } from "@mui/material";
import { setThemeMode } from "redux/theme.slice";
import { useDispatch, useSelector } from "react-redux";

const Header = ({ ...props }) => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme);

  return (
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
                  props.setSearch(event.target.value);
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
  );
};

export default Header;
