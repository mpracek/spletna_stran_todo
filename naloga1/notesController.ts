import { Body, Delete, Get, Patch, Path, Post, Query, Route, Tags, BodyProp } from "tsoa";
import { Notes } from "./notes"

/*
TODO:
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
//dve ideji za get, pustim drugi
  /*
  @Get("list")
  public async GetNotes(
    @Query() note,
    @Query() creation
  ): Promise<any[]> {

    return this.service.getNotes({
      note: note,
      creation: creation,
    });
    */
   public async getAll() : Promise<any[]> {
    try {
        let items: any[] = await Notes.find({});
        items = items.map((item) => { return {id: note.id, note: note.note, creation:note.creation}});
        return items;
    } catch (err) {
        this.setStatus(500);
        console.error('Caught error', err);
    }

  }

  @Get("{id}")
  public async GetNoteById(@Path() id: number): Promise<any> {
    return this.service.getNoteById(id);
  }

  //dve ideji za post, pustil bom drugo
/*
  @Post("/")
  public async CreateNote(@BodyProp('note','creation') request: ICreateNoteRequest): Promise<any> {
    return this.service.createNote(request);
  }
*/
  @Post('/')
    public async CreateNote(@BodyProp('note') note: string,creation:Date): Promise<void> {
        const item = new Notes({note: note,creation:creation});
        await item.save();
    }
//dve ideji za post, pustil bom drugo
/*
  @Patch("update")
  public async UpdateNote(
    @Path() id: number,
    @Body() request: IUpdateNoteRequest
  ): Promise<any> {
    return this.service.updateNote(id, request);
  }
*/
  @Patch("update")
  public async UpdateNote(id: string, @BodyProp('description') description: string): Promise<void> {
    await Notes.findOneAndUpdate({_id: id}, {description: description});
  }

//dve ideji za post, pustil bom drugo
/*
  @Delete("delete")
  public async DeleteNote(@Path() id: number) {
    return this.service.deleteNote(id);
  }
  private get service() {
    return new NoteService();
  }
}
*/
@Delete('/{id}')
public async DeleteNote(id: string): Promise<void> {
    await Notes.findByIdAndRemove(id);
  }
}
