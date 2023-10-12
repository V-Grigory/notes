import type { INoteData } from "@/entities";

export interface IDataProvider {
  getAllNotes(): Promise<INoteData[] | []>;
  createNote(data: INoteData): Promise<void>;
}
