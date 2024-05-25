import { Component } from '@angular/core';
import { StudentService } from '../../../services/student.service';
import { Subject } from '../../../models/subject';
import { User } from '../../../models/user';
import { NgFor, NgIf } from '@angular/common';
import { EncryptionService } from '../../../services/encryption.service';

@Component({
  selector: 'app-student-grades',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './student-grades.component.html',
  // styleUrl: './student-grades.component.css'
})
export class StudentGradesComponent {

  subjects = Array<Subject>();
  user = new User();
  registeredSubjects = Array<Subject>();
  
  constructor(private studentService: StudentService, private encryption: EncryptionService) {

    this.user  = this.encryption.decrypt(localStorage.getItem('currentUser')!);
    this.studentService.getRegisteredSubjects(this.user.username, this.user.sessionToken).subscribe(
      res => {
        this.registeredSubjects = res;
      }
    )
  }
}
