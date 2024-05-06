import type { INote, INoteData } from "@/entities";

export class Note implements INote {
  readonly id?: number;
  readonly groupId: number;
  readonly title: string;
  readonly value: string;
  readonly order?: number;
  readonly description?: string;

  constructor(data: INoteData) {
    if (data.id) {
      this.id = data.id;
    }
    this.groupId = data.groupId;
    this.title = data.title;
    this.value = data.value;
    this.order = data.order || undefined;
    this.description = data.description || undefined;
  }

  validate(): boolean {
    return !!(this.groupId && this.title && this.value);
  }
}
