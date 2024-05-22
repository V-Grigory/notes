<template>
  <n-button
    v-for="(group, index) in store.sortedGroups"
    :key="index"
    @click="selectGroup(group)"
    strong
    secondary
    round
    class="button"
  >
    {{ group.title }}
  </n-button>
<!--  {{ store.groups }}-->
<!--  <br>-->
<!--  {{ store.selectedGroup }}-->
</template>

<script setup lang="ts">
// import { ref } from "vue";
import { serviceProvider } from "@/serviceProvider/serviceProvider";
import { useGroupStore } from "@/stores/group";
import type { IGroupData } from "@/entities";

const store = useGroupStore();

const getGroups = (): void => {
  serviceProvider.groups
    .getAllGroups()
    .then((groupsData: IGroupData[] | []) => (store.groups = groupsData));
};

getGroups();

const selectGroup = (group: IGroupData): void => {
  store.selectGroup(group);
};
</script>

<style scoped>
.button {
  display: block;
  text-wrap: initial;
  margin: 3px 0;
}
</style>
