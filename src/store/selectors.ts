import { RootState } from './store';

export const selectNotes = (state: RootState) => state.notes;
export const selectTags = (state: RootState) => state.tags.tags;
export const selectFilter = (state: RootState) => state.tags.filter;
