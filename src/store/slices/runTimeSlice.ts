import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IconstructorState {
  items: { runtime: boolean };
}

const initialState: IconstructorState = {
  items: { runtime: false },
};

export const runTimeSlice = createSlice({
  name: 'runTime',
  initialState,
  reducers: {
    setRunTime: (state, action: PayloadAction<boolean>) => {
      state.items.runtime = action.payload;
    },
  },
});

export const { setRunTime } = runTimeSlice.actions;

export default runTimeSlice.reducer;
