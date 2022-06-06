import { AxiosResponse } from 'axios';

import { NoteType } from '../store/notes-reducer';

import { instance } from './api';

export const notesAPI = {
  getNotes(q: string) {
    // const getSpecificNote = param ? `?q=${param}` : '';
    return instance
      .get<NoteType[]>(`notes`, q ? { params: { q } } : {})
      .then(res => res.data);
  },
  createNote(note: NoteType) {
    return instance
      .post<any, AxiosResponse<NoteType>, NoteType>(`notes`, note)
      .then(res => res.data);
  },
  deleteNote(id: string) {
    return instance.delete(`notes/${id}`).then(res => res.data);
  },
  updateNote(noteModel: NoteType) {
    return instance
      .put<NoteType>(`notes/${noteModel.id}`, noteModel)
      .then(res => res.data);
  },
};
