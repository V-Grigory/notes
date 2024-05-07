import type { INoteData } from "@/entities";

export interface IApi {
  getAllNotes(): Promise<INoteData[] | []>;
  createNote(data: INoteData): Promise<void>;
}
