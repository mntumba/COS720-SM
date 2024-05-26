import { User } from "./user";
import { UserResponse } from "./user-response";

export class Subject {
    subjectID = 0;
    name = '';
    code = '';
    level = { classLevelID: 0, description: '' };
    classLevelID = 0;
    qualificationID = 0;
    teacher = new User();
    students = Array<UserResponse>();
    studentSubject: any;
    assignments = Array<{ 
        id: 0, 
        name: '',
        grade: {
            gradeID: 0,
            mark: 0.0
        }
    }>()
}
