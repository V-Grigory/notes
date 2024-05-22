<template>
  <div
    v-for="(note, index) in store.sortedNotes"
    :key="index"
    class="note"
  >
    {{ note.title }}
  </div>
  ----------------------
  <pre>{{ store.notes }}</pre>
</template>

<script setup lang="ts">
import { serviceProvider } from "@/serviceProvider/serviceProvider";
import { useNoteStore } from "@/stores/note";
import type { INoteData } from "@/entities";

const store = useNoteStore();

const getNotes = (): void => {
  serviceProvider.notes
    .getAllNotes()
    .then((notesData: INoteData[] | []) => (store.notes = notesData));
};

getNotes();
</script>

<style scoped></style>
