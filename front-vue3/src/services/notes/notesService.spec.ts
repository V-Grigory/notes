import { describe, it, expect } from "vitest";

import { NotesApi } from "@/api/note/in-memory/noteData";
import { NotesService } from "@/services";
import type { INoteData } from "@/entities";

const apiNotes = new NotesApi();
const notesData: INoteData[] = await apiNotes.getAllNotes();

describe(">>> Notes Service", () => {
  const service = new NotesService(new NotesApi());

  describe(">> getAllNotes", () => {
    it("should return all notes", async () => {
      expect.assertions(1);
      try {
        const notes = await service.getAllNotes();

        expect([notesData, []]).toContainEqual(notes);
      } catch (e) {
        expect(e).toMatch("Error message");
      }
    });
  });

  describe(">> createNote", () => {
    it("should return error if doesn't pass validate (groupId: 0)", async () => {
      expect.assertions(1);
      try {
        await service.createNote({ ...notesData[0], groupId: 0 });
      } catch (e) {
        expect(e).toMatch("NoteEntity is not valid");
      }
    });

    it("should return error if doesn't pass validate (title: '')", async () => {
      expect.assertions(1);
      try {
        await service.createNote({ ...notesData[0], title: "" });
      } catch (e) {
        expect(e).toMatch("NoteEntity is not valid");
      }
    });

    it("should return error if doesn't pass validate (value: '')", async () => {
      expect.assertions(1);
      try {
        await service.createNote({ ...notesData[0], value: "" });
      } catch (e) {
        expect(e).toMatch("NoteEntity is not valid");
      }
    });

    it("should add new note", async () => {
      expect.assertions(1);
      const notesLengthBeforeAdd = (await service.getAllNotes()).length;

      await service.createNote({ ...notesData[0], title: "new title" });

      const notesLengthAfterAdd = (await service.getAllNotes()).length;

      expect(notesLengthBeforeAdd + 1).toBe(notesLengthAfterAdd);
    });
  });
});
