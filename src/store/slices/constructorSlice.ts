import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IconstructorState {
  items: { id: string; draggable: boolean }[];
}

const initialState: IconstructorState = {
  items: [
    { id: 'display', draggable: true },
    { id: 'operators', draggable: true },
    { id: 'numbers', draggable: true },
    { id: 'equal', draggable: true },
  ],
};

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    setDragState: (state, action: PayloadAction<{ id: string; draggable: boolean }>) => {
      const item = state.items.find((obj) => obj.id === action.payload.id);
      if (item) {
        item.draggable = action.payload.draggable;
      }
    },
  },
});

export const { setDragState } = constructorSlice.actions;

export default constructorSlice.reducer;
