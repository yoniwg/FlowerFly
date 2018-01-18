import {UserRole} from "./user-role.enum";

export class UserModel {
  public username: string = null;
  public role: UserRole = null;
  public fullName: string = null;
  public address: string = null;
  public flowersIds: number[] = null;
  public branchId: number = null;
}
