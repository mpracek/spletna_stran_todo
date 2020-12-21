// A post request should not contain an id.
export type UserCreationParams = Pick<Note, "email" | "name" | "phoneNumbers">;

export class UsersService {
  public get(id: number, name?: string):  {
    return {
      id,
      note: "jane@doe.com",
      creation:
    };
  }

  public create(userCreationParams: UserCreationParams): User {
    return {
      id: Math.floor(Math.random() * 10000), // Random
      status: "Happy",
      ...userCreationParams,
    };
  }
}
