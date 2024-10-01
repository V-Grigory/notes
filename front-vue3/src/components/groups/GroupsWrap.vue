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
import { ref } from "vue";

import GroupsList from "@/components/groups/GroupsList.vue";
import GroupForm from "@/components/groups/GroupForm.vue";

import { serviceProvider } from "@/serviceProvider/serviceProvider";
import type { IGroupData } from "@/entities";

const emit = defineEmits<{
  (e: "formSaved"): void;
}>();

const closeForm = (): void => {
  isOpenForm.value = false;
};

const isOpenForm = ref<boolean>(false);
const formData = ref<IGroupData>(serviceProvider.notes.getInitGroup());

const onOpenForm = (data: IGroupData): void => {
  formData.value = data;
  isOpenForm.value = true;
};

const onFormSaved = (): void => {
  closeForm();
  emit("formSaved");
};

const onFormClosed = (): void => closeForm();
</script>
