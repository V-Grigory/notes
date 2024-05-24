<template>
  <n-modal :show="isOpenModal" transform-origin="center" auto-focus>
    <n-card
      style="width: 600px"
      :title="formTitle"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <n-form :model="formValues">
        <n-form-item label="Title">
          <n-input v-model:value="formValues.title" placeholder="Input Title" />
        </n-form-item>

        <n-form-item label="Order">
          <n-input-number v-model:value="formValues.order" />
        </n-form-item>

        <n-form-item>
          <n-button @click="saveEdit" type="success"> Сохранить </n-button>
          <n-button @click="cancelEdit" style="margin-left: 15px">
            Отмена
          </n-button>
        </n-form-item>
      </n-form>

      {{ formValues }}
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useMessage } from "naive-ui";
import type { IGroupData } from "@/entities";
import { serviceProvider } from "@/serviceProvider/serviceProvider";

const message = useMessage();

const props = defineProps<{
  isOpenForm: boolean;
  formTitle: string;
  formData: IGroupData;
}>();

const emit = defineEmits<{
  (e: "closeForm"): void;
  (e: "formSaved"): void;
}>();

const isOpenModal = ref<boolean>(false);
watch(
  () => props.isOpenForm,
  () => {
    props.isOpenForm && initFormValues();
    isOpenModal.value = props.isOpenForm;
  }
);

const formValues = ref<IGroupData>(props.formData);

const initFormValues = (): void => {
  formValues.value = Object.assign({}, props.formData);
};

const saveEdit = async () => {
  try {
    await serviceProvider.groups.createGroup(formValues.value);

    emit("formSaved");
  } catch (errorMessage: any) {
    message.error(errorMessage);
  }
};

const cancelEdit = (): void => {
  emit("closeForm");
};
</script>

<style scoped></style>
