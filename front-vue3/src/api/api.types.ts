import type { INoteData } from "@/entities";
import type { IGroupData } from "@/entities";

export interface IApi {
  getAllNotes(): Promise<INoteData[] | []>;
  createNote(data: INoteData): Promise<void>;

  getAllGroups(): Promise<IGroupData[] | []>;
  createGroup(data: IGroupData): Promise<void>;
}
