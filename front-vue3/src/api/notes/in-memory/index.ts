import type { INotesApi } from "@/api/notes/types";

import jsonData from "./data.json";

let data = JSON.stringify(jsonData);

export class NotesApi implements INotesApi {
  getNotes(): Promise<string> {
    return new Promise<string>((resolve) => {
      return resolve(data);
    });
  }

  saveNotes(notes: string): Promise<void> {
    return new Promise((resolve) => {
      data = notes;
      return resolve();
    });
  }
}
