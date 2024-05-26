import { Component } from '@angular/core';
import { User } from '../../../models/user';
import { IonIcon } from '@ionic/angular/standalone';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { HSSelect, HSStaticMethods } from 'preline';
import { AdminService } from '../../../services/admin.service';
import { Subject } from '../../../models/subject';
import { UserResponse } from '../../../models/user-response';
import { BtnDirective } from '../../../btn.directive';
import { EncryptionService } from '../../../services/encryption.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
// import { MultiSelectModule } from 'primeng/multiselect';


@Component({
  selector: 'app-admin-teachers',
  standalone: true,
  imports: [IonIcon, NgFor, NgIf, FormsModule, BtnDirective, NgClass, NgMultiSelectDropDownModule],
  templateUrl: './admin-teachers.component.html',
  // styleUrl: './admin-teachers.component.css'
})
export class AdminTeachersComponent {

  subjects = Array<Subject>();
  showDetails = true;
  showSubjects = false;
  showStudents = false;

  showTeachers = true;
  showAddTeacher = false;
  showViewTeacher = false;
  showSubjectStudents = false;

  selectedTeacher = new UserResponse();
  selectedStudent = new UserResponse();
  teachers = Array<UserResponse>();
  teacher = new User();

  isTeacherEmpty = false;

  selectedSubject = new Subject();

  selectedSubjects = Array<Subject>();

  user = new User();

  dropdownSettings = {
    idField: 'subjectID',
    textField: 'name',
  };

  constructor(private adminService: AdminService, private encryption: EncryptionService) {

    this.user  = this.encryption.decrypt(localStorage.getItem('currentUser')!);
    this.adminService.getTeachers(this.user.sessionToken, this.user.username).subscribe((teachers) => {
      this.teachers = teachers;
    });

    this.adminService.getSubjects(this.user.sessionToken, this.user.username).subscribe((teachers) => {
      this.subjects = teachers;
    });
  }

  addTeacherBtn() {
    this.showTeachers = false;
    this.showAddTeacher = true;
    this.showViewTeacher = false;
  }

  addTeacher() {
    this.teacher.roles.push({ roleId: 2, description: 'Teacher' });
    this.teacher.subjects = this.selectedSubjects;

    this.adminService.addUser(this.teacher, this.user.sessionToken, this.user.username).subscribe(
      (res) => {
        this.teachers = [...this.teachers, { ...res }];
      }
    );
  }

  deleteTeacher() {
    this.adminService.deleteUser(this.selectedTeacher.username, this.user.sessionToken, this.user.username).subscribe(
      (res) => {
        let ts = this.teachers.filter((t) => t.username !== res.username);
        this.teachers = [...ts];
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

  discardBtnClicked() {
    this.showTeachers = true;
    this.showAddTeacher = false;
    this.showViewTeacher = false;
    this.showSubjectStudents = false;
  }

  viewTeacherBtnClicked(teacher: UserResponse) {
    this.showTeachers = false;
    this.showAddTeacher = false;
    this.showViewTeacher = true;
    this.selectedTeacher = teacher;
  }

  viewStudentBtnClicked(subject: Subject) {
    this.showTeachers = false;
    this.showAddTeacher = false;
    this.showViewTeacher = false;
    this.showSubjectStudents = true;
    this.selectedSubject = subject;
  }
}
