import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  home,
  newspaper,
  person,
  people,
  receipt,
  print,
  settings,
  exit,
  trash,
  eye,
  close,
  checkmark,
  alarm,
  mail,
  add,
  megaphone
 } from 'ionicons/icons';
import { AdminComponent } from '../admin/admin.component';
import { ProfileComponent } from '../profile/profile.component';
import { User } from '../../models/user';
import { AdminStudentsComponent } from '../admin/admin-students/admin-students.component';
import { AdminQualificationsComponent } from '../admin/admin-qualifications/admin-qualifications.component';
import { AdminTeachersComponent } from '../admin/admin-teachers/admin-teachers.component';
import { StudentSubjectsComponent } from '../student/student-subjects/student-subjects.component';
import { StudentGradesComponent } from '../student/student-grades/student-grades.component';
import { TeacherComponent } from '../teacher/teacher.component';
import { TeacherSubjectsComponent } from '../teacher/teacher-subjects/teacher-subjects.component';
import { BtnDirective } from '../../btn.directive';
import { EncryptionService } from '../../services/encryption.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ 
    NgIf, 
    IonIcon, 
    RouterModule, 
    AdminComponent, 
    NgClass, 
    NgFor, 
    ProfileComponent, 
    AdminStudentsComponent,
    AdminQualificationsComponent,
    AdminTeachersComponent,
    StudentSubjectsComponent,
    StudentGradesComponent,
    TeacherComponent,
    TeacherSubjectsComponent,
    BtnDirective
  ],
  templateUrl: './home.component.html',
  // styleUrl: './home.component.css'
})
export class HomeComponent {

  menu = true;
  user = new User();

  isAdmin = false;
  isStudent = false;
  isTeacher = false;
  showProfile = false;
  showSummary = false;
  showQualifications = false;
  showTeachers = false;
  showStudents = false;

  showGrades = false;
  showSubjects = false;
  showTeacherSubjects = false;
  showTeacherSummary = false;


  @Input() pageTitle = '';
  // pageChange


  constructor(private router: Router, private encryption: EncryptionService) {

    this.user = this.encryption.decrypt(localStorage.getItem('currentUser')!);

    addIcons({
      home,
      newspaper,
      person,
      people,
      receipt,
      print,
      settings,
      exit,
      trash,
      eye,
      close,
      checkmark,
      alarm,
      mail,
      add,
      megaphone
    });

    this.user.roles.forEach((role: { description: string; }) => {
      if (role.description === 'Admin') {
        this.isAdmin = true;
        this.showSummary = true;
        this.pageTitle = 'Summary Dashboard';
      }
      if (role.description === 'Teacher') {
        this.isTeacher = true;
        this.showTeacherSummary = true;
        this.pageTitle = 'Summary Dashboard';
      }
      if (role.description === 'Student') {
        this.isStudent = true;
        this.showSubjects = true;
        this.pageTitle = 'Registered Subjects';
      }
    });
  }
  

  clickToShowSummary() {
    this.showProfile = false;
    this.showSummary = true;
    this.showQualifications = false;
    this.showTeachers = false;
    this.showStudents = false;
    this.pageTitle = "Summary Dashboard";
  }

  clickToShowProfile() {
    this.showProfile = true;
    this.showSummary = false;
    this.showQualifications = false;
    this.showTeachers = false;
    this.showStudents = false;
    this.showGrades = false;
    this.showSubjects = false;
    this.showTeacherSubjects = false;
    this.showTeacherSummary = false;
    this.pageTitle = "User Profile";
  }

  clickToShowQualifications() {
    this.showProfile = false;
    this.showSummary = false;
    this.showQualifications = true;
    this.showTeachers = false;
    this.showStudents = false;
    this.pageTitle = "Qualifications";
  }

  clickToShowTeachers() {
    this.showProfile = false;
    this.showSummary = false;
    this.showQualifications = false;
    this.showTeachers = true;
    this.showStudents = false;
    this.pageTitle = "Registered Teachers";
  }

  clickToShowStudents() {
    this.showProfile = false;
    this.showSummary = false;
    this.showQualifications = false;
    this.showTeachers = false;
    this.showStudents = true;
    this.pageTitle = "Enrolled Students";
  }

  clickToShowSubjects() {
    this.showProfile = false;
    this.showGrades = false;
    this.showSubjects = true;
    this.pageTitle = 'Registered Subjects';
  }

  clickToShowGrades() {
    this.showProfile = false;
    this.showGrades = true;
    this.showSubjects = false;
    this.pageTitle = 'Student Grades';
  }

  clickToShowTeacherSubjects() {
    this.showProfile = false;
    this.showTeacherSubjects = true;
    this.showTeacherSummary = false;
    this.pageTitle = 'Assigned Subjects';
  }

  clickToShowTeacherSummary() {
    this.showProfile = false;
    this.showTeacherSubjects = false;
    this.showTeacherSummary = true;
    this.pageTitle = 'Summary Dashboard';
  }

  changePageTitle() {
    this.pageTitle = "Student Registration";
  }

  backAndCancelBtnEvent() {
    this.pageTitle = 'Registered Subjects';
  }

  menuClick() {    
    this.menu = !this.menu;
  }

  logout() {
    this.user = new User();
    localStorage.removeItem('currentUser');
    this.router.navigate(['']);
  }
}


