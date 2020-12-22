/*
s čim moramo zamenjati repozitorij?

kaj moramo uvoziti
import { any } from "../../node/database/entities/Note";
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
    const take = pageSize;
    const skip = take && page && (page - 1) * take;

    return await this.note.find({
      take,
      skip,
      order: {
        id: "ASC",
      },
    });
  }

  public async createNote({ note,creation }: ICreateNoteRequest) {

    try {
      return await this.note.create({
        note,
        creation
      });
    } catch (err) {
      this.checkForUniqueViolation(err);
    }
  }

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

    const Note = await this.getNoteById(NoteId);

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
