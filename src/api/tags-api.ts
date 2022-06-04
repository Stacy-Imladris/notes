import { AxiosResponse } from 'axios';

import { TagType } from '../store/tags-reducer';

import { instance } from './api';

export const tagsAPI = {
  getTags() {
    return instance.get<TagType[]>('tags').then(res => res.data);
  },
  createTag(tag: TagType) {
    return instance
      .post<any, AxiosResponse<TagType>, TagType>(`tags`, tag)
      .then(res => res.data);
  },
  deleteTag(id: string) {
    return instance.delete(`tags/${id}`).then(res => res.data);
  },
};
