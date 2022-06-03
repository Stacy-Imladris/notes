import { NoteType } from '../store/notes-reducer';

import { instance } from './api';

export const notesAPI = {
  getNotes() {
    return instance.get<NoteType[]>('notes').then(res => res.data);
  },
  // login(data: LoginParamsType) {
  //   return instance.post<any, AxiosResponse<ResponseType<{userId?: number}>>, LoginParamsType>(`auth/login`, data)
  // },
  // logout() {
  //   return instance.delete<any, AxiosResponse<ResponseType>>(`auth/login`)
  // },
};
