import type { IApi } from "@/api/note/types";
import type { INoteData } from "@/entities";

import noteJsonData from "./noteData.json";
// import Utils from '../utils/utils';

const notes = JSON.parse(JSON.stringify(noteJsonData));

export class Api implements IApi {
  getAllNotes(): Promise<INoteData[] | []> {
    return new Promise<INoteData[]>((resolve, reject) => {
      // const dataStatus = new Utils().getRandomValueFrom([
      //   'dataIsExist',
      //   'dataIsNotExist',
      //   'errorWhenDataFetch'
      // ]);

      // if (dataStatus === 'dataIsExist') {
      return resolve(notes);
      // }
      // if (dataStatus === 'dataIsNotExist') {
      //   return resolve([]);
      // }
      // if (dataStatus === 'errorWhenDataFetch') {
      //   return reject('Error message');
      // }
    });
  }

  createNote(newNoteData: INoteData): Promise<void> {
    return new Promise((resolve) => {
      notes.push(newNoteData);
      return resolve();
    });
  }
}
