import {
  AnyAction,
  combineReducers,
  configureStore,
  ThunkDispatch,
} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import thunk from 'redux-thunk';

import { notesReducer } from './notes-reducer';

const rootReducer = combineReducers({
  notes: notesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
});

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () =>
  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();

// types
export type RootState = ReturnType<typeof store.getState>;
