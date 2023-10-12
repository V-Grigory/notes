import { INote, INoteData } from "../../entities";

export interface INotesService {
  getAllNotes(): Promise<INoteData[] | []>;
  createNote(data: INoteData): Promise<void>;
}
