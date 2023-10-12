import { IServiceProvider } from "./serviceProvider.types";
import { NotesService } from "../services";
import { MocksDataProvider } from "../dataProvider";

export const serviceProvider = (): IServiceProvider => ({
  notes: new NotesService(new MocksDataProvider()),
});
