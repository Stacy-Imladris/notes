import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v1 } from 'uuid';

import { tagsAPI } from '../api/tags-api';

export const getTags = createAsyncThunk(
  'tags/getTags',
  async (_, { rejectWithValue }) => {
    // dispatch(setAppStatus({ status: 'loading' }));
    try {
      const data = await tagsAPI.getTags();
      // dispatch(setAppStatus({ status: 'succeeded' }));
      return { tags: data };
    } catch (error) {
      return rejectWithValue(null);
    }
  },
);

export const deleteTag = createAsyncThunk(
  'tags/deleteTag',
  async (id: string, { rejectWithValue }) => {
    // dispatch(setAppStatus({ status: 'loading' }));
    // dispatch(changeTodolistEntityStatus({ Tid, status: 'loading' }));
    try {
      await tagsAPI.deleteTag(id);
      // dispatch(setAppStatus({ status: 'succeeded' }));
      return { id };
    } catch (error) {
      return rejectWithValue(null);
    }
  },
);

export const createTag = createAsyncThunk(
  'tags/createTag',
  async (name: string, { rejectWithValue }) => {
    const tag: TagType = { id: v1(), name };
    // dispatch(setAppStatus({ status: 'loading' }));
    try {
      const data = await tagsAPI.createTag(tag);
      // dispatch(setAppStatus({ status: 'succeeded' }));
      return { tag: data };
    } catch (e) {
      return rejectWithValue(null);
    }
  },
);

const tagsInitialState: TagType[] = [];

export const slice = createSlice({
  name: 'tags',
  initialState: tagsInitialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getTags.fulfilled, (state, action) => action.payload.tags)
      .addCase(createTag.fulfilled, (state, action) => {
        state.push(action.payload.tag);
      })
      .addCase(deleteTag.fulfilled, (state, action) => {
        const index = state.findIndex(f => f.id === action.payload.id);
        if (index > -1) state.splice(index, 1);
      }),
});

export const tagsReducer = slice.reducer;

// types
export type TagType = {
  id: string;
  name: string;
};
