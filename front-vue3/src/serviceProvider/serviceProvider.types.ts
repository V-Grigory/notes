import type { INotesService } from "@/services";

export interface IServiceProvider {
  notes: INotesService;
}
