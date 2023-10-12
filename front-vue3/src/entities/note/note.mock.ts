import { INoteData } from "@/entities";
// import { Note } from './note'
import noteJsonData from "@/dataProvider/mocks/noteData.json";

const noteTsData = JSON.parse(JSON.stringify(noteJsonData));

export const mockNotesData = (): INoteData[] => {
  const notes: INoteData[] = [];

  noteTsData.forEach((note: INoteData) => notes.push(note));

  return notes;
};

// export const mockNotes = (data: INoteData[] = mockNotesData()): INote[] => {
//   return data.map(item => new Note(item))
// }
