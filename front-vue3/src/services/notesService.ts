import type { INotesService } from "./notesService.types";
import type { IGroupData, INoteData, INotesData } from "@/entities";
import { Group, Note } from "@/entities";

import type { INotesApi } from "@/api/notes/types";

export class  NotesService implements INotesService {
  private notes: INotesData[] | [] = [];

  constructor(private readonly api: INotesApi) {}

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

    if (group.groupId) {
      const groupForChange: IGroupData | undefined = this.findGroupById(
        group.groupId
      );

      if (!groupForChange) {
        return Promise.reject("Group for change don't exist!");
      }

      groupForChange.groupTitle = group.groupTitle;
      groupForChange.groupOrder = group.groupOrder;
    } else {
      // @ts-ignore
      this.notes.push(group);
    }

    return this.api.saveNotes(JSON.stringify(this.notes));
  }

  private findGroupById(groupId: number) {
    return this.notes.find((groupNotes: INotesData) => {
      return groupNotes.groupId === groupId;
    });
  }

  saveNote(data: { noteData: INoteData; groupId: number }): Promise<void> {
    const { noteData, groupId } = data;

    const note: Note = new Note(noteData);

    if (!note.validate()) {
      return Promise.reject("Note is not valid");
    }

    const group: INotesData | undefined = this.findGroupById(groupId);

    if (!group) {
      return Promise.reject("Group for note changing don't exist!");
    }

    if (noteData.id) {
      const noteForChange: INoteData | undefined = group.notes.find(
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
      group.notes.push(noteData);
    }

    return this.api.saveNotes(JSON.stringify(this.notes));
  }

  getInitGroup(): IGroupData {
    return { groupId: 0, groupTitle: "", groupOrder: null };
  }
}
