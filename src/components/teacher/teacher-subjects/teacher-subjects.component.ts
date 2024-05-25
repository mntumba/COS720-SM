import { Component } from '@angular/core';
import { Subject } from '../../../models/subject';
import { User } from '../../../models/user';
import { IonIcon } from '@ionic/angular/standalone';
import { NgFor, NgIf } from '@angular/common';
import { TeacherService } from '../../../services/teacher.service';
import { EncryptionService } from '../../../services/encryption.service';

@Component({
  selector: 'app-teacher-subjects',
  standalone: true,
  imports: [IonIcon, NgFor, NgIf],
  templateUrl: './teacher-subjects.component.html',
  // styleUrl: './teacher-subjects.component.css'
})
export class TeacherSubjectsComponent {

  subjects = Array<Subject>();
  students = Array<User>();
  user = new User();
  selectedSubject = new Subject();
  selectedAssignmentId = 0

  grades = Array<any>();

  showSubjectDetails = false;
  showSubjects = true;
  showStudents = false;
  showAssignments = true;
  showGradeAddition = false;

  constructor(private teacherService: TeacherService, private encryption: EncryptionService) {

    this.user = this.encryption.decrypt(localStorage.getItem('currentUser')!);
    this.teacherService.getAssignedSubjects(this.user.username, this.user.sessionToken).subscribe(
      res => {
        this.subjects = res;
      }
    )
  }

  publishMarks() {
    this.teacherService.publishAssignmentMarks(this.grades, this.user.sessionToken).subscribe(
      res => {
        this.showSubjects = true;
    this.showSubjectDetails = false;
    this.showAssignments = false;
    this.showGradeAddition = false;
    this.grades = Array<any>();
      }
    )
  }

  addSTudentMark(event: any, username: string) {
    this.grades.push({
      username: username,
      subjectId: this.selectedSubject.subjectID,
      assignmentId: this.selectedAssignmentId,
      mark: event.target.value
  });
    console.log(this.grades)
  }

  viewBtnClicked(subject: Subject) {
    this.showSubjects = false;
    this.showSubjectDetails = true;
    this.selectedSubject = subject;
  }

  studentsClicked() {
    this.showAssignments = false;
    this.showStudents = true;
  }

  assignmentsClicked() {
    this.showStudents = false;
    this.showAssignments = true;
  }

  addGradeBtnClicked(assignmentId: number) {
    this.showAssignments = false;
    this.showStudents = false;
    this.showSubjectDetails = false;
    this.showGradeAddition = true;
    this.selectedAssignmentId = assignmentId
  }

  gobackBtnClicked() {
    this.showSubjects = true;
    this.showSubjectDetails = false;
  }

  gobackToSubjectsBtnClicked() {
    this.showSubjects = true;
    this.showSubjectDetails = false;
    this.showAssignments = false;
    this.showGradeAddition = false;
    this.grades = Array<any>();
  }

}
