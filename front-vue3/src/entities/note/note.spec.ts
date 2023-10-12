import { Note } from "./note";
import { mockNotesData } from "./note.mock";

describe(">>> Note", () => {
  describe(">> constructor", () => {
    it("should instantiate id only if it was provided", () => {
      const entity1 = new Note({
        ...mockNotesData()[0],
        id: 7,
      });

      expect(entity1.id).toBe(7);

      const entity2 = new Note({
        ...mockNotesData()[0],
        id: undefined,
      });

      expect(entity2.id).toBeUndefined();
    });

    it("should instantiate order only if it was provided", () => {
      const entity1 = new Note({
        ...mockNotesData()[0],
        order: 5,
      });

      expect(entity1.order).toBe(5);

      const entity2 = new Note({
        ...mockNotesData()[0],
        order: undefined,
      });

      expect(entity2.order).toBeUndefined();
    });

    it("should instantiate description only if it was provided", () => {
      const entity1 = new Note({
        ...mockNotesData()[0],
        description: "text description",
      });

      expect(entity1.description).toBe("text description");

      const entity2 = new Note({
        ...mockNotesData()[0],
        description: undefined,
      });

      expect(entity2.description).toBeUndefined();
    });
  });

  describe(">> validate", () => {
    it("should fail validation if groupId is not provided", () => {
      const entity = new Note({
        ...mockNotesData()[0],
        groupId: 0,
      });

      expect(entity.validate()).toBeFalsy();
    });

    it("should fail validation if title is not provided", () => {
      const entity = new Note({
        ...mockNotesData()[0],
        title: "",
      });

      expect(entity.validate()).toBeFalsy();
    });

    it("should fail validation if value is not provided", () => {
      const entity = new Note({
        ...mockNotesData()[0],
        value: "",
      });

      expect(entity.validate()).toBeFalsy();
    });

    it("should not fail validation", () => {
      const entity = new Note({
        ...mockNotesData()[0],
      });

      expect(entity.validate()).toBeTruthy();
    });
  });
});
