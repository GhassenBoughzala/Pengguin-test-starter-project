import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dark: true,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setThemeMode: (state) => {
      state.dark = !state.dark
    },
  },
});

export const { setDarkMode, setThemeMode } = themeSlice.actions;

export default themeSlice.reducer;
