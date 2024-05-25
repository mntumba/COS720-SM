import { Component, Output, EventEmitter } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { Subject } from '../../../models/subject';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { StudentService } from '../../../services/student.service';
import { User } from '../../../models/user';
import { Modal, Ripple, initTWE } from 'tw-elements';
import { EncryptionService } from '../../../services/encryption.service';

@Component({
  selector: 'app-student-subjects',
  standalone: true,
  imports: [IonIcon, NgFor, NgIf, NgClass],
  templateUrl: './student-subjects.component.html',
  // styleUrl: './student-subjects.component.css'
})
export class StudentSubjectsComponent {
  @Output() pageTitleEvent = new EventEmitter<string>();
  @Output() pageChangeEvent = new EventEmitter<boolean>();

  subjects = Array<Subject>();

  showSubjects = true;
  showRegistration = false;
  goNext = false;
  user = new User();

  studentSubjects = Array<Subject>();
  registeredSubjects = Array<Subject>();
  subjectToDrop = new Subject();

  constructor(private studentService: StudentService, private encryption: EncryptionService) {
    this.user  = this.encryption.decrypt(localStorage.getItem('currentUser')!);

    this.studentService.getRegisteredSubjects(this.user.username, this.user.sessionToken).subscribe(
      res => {
        this.registeredSubjects = res;
      }
    )
  }

  register() {
    this.studentService.registerSubjects(this.studentSubjects, this.user.sessionToken, this.user.username).subscribe(
      res => {
        this.registeredSubjects = [ ...this.registeredSubjects, ...res ];
        this.showSubjects = true;
        this.showRegistration = false;
        this.goNext = false;
      }
    )
  }

  registerBtnClicked() {
    initTWE({ Modal, Ripple });
    this.showSubjects = false;
    this.showRegistration = true;
    this.pageTitleEvent.emit("Student Registration");
    this.studentService.getSubjectsPerQualification(this.user.username, this.user.sessionToken).subscribe(
      res => {
        this.subjects = res;
      }
    )
  }

  drop() {
    this.studentService.dropSubject(this.subjectToDrop.subjectID, this.user.sessionToken).subscribe(
      res => {
        let rSubjects = Array<Subject>();
        this.subjects.forEach(s => {
          if (s.subjectID == res.subjectID) {
            s.studentSubject = null
          }

          rSubjects.push(s)
        });

        this.subjects = [ ...rSubjects]

        rSubjects = this.registeredSubjects.filter(rs => rs.subjectID != res.subjectID)

        this.registeredSubjects = [ ...rSubjects ]
      }
    )
  }

  addSubjectBtnClicked(subject: Subject) {
    if (this.studentSubjects.indexOf(subject) == -1) {
      this.studentSubjects.push(subject);
    }
  }

  dropSubjectBtnClicked(subject: Subject) {
    this.subjectToDrop = subject;
  }

  removeSubjectBtnClicked(subject: Subject) {
    this.studentSubjects.splice(this.studentSubjects.indexOf(subject), 1);
  }

  gobackBtnClicked() {
    this.showSubjects = true;
    this.showRegistration = false;
    this.studentSubjects = new Array<Subject>();
    this.pageChangeEvent.emit(true);
  }

  nextBtnClicked() {
    this.goNext = true;
    this.showRegistration = false;
  }

  cancelBtnClicked() {
    this.showSubjects = true;
    this.showRegistration = false;
    this.goNext = false;
    this.studentSubjects = new Array<Subject>();
    this.pageChangeEvent.emit(true);
  }

}

