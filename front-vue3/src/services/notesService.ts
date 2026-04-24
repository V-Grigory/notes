import type { INotesService } from "@/types";
import type { IGroupData, INoteData, INotesData } from "@/types";
import { Group, Note } from "@/entities";

import type { INotesApi } from "@/types";

export class NotesService implements INotesService {
  constructor(private readonly api: INotesApi) {}

  private getNewId = (): number => {
    return Date.now();
  };

  async getNotes(): Promise<INotesData[] | []> {
    const notes = await this.api.getNotes();
    return JSON.parse(notes);
  }

  saveGroup(notes: INotesData[], groupData: IGroupData): Promise<void> {
    const group: Group = new Group(groupData);

    if (!group.validate()) {
      return Promise.reject("Group is not valid");
    }

    const isAddingGroup: boolean = group.groupId === 0;
    const isSavingExistingGroup: boolean = group.groupId !== 0;

    if (isAddingGroup) {
      notes.push({
        ...group,
        groupId: this.getNewId(),
        notes: [],
      });
    }

    if (isSavingExistingGroup) {
      const groupForChange: IGroupData | undefined = notes.find(
        (g: IGroupData) => g.groupId === group.groupId
      );

      if (!groupForChange) {
        return Promise.reject("Group for change don't exist!");
      }

      groupForChange.groupTitle = group.groupTitle;
      groupForChange.groupOrder = group.groupOrder;
    }

    // TODO: разобраться с ретурнами. они не нужны.
    return this.api.saveNotes(JSON.stringify(notes));
  }

  saveNote(
    notes: INotesData[],
    data: { noteData: INoteData; groupId: number }
  ): Promise<void> {
    const { noteData, groupId } = data;

    const note: Note = new Note(noteData);

    if (!note.validate()) {
      // TODO: where make reject message ?
      return Promise.reject("Note is not valid");
    }

    const notesItemData: INotesData | undefined = notes.find(
      (notesItemData: INotesData) => notesItemData.groupId === groupId
    );

    if (!notesItemData) {
      return Promise.reject("Group for note changing don't exist!");
    }

    const isAddingNote: boolean = note.id === 0;
    const isSavingExistingNote: boolean = note.id !== 0;

    if (isAddingNote) {
      notesItemData.notes.push({
        ...note,
        // TODO: убрать ts-ignore
        // @ts-ignore
        id: this.getNewId(),
      });
      // notesItemData.notes.push({
      //   id: this.getNewId(),
      //   title: note.title,
      //   value: note.value,
      //   description: note.description,
      //   order: note.order,
      // });
    }

    if (isSavingExistingNote) {
      const noteForChange: INoteData | undefined = notesItemData.notes.find(
        (noteInData: INoteData) => noteInData.id === note.id
      );

      if (!noteForChange) {
        return Promise.reject("Note for change don't exist!");
      }

      noteForChange.title = note.title;
      noteForChange.value = note.value;
      noteForChange.description = note.description;
      noteForChange.order = note.order;
    }

    // TODO: разобраться с ретурнами. они не нужны.
    return this.api.saveNotes(JSON.stringify(notes));
  }

  getInitGroup(): IGroupData {
    return { groupId: 0, groupTitle: "", groupOrder: 0 };
  }

  getInitNote(): INoteData {
    return { id: 0, title: "", value: "", description: "", order: 0 };
  }
}
