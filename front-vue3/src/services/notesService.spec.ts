import { describe, it, expect } from "vitest";

import { NotesService } from "@/services";
import type { INotesData } from "@/entities";
import { NotesApi } from "@/api/notes/in-memory/data";

const notesApi = new NotesApi();
const groupsWithNotesAsString: string = await notesApi.getNotes();
const groupsWithNotes: INotesData[] = JSON.parse(groupsWithNotesAsString);

describe(">>> Notes Service", () => {
  const service = new NotesService(new NotesApi());

  describe(">> getNotes", () => {
    it("should return all notes (with groups)", async () => {
      expect.assertions(1);
      try {
        const notes: INotesData[] | [] = await service.getNotes();

        expect([groupsWithNotes, []]).toContainEqual(notes);
      } catch (e) {
        expect(e).toMatch("Error message");
      }
    });
  });

  describe(">> saveGroup", () => {
    it("should return error if doesn't pass validate (title is too short)", async () => {
      expect.assertions(1);
      try {
        await service.saveGroup({ ...groupsWithNotes[0], groupTitle: "Ab" });
      } catch (e) {
        expect(e).toMatch("Group is not valid");
      }
    });

    it("should ADD NEW group", async () => {
      expect.assertions(2);

      const groupsLengthBeforeAdd = (await service.getNotes()).length;

      await service.saveGroup({
        groupTitle: "new Title",
      });

      const groupsAfterAdd = await service.getNotes();

      expect(groupsLengthBeforeAdd + 1).toBe(groupsAfterAdd.length);
      expect(groupsAfterAdd[groupsAfterAdd.length - 1].groupTitle).toBe(
        "new Title"
      );
    });

    it("should UPDATE exist group", async () => {
      expect.assertions(3);

      const groupsLengthBeforeAdd = (await service.getNotes()).length;

      await service.saveGroup({
        groupId: 3,
        groupTitle: "other title",
        groupOrder: 33,
      });

      const groupsAfterAdd = await service.getNotes();

      expect(groupsLengthBeforeAdd).toBe(groupsAfterAdd.length);

      expect(groupsAfterAdd[2].groupTitle).toBe("other title");
      expect(groupsAfterAdd[2].groupOrder).toBe(33);
    });
  });

  describe(">> saveNote", () => {
    it("should return error if doesn't pass validate (title: '')", async () => {
      expect.assertions(1);
      try {
        await service.saveNote({
          noteData: { ...groupsWithNotes[0].notes[0], title: "" },
          groupId: 1,
        });
      } catch (e) {
        expect(e).toMatch("Note is not valid");
      }
    });

    it("should return error if doesn't pass validate (value: '')", async () => {
      expect.assertions(1);
      try {
        await service.saveNote({
          noteData: { ...groupsWithNotes[0].notes[0], value: "" },
          groupId: 1,
        });
      } catch (e) {
        expect(e).toMatch("Note is not valid");
      }
    });

    it("should ADD NEW note", async () => {
      expect.assertions(4);

      const notesBeforeAdd = (await service.getNotes())[0].notes;
      const lengthBefore = notesBeforeAdd.length;

      await service.saveNote({
        noteData: {
          title: "new title1",
          value: "new value1",
          description: "new description1",
        },
        groupId: 1,
      });

      const notesAfterAdd = (await service.getNotes())[0].notes;

      expect(lengthBefore + 1).toBe(notesAfterAdd.length);

      expect(notesAfterAdd[2].title).toBe("new title1");
      expect(notesAfterAdd[2].value).toBe("new value1");
      expect(notesAfterAdd[2].description).toBe("new description1");
    });

    it("should UPDATE exist note", async () => {
      expect.assertions(4);

      const notesBeforeAdd = (await service.getNotes())[0].notes;
      const lengthBefore = notesBeforeAdd.length;

      await service.saveNote({
        noteData: {
          id: 2,
          title: "new title2",
          value: "new value2",
          description: "new description2",
        },
        groupId: 1,
      });

      const notesAfterAdd = (await service.getNotes())[0].notes;

      expect(lengthBefore).toBe(notesAfterAdd.length);

      expect(notesAfterAdd[1].title).toBe("new title2");
      expect(notesAfterAdd[1].value).toBe("new value2");
      expect(notesAfterAdd[1].description).toBe("new description2");
    });
  });
});
