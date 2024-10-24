<template>
  <notes-list @open-form="onOpenForm" />

  <note-form
    :is-open-form="isOpenForm"
    :form-data="formData"
    form-title="Добавить заметку"
    @form-saved="onFormSaved"
    @form-closed="onFormClosed"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";

import NotesList from "@/components/notes/NotesList.vue";
import NoteForm from "@/components/notes/NoteForm.vue";

import { serviceProvider } from "@/serviceProvider/serviceProvider";
import type { INoteData } from "@/entities";

const emit = defineEmits<{
  (e: "formSaved"): void;
}>();

const closeForm = (): void => {
  isOpenForm.value = false;
};

const isOpenForm = ref<boolean>(false);
const formData = ref<INoteData>(serviceProvider.notes.getInitNote());

const onOpenForm = (data: INoteData): void => {
  formData.value = data;
  isOpenForm.value = true;
};

const onFormSaved = (): void => {
  closeForm();
  emit("formSaved");
};

const onFormClosed = (): void => closeForm();
</script>
