export interface IGroupData {
  readonly id?: number;
  readonly title: string;
  // readonly notes: INoteData[]
  readonly order?: number;
}

export interface IGroup extends IGroupData {
  validate(): boolean;
}

export const GROUP_NAME_MIN_LENGTH = 2;
