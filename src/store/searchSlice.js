import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchTerm: "",
    results: [],
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setResults: (state, action) => {
      state.results = action.payload;
    },
  },
});

export default searchSlice.reducer;
export const { setSearchTerm, setResults } = searchSlice.actions;
