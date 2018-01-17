import {UserRole} from "../../model/user-role.enum";

export class User {
  public username: string;
  public role: UserRole;
  public fullName: string;
  public address: string;
}
