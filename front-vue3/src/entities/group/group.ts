import { IGroup, IGroupData, GROUP_NAME_MIN_LENGTH } from "./group.types";

export class Group implements IGroup {
  readonly id?: number;
  readonly title: string;
  readonly order?: number;

  constructor(data: IGroupData) {
    if (data.id) {
      this.id = data.id;
    }
    this.title = data.title;
    this.order = data.order || undefined;
  }

  validate(): boolean {
    if (!this.title) {
      return false;
    }

    return this.title.length >= GROUP_NAME_MIN_LENGTH;
  }
}
