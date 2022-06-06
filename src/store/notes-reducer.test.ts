import { v1 } from 'uuid';

import {
  createNote,
  deleteNote,
  getNotes,
  notesReducer,
  NoteType,
  updateNote,
} from './notes-reducer';

let noteId: string;
let title: string;
let content: string;
let notesStartState: NoteType[];

describe('notes reducer tests', () => {
  beforeEach(() => {
    noteId = v1();
    title = 'Third note';
    content = 'Test content';
    notesStartState = [
      {
        title: 'First note',
        content: 'Test content',
        id: '1',
        tags: [],
      },
      {
        title: 'Second note',
        content: '#Test content',
        id: '2',
        tags: [],
      },
    ];
  });

  test('notes should be set', () => {
    const endState = notesReducer(
      [],
      getNotes.fulfilled({ notes: notesStartState }, 'requestId', ''),
    );
    const length = 2;

    expect(endState.length).toBe(length);
    expect(endState[1].id).toBe('2');
  });

  test('correct note should be removed', () => {
    const endState = notesReducer(
      notesStartState,
      deleteNote.fulfilled({ id: '1' }, 'requestId', '1'),
    );
    const length = 1;

    expect(endState.length).toBe(length);
    expect(endState[0].title).toBe('Second note');
    expect(endState[0].content).not.toBe('Test content');
  });

  test('correct note should be added', () => {
    const action = createNote.fulfilled(
      {
        note: {
          title,
          content,
          id: noteId,
          tags: [],
        },
      },
      'requestId',
      { title, content },
    );
    const endState = notesReducer(notesStartState, action);
    const length = 3;

    expect(endState.length).toBe(length);
    expect(endState[2].id).toBeDefined();
    expect(endState[2].title).toBe(title);
    expect(endState[2].content).toBe(content);
  });

  test('correct note should be updated', () => {
    const noteModel = {
      title,
      content,
      id: '1',
      tags: [],
    };
    const action = updateNote.fulfilled(noteModel, 'requestId', {
      id: '1',
      noteModel,
    });
    const endState = notesReducer(notesStartState, action);
    const length = 2;

    expect(endState.length).toBe(length);
    expect(endState[0].title).toBe(title);
    expect(endState[0].content).toBe(content);
  });
});
