export enum Role{
  Client,
  Admin
}

export class User{ 
  id: number;
  username: string;
  email: string;
  password: string;
  birthdate:Date;
  role:Role=Role.Client;
  enabled:Boolean=true;
}
