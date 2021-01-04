import { Body, Delete, Get, Patch, Path, Post, Query, Route, Tags, BodyProp, Controller } from "tsoa";
import { Notes } from "./note"
import { NoteDeleteParam, NoteInsertParam, NoteQueryParam, NoteUpdateParam, NotesService} from "./notesService";

var db = require("./database.js");


@Route("/api/note")
export class NotesController extends Controller {
  @Get("list")
  public async getNotes(): Promise<Notes[]> {
    return new NotesService().getNotes();
  }

  @Post("/{id}")
  public async findOneNote(
    @Body() requestBody: NoteQueryParam): Promise<void> {
      return new NotesService().findOneNote(requestBody);
    }


  @Post("/")
  public async insertNote(
    @Body() requestBody: NoteInsertParam): Promise<Notes> {
      return new NotesService().insertNote(requestBody);
    }

  @Post("update")
  public async updateNote(
    @Body() requestBody: NoteUpdateParam
  ): Promise<void> {
    new NotesService().updateNote(requestBody);
  }

  @Delete("delete")
  public async deleteNote(
    @Body() requestBody: NoteDeleteParam
  ): Promise<void> {
    new NotesService().deleteNote(requestBody);
  }

}
