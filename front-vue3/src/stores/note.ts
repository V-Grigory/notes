import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { INoteData } from "@/entities";

export const useNoteStore = defineStore("note", () => {
  const notes = ref<Array<INoteData>>([]);

  const sortedNotes = computed((): Array<INoteData> | [] => {
    const orderedNotes: Array<INoteData> | [] = notes.value.filter(
      (note: INoteData) => note.order
    );
    const unOrderedNotes: Array<INoteData> | [] = notes.value.filter(
      (note: INoteData) => !note.order
    );

    return [
      ...orderedNotes.sort((a: INoteData, b: INoteData) => {
        // @ts-ignore
        return a.order - b.order;
      }),
      ...unOrderedNotes,
    ];
  });

  return { notes, sortedNotes };
});
