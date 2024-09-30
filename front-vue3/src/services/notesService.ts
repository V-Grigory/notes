import type { INotesService } from "./notesService.types";
import type { IGroupData, INoteData, INotesData } from "@/entities";
import { Group, Note } from "@/entities";

import type { INotesApi } from "@/api/notes/types";

export class NotesService implements INotesService {
  private notes: INotesData[] | [] = [];

  constructor(private readonly api: INotesApi) {}

  private findGroupDataById(groupId: number): IGroupData | undefined {
    return this.notes.find((group: IGroupData) => {
      return group.groupId === groupId;
    });
  }

  private findNotesItemDataById(groupId: number): INotesData | undefined {
    return this.notes.find((notesItemData: INotesData) => {
      return notesItemData.groupId === groupId;
    });
  }

  private getNewGroupId = (): number => {
    return Date.now();
  };

  async getNotes(): Promise<INotesData[] | []> {
    const notes = await this.api.getNotes();
    this.notes = JSON.parse(notes);
    return this.notes;
  }

  saveGroup(groupData: IGroupData): Promise<void> {
    const group: Group = new Group(groupData);

    if (!group.validate()) {
      return Promise.reject("Group is not valid");
    }

    const isAddingGroup: boolean = group.groupId === 0;
    const isSavingExistingGroup: boolean = group.groupId !== 0;

    if (isAddingGroup) {
      group.groupId = this.getNewGroupId();
      // @ts-ignore
      this.notes.push(group);
    }

    if (isSavingExistingGroup) {
      const groupForChange: IGroupData | undefined = this.findGroupDataById(
        group.groupId as number
      );

      if (!groupForChange) {
        return Promise.reject("Group for change don't exist!");
      }

      groupForChange.groupTitle = group.groupTitle;
      groupForChange.groupOrder = group.groupOrder;
    }

    return this.api.saveNotes(JSON.stringify(this.notes));
  }

  saveNote(data: { noteData: INoteData; groupId: number }): Promise<void> {
    const { noteData, groupId } = data;

    const note: Note = new Note(noteData);

    if (!note.validate()) {
      return Promise.reject("Note is not valid");
    }

    const notesItemData: INotesData | undefined =
      this.findNotesItemDataById(groupId);

    if (!notesItemData) {
      return Promise.reject("Group for note changing don't exist!");
    }

    if (noteData.id) {
      const noteForChange: INoteData | undefined = notesItemData.notes.find(
        (note: INoteData) => note.id === noteData.id
      );

      if (!noteForChange) {
        return Promise.reject("Note for change don't exist!");
      }

      noteForChange.title = noteData.title;
      noteForChange.value = noteData.value;
      noteForChange.description = noteData.description;
      noteForChange.order = noteData.order;
    } else {
      // @ts-ignore
      notesItemData.notes.push(noteData);
    }

    return this.api.saveNotes(JSON.stringify(this.notes));
  }

  getInitGroup(): IGroupData {
    return { groupId: 0, groupTitle: "", groupOrder: 0 };
  }
}
