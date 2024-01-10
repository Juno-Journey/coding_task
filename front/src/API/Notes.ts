import axios from "axios";
import { NoteType } from "./Types/Note";


const BASE_URL = "http://localhost:8000/notes";

export interface NotesClient {
  search(searchOptions?: { search?: string; limit?: number; skip?: number }): Promise<NoteType[]>;
  upsertNote(id: string, note: Partial<NoteType>): Promise<NoteType>;
  get(id: string): Promise<NoteType | undefined>;
}

const Notes: NotesClient = {
  search: async (searchOptions = {}) => {
    const { data } = await axios.get<NoteType[]>(BASE_URL + "/.search", {
      params: { ...searchOptions, sort: { isPinned: 1 } },
    });
    return data;
  },
  upsertNote: async (id, note) => {
    const { data } = await axios.put<NoteType>(BASE_URL + "/" + id, note);
    return data;
  },
  get: async (id) => {
    const { data } = await axios.get<NoteType>(BASE_URL + "/" + id);
    return data;
  },
};

export default Notes;
