import { createSlice } from "@reduxjs/toolkit";

// INIT STATE
const initialState = {
  whistlist: [],
};

export const whislist = createSlice({
  name: "whistlist",
  initialState,
  reducers: {
    addItem(state, action) {
      const { data } = action.payload;
      state.whistlist.push(data);
    },
    removeItem(state, action) {
      const { id } = action.payload;

      return {
        whistlist: state.whistlist.filter((item) => item.id !== id),
      };
    },
  },
});

export const { addItem, removeItem } = whislist.actions;
export default whislist.reducer;
