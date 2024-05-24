<template>
  <div
    v-for="(group, index) in store.sortedGroups"
    :key="index"
    class="list-item-wrapper"
  >
    <n-button
      @click="selectItem(group)"
      strong
      secondary
      round
      class="select-list-item-button"
    >
      {{ group.title }}
    </n-button>
    <edit-icon @click="editItem(group)" />
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

  <group-form
    :is-open-form="isOpenForm"
    form-title="Добавить группу"
    :form-data="itemFormData"
    @form-saved="onFormSaved"
    @close-form="closeForm"
  />

<!--  {{ store.groups }}-->
</template>

<script setup lang="ts">
import { ref } from "vue";
import { serviceProvider } from "@/serviceProvider/serviceProvider";
import { useGroupStore } from "@/stores/group";
import type { IGroupData } from "@/entities";
import GroupForm from "@/components/groups/GroupForm.vue";
import EditIcon from "@/components/ui/EditIcon.vue";

const store = useGroupStore();

const getGroups = (): void => {
  serviceProvider.groups
    .getAllGroups()
    .then((groupsData: IGroupData[] | []) => {
      store.groups.length = 0;
      store.groups = [...groupsData];
    });
};
getGroups();

const selectItem = (group: IGroupData): void => {
  store.selectGroup(group);
};

const itemFormData = ref<IGroupData>(serviceProvider.groups.getInitGroup());

const addItem = (): void => {
  itemFormData.value = serviceProvider.groups.getInitGroup();
  openForm();
};
const editItem = (item: IGroupData): void => {
  itemFormData.value = item;
  openForm();
};

const onFormSaved = (): void => {
  getGroups();
  closeForm();
};

const isOpenForm = ref<boolean>(false);
const openForm = () => (isOpenForm.value = true);
const closeForm = () => (isOpenForm.value = false);
</script>

<style scoped>
.list-item-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.select-list-item-button {
  display: block;
  text-wrap: initial;
  margin: 3px 0;
}
.add-list-item-button {
  margin-top: 15px;
}
</style>
