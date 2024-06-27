import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { INotesData, IGroupData } from "@/entities";

export const useNoteStore = defineStore("note", () => {
  const notes = ref<Array<INotesData>>([]);

  const activeGroup = ref<IGroupData>({
    groupId: 0,
    groupTitle: "",
    groupOrder: null,
  });

  function setActiveGroup(group: IGroupData): void {
    activeGroup.value = group;
  }

  const orderedGroups = computed((): Array<IGroupData> | [] => {
    const groups: IGroupData[] = notes.value.map((note: INotesData) => ({
      groupId: note.groupId,
      groupTitle: note.groupTitle,
      groupOrder: note.groupOrder,
    }));

    const ordered: Array<IGroupData> | [] = groups.filter(
      (group: IGroupData) => group.groupOrder
    );
    const unOrdered: Array<IGroupData> | [] = groups.filter(
      (group: IGroupData) => !group.groupOrder
    );

    return [
      ...ordered.sort((a: IGroupData, b: IGroupData) => {
        // @ts-ignore
        return a.groupOrder - b.groupOrder;
      }),
      ...unOrdered,
    ];
  });

  return {
    notes,
    activeGroup,
    setActiveGroup,
    orderedGroups,
  };
});
