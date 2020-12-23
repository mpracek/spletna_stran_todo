import { Body, Delete, Get, Patch, Path, Post, Query, Route, Tags } from "tsoa";

/*
TODO:
  -ugotovit kaj dat za route
  -definirat vse funkcije v obliki controlerja
  -urediti funkcije v notesService
  -ugotoviti kako definirati Notes
*/

import {
  ICreateNoteRequest,
  IUpdateNoteRequest,
  NoteService,
} from "./notesService";

var db = require("./database.js");


@Route("/api/note")
export class NotesController {
  @Get("list")
  public async GetNotes(
    @Query() note,
    @Query() creation
  ): Promise<any[]> {
    return this.service.getNotes({
      note: note,
      creation: creation,
    });
  }

  @Get("{id}")
  public async GetNoteById(@Path() id: number): Promise<any> {
    return this.service.getNoteById(id);
  }

  @Post("/")
  public async CreateNote(@Body() request: ICreateNoteRequest): Promise<any> {
    return this.service.createNote(request);
  }

  @Patch("update")
  public async UpdateNote(
    @Path() id: number,
    @Body() request: IUpdateNoteRequest
  ): Promise<any> {
    return this.service.updateNote(id, request);
  }

  @Delete("delete")
  public async DeleteNote(@Path() id: number) {
    return this.service.deleteNote(id);
  }

  private get service() {
    return new NoteService();
  }
}
