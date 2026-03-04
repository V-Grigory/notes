export interface IGroupData {
  readonly groupId: number;
  groupTitle: string;
  groupOrder: number;
}

export interface INotesData {
  readonly groupId: number;
  readonly groupTitle: string;
  readonly groupOrder: number;
  readonly notes: INoteData[] | [];
}

export interface INoteData {
  readonly id: number;
  title: string;
  value: string;
  description: string;
  order: number;
}

export interface IGroup extends IGroupData {
  validate(): boolean;
}

export interface INote extends INoteData {
  validate(): boolean;
}

export const GROUP_NAME_MIN_LENGTH = 3;

export interface INotesService {
  getNotes(): Promise<INotesData[] | []>;
  saveGroup(data: IGroupData): Promise<void>;
  saveNote(data: { noteData: INoteData; groupId: number }): Promise<void>;
  getInitGroup(): IGroupData;
  getInitNote(): INoteData;
}

export interface IServiceProvider {
  notes: INotesService;
}

export interface INotesApi {
  getNotes(): Promise<string>;
  saveNotes(data: string): Promise<void>;
}
