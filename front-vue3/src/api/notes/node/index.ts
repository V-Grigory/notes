import type { INotesApi } from "@/api/notes/types";

export class NotesApi implements INotesApi {
  async getNotes(): Promise<string> {
    // TODO: make type
    const options = {
      headers: {
        Authorization: "Bearer sometoken",
        "Content-Type": "text/plain",
      },
    };

    const fetchedNotes = await fetch("/api/", options);
    return fetchedNotes.text();
  }

  async saveNotes(notes: string): Promise<void> {
    const options = {
      method: "POST",
      headers: {
        Authorization: "Bearer sometoken",
        "Content-Type": "text/plain",
      },
      body: notes,
    };

    await fetch("/api/", options);
  }
}
