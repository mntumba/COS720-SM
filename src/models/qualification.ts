import { Subject } from "./subject";
import { UserResponse } from "./user-response";

export class Qualification {
    qualificationID = 0;
    name = '';
    code = '';
    subjects = Array<Subject>()
    students = Array<UserResponse>()
}
