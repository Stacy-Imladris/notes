import { AxiosResponse } from 'axios';

import { NoteType } from '../store/notes-reducer';

import { instance } from './api';

export const notesAPI = {
  getNotes() {
    return instance.get<NoteType[]>('notes').then(res => res.data);
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
