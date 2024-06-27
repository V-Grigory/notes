import type { INote, INoteData } from "@/entities/index";

export class Note implements INote {
  readonly id?: number;
  readonly title: string;
  readonly value: string;
  readonly description?: string;
  readonly order?: number;

  constructor(data: INoteData) {
    if (data.id) {
      this.id = data.id;
    }
    this.title = data.title;
    this.value = data.value;
    this.description = data.description || undefined;
    this.order = data.order || undefined;
  }

  validate(): boolean {
    return !!(this.title && this.value);
  }
}
