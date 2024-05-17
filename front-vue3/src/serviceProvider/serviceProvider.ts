import type { IServiceProvider } from "./serviceProvider.types";
import { NotesApi } from "@/api/note/in-memory/noteData";
import { GroupsApi } from "@/api/group/in-memory/groupData";
import { NotesService, GroupsService } from "@/services";

export const serviceProvider: IServiceProvider = {
  notes: new NotesService(new NotesApi()),
  groups: new GroupsService(new GroupsApi()),
};
