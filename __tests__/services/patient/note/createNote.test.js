"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createNote_1 = require("../../../../src/services/patient/note/createNote");
const note_1 = require("../../../../src/db/note");
jest.mock('../../../../src/db/note');
describe('createNoteService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should call createNoteQuery with patientId, note, and date and return the result', async () => {
        note_1.createNoteQuery.mockResolvedValue({ id: 'n1', note: 'Test note', date: '2023-01-01' });
        const noteData = { note: 'Test note', date: new Date('2023-01-01') };
        const result = await (0, createNote_1.createNoteService)('p1', noteData);
        expect(note_1.createNoteQuery).toHaveBeenCalledWith('p1', 'Test note', new Date('2023-01-01'));
        expect(result).toEqual({ id: 'n1', note: 'Test note', date: '2023-01-01' });
    });
});
