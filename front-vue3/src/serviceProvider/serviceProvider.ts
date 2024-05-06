import type { IServiceProvider } from "./serviceProvider.types";
import { Api } from "@/api/note";
import { NotesService } from "@/services";

export const serviceProvider = (): IServiceProvider => ({
  notes: new NotesService(new Api()),
});
