/*
s čim moramo zamenjati repozitorij?

kaj moramo uvoziti
import { INote } from "../../node/database/entities/Note";
import { PostgresError } from "../../node/database/postgres/postgres-error";
import { PostgresErrorCode } from "../../node/database/postgres/postgres-error-codes";
import { HttpStatusCode } from "../common/http-status-code";
import { OperationError } from "../common/operation-error";
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
    if (!Note) {
      throw new OperationError("NOT_FOUND", HttpStatusCode.NOT_FOUND);
    }

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

  public async createNote({ email, name, address }: ICreateNoteRequest) {
    this.checkEmail(email);

    try {
      return await this.repository.create({
        email,
        name,
        address,
      });
    } catch (err) {
      this.checkForUniqueViolation(err);

      throw new OperationError(
        "UNKNOWN_ERROR",
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async deleteNote(NoteId: number): Promise<void> {
    const Note = await this.getNoteById(NoteId);
    await this.repository.delete({
      id: Note.id,
    });
  }

  public async updateNote(
    NoteId: number,
    { email, name, address }: IUpdateNoteRequest
  ): Promise<INote> {
    this.checkEmail(email);

    const Note = await this.getNoteById(NoteId);

    try {
      return await this.repository.update({
        ...Note,
        email,
        name,
        address,
      });
    } catch (err) {
      this.checkForUniqueViolation(err);

      throw new OperationError(
        "UNKNOWN_ERROR",
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  private checkForUniqueViolation(err: unknown) {
    const emailInUse =
      err instanceof PostgresError &&
      err.code === PostgresErrorCode.UNIQUE_VIOLATION;
    if (emailInUse) {
      throw new OperationError("EMAIL_IN_USE", HttpStatusCode.BAD_REQUEST);
    }
  }


}
