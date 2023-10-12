export interface INoteData {
  readonly id?: number;
  readonly groupId: number;
  readonly title: string;
  readonly value: string;
  readonly order?: number;
  readonly description?: string;
}

export interface INote extends INoteData {
  validate(): boolean;
}
