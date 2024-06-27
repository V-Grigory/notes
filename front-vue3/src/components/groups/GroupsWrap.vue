<template>
  <groups-list @open-form="onOpenForm" />

  <group-form
    :is-open-form="isOpenForm"
    :form-data="formData"
    form-title="Добавить группу"
    @form-saved="onFormSaved"
    @form-closed="onFormClosed"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import GroupsList from "@/components/groups/GroupsList.vue";
import GroupForm from "@/components/groups/GroupForm.vue";

import { useNoteStore } from "@/stores/note";
import { serviceProvider } from "@/serviceProvider/serviceProvider";
import type { INotesData, IGroupData } from "@/entities";

const store = useNoteStore();

onMounted(() => getNotes());

const getNotes = (): void => {
  serviceProvider.notes.getNotes().then((notes: INotesData[] | []) => {
    store.notes.length = 0;
    store.notes = [...notes];
  });
};

const isOpenForm = ref<boolean>(false);
const formData = ref<IGroupData>(serviceProvider.notes.getInitGroup());

const onOpenForm = (data: IGroupData): void => {
  formData.value = data;
  isOpenForm.value = true;
};

const onFormClosed = (): void => {
  isOpenForm.value = false;
};

const onFormSaved = (): void => {
  onFormClosed();
  getNotes();
};
</script>
