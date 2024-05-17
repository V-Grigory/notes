import type { INotesService, IGroupsService } from "@/services";

export interface IServiceProvider {
  notes: INotesService;
  groups: IGroupsService;
}
