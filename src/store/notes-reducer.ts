import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v1 } from 'uuid';

import { notesAPI } from '../api/notes-api';
import { createNewTags } from '../utils/createNewTags';
import { createTagsList } from '../utils/createTagsList';
import { deleteOldTags } from '../utils/deleteOldTags';

import { RootState } from './store';
import { TagType } from './tags-reducer';

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
  async (id: string, { dispatch, getState, rejectWithValue }) => {
    try {
      const { notes } = getState() as RootState;
      const note = (getState() as RootState).notes.find(t => t.id === id);
      await notesAPI.deleteNote(id);
      if (note) deleteOldTags(note.tags, [], notes, dispatch);
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
    try {
      const { tags } = getState() as RootState;
      const uniqueTags = createTagsList(payload.content);
      const noteTags = createNewTags(uniqueTags, tags, dispatch);
      const note: NoteType = { ...payload, id: v1(), tags: noteTags };
      const data = await notesAPI.createNote(note);
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
    const { tags, notes } = getState() as RootState;
    const note = (getState() as RootState).notes.find(t => t.id === payload.id);
    if (!note) {
      return rejectWithValue('task not found in the state');
    }
    let noteTags: TagType[] = [];
    if (payload.noteModel.content) {
      const uniqueTags = createTagsList(payload.noteModel.content);
      noteTags = createNewTags(uniqueTags, tags, dispatch);
      deleteOldTags(note.tags, uniqueTags, notes, dispatch);
    }
    const noteModel: NoteType = {
      ...note,
      ...payload.noteModel,
      tags: noteTags,
    };
    try {
      const data = await notesAPI.updateNote(noteModel);
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
  tags: TagType[];
};
