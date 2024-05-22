<template>
  <div class="group-title">
    {{ groupStore.selectedGroup.title }}
  </div>

  <div
    v-for="(note, index) in filteredNotes"
    :key="index"
    class="note"
  >
    <div class="note-title">
      <b>{{ note.title }}</b>
    </div>
    <div class="note-value">
      {{ note.value }}
    </div>
  </div>
<!--  &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
<!--  <pre>{{ noteStore.notes }}</pre>-->
</template>

<script setup lang="ts">
import { computed } from "vue";
import { serviceProvider } from "@/serviceProvider/serviceProvider";
import { useGroupStore } from "@/stores/group";
import { useNoteStore } from "@/stores/note";
import type { INoteData } from "@/entities";

const groupStore = useGroupStore();
const noteStore = useNoteStore();

const filteredNotes = computed((): INoteData[] => {
  return groupStore.selectedGroup.id
    ? noteStore.sortedNotes.filter(
        (note: INoteData) => note.groupId === groupStore.selectedGroup.id
      )
    : noteStore.sortedNotes;
});

const getNotes = (): void => {
  serviceProvider.notes
    .getAllNotes()
    .then((notesData: INoteData[] | []) => (noteStore.notes = notesData));
};

getNotes();
</script>

<style scoped>
.group-title {
  margin-bottom: 5px;
  font-weight: bold;
}

.note {
  margin-bottom: 7px;
  padding: 5px 10px;
  border: 1px solid grey;
  border-radius: 5px;
}
.note-title {

}
.note-value {

}
</style>
