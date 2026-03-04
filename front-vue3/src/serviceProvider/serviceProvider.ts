import type { IServiceProvider } from "@/types";
import { NotesApi } from "@/api/notes/in-memory";
// import { NotesApi } from "@/api/notes/node";
import { NotesService } from "@/services";

export const serviceProvider: IServiceProvider = {
  notes: new NotesService(new NotesApi()),
};
