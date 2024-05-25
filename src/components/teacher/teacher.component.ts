import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { IonIcon } from '@ionic/angular/standalone';
import { Subject } from '../../models/subject';
import { User } from '../../models/user';
import { TeacherService } from '../../services/teacher.service';
import { EncryptionService } from '../../services/encryption.service';

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [RouterOutlet, IonIcon, NgIf, RouterModule],
  templateUrl: './teacher.component.html',
  // styleUrl: './teacher.component.css',
})
export class TeacherComponent {

  subjects = Array<Subject>();
  students = Array<User>();
  user = new User();
  numberOfStudents = 0;
  numberOfAssignments = 0;
  totalHours = 0;


  constructor(private teacherService: TeacherService, private encryption: EncryptionService) {

    this.user = this.encryption.decrypt(localStorage.getItem('currentUser')!);
    this.teacherService.getAssignedSubjects(this.user.username, this.user.sessionToken).subscribe(
      res => {
        this.subjects = res;
        this.subjects.forEach(s => {
          this.totalHours += 120;
          this.numberOfStudents = this.numberOfStudents + s.students.length;
          this.numberOfAssignments = this.numberOfAssignments + s.assignments.length;
        });
      }
    )

  }

}
