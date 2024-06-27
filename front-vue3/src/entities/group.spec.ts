import { describe, it, expect } from "vitest";

import { Group } from "./group";
import type { INotesData } from "./types";
import { NotesApi } from "@/api/notes/in-memory/data";

const notesApi = new NotesApi();
const groupsWithNotesAsString: string = await notesApi.getNotes();
const groupsWithNotes: INotesData[] = JSON.parse(groupsWithNotesAsString);

describe(">>> Group", () => {
  describe(">> constructor", () => {
    it("should instantiate id only if it was provided", () => {
      const group1 = new Group({
        ...groupsWithNotes[0],
        groupId: 1,
      });

      expect(group1.groupId).toBe(1);

      const group2 = new Group({
        ...groupsWithNotes[0],
        groupId: undefined,
      });

      expect(group2.groupId).toBeUndefined();
    });

    it("should instantiate order only if it was provided", () => {
      const group1 = new Group({
        ...groupsWithNotes[0],
        groupOrder: 3,
      });

      expect(group1.groupOrder).toBe(3);

      const group2 = new Group({
        ...groupsWithNotes[0],
        groupOrder: undefined,
      });

      expect(group2.groupOrder).toBeUndefined();
    });
  });

  describe(">> validate", () => {
    it("should fail validation if title is empty", () => {
      const group = new Group({
        ...groupsWithNotes[0],
        groupTitle: "",
      });

      expect(group.validate()).toBeFalsy();
    });

    it("should fail validation if title is too short", () => {
      const group = new Group({
        ...groupsWithNotes[0],
        groupTitle: "т",
      });

      expect(group.validate()).toBeFalsy();
    });

    it("should not fail validation if length title is normal", () => {
      const group = new Group({
        ...groupsWithNotes[0],
        groupTitle: "ттт",
      });

      expect(group.validate()).toBeTruthy();
    });
  });
});