"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deleteNote_1 = require("../../../../src/services/patient/note/deleteNote");
const note_1 = require("../../../../src/db/note");
const testUtils_1 = require("../../../testUtils");

jest.mock("../../../../src/db/note");
describe("updateNoteService", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it("should call updateNoteQuery with noteId, patientId, and updateData and return the result", async () => {
        testUtils_1.mockFunction(note_1, 'updateNoteQuery', {
            id: "n1",
            note: "Updated note",
            date: "2023-01-02",
        });
        const updateData = { note: "Updated note", date: new Date("2023-01-02") };
        const result = await (0, deleteNote_1.updateNoteService)("n1", "p1", updateData);
        expect(note_1.updateNoteQuery).toHaveBeenCalledWith("n1", "p1", updateData);
        expect(result).toEqual({
            id: "n1",
            note: "Updated note",
            date: "2023-01-02",
        });
    });
});
