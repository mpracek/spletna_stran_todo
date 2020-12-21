import {
  Body,
  Controller,
  Get,
  Delete,
  Path,
  Post,
  Patch,
  Query,
  Route,
  SuccessResponse,
} from "tsoa";
import { NotesService, noteCreationParams } from "./notesService";

@Route("note")
export class NotessControler extends Controler {
  @Get("{id}")
  public async getNote(
    @Path() Id: number,
     ): Promise<Note> {
    return new NotesService().get(Id);
  }

  @Get()
  public async  getAllNote(
    @Path()
    ): Promise<Note>{
    return new UsersService().get()
  }

  @SuccessResponse("201", "Created") // Custom success response

  @Post()
  public async createNote(
    @Body() requestBody: UserCreationParams
  ): Promise<void> {
    this.setStatus(201); // set return status 201
    new NotesService().create(requestBody);
    return;
  }

  @Post("id")
  public async deleteNote(
    @Body() Id: number,
  ): Promise<Note>{
    new NotesService().delete(requestBody)
  }

  @Post("id")
  public async updateNote(
    @Body() Id: number,
  ): Promise<Note>{
    new NotesService().patch(requestBody)
  }

}
