<template>
  <n-button
    @click="toggleShowGroups"
    :color="isShowGroups ? '#57534D' : ''"
    size="tiny"
    type="tertiary"
    round
  >
    Группы
  </n-button>

  <div v-if="isShowGroups" class="groups-wrapper">
    <n-button
      @click="addItem"
      strong
      round
      type="primary"
      class="add-list-item-button"
    >
      +
    </n-button>

    <!-- TODO: внедрить использование utility классов -->
    <span v-for="(item, index) in items" :key="index" class="list-item-wrapper">
      <n-button
        @click="setActiveItem(item)"
        strong
        round
        class="select-list-item-button"
      >
        {{ item.groupTitle }}
        <!-- TODO: использовать компонент иконок из ui native -->
        <edit-icon @click.stop="editItem(item)" class="edit-list-item-icon" />
      </n-button>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { IGroupData } from "@/types";
import EditIcon from "@/components/ui/EditIcon.vue";

defineProps<{
  items: IGroupData[] | [];
}>();

const emit = defineEmits<{
  (e: "setActiveGroup", item: IGroupData): void;
  (e: "editItem", formData: IGroupData): void;
  (e: "addItem"): void;
}>();

const isShowGroups = ref<boolean>(false);

const toggleShowGroups = (): void => {
  isShowGroups.value = !isShowGroups.value;
};

const setActiveItem = (item: IGroupData): void => {
  emit("setActiveGroup", item);
};

const editItem = (item: IGroupData): void => {
  emit("editItem", item);
};

const addItem = (): void => {
  emit("addItem");
};
</script>

<style scoped>
.groups-wrapper {
  margin-top: 10px;
}
.list-item-wrapper {}
.select-list-item-button {
  text-wrap: initial;
  margin: 3px;
  color: #57534D;
}
.edit-list-item-icon {
  margin-left: 5px;
}
.edit-list-item-icon:hover {}
.add-list-item-button {
  margin: 3px;
}
</style>
