import type { IServiceProvider } from "./serviceProvider.types";
import { NotesApi } from "@/api/notes/in-memory";
import { NotesService } from "@/services";

export const serviceProvider: IServiceProvider = {
  notes: new NotesService(new NotesApi()),
};
