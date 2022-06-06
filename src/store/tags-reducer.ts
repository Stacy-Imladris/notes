import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { tagsAPI } from '../api/tags-api';

export const getTags = createAsyncThunk(
  'tags/getTags',
  async (_, { rejectWithValue }) => {
    try {
      const data = await tagsAPI.getTags();
      return { tags: data };
    } catch (error) {
      return rejectWithValue(null);
    }
  },
);

export const deleteTag = createAsyncThunk(
  'tags/deleteTag',
  async (id: string, { rejectWithValue }) => {
    try {
      await tagsAPI.deleteTag(id);
      return { id };
    } catch (error) {
      return rejectWithValue(null);
    }
  },
);

export const createTag = createAsyncThunk(
  'tags/createTag',
  async (tag: TagType, { rejectWithValue }) => {
    try {
      const data = await tagsAPI.createTag(tag);
      return { tag: data };
    } catch (e) {
      return rejectWithValue(null);
    }
  },
);

export const setFilter = createAction<TagType>('tags/setFilter');
export const removeFilter = createAction<{ id: string }>('tags/removeFilter');
export const clearFilter = createAction('tags/clearFilter');

const tagsInitialState = {
  tags: [] as TagType[],
  filter: null as Nullable<TagType>,
};

export const slice = createSlice({
  name: 'tags',
  initialState: tagsInitialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getTags.fulfilled, (state, action) => {
        state.tags = action.payload.tags;
      })
      .addCase(createTag.fulfilled, (state, action) => {
        state.tags.push(action.payload.tag);
      })
      .addCase(deleteTag.fulfilled, (state, action) => {
        const index = state.tags.findIndex(f => f.id === action.payload.id);
        if (index > -1) state.tags.splice(index, 1);
      })
      .addCase(setFilter, (state, action) => {
        state.filter = action.payload;
      })
      .addCase(removeFilter, (state, action) => {
        state.filter = null;
      })
      .addCase(clearFilter, state => {
        state.filter = null;
      }),
});

export const tagsReducer = slice.reducer;

// types
export type TagType = {
  id: string;
  name: string;
};
export type Nullable<T> = null | T;
export type TagsInitialStateType = typeof tagsInitialState;
