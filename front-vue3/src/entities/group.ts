import type { IGroup, IGroupData } from "./types";
import { GROUP_NAME_MIN_LENGTH } from "./types";

export class Group implements IGroup {
  readonly groupId?: number;
  readonly groupTitle: string;
  readonly groupOrder?: number;

  constructor(data: IGroupData) {
    if (data.groupId) {
      this.groupId = data.groupId;
    }
    this.groupTitle = data.groupTitle;
    this.groupOrder = data.groupOrder || undefined;
  }

  validate(): boolean {
    if (!this.groupTitle) {
      return false;
    }

    return this.groupTitle.length >= GROUP_NAME_MIN_LENGTH;
  }
}
