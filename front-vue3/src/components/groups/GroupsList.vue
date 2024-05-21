<template>
  {{ store.groups }}
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
</script>

<style scoped></style>
