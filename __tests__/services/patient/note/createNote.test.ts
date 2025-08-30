import { createNoteService } from '../../../../src/services/patient/note/createNote';
import { createNoteQuery } from '../../../../src/db/note';

jest.mock('../../../../src/db/note');

describe('createNoteService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call createNoteQuery with patientId, note, and date and return the result', async () => {
    (createNoteQuery as jest.Mock).mockResolvedValue({ id: 'n1', note: 'Test note', date: '2023-01-01' });
    const noteData = { note: 'Test note', date: new Date('2023-01-01') };
    const result = await createNoteService('p1', noteData);
    expect(createNoteQuery).toHaveBeenCalledWith('p1', 'Test note');
    expect(result).toEqual({ id: 'n1', note: 'Test note', date: '2023-01-01' });
  });
});
