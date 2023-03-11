import { combineReducers, configureStore } from '@reduxjs/toolkit';
import constructorSlice from './slices/constructorSlice';
import runTimeSlice from './slices/runTimeSlice';
import calculatorSlice from './slices/calculatorSlice';
const rootReducer = combineReducers({
  constructorSlice,
  runTimeSlice,
  calculatorSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
