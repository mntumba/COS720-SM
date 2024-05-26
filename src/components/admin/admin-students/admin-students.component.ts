import { Component } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { NgFor, NgIf } from '@angular/common';
import { AdminService } from '../../../services/admin.service';
import { UserResponse } from '../../../models/user-response';
import { BtnDirective } from '../../../btn.directive';
import { User } from '../../../models/user';
import { EncryptionService } from '../../../services/encryption.service';

@Component({
  selector: 'app-admin-students',
  standalone: true,
  imports: [IonIcon, NgFor, NgIf, BtnDirective],
  templateUrl: './admin-students.component.html',
  // styleUrl: './admin-students.component.css'
})
export class AdminStudentsComponent {
  selectedStudent = new UserResponse();
  students = Array<UserResponse>();

  showDetails = true;
  showSubjects = false;

  showViewStudent = false;
  showStudents = true;

  user = new User();

  constructor(private adminService: AdminService, private encryption: EncryptionService) {
    this.user  = this.encryption.decrypt(localStorage.getItem('currentUser')!);
    this.adminService.getStudents(this.user.sessionToken, this.user.username).subscribe((students) => {
      this.students = students;
    });
  }

  deleteStudent() {
    this.adminService.deleteUser(this.selectedStudent.username, this.user.sessionToken, this.user.username).subscribe(
      (res) => {
        let sts = this.students.filter((s) => s.username !== res.username);
        this.students = [...sts];
      }
    );
  }

  subjectsClicked() {
    this.showDetails = false;
    this.showSubjects = true;
  }

  detailsClicked() {
    this.showSubjects = false;
    this.showDetails = true;
  }

  viewBtnClicked(student: UserResponse) {
    this.showViewStudent = true;
    this.showStudents = false;
    this.selectedStudent = student;
  }

  discardBtnClicked() {
    this.showViewStudent = false;
    this.showStudents = true;
  }
}
