import { Body, Delete, Get, Patch, Path, Post, Query, Route, Tags, BodyProp, Controller } from "tsoa";
import { Notes } from "./note"
import { NoteDeleteParam, NoteInsertParam, NoteQueryParam, NoteUpdateParam, NotesService} from "./notesService";

//ko želiš vse zagnati, moraš še enkrat znova zagnati ukaz yarn run tsoa routes
// in nato še yarn run tsc --outDir build --experimentalDecorators
//ko zaženeš drugi klic, se ponovno zgenerirajo vse js datoteke, potrebne za delovanje (prek tsoa)

var db = require("./database.js");


@Route("/api/note")
export class NotesController extends Controller {
  @Get("list")
  public async getNotes(): Promise<Notes[]> {
    return new NotesService().getNotes();
  }

  @Get("/{id}")
  public async findOneNote(
    id: number): Promise<Notes> {
      return new NotesService().findOneNote(id);
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
