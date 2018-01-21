import {UserRole} from "./user-role.enum";
import {Model} from "./model";

export class UserModel extends Model{
  username: string = null;
  role: UserRole = null;
  fullName: string = null;
  address: string = null;
  flowersIds: number[] = null;
  branchId: number = null;
}
