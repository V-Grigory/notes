import { mockNotesData } from "../../entities";
import { NotesService } from "./notes";
import { MocksDataProvider } from "../../dataProvider";

describe(">>> Notes Service", () => {
  const service = new NotesService(new MocksDataProvider());

  describe(">> getAllNotes", () => {
    it("should return all notes", async () => {
      expect.assertions(1);
      try {
        const notes = await service.getAllNotes();

        expect([mockNotesData(), []]).toContainEqual(notes);
      } catch (e) {
        expect(e).toMatch("Error message");
      }
    });
  });

  describe(">> createNote", () => {
    it("should return error if doesn't pass validate (groupId: 0)", async () => {
      expect.assertions(1);
      try {
        await service.createNote({ ...mockNotesData()[0], groupId: 0 });
      } catch (e) {
        expect(e).toMatch("Note is not valid");
      }
    });

    it('should return error if doesn\'t pass validate (title: "")', async () => {
      expect.assertions(1);
      try {
        await service.createNote({ ...mockNotesData()[0], title: "" });
      } catch (e) {
        expect(e).toMatch("Note is not valid");
      }
    });

    it('should return error if doesn\'t pass validate (value: "")', async () => {
      expect.assertions(1);
      try {
        await service.createNote({ ...mockNotesData()[0], value: "" });
      } catch (e) {
        expect(e).toMatch("Note is not valid");
      }
    });

    it("should add new note", async () => {
      expect.assertions(1);
      await service.createNote({ ...mockNotesData()[0], title: "new title" });

      const notes = await service.getAllNotes();
      expect(notes.length).toBe(mockNotesData().length + 1);
    });
  });
});
