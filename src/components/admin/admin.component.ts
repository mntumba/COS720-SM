import { Component } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { AdminService } from '../../services/admin.service';
import { Qualification } from '../../models/qualification';
import { UserResponse } from '../../models/user-response';
import { User } from '../../models/user';
import { EncryptionService } from '../../services/encryption.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [IonIcon],
  templateUrl: './admin.component.html',
  // styleUrl: ''
})
export class AdminComponent {
  qualifications = Array<Qualification>();
  students = Array<UserResponse>();
  teachers = Array<UserResponse>();
  user = new User();

  constructor(private adminService: AdminService, private encryption: EncryptionService) {
    this.user  = this.encryption.decrypt(localStorage.getItem('currentUser')!);

    this.adminService.getQualifications(this.user.sessionToken, this.user.username).subscribe((res) => {
      this.qualifications = res;
    });

    this.adminService.getStudents(this.user.sessionToken, this.user.username).subscribe((res) => {
      this.students = res;
    });

    this.adminService.getTeachers(this.user.sessionToken, this.user.username).subscribe((res) => {
      this.teachers = res;
    });
  }
}
