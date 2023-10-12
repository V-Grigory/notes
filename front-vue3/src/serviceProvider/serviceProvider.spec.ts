import { serviceProvider } from "./serviceProvider";
import { NotesService } from "../services";

jest.mock("../services/notes");

describe(">> Provider", () => {
  it("should instantiate Notes Service", () => {
    serviceProvider();
    expect(NotesService.prototype.constructor).toBeCalled();
  });
});
