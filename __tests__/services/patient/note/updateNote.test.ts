// Mock environment variables
process.env.JWT_TEMP_SECRET = 'test-temp-secret';
process.env.JWT_RESET_SECRET = 'test-reset-secret';
process.env.JWT_SECRET = 'test-secret';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test';

// Mock modules
jest.mock("../../../../src/db/note");

import { updateNoteService } from "../../../../src/services/patient/note/deleteNote";
import { updateNoteQuery } from "../../../../src/db/note";

describe("updateNoteService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call updateNoteQuery with noteId, patientId, and updateData and return the result", async () => {
    (updateNoteQuery as jest.Mock).mockResolvedValue({
      id: "n1",
      note: "Updated note",
      date: "2023-01-02",
    });
    const updateData = { note: "Updated note", date: new Date("2023-01-02") };
    const result = await updateNoteService("n1", "p1", updateData);
    expect(updateNoteQuery).toHaveBeenCalledWith("n1", "p1", updateData);
    expect(result).toEqual({
      id: "n1",
      note: "Updated note",
      date: "2023-01-02",
    });
  });
});
