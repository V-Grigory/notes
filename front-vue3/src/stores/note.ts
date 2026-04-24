import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { serviceProvider } from "@/serviceProvider/serviceProvider";
import type { INotesData, INoteData, IGroupData } from "@/types";

export const useNoteStore = defineStore("note", () => {
  const notes = ref<Array<INotesData>>([]);

  const activeGroup = ref<IGroupData>({
    groupId: 0,
    groupTitle: "",
    groupOrder: 0,
  });

  const groupNotes = computed((): Array<INoteData> | [] => {
    const group: INotesData | undefined = notes.value.find(
      (group: INotesData) => group.groupId === activeGroup.value.groupId
    );
    return group ? group.notes : [];
  });

  const orderedGroups = computed((): Array<IGroupData> | [] => {
    const groups: IGroupData[] = notes.value.map((note: INotesData) => ({
      groupId: note.groupId,
      groupTitle: note.groupTitle,
      groupOrder: note.groupOrder,
    }));

    return groups.sort((a, b) => a.groupOrder - b.groupOrder);
  });

  const loadNotes = async (): Promise<void> => {
    notes.value = await serviceProvider.notes.getNotes();
  };

  const setActiveGroup = (group: IGroupData): void => {
    activeGroup.value = group;
  };

  const saveGroup = async (data: IGroupData): Promise<void> => {
    await serviceProvider.notes.saveGroup(notes.value, data);
    await loadNotes();
  };

  const saveNote = async (payload: {
    noteData: INoteData;
    groupId: number;
  }): Promise<void> => {
    await serviceProvider.notes.saveNote(notes.value, payload);
    await loadNotes();
  };

  return {
    notes,
    activeGroup,
    groupNotes,
    orderedGroups,
    loadNotes,
    setActiveGroup,
    saveGroup,
    saveNote,
  };
});
