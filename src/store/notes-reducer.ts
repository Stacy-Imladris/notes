import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v1 } from 'uuid';

import { notesAPI } from '../api/notes-api';
import { checkTags } from '../utils/checkTags';

import { RootState } from './store';
import { createTag } from './tags-reducer';

export const getNotes = createAsyncThunk(
  'notes/getNotes',
  async (_, { rejectWithValue }) => {
    try {
      const data = await notesAPI.getNotes();
      return { notes: data };
    } catch (error) {
      return rejectWithValue(null);
    }
  },
);

export const deleteNote = createAsyncThunk(
  'notes/deleteNote',
  async (id: string, { rejectWithValue }) => {
    try {
      await notesAPI.deleteNote(id);
      return { id };
    } catch (error) {
      return rejectWithValue(null);
    }
  },
);

export const createNote = createAsyncThunk(
  'notes/createNote',
  async (
    payload: { title: string; content: string },
    { dispatch, getState, rejectWithValue },
  ) => {
    const note: NoteType = { ...payload, id: v1() };
    try {
      const data = await notesAPI.createNote(note);
      const { tags } = getState() as RootState;
      const tagNames = checkTags(payload.content, tags);
      tagNames.forEach(name => dispatch(createTag(name)));
      return { note: data };
    } catch (e) {
      return rejectWithValue(null);
    }
  },
);

export const updateNote = createAsyncThunk(
  'notes/updateNote',
  async (
    payload: { id: string; noteModel: Partial<NoteType> },
    { dispatch, getState, rejectWithValue },
  ) => {
    const note = (getState() as RootState).notes.find(t => t.id === payload.id);
    if (!note) {
      return rejectWithValue('task not found in the state');
    }
    const noteModel: NoteType = {
      id: note.id,
      title: note.title,
      content: note.content,
      ...payload.noteModel,
    };
    try {
      const data = await notesAPI.updateNote(noteModel);
      const { tags } = getState() as RootState;
      const tagNames = checkTags(noteModel.content, tags);
      tagNames.forEach(name => dispatch(createTag(name)));
      return data;
    } catch (error) {
      return rejectWithValue(null);
    }
  },
);

const notesInitialState: NoteType[] = [];

export const slice = createSlice({
  name: 'notes',
  initialState: notesInitialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(deleteNote.fulfilled, (state, action) => {
        const index = state.findIndex(f => f.id === action.payload.id);
        if (index > -1) state.splice(index, 1);
      })
      .addCase(getNotes.fulfilled, (state, action) => action.payload.notes)
      .addCase(createNote.fulfilled, (state, action) => {
        state.push(action.payload.note);
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        const index = state.findIndex(f => f.id === action.payload.id);
        if (index > -1) state[index] = action.payload;
      }),
});

export const notesReducer = slice.reducer;

// types
export type NoteType = {
  id: string;
  title: string;
  content: string;
};
