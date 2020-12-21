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


@Route("/api/note/")
export class NotesController {
  /**
   * @isInt note note should be a positive integer
   * @minimum note 1
   * @isInt creation creation should be a positive integer
   * @minimum creation 1
   */
  @Get()
  @Tags("Notes")
  public async GetNotes(
    @Query() note,
    @Query() creation
  ): Promise<Notes[]> {
    return this.service.getNotes({
      note: note,
      creation: creation,
    });
  }

  /**
   * @isInt id id must be a positive integer
   * @minimum id 1
   */
  @Get("{id}")
  @Tags("Notes")
  public async GetNoteById(@Path() id: number): Promise<Notes> {
    return this.service.getNoteById(id);
  }

  @Post()
  @Tags("Notes")
  public async CreateNote(@Body() request: ICreateNoteRequest): Promise<Notes> {
    return this.service.createNote(request);
  }

  @Patch("{id}")
  @Tags("Notes")
  public async UpdateNote(
    @Path() id: number,
    @Body() request: IUpdateNoteRequest
  ): Promise<Notes> {
    return this.service.updateNote(id, request);
  }

  /**
   * @isInt id id must be a positive integer
   * @minimum id 1
   */
  @Delete(`{id}`)
  @Tags("Notes")
  public async DeleteNote(@Path() id: number) {
    return this.service.deleteNote(id);
  }

  private get service() {
    return new NoteService();
  }
}
