import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { notesAPI } from '../api/notes-api';

export const getNotes = createAsyncThunk(
  'notes/getNotes',
  async (_, { rejectWithValue }) => {
    // dispatch(setAppStatus({ status: 'loading' }));
    try {
      const data = await notesAPI.getNotes();
      // dispatch(setAppStatus({ status: 'succeeded' }));
      return { notes: data };
    } catch (error) {
      // handleServerNetworkError(dispatch, error as Error);
      return rejectWithValue(null);
    }
  },
);

/* export const deleteTodolist = createAsyncThunk(
  'todolists/deleteTodolist',
  async (Tid: string, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatus({ status: 'loading' }));
    dispatch(changeTodolistEntityStatus({ Tid, status: 'loading' }));
    try {
      const res = await todolistsAPI.deleteTodolist(Tid);
      if (res.data.resultCode === 0) {
        dispatch(setAppStatus({ status: 'succeeded' }));
        return { Tid };
      }
      handleServerAppError(dispatch, res.data);
      dispatch(changeTodolistEntityStatus({ Tid, status: 'failed' }));
      return rejectWithValue(null);
    } catch (error) {
      handleServerNetworkError(dispatch, error as Error);
      dispatch(changeTodolistEntityStatus({ Tid, status: 'failed' }));
      return rejectWithValue(null);
    }
  },
); */

/* export const createTodolist = createAsyncThunk(
  'todolists/createTodolist',
  async (title: string, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatus({ status: 'loading' }));
    try {
      const res = await todolistsAPI.createTodolist(title);
      if (res.data.resultCode === 0) {
        dispatch(setAppStatus({ status: 'succeeded' }));
        return { todolist: res.data.data.item };
      }
      handleServerAppError(dispatch, res.data);
      return rejectWithValue(null);
    } catch (error) {
      handleServerNetworkError(dispatch, error as Error);
      return rejectWithValue(null);
    }
  },
); */

/* export const updateTodolistTitle = createAsyncThunk(
  'todolists/updateTodolistTitle',
  async (
    payload: { Tid: string; title: string },
    { dispatch, rejectWithValue },
  ) => {
    dispatch(setAppStatus({ status: 'loading' }));
    dispatch(
      changeTodolistEntityStatus({ Tid: payload.Tid, status: 'loading' }),
    );
    try {
      const res = await todolistsAPI.updateTodolistTitle(
        payload.Tid,
        payload.title,
      );
      if (res.data.resultCode === 0) {
        dispatch(setAppStatus({ status: 'succeeded' }));
        dispatch(
          changeTodolistEntityStatus({ Tid: payload.Tid, status: 'succeeded' }),
        );
        return payload;
      }
      handleServerAppError(dispatch, res.data);
      dispatch(
        changeTodolistEntityStatus({ Tid: payload.Tid, status: 'failed' }),
      );
      return rejectWithValue(null);
    } catch (error) {
      handleServerNetworkError(dispatch, error as Error);
      dispatch(
        changeTodolistEntityStatus({ Tid: payload.Tid, status: 'failed' }),
      );
      return rejectWithValue(null);
    }
  },
); */

const notesInitialState: NoteType[] = [];

export const slice = createSlice({
  name: 'notes',
  initialState: notesInitialState,
  reducers: {
    clearData() {
      return [];
    },
  },
  extraReducers: builder =>
    builder
      // .addCase(deleteTodolist.fulfilled, (state, action) => {
      //   const index = state.findIndex(f => f.id === action.payload.Tid)
      //   if (index > -1) {
      //     state.splice(index, 1)
      //   }
      // })
      .addCase(getNotes.fulfilled, (state, action) => action.payload.notes),
  // .addCase(createTodolist.fulfilled, (state, action) => {
  //   state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
  // })
  // .addCase(updateTodolistTitle.fulfilled, (state, action) => {
  //   const index = state.findIndex(f => f.id === action.payload.Tid)
  //   if (index > -1) {
  //     state[index].title = action.payload.title
  //   }
  // })
});

export const notesReducer = slice.reducer;
export const { clearData } = slice.actions;

// types
export type NoteType = {
  id: number;
  order: number;
  title: string;
  content: string;
};
