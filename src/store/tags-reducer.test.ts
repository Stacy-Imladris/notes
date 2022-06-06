import { v1 } from 'uuid';

import {
  clearFilter,
  createTag,
  deleteTag,
  getTags, removeFilter,
  setFilter,
  TagsInitialStateType,
  tagsReducer
} from './tags-reducer';

let tagId: string;
let name: string;
let tagsInitialState: TagsInitialStateType;

describe('tags reducer tests', () => {
  beforeEach(() => {
    tagId = v1();
    name = '#third';
    tagsInitialState = {
      tags: [
        {
          name: '#first',
          id: '1',
        },
        {
          name: '#second',
          id: '2',
        },
      ],
      filter: null,
    };
  });

  test('tags should be set', () => {
    const endState = tagsReducer(
      { tags: [], filter: null },
      getTags.fulfilled({ tags: tagsInitialState.tags }, 'requestId'),
    );
    const length = 2;

    expect(endState.tags.length).toBe(length);
    expect(endState.tags[0].id).toBe('1');
  });

  test('correct tag should be removed', () => {
    const endState = tagsReducer(
      tagsInitialState,
      deleteTag.fulfilled({ id: '1' }, 'requestId', '1'),
    );
    const length = 1;

    expect(endState.tags.length).toBe(length);
    expect(endState.tags[0].name).toBe('#second');
    expect(endState.tags[0].id).toBe('2');
    expect(endState.tags[1]).not.toBeDefined();
  });

  test('correct tag should be added', () => {
    const action = createTag.fulfilled(
      {
        tag: {
          name,
          id: tagId,
        },
      },
      'requestId',
      { name, id: tagId },
    );
    const endState = tagsReducer(tagsInitialState, action);
    const length = 3;

    expect(endState.tags.length).toBe(length);
    expect(endState.tags[2].id).toBeDefined();
    expect(endState.tags[2].name).toBe(name);
  });

  test('correct filter should be set', () => {
    const endState = tagsReducer(
      tagsInitialState,
      setFilter({ name: '#first', id: '1' }),
    );
    const length = 1;

    expect(endState.filter).toBeDefined();
    expect(endState.filter?.name).toBe('#first');
    expect(endState.filter?.id).toBe('1');
  });

  test('correct filter should be removed', () => {
    const endState = tagsReducer(
      {
        tags: [
          {
            name: '#first',
            id: '1',
          },
        ],
        filter: {
          name: '#first',
          id: '1',
        },
      },
      removeFilter({ id: '1' }),
    );

    expect(endState.filter).toBeNull();
  });

  test('filter should become null', () => {
    const endState = tagsReducer(
      {
        tags: [
          {
            name: '#first',
            id: '1',
          },
        ],
        filter: {
          name: '#first',
          id: '1',
        },
      },
      clearFilter(),
    );

    expect(endState.filter).toBeNull();
  });
});
