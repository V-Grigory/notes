import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";

import { useNoteStore } from "@/stores/note";
import { serviceProvider } from "@/serviceProvider/serviceProvider";
import type { INotesData, IGroupData, INoteData } from "@/entities";

describe("Note Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("orderedGroups", () => {
    const store = useNoteStore();

    serviceProvider.notes.getNotes().then((notesData: INotesData[] | []) => {
      store.notes = notesData;

      expect(store.orderedGroups).toEqual([
        {
          groupId: 1,
          groupTitle: "группа первая",
          groupOrder: 1,
        },
        {
          groupId: 2,
          groupTitle: "группа вторая",
          groupOrder: 2,
        },
        {
          groupId: 4,
          groupTitle: "группа четвертая",
          groupOrder: 4,
        },
        {
          groupId: 3,
          groupTitle: "группа третья",
          groupOrder: 5,
        },
      ]);
    });
  });
});
