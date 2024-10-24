import type { INotesData, IGroupData, INoteData } from "@/entities";

export interface INotesService {
  getNotes(): Promise<INotesData[] | []>;
  saveGroup(data: IGroupData): Promise<void>;
  saveNote(data: { noteData: INoteData; groupId: number }): Promise<void>;
  getInitGroup(): IGroupData;
  getInitNote(): INoteData;
}
