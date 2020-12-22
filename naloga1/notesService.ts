/*
s čim moramo zamenjati repozitorij?

kaj moramo uvoziti
import { INote } from "../../node/database/entities/Note";
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
  public async getNoteById(id: number): Promise<INote> {
    const Note = await this.repository.findOne({
      where: {
        id,
      },
    });

    return Note;
  }

  public async getNotes({
    note,
    creation,
  }: IGetNoteParams): Promise<Array<INote>> {
    const take = pageSize;
    const skip = take && page && (page - 1) * take;

    return await this.repository.find({
      take,
      skip,
      order: {
        id: "ASC",
      },
    });
  }

  public async createNote({ note,creation }: ICreateNoteRequest) {

    try {
      return await this.repository.create({
        note,
        creation
      });
    } catch (err) {
      this.checkForUniqueViolation(err);
    }
  }

  public async deleteNote(NoteId: number): Promise<void> {
    const Note = await this.getNoteById(NoteId);
    await this.repository.delete({
      id: note.id,
    });
  }

  public async updateNote(
    id: number,
    { note,creation }: IUpdateNoteRequest
  ): Promise<INote> {

    const Note = await this.getNoteById(NoteId);

    try {
      return await this.repository.update({
        ...Note,
        note,
        creation
      });
    } catch (err) {
    }
  }


}
