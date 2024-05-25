import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';

import { FormsModule } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Qualification } from '../../../models/qualification';
import { AdminService } from '../../../services/admin.service';
import { Subject } from '../../../models/subject';
import { User } from '../../../models/user';
import { HSSelect } from 'preline';
import { BtnDirective } from '../../../btn.directive';
import { EncryptionService } from '../../../services/encryption.service';

@Component({
  selector: 'app-admin-qualifications',
  standalone: true,
  imports: [IonIcon, FormsModule, NgIf, NgFor, BtnDirective, NgClass],
  templateUrl: './admin-qualifications.component.html',
  // styleUrl: './admin-qualifications.component.css'
})
export class AdminQualificationsComponent {

  @ViewChild('addQualificationBtn', { static: false }) btnElementRef!: ElementRef;

  qualifications = Array<Qualification>();
  qualification = new Qualification();
  subjects = Array<Subject>();
  formData = new Subject();
  student = new User();

  title = '';
  showSubjects = true;
  showStudents = false;

  isSubjectEmpty = false;
  isQualificationEmpty = false;

  isStudentEmpty = false;

  selectedQualification = new Qualification();

  showAddQualification = false;
  showQualifications = true;
  showViewQualification = false;
  showAddSubject = false;
  showAddStudent = false;

  classLevels = [
    { classLevelID: 1, description: 'First year'},
    { classLevelID: 2, description: 'Second year'},
    { classLevelID: 3, description: 'Third year'}
  ]

  user = new User();

  constructor(private adminService: AdminService, private encryption: EncryptionService) {
    this.user  = this.encryption.decrypt(localStorage.getItem('currentUser')!);
    this.adminService.getQualifications(this.user.sessionToken, this.user.username).subscribe((qualifications) => {
      this.qualifications = qualifications;
    });
  }

  addBtnClicked() {
    this.showAddQualification = true;
  this.showQualifications = false;
  }

  discardBtnClicked() {
    this.showAddQualification = false;
    this.showViewQualification = false;
  this.showQualifications = true;
  this.qualification = new Qualification();
  }

  viewQualification(qualification: Qualification) {
    this.showAddQualification = false;
  this.showQualifications = false;
    this.showViewQualification = true;
    this.selectedQualification = qualification;
  }

  discardStudentBtnClicked() {
    this.showViewQualification = false;
  this.showAddSubject = false;
    this.showAddQualification = false;
  this.showQualifications = true;
    this.showViewQualification = false;
    this.showAddStudent = false;
  }


  addSubject(subject: Subject) {
    let selectedClassLevel = (HSSelect.getInstance('#classOptions') as HSSelect)
      .value as string;

      subject.classLevelID = selectedClassLevel;
      subject.level.description = this.classLevels[(selectedClassLevel as unknown as number) -1].description;

    if (subject.code !== '' && subject.name !== '') {
      subject.qualificationID = this.selectedQualification.qualificationID;
      this.subjects.push(subject);
      this.isSubjectEmpty = false;
    } else {
      this.isSubjectEmpty = true;
    }
    this.formData = new Subject();
  }

  removeSubject(subject: Subject) {
    this.subjects.splice(this.subjects.indexOf(subject), 1);
  }

  addQualification() {
    if (this.qualification.code !== '' && this.qualification.name !== '') {
      this.isQualificationEmpty = false;
      this.adminService.addQualification(this.qualification, this.user.sessionToken).subscribe(
        (res) => {
          this.qualifications = [...this.qualifications, { ...res }];
        },
        (err) => {
          console.log('error', err);
        }
      );
    } else {
      this.isQualificationEmpty = true;
    }
  }

  addSubjects() {
    this.adminService.addSubjects(this.subjects, this.user.sessionToken).subscribe(
      (res) => {
        this.selectedQualification.subjects = [
          ...this.selectedQualification.subjects,
          ...res,
        ];
      },
      (err) => {
        console.log('error', err);
      }
    );
  }

  addStudent() {
    // if (this.student.password)
    this.student.roles.push({ roleId: 3, description: 'Student' });
    this.student.qualificationID = this.selectedQualification.qualificationID;
    this.adminService.addUser(this.student, this.user.sessionToken).subscribe(
      (res) => {
        this.selectedQualification.students = [
          ...this.selectedQualification.students,
          { ...res },
        ];
      }
    );
  }

  deleteQualification() {
    this.adminService
      .deleteQualification(this.selectedQualification.qualificationID, this.user.sessionToken)
      .subscribe(
        (res) => {
          // let qs = this.qualifications.filter(
          //   (q) => q.qualificationID !== res.qualificationID
          // );
          this.qualifications.splice(this.qualifications.indexOf(res), 1);
        },
        (err) => {
          console.log('Success', err);
        }
      );
  }

  subjectsClicked() {
    this.showStudents = false;
    this.showSubjects = true;
  }

  studentsClicked() {
    this.showSubjects = false;
    this.showStudents = true; 
  }

  addSubjectBtnClicked(qualification: Qualification) {
    this.selectedQualification = qualification;
    this.showAddSubject = true;
    this.showAddQualification = false;
  this.showQualifications = false;
    this.showViewQualification = false;
  }

  addStudentBtnClicked(qualification: Qualification) {
    this.selectedQualification = qualification;
    this.showAddSubject = false;
    this.showAddQualification = false;
  this.showQualifications = false;
    this.showViewQualification = false;
    this.showAddStudent = true;
  }
}
