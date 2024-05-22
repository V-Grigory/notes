import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useNoteStore } from "@/stores/note";
import { serviceProvider } from "@/serviceProvider/serviceProvider";
import type { INoteData } from "@/entities";

describe("Note Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("sortedNotes", () => {
    const store = useNoteStore();

    serviceProvider.notes.getAllNotes().then((notesData: INoteData[] | []) => {
      store.notes = notesData;

      expect(store.sortedNotes).toEqual([
        {
          id: 1,
          groupId: 1,
          title: "запись первая",
          value: "запись первая - значение group_id: 1",
          order: 1,
          description: null,
        },
        {
          id: 2,
          groupId: 1,
          title: "запись вторая",
          value: "запись вторая - значение group_id: 1",
          order: 2,
          description: "описание второй записи",
        },
        {
          id: 4,
          groupId: 3,
          title: "запись четвертая",
          value: "запись четвертая - значение group_id: 3",
          order: 3,
          description: "описание четвертой записи",
        },
        {
          id: 3,
          groupId: 2,
          title: "запись третья",
          value: "запись третья - значение group_id: 2",
          order: null,
          description: null,
        },
      ]);
    });
  });
});
