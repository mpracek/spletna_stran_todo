/*
s čim moramo zamenjati note v this.note.?
*/

import { Notes } from "./notes"

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


export type NoteCreationParams = Pick<Notes, "id" | "note" | "creation">;

export class NoteService {
  public async getNoteById(id: number): Promise<Notes> {
    const Note = await this.Notes.findOne({
      where: {
        id,
      },
    });
    return Note;
  }

  public async getNotes({
    note,
    creation,
  }: IGetNoteParams): Promise<Array<Notes>> {
    //ne vem kaj tukaj
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
  ): Promise<Notes> {

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
