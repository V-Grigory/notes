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

        <n-form-item label="Value">
          <n-input v-model:value="formValues.value" placeholder="Input Value" />
        </n-form-item>

        <n-form-item label="Description">
          <n-input
            v-model:value="formValues.description"
            placeholder="Input Description"
          />
        </n-form-item>

        <n-form-item label="Order">
          <n-input-number v-model:value="formValues.order" />
        </n-form-item>

        <n-form-item>
          <n-button @click="applyEdit" type="success"> Сохранить </n-button>
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
import type { INoteData } from "@/entities";

const props = defineProps<{
  isOpenForm: boolean;
  formTitle: string;
  formData: INoteData;
}>();

const emit = defineEmits<{
  (e: "formApplied", formData: INoteData): void;
  (e: "formClosed"): void;
}>();

const isOpenModal = ref<boolean>(false);
watch(
  () => props.isOpenForm,
  () => {
    props.isOpenForm && initFormValues();
    isOpenModal.value = props.isOpenForm;
  }
);

const formValues = ref<INoteData>(props.formData);

const initFormValues = (): void => {
  formValues.value = Object.assign({}, props.formData);
};

const applyEdit = (): void => {
  emit("formApplied", formValues.value);
};

const cancelEdit = (): void => {
  emit("formClosed");
};
</script>

<style scoped></style>
