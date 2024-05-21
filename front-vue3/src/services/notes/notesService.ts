import type { INotesService } from "@/services";
import type { INoteData } from "@/entities";
import { Note } from "@/entities";
import type { INotesApi } from "@/api/note/types";

export class NotesService implements INotesService {
  constructor(private readonly api: INotesApi) {}

  getAllNotes(): Promise<INoteData[] | []> {
    return this.api.getAllNotes();
  }

  createNote(newNoteData: INoteData): Promise<void> {
    const note = new Note(newNoteData);

    if (note.validate()) {
      return this.api.createNote(newNoteData);
    }

    return Promise.reject("NoteEntity is not valid");
  }
}
