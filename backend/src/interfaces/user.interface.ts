import { IBase } from "./base.interface";

export interface IUser extends IBase {
    _id: string;
    email: string;
    password: string;
    name: string;
}
export type IUserCreateDTO = Pick<IUser, "email" | "password" | "name">;

export interface IAuth {
    email: string;
    password: string;
}
