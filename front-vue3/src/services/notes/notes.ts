import { INotesService } from "./notes.types";
import { Note, INoteData } from "../../entities";
import { IDataProvider } from "@/dataProvider/dataProvider.types";

export class NotesService implements INotesService {
  constructor(private readonly dataProvider: IDataProvider) {}

  getAllNotes(): Promise<INoteData[] | []> {
    return this.dataProvider.getAllNotes();
  }

  createNote(newNoteData: INoteData): Promise<void> {
    const note = new Note(newNoteData);

    if (note.validate()) {
      return this.dataProvider.createNote(newNoteData);
    }

    return Promise.reject("Note is not valid");
  }
}
