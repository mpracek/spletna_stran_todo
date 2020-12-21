// A post request should not contain an id.
export type UserCreationParams = [note,creation];

export class NotesService {
  public get(id: number, note: string, creation: date):  {
    return {
      id,
      note,
      creation
    };
  }

  public create(noteCreationParams: UserCreationParams): User {
    return {
      ...userCreationParams,
    };
  }
}
