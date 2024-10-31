<template>
  <groups-list
    :items="store.orderedGroups"
    @set-active-group="onSetActiveItem"
    @open-form="onOpenForm"
    @add-item="onAddItem"
  />

  <group-form
    :is-open-form="isOpenForm"
    :form-data="formData"
    form-title="Добавить группу"
    @form-applied="onFormApplied"
    @form-closed="onFormClosed"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useMessage } from "naive-ui";

import { useNoteStore } from "@/stores/note";
import { serviceProvider } from "@/serviceProvider/serviceProvider";
import type { IGroupData } from "@/entities";

import GroupsList from "@/components/groups/GroupsList.vue";
import GroupForm from "@/components/groups/GroupForm.vue";

const message = useMessage();
const store = useNoteStore();

const emit = defineEmits<{
  (e: "formSaved"): void;
}>();

const isOpenForm = ref<boolean>(false);
const formData = ref<IGroupData>(serviceProvider.notes.getInitGroup());

const onSetActiveItem = (item: IGroupData): void => {
  store.setActiveGroup(item);
};

const onOpenForm = (data: IGroupData): void => {
  formData.value = data;
  isOpenForm.value = true;
};

const onFormApplied = async (formData: IGroupData): Promise<void> => {
  try {
    await serviceProvider.notes.saveGroup(formData);

    emit("formSaved");
    closeForm();
  } catch (errorMessage: any) {
    message.error(errorMessage);
  }
};

const onAddItem = (): void => {
  formData.value = serviceProvider.notes.getInitGroup();
  isOpenForm.value = true;
};

const onFormClosed = (): void => closeForm();

const closeForm = (): void => {
  isOpenForm.value = false;
};
</script>
