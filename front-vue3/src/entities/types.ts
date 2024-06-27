export interface INotesData {
  readonly groupId?: number;
  readonly groupTitle: string;
  readonly groupOrder?: number;
  readonly notes: INoteData[] | [];
}

export interface INoteData {
  readonly id?: number;
  title: string;
  value: string;
  description?: string;
  order?: number;
}

export interface IGroupData {
  readonly groupId?: number;
  groupTitle: string;
  groupOrder?: number;
}

export interface INote extends INoteData {
  validate(): boolean;
}

export interface IGroup extends IGroupData {
  validate(): boolean;
}

export const GROUP_NAME_MIN_LENGTH = 3;
