import type { INote, INoteData } from "@/entities/index";

export class Note implements INote {
  id: number;
  readonly title: string;
  readonly value: string;
  readonly description?: string;
  readonly order: number;

  constructor(data: INoteData) {
    this.id = data.id;
    this.title = data.title;
    this.value = data.value;
    this.description = data.description || undefined;
    this.order = data.order;
  }

  validate(): boolean {
    return !!(this.title && this.value);
  }
}
