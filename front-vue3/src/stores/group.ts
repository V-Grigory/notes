import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { IGroupData } from "@/entities";

export const useGroupStore = defineStore("group", () => {
  const groups = ref<Array<IGroupData>>([]);
  const selectedGroup = ref<IGroupData>({ id: 0, title: "", order: 0 });

  const sortedGroups = computed((): Array<IGroupData> | [] => {
    const orderedGroups: Array<IGroupData> | [] = groups.value.filter(
      (group: IGroupData) => group.order
    );
    const unOrderedGroups: Array<IGroupData> | [] = groups.value.filter(
      (group: IGroupData) => !group.order
    );

    return [
      ...orderedGroups.sort((a: IGroupData, b: IGroupData) => {
        // @ts-ignore
        return a.order - b.order;
      }),
      ...unOrderedGroups,
    ];
  });

  function selectGroup(group: IGroupData): void {
    selectedGroup.value = group;
  }

  return {
    groups,
    selectedGroup,
    sortedGroups,
    selectGroup,
  };
});
