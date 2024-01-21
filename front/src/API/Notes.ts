import axios from 'axios';
import { Note } from './Types/Note';

const BASE_URL = 'http://localhost:8000/notes';

export interface NotesClient {
  search(searchOptions?: { search?: string; limit?: number; skip?: number }): Promise<Note[]>;
  upsertNote(id: string, note: Partial<Note>): Promise<Note>;
  get(id: string): Promise<Note | undefined>;
}

const Notes: NotesClient = {
  search: async (searchOptions = {}) => {
    const { data } = await axios.get<Note[]>(BASE_URL + '/.search', {
      params: { ...searchOptions, sort: { isPinned: -1 } },
    });
    return data;
  },
  upsertNote: async (id, note) => {
    const { data } = await axios.put<Note>(BASE_URL + '/' + id, note);
    return data;
  },
  get: async (id) => {
    const { data } = await axios.get<Note>(BASE_URL + '/' + id);
    return data;
  },
};

export default Notes;
