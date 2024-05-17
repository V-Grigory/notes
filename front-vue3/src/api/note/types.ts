import type { INoteData } from "@/entities";

export interface INotesApi {
  getAllNotes(): Promise<INoteData[] | []>;
  createNote(data: INoteData): Promise<void>;
}
