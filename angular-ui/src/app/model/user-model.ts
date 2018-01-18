import {UserRole} from "./user-role.enum";

export class UserModel {
  _id: string;
  username: string = null;
  role: UserRole = null;
  fullName: string = null;
  address: string = null;
  flowersIds: number[] = null;
  branchId: number = null;
}
