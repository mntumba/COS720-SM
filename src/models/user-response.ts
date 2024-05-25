import { Qualification } from "./qualification";
import { Subject } from "./subject";

export class UserResponse {
    name = '';
    surname = '';
    username = '';
    phoneNumber = '';
    email = '';
    password = '';
    qualification = new Qualification();
    subjects = Array<Subject>();
    mark = 0.0;
}
