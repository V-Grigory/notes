export interface INotesApi {
  getNotes(): Promise<string>;
  saveNotes(data: string): Promise<void>;
}
