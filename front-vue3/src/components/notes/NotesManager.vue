<template>
  <notes-list
    :items="store.groupNotes"
    @edit-item="onEditItem"
    @add-item="onAddItem"
  />

  <note-form
    :is-open-form="isOpenForm"
    :form-data="formData"
    form-title="Добавить заметку"
    @form-applied="onFormApplied"
    @form-closed="onFormClosed"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useMessage } from "naive-ui";

import { useNoteStore } from "@/stores/note";
import { serviceProvider } from "@/serviceProvider/serviceProvider";
import type { INoteData } from "@/entities";

import NotesList from "@/components/notes/NotesList.vue";
import NoteForm from "@/components/notes/NoteForm.vue";

const message = useMessage();
const store = useNoteStore();

const emit = defineEmits<{
  (e: "formSaved"): void;
}>();

const isOpenForm = ref<boolean>(false);
const formData = ref<INoteData>(serviceProvider.notes.getInitNote());

const onEditItem = (data: INoteData): void => {
  formData.value = data;
  isOpenForm.value = true;
};

const onAddItem = (): void => {
  formData.value = serviceProvider.notes.getInitNote();
  isOpenForm.value = true;
};

const onFormApplied = async (formData: INoteData): Promise<void> => {
  try {
    await serviceProvider.notes.saveNote({
      noteData: formData,
      groupId: 1, // !
    });

    emit("formSaved");
    closeForm();
  } catch (errorMessage: any) {
    message.error(errorMessage);
  }
};

const onFormClosed = (): void => closeForm();

const closeForm = (): void => {
  isOpenForm.value = false;
};
</script>
