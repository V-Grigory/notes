<template>
  <div class="group-title">
    {{ store.activeGroup.groupTitle }}
  </div>

  <div v-for="(note, index) in store.groupNotes" :key="index" class="note">
    <div class="note-attributes">
      <div class="note-title">
        <b>{{ note.title }}</b>
      </div>
      <div class="note-value">
        {{ note.value }}
      </div>
      <div class="note-description">
        {{ note.description }}
      </div>
    </div>

    <edit-icon @click="editItem(note)" class="edit-list-item-icon" />
  </div>

  <n-button
    @click="addItem"
    strong
    secondary
    block
    type="primary"
    class="add-list-item-button"
  >
    +
  </n-button>
</template>

<script setup lang="ts">
import { serviceProvider } from "@/serviceProvider/serviceProvider";
import { useNoteStore } from "@/stores/note";
import type { INoteData } from "@/entities";
import EditIcon from "@/components/ui/EditIcon.vue";

const store = useNoteStore();

const emit = defineEmits<{
  (e: "openForm", formData: INoteData): void;
}>();

const editItem = (item: INoteData): void => {
  emit("openForm", item);
};
const addItem = (): void => {
  emit("openForm", serviceProvider.notes.getInitNote());
};
</script>

<style scoped>
.group-title {
  margin-bottom: 5px;
  font-weight: bold;
}

.note {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 7px;
  padding: 5px 10px;
  border: 1px solid grey;
  border-radius: 5px;
}
.note-attributes {
}
.note-title {
}
.note-value {
}
.note-description {
}

.edit-list-item-icon {
  cursor: pointer;
}
.edit-list-item-icon:hover {
  color: grey;
}
.add-list-item-button {
  margin-top: 15px;
}
</style>
