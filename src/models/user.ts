import { Subject } from "./subject";
import { UserRole } from "./user-role";

export class User {
    username = '';
    password = '';
    name = '';
    surname = '';
    sessionToken = '';
    roles = Array<UserRole>();
    email = '';
    phoneNumber = '';
    errorMessage = '';
    qualificationID = 0;
    subjects = Array<Subject>();
}
