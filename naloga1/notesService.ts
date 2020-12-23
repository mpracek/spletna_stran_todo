/*
s čim moramo zamenjati note v this.note.?
*/


export interface ICreateNoteRequest {
  note: string;
  creation: Date;
}

export interface IUpdateNoteRequest {
  note: string;
  creation: Date;
}

interface IGetNoteParams {
  note: string;
  creation: Date;
}

export class NoteService {
  public async getNoteById(id: number): Promise<any> {
    const Note = await this.note.findOne({
      where: {
        id,
      },
    });
    return Note;
  }

  public async getNotes({
    note,
    creation,
  }: IGetNoteParams): Promise<Array<any>> {
      const list = await this
    }

  public async createNote({ note,creation }: ICreateNoteRequest) {
      return await this.note.create({
        note,
        creation
      });}

  public async deleteNote(NoteId: number): Promise<void> {
    const Note = await this.getNoteById(NoteId);
    await this.note.delete({
      id: note.id,
    });
  }

  public async updateNote(
    id: number,
    { note,creation }: IUpdateNoteRequest
  ): Promise<any> {

    const Note = await this.getNoteById(id);

    try {
      return await this.note.update({
        ...Note,
        note,
        creation
      });
    } catch (err) {
    }
  }


}
