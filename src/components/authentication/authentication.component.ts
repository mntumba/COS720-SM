import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { EncryptionService } from '../../services/encryption.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ FormsModule, NgIf ],
  templateUrl: './authentication.component.html',
  // styleUrl: './authentication.component.css'
})
export class AuthenticationComponent {

  username = '';
  password = '';

  constructor(private router: Router, private authService: AuthenticationService, private encryption: EncryptionService) {

  }

  authenticate() {  
    this.authService.authenticate(this.username, this.password)
        .subscribe(user => { 
          localStorage.setItem('currentUser', this.encryption.encrypt(user));
          this.router.navigate(['app-home']);
         })  
  }

}
